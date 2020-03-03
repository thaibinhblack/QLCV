import  axios from '@/axios.js'
export default {

    fetchProduct({commit})
    {
        return new Promise((resolve,reject) => {
            axios.get('/api/products?api_token='+axios.defaults.params.token)
            .then((response) => {
                commit("SET_PRODUCT",response.data.result)
                resolve(response.data)
            })
            .catch((err) => {
                reject(err)
            })
        })
    },
    fetchProductByIDCH({commit},ID_CUA_HANG)
    {
        return new Promise((resolve,reject) => {
            axios.get('/api/products?ID_CUA_HANG='+ID_CUA_HANG+'&api_token='+axios.defaults.params.token)
            .then((response) => {
                commit("SET_PRODUCT",response.data.result)
                resolve(response.data)
            })
            .catch((err) => {
                reject(err)
            })
        })
    },
    createProduct({commit},product) {
        return new Promise((resolve,reject) => {
            const form_product = new FormData();
            form_product.append("ID_CUA_HANG",product.ID_CUA_HANG);
            form_product.append("TEN_SAN_PHAM",product.TEN_SAN_PHAM);
            form_product.append("GIA_SAN_PHAM",product.GIA_SAN_PHAM);
            form_product.append("SO_LUONG_HT",product.SO_LUONG_HT);
            form_product.append("MO_TA_SAN_PHAM",product.MO_TA_SAN_PHAM);
            form_product.append("NOI_DUNG_SAN_PHAM",product.NOI_DUNG_SAN_PHAM);
            form_product.append("HINH_ANH_DAI_DIEN",product.HINH_ANH_DAI_DIEN);
            axios.post('/api/product?api_token='+axios.defaults.params.token,form_product).then((response) => {
                resolve(response.data)
                commit("ADD_PRODUCT",product)
            }).catch((error) => {
                reject(error)
            })
        })
    }
}