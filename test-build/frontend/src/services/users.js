import axios from 'axios'

const baseUrl = '/api/users'

const register = credentials => {
    return axios
        .post(baseUrl + '/register', credentials) // this will call the endpoint set up in backend, which needs token + username
        .then(res => res.data)
}

// for below, when using in frontend in onClick={}, might have to do () => userService.syncUser(userId)
const sync = userId => { // this will be activated whenever the refresh button is clicked for quests
    return axios
        .post(baseUrl + `/sync`, {}, {
            headers: {
                'user-id': userId
            }
        })
        .then(res => res.data)
}

export default { register, sync }