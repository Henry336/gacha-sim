const mongoose = require('mongoose')

const assignmentSchema = new mongoose.Schema({
  canvasId: { type: Number, required: true, unique: true }, // syncing
  title: { type: String, required: true },
  courseCode: { type: String },
  dueDate: { type: Date },
  
  // The Link: Points this assignment to the user who owns it
  userRef: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },

  // Gamification State
  isCompletedLocally: { type: Boolean, default: false },
  expReward: { type: Number, default: 50 }
});

module.exports = mongoose.model('Assignment', assignmentSchema);