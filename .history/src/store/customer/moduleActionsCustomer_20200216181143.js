import axios from "@/axios"

export default {
    createCustomer({commit},customer)
    {
        return new Promise((resolve, reject) => {
            axios.post('/api/customer?api_token='+axios.defauts.params.token, form_customer)
            .then((response) => {
                resolve(response.data)
                commit("ADD_CUSTOMER",customer)
            })
            .catch((err) => {
                reject(err)
            })
        })
    }
}