import axios from '@/axios'
export default {
    addBill({commit},bill)
    {
        commit("ADD_BILL",bill)
    },
    removeBill({commit},ID_SAN_PHAM)
    {
        // console.log('ID_SP',ID_SAN_PHAM)
        commit("REMOVE_BILL", ID_SAN_PHAM)
    },
    fetchBill({commit})
    {
        return new Promise((resolve,reject) => {
            axios.get('/api/hoa-don?api_token='+axios.defaults.params.token)
            .then((response) => {
                commit("SET_BILL",response.data.result)
                resolve(response.data)
            })
            .catch((err) => {
                reject(err)
            })
        })
    },
    createBill({commit},bill)
    {
        return new Promise((resolve, reject) => {
            const form_bill = new FormData();
            form_bill.append("ID_CUA_HANG",bill.ID_CUA_HANG)
            form_bill.append("UUID_KH",bill.UUID_KH)
            form_bill.append("VALUE_HOA_DON",JSON.stringify(bill.VALUE_HOA_DON))
            form_bill.append("TONG_TIEN",bill.TONG_TIEN)
            form_bill.append("DIEM_TICH_LUY",(bill.TONG_TIEN/1000))
            axios.post('/api/hoa-don?api_token='+axios.defaults.params.token,form_bill)
            .then((response) => {
                commit("ADD_BILLS",bill)
                resolve(response.data)
            })
            .catch((err) => {
                reject(err)
            })
        })
    },
    deleteBill({commit},ID_HOA_DON)
    {
        return new Promise((resolve,reject) => {
            axios.post('/api/hoa-don/'+ID_HOA_DON+'/delete?api_token='+axios.defaults.params.token)
            .then((response) => {
                commit("DELETE_BILL",ID_HOA_DON)
                resolve(response.data)
            })
            .catch((err) => {
                reject(err)
            })
        })
    },
    //log 

    fetchLogBill({commit})
    {
        return new Promise((resolve,reject) => {
            axios.get('/api/log-hoa-don?api_token='+axios.defaults.params.token)
            .then((response) => {
                commit("SET_LOG",response.data.result)
                resolve(response.data)
            })
            .catch((err) => {
                reject(err)
            })
        })
    }
}