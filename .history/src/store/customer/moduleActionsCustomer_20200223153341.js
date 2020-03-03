import axios from "@/axios"

export default {

    fetchCustomer({commit})
    {
        return new Promise((resolve, reject) => {
            axios.get('/api/customers?api_token='+axios.defaults.params.token)
            .then((response) => {
                commit("SET_CUSTOMER",response.data.result)
                resolve(response)
            })
            .catch((err) => {
                reject(err)
            })
        })
    },
    fetchCustomerByIDCH({commit},ID_CUA_HANG)
    {
        return new Promise((resolve, reject) => {
            axios.get('/api/customer_ch?ID_CUA_HANG='+ID_CUA_HANG+'&api_token='+axios.defaults.params.token)
            .then((response) => {
                commit("SET_CUSTOMER",response.data.result)
                resolve(response)
            })
            .catch((err) => {
                reject(err)
            })
        })
    },
    fetchCustomerBySDT({commit},SDT_KH)
    {
        return new Promise((resolve, reject) => {
            axios.get('/api/customers?SDT_KH='+SDT_KH+'&api_token='+axios.defaults.params.token)
            .then((response) => {
                commit("SET_CUSTOMER_SEARCH",response.data.result)
                resolve(response)
            })
            .catch((err) => {
                reject(err)
            })
        })
    },
    fetchCustomerByTypeStore({commit},TYPE_STORE)
    {
        return new Promise((resolve, reject) => {
            axios.get('/api/customers?TYPE_STORE='+TYPE_STORE+'&api_token='+axios.defaults.params.token)
            .then((response) => {
                commit("SET_CUSTOMER",response.data.result)
                resolve(response)
            })
            .catch((err) => {
                reject(err)
            })
        })
    },
    createCustomer({commit},customer)
    {
        return new Promise((resolve, reject) => {
            const form_customer = new FormData()
            form_customer.append("TEN_KH",customer.TEN_KH)
            form_customer.append("NGAY_SINH_KH",customer.NGAY_SINH_KH)
            form_customer.append("SDT_KH",customer.SDT_KH)
            form_customer.append("DC_TP_KH",customer.DC_TP_KH)
            form_customer.append("DC_QH_KH",customer.DC_QH_KH)
            form_customer.append("DC_NHA_KH",customer.DC_NHA_KH)
            form_customer.append("ID_CUA_HANG",customer.ID_CUA_HANG)
            axios.post('/api/customer?api_token='+axios.defaults.params.token, form_customer)
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