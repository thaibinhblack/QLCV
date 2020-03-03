import axios from 'axios'
import config from '../config.js'
export default {
    fetchUsers(){
        console.log(config.api_url)
        axios.get(config.api_url + '/api/users?api_token=123').then((response) => {
            return response.data
        })
    }
}