// axios
import axios from 'axios'

const domain = "http://api.ecosyco.com/"

export default axios.create({baseURL: domain, params: {
    token: ''
}})

