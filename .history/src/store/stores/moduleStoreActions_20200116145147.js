import axios from '@/axios'

export default {
    createStore({commit}, store)
    {
        return new Promise((resolve,reject) => {
            const form_store = new FormData()
            form_store.append("TEN_CUA_HANG", "DIA_CHI_CUA_HANG", "SDT_CUA_HANG", "GHI_CHU");
            axios.post('/api/store?api_token='+axios.defaults.params.token,form_store).then((response) => {
                if(response.data.success == true)
                {
                   commit("ADD_STORE",response.data.result)
                   resolve(response.data)
                }
                else
                {
                    reject(response.data)
                }
            }).catch((error) => {
                reject({
                    success: false,
                    message: 'Lỗi server',
                    result: error,
                    status: 400
                })
            })
        })
    }
}