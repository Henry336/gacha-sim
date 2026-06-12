import axios from 'axios'

const getCourses = () => {
    const url = "/api/v1/courses?enrollment_state=active"

    const config = {
        headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_CANVAS_API_TOKEN}`
        }
    }

    return axios
        .get(url, config)
        .then(response => {
            return response.data.map(course => ({
                    id: course.id,
                    name: course.name,
                    code: course.course_code,
            }))
        })
        .catch(error => {
            console.error("Canvas API Error:", error)
        })
}

const getAssignments = (courseId) => {
    const url = `/api/v1/courses/${courseId}/assignments`
    
    const config = {
        headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_CANVAS_API_TOKEN}`
        }
    }

    return axios
        .get(url, config)
        .then(response => {
            console.log(response.data)
            return response.data
        })
        .catch(error => {
            console.error("Canvas API Error:", error)
            return []
        })
}

export default { getCourses, getAssignments }