import axios from '@/axios'

export default {
    fetchProvince({commit}){
        return new Promise((resolve,reject) => {
            axios.get('/api/province').then((response) => {
                commit("ADD_PROVINCE",response.data)
            })
        })
    }
}