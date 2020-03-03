import axios from 'axios'
import config from '../config.js'
export default {
    fetchUsers(){
        console.log(config)
        axios.get(config.url_api + '/api/users?api_token=123').then((response) => {
            return response.data
        })
    },
    createUser(form_user, api_token)
    {
        axios.post(config.url_api + '/api/user?api_token='+api_token,form_user).then((response) => {
            return response.data
        }).catch(() => {
            return false
        })
    }
}