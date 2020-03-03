import axios from '@/axios.js'
import api_url from '../config.js'
export default {
    fetchUsers(){
        axios.get(api_url + '/api/users?api_token').then((response) => {
            return response.data
        })
    }
}