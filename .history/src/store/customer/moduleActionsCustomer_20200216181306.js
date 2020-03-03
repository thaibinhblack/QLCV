import axios from "@/axios"

export default {
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