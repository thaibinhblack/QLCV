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
            if(product.PROMOTION == true)
            {
                form_product.append("KHUYEN_MAI_SP",1);
                form_product.append("VALUE_SALE",product.VALUE_SALE)
                form_product.append("NGAY_BD_KM",product.NGAY_BD_KM)
                form_product.append("NGAY_KT_KM",product.NGAY_KT_KM)
            }
            axios.post('/api/product?api_token='+axios.defaults.params.token,form_product).then((response) => {
                resolve(response.data)
                if(response.data.success == true)
                {
                    commit("ADD_PRODUCT",product)
                }
            }).catch((error) => {
                reject(error)
            })
        })
    },
    updateProduct({commit},product)
    {
        return new Promise((resolve,reject) => {
            const form_product = new FormData();
            form_product.append("ID_CUA_HANG",product.ID_CUA_HANG);
            form_product.append("TEN_SAN_PHAM",product.TEN_SAN_PHAM);
            form_product.append("GIA_SAN_PHAM",product.GIA_SAN_PHAM);
            form_product.append("SO_LUONG_HT",product.SO_LUONG_HT);
            form_product.append("MO_TA_SAN_PHAM",product.MO_TA_SAN_PHAM);
            form_product.append("NOI_DUNG_SAN_PHAM",product.NOI_DUNG_SAN_PHAM);
            form_product.append("HINH_ANH_DAI_DIEN",product.HINH_ANH_DAI_DIEN);

            axios.post('/api/product/'+product.ID_SAN_PHAM+'/update?api_token='+axios.defaults.params.token,form_product).then((response) => {
                resolve(response.data)
                if(response.data.success == true)
                {
                    commit("ADD_PRODUCT",product)
                }
            }).catch((error) => {
                reject(error)
            })
    },
    deleteProduct({commit},ID_SAN_PHAM)
    {
        return new Promise((resolve,reject) => {
            axios.post('/api/product/'+ID_SAN_PHAM+'/delete?api_token='+axios.defaults.params.token)
            .then((response) => {
                resolve(response.data)
                if(response.data.success == true)
                {
                    commit("DELETE_PRODUCT",ID_SAN_PHAM)
                }
            })
            .catch((err) => {
                reject(err)
            })
        })
    }
}