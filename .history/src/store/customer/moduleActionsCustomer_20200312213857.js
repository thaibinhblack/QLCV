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
    fetchCustomerStore({commit})
    {
        return new Promise((resolve,reject) => {
            axios.get('/api/customer_ch?api_token='+axios.defaults.params.token)
            .then((response) => {
                commit("SET_CUSTOMER",response.data.result)
                resolve(response.data)
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
                resolve(response.data)
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
                resolve(response.data)
            })
            .catch((err) => {
                reject(err)
            })
        })
    },
    createCustomer({commit},customer)
    {
        return new Promise((resolve, reject) => {
            if(customer.UUID_KH)
            {
                const form_customer = new FormData()
                form_customer.append("ID_CUA_HANG",customer.ID_CUA_HANG)
                form_customer.append("UUID_KH",customer.UUID_KH)
                axios.post('/api/customer_ch?api_token='+axios.defaults.params.token, form_customer)
                .then((response) => {
                    resolve(response.data)
                    // commit("ADD_CUSTOMER",customer)
                })
                .catch((err) => {
                    reject(err)
                })
            }
            else
            {
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
            }
        })
    },
    deleteCustomerStore({commit},customer)
    {
        return new Promise((resolve,reject) => {
            axios.post('/api/customer_ch/'+customer.UUID_KH+'/destroy?ID_CUA_HANG='+customer.ID_CUA_HANG+'&api_token='+axios.defaults.params.token)
            .then((response) => {
                commit("        ",customer)
                resolve(response.data)
            })
            .catch((err) => {
                reject(err)
            })
        })
    },
    //phân loại khách hàng
    fetchPhanLoaiKH({commit})
    {
        return new Promise((resolve,reject) => {
            axios.get('/api/type_customer?api_token='+axios.defaults.params.token)
            .then((response) => {
                resolve(response.data)
                commit("SET_TYPE_CUSTOMER",response.data.result)
            })
            .catch((err) => {
                reject(err)
            })
        })
    },
    createPhanLoaiKH({commit},type_customer)
    {
        return new Promise((resolve,reject) => {
            var form_type_customer = new FormData()
            form_type_customer.append("ID_CUA_HANG",type_customer.ID_CUA_HANG)
            form_type_customer.append("TEN_PHAN_LOAI",type_customer.TEN_PHAN_LOAI)
            form_type_customer.append("SO_TIEN_PHAN_LOAI_MIN",type_customer.SO_TIEN_PHAN_LOAI_MIN)
            form_type_customer.append("SO_TIEN_PHAN_LOAI_MAX",type_customer.SO_TIEN_PHAN_LOAI_MAX)
            form_type_customer.append("GHI_CHU",type_customer.GHI_CHU)
            axios.post('/api/type_customer?api_token='+axios.defaults.params.token,form_type_customer)
            .then((response) => {
                resolve(response.data)
                commit("ADD_TYPE_CUSTOMER",type_customer)
            })
            .catch((err) => {
                reject(err)
            })
        })
    },
    updatePhanLoaiKH({commit},type_customer)
    {
        return new Promise((resolve,reject) => {
            var form_type_customer = new FormData()
            form_type_customer.append("ID_CUA_HANG",type_customer.ID_CUA_HANG)
            form_type_customer.append("TEN_PHAN_LOAI",type_customer.TEN_PHAN_LOAI)
            form_type_customer.append("SO_TIEN_PHAN_LOAI_MIN",type_customer.SO_TIEN_PHAN_LOAI_MIN)
            form_type_customer.append("SO_TIEN_PHAN_LOAI_MAX",type_customer.SO_TIEN_PHAN_LOAI_MAX)
            form_type_customer.append("GHI_CHU",type_customer.GHI_CHU)
            axios.post('/api/type_customer/'+type_customer.ID_PHAN_LOAI+'/update?api_token='+axios.defaults.params.token,form_type_customer)
            .then((response) => {
                resolve(response.data)
                if(response.data.success == true)
                {
                    commit("UPDATE_TYPE_CUSTOMER",type_customer)
                }
               
            })
            .catch((err) => {
                reject(err)
            })
        })
    },
    //khách hàng hệ thống
    fetchCustomerSystem({commit})
    {
        return new Promise((resolve,reject) => {
            axios.get('/api/customer_system?api_token='+axios.defaults.params.token)
            .then((response) => {
                console.log(response.data)
            })
        })
    }
}