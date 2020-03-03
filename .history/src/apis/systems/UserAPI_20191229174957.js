import axios from 'axios'
import config from '../config.js'
export default {
    fetchUsers(){
        console.log(config)
        axios.get(config.url_api + '/api/users?api_token=123').then((response) => {
            return response.data
        })
    }
}