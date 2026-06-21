// Loading the necessities
require('dotenv').config() // load the env variables from .env file

const { encryptToken, decryptToken } = require('./utils/crypto')

const express = require('express')
const morgan = require('morgan')

const mongoose = require('mongoose')
mongoose.set('strictQuery',false)
const url = process.env.MONGODB_URI
console.log('Connecting to MongoDB...', url)
mongoose.connect(url)
    .then(result => {
        console.log('Successfully connected to MongoDB')
    })
    .catch(err => {
        console.error('DB connection error:', err.message)
        process.exit(1)
    })

const User = require('./models/user')
const Assignment = require('./models/assignment')
const canvasService = require('./services/canvas')

const app = express()
const cors = require('cors')

app.use(express.json()) // json parser
app.use(cors())
//app.use(express.static('dist')) // to use the production build of the frontend

morgan.token('body', function getBody (req) {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body')) // logger for HTTP reqs

// Onboarding route for new users
// This route is called when a new user logs in for the first time,
// It fetches their profile and active courses from Canvas,
// creates a new user in the database,
// and saves all their assignments to the db as well using upsert logic to avoid duplicates (update + insert)
/**
 * @returns a response containing the user's data in json format
 */
app.post('/api/users/register', async (req, res, next) => {
  try {
    const rawToken = req.body.token // The Canvas API token sent from the frontend
    const securedToken = encryptToken(rawToken) // encrypt the raw token immediately

    // temporarily use the raw token to ping Canvas to fetch the user's details
    const canvasProfile = await canvasService.getUser(rawToken)
    const activeCourses = await canvasService.getCourses(rawToken)
    
    // Create the new User in MongoDB
    const newUser = new User({
      canvasUserId: canvasProfile.id,
      username: req.body.username,
      encryptedCanvasToken: securedToken
      //  initialize pet and inventory
    })
    const savedUser = await newUser.save()

    // Loop through their active courses to grab ALL assignments
    for (const course of activeCourses) {
      const assignments = await canvasService.getAssignmentsOf(course.id, rawToken)
      
      // Save those assignments to MongoDB using the upsert logic
      // The loop logic below is used to loop through object arrays
      for (const task of assignments) {
         await Assignment.findOneAndUpdate(
           { canvasId: task.id }, // find assignment with this id
           { // update the assignment as follows (if found). Otherwise, insert the assignment as follows
            title: task.name, 
            dueDate: task.due_at, 
            courseCode: course.course_code,
            pointsPossible: task.points_possible || 10, // default to 10 if 'points' weren't specified
            userRef: savedUser._id 
           },
           { upsert: true } // set upsert option to true
         )
      }
    }

    res.status(201).json(savedUser)

  } catch (error) {
    next(error)
  }
});
///////////////////////////


/////////////////////////////////////////////////////////////////////////////////////////
// The following methods are to sync the user's completion state 
// and to fetch the assignments from the canvas api endpoints

/**
 * @description sync the user's state whenever 'refresh' button is pressed in the quests dashboard by user
 */
app.post('/api/users/sync', async (req, res, next) => {
  try {
    // Blindly accept the user ID from the frontend headers (can make this more secure by learning part 4 FSO)
    const currentUserId = req.headers['user-id']; 
    
    if (!currentUserId) {
      return res.status(400).json({ error: 'Missing user-id header' });
    }

    // Fetch the user and decrypt their token
    const user = await User.findById(currentUserId);
    if (!user || !user.encryptedCanvasToken) {
      return res.status(404).json({ error: 'User not found' });
    }
    const rawToken = decryptToken(user.encryptedCanvasToken);

    const activeCourses = await canvasService.getCourses(rawToken);
    
    let totalExpGained = 0; 
    let totalTokensGained = 0;

    for (const course of activeCourses) {
      const assignments = await canvasService.getAssignmentsOf(course.id, rawToken);
      
      for (const task of assignments) {
        const existingQuest = await Assignment.findOne({ 
          canvasId: task.id, 
          userRef: user._id 
        });

        const isSubmittedOnCanvas = task.has_submitted_submissions || false;
        const points = task.points_possible || 10; 

        if (existingQuest) { // quest is found
          if (!existingQuest.isCompletedLocally && isSubmittedOnCanvas) { // quest has been completed since the last sync
            const expReward = points * 10;
            totalExpGained += expReward;
            totalTokensGained += 1; // just award 1 token for now

            await User.findByIdAndUpdate(user._id, {
              $inc: { 'pet.exp': expReward, gachaTokens: 1 } // increment these properties by this amount
            });

            existingQuest.isCompletedLocally = true;
          }

          existingQuest.dueDate = task.due_at;
          existingQuest.title = task.name;
          await existingQuest.save();

        } else { // assignment not found in database -> add this assignment as a new quest
          // this basically means the assignment wasn't there during the last sync
          const newQuest = new Assignment({
            canvasId: task.id,
            title: task.name,
            courseCode: course.course_code,
            dueDate: task.due_at,
            pointsPossible: points,
            userRef: user._id,
            isCompletedLocally: isSubmittedOnCanvas 
          });
          await newQuest.save();
        }
      }
    }

    res.status(200).json({ 
      message: 'Sync completed successfully',
      yield: { expGained: totalExpGained, tokensGained: totalTokensGained } // send back this data to the frontend
    });

  } catch (error) {
    next(error); 
  }
});

module.exports = app;


/**
 * @description Fetch the user's assignments by filtering assignments from the database using the
 * user's id, injected into the request's headers by the frontend
 * 
 * @returns a response containing a list of active assignments, sorted in closest to farthest (deadline)
 */
app.get('/api/assignments', (req, res, next) => {
    const currentUserId = req.headers['user-id']

    Assignment
        .find({
            userRef: currentUserId, // only fetch this user's assignments
            isCompletedLocally: false // only fetch assignment if not completed yet
        })
        .sort({ dueDate: 1 }) // sort the assignments in ascending order => closest deadlines appear first
        .then(assignments => {
            res.json(assignments)
        })
        .catch(err => next(err))
})

// End of canvas api methods
/////////////////////////////////////////////////////////////////////////////////////////


// Setting up the server endpoints
// GET the user's inventory
app.get('/api/inventory', (req, res, next) => {

})

app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Canvas Impact Backend Server</h1>')
})
/////////////////////////////////////////////////////////////////////////////////////////

/**
 * 
 * @param {*} error 
 * @param {*} request 
 * @param {*} response 
 * @param {*} next 
 * @returns 
 */
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: "wrongly formatted id"})
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else {
    return response.status(500).json({ error: "Failed to fetch active assignments"})
  }

  next(error)
}
app.use(errorHandler)

/**
 * Run the server on the RENDER PORT OR default to localhost:3001
 */
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})
