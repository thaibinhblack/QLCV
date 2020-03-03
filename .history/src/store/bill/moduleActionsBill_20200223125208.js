import axios from '@/axios'
export default {
    addBill({commit},bill)
    {
        commit("ADD_BILL",bill)
    },
    removeBill({commit},ID_SAN_PHAM)
    {
        commit("REMOVE_BILL", ID_SAN_PHAM)
    },
    createBill({commit},bill)
    {
        return new Promise((resolve, reject) => {
            axios.get('/api/hoa-don?api_token='+axios.defaults.params.token)
            .then((response) => {
                commit("SET_CUSTOMER",response.data.result)
                resolve(response)
            })
            .catch((err) => {
                reject(err)
            })
        })
    }
}