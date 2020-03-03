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
            const form_bill = new FormData();
            form_bill.append("ID_CUA_HANG",bill.ID_CUA_HANG)
            form_bill.append("UUID_KH",bill.UUID_KH)
            form_bill.append("VALUE_HOA_DON",JSON.stringify(bill.VALUE_HOA_DON))
            form_bill.append("TONG_TIEN",bill.TONG_TIEN)
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