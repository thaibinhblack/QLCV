import  axios from '@/axios.js'
export default {
    createProduct({commit},product) {
        return new Promise((resolve,reject) => {
            const form_product = new FormData();
            axios.post('/api/product?api_token='+axios.defaults.params.token,form_product)
        })
    }
}