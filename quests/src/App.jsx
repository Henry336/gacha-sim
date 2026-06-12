import { useState, useEffect } from 'react'
import canvasAPI from './services/canvas'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Courses from './components/Courses'

function App() {
  const [quests, setQuests] = useState([])
  const [courses, setCourses] = useState([])
  const [assignments, setAssignments] = useState([])

  useEffect(() => {
    canvasAPI
      .getCourses()
      .then(initCourses => {
        setCourses(initCourses)
      })

    canvasAPI
      .getAssignments(85349)
      .then(data => {
        setAssignments(Array.isArray(data) ? data : [])
      })
  }, [])

  return (
    <div>
      <h1>Courses</h1>
      <Courses courses={courses}/>

      <h1>Quests</h1>
      <h4>ES1103</h4>
      {assignments?.length ? (
        assignments.map(a => (
          <li key={a.id}>
            Task: {a.name} | EXP: {a.points_possible} | Deadline: {a.due_at}
          </li>
        ))
      ) : (
        <p>No assignments available.</p>
      )}
    </div>
  )
}

export default App
