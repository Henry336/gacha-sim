const axios = require('axios')
const baseUrl = 'https://canvas.nus.edu.sg/api/v1'

/**
 * @description Used to populate the user profile and identify the authenticated user
 * @returns Promise<Object>
 * @property id, name, sortable_name, short_name, primary_email, login_id, avatar_url 
 */
const getUser = token => {
    return axios
        .get(baseUrl + '/users/self/profile', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => response.data)
}

/**
 * @description Used to find active modules and display the courses
 * @returns Promise<Array<Object>>
 * @property id, name, course_code, enrollment_term_id, start_at, end_at
 */
const getCourses = token => {
    return axios
        .get(baseUrl + '/courses?enrollment_state=active', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => response.data)
}

/**
 * @description Used to retrieve the assignments to generate the quests and task lists
 * @param {*} id 
 * @returns 
 */
const getAssignmentsOf = (id, token) => {
    return axios
        .get(baseUrl + `/courses/${id}/assignments?bucket=upcoming`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => response.data)
}  

/** 
const create = newObj => {
    return axios.post(baseUrl, newObj).then(response => response.data)
}

const update = (id, newObj) => {
    console.log("Update block triggered")
    return axios
            .put(`${baseUrl}/${id}`, newObj)
            .then(response => response.data)
}

const deleteEntry = id => {
    axios
        .delete(`${baseUrl}/${id}`)
}
        */

module.exports = { getUser, getCourses, getAssignmentsOf }
