import axios from '@/axios'

export default {
    fetchProvince({commit}){
        return new Promise((resolve,reject) => {
            axios.get('/api/province').then((response) => {
                commit("SET_PROVINCE",response.data)
                resolve(response.data)
            }).catch((error) => {
                reject(error)
            })
        })
    },
    fetchDistrict({commit},ID_PROVINCE)
    {
        return new Promise((resolve,reject) => {
            axios.get('/api/district/'+ID_PROVINCE)
            .then((response) => {
                commit("SET_DISTRICT",response.data)
            })
            .catch((err) => {
                reject(err)
            })
        })

    }
}