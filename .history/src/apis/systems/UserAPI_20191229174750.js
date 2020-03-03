import axios from 'axios'
import api_url from '../config.js'
export default {
    fetchUsers(){
        console.log(api_url)
        axios.get(api_url + '/api/users?api_token=123').then((response) => {
            return response.data
        })
    }
}