import axios from 'axios'

const baseUrl = "/api/assignments"

const getActive = userId => {
    return axios
        .get(baseUrl, {
            headers: {
                'user-id': userId // user id injection in the req's header to be safer
            }
        })
        .then(res => res.data)
}

export default { getActive }