import axios from '@/axios'
// import state from './moduleStoreState'
export default {

    fetchStore({commit})
    {
        return new Promise((resolve,reject) => {
            axios.get('/api/stores?api_token='+axios.defaults.params.token).then((response) => {
                commit("SET_STORE",response.data.result)
                resolve(response.data)
            }).catch((error) => {
                reject(error)
            })
        })
    },

    createStore({commit}, store)
    {
        return new Promise((resolve,reject) => {
            const form_store = new FormData()
            form_store.append("ID_LOAI_CUA_HANG",store.ID_LOAI_CUA_HANG)
            form_store.append("TEN_CUA_HANG",store.TEN_CUA_HANG);
            form_store.append( "DIA_CHI_CUA_HANG",store.DIA_CHI_CUA_HANG);
            form_store.append("SDT_CUA_HANG",store.SDT_CUA_HANG);
            form_store.append("GHI_CHU",store.GHI_CHU);
            form_store.append("ID_PROVINCE",store.ID_PROVINCE)
            form_store.append("ID_DISTRICT",store.ID_DISTRICT)
            // form_store.append("OPTION_STORE",JSON.stringify(store.OPTION_STORE))
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
    },
    updateStore({commit},store)
    {
        return new Promise((resolve,reject) => {
            const form_store = new FormData()
            form_store.append("TEN_CUA_HANG",store.TEN_CUA_HANG);
            form_store.append( "DIA_CHI_CUA_HANG",store.DIA_CHI_CUA_HANG);
            form_store.append("SDT_CUA_HANG",store.SDT_CUA_HANG);
            form_store.append("GHI_CHU",store.GHI_CHU);
            form_store.append("ID_PROVINCE",store.ID_PROVINCE)
            form_store.append("ID_DISTRICT",store.ID_DISTRICT)
            // form_store.append("OPTION_STORE",JSON.stringify(store.OPTION_STORE))
            axios.post('/api/store/'+store.ID_CUA_HANG+'/update?api_token='+axios.defaults.params.token,form_store).then((response) => {
                if(response.data.success == true)
                {
                    commit("UPDATE_STORE",store)
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
                    status: 500
                })
            })
        })
    },
    // manager
    fetchManagerStore({commit},ID_CUA_HANG)
    {
        return new Promise((resolve,reject) => {
            axios.get('/api/manager_store?ID_CUA_HANG='+ID_CUA_HANG+'&api_token='+axios.defaults.params.token).then((response) => {
                if(response.data.success == true)
                {
                    commit("SET_MANAGER",response.data.result)
                    resolve(response.data.message)
                }
                else
                {
                    reject(response.data)
                }
            })
        })
    },
    createManagerStore({commit},data)
    {
        return new Promise((resolve,reject) => {
            console.log(data)
            data.array_user.forEach((user) => {
                
                const form_manager = new FormData();
                form_manager.append("ID_USER",user.ID_USER)
                form_manager.append("ID_CUA_HANG",data.id_cua_hang)
                axios.post('/api/manager_store?api_token='+axios.defaults.params.token,form_manager).then((response) => {
                    if(response.data.success == true)
                    {
                        commit("ADD_MANAGER",{
                            ID_CUA_HANG: data.id_cua_hang,
                            USER: user
                        })
                        resolve(response.data)
                    }
                    else
                    {
                        resolve(response.data)
                    }

                }).catch((error) => {
                    reject({
                        success: false,
                        message: 'Lỗi server',
                        result: error,
                        status: 500
                    })
                })
            })
        })
    },
    REMOVE_MANAGER({commit},data)
    {
        return new Promise((resolve,reject) => {
            axios.post('/api/manager_store/'+data.ID_CUA_HANG+'/'+data.ID_USER+'/delete?api_token='+axios.defaults.params.token).then((response) => {
                if(response.data.success == true)
                {
                    commit("REMOVE_MANAGER",data)
                    resolve(response.data)
                }
                else
                {
                    reject(response.data)
                }
            }).catch((error) => {
                reject({
                    success: false,
                    message: 'Lỗi Server !',
                    result: error,
                    status: 500
                })
            })
        })
    },


    //type store

    fetchTypeStore({commit})
    {
        return new Promise((resolve,reject) => {
            axios.get('/api/type-store?api_token='+axios.defaults.params.token)
            .then((response) => {
                commit("SET_TYPE_STORE",response.data.result)
                resolve(response.data)
            })
            .catch((err) => {
                reject(err)
            })
        })
    },

    //seting point
    createPoint({commit},setting)
    {
        return new Promise((resolve,reject) => {
            const form_point = new FormData();
            form_point.append("ID_CUA_HANG",setting.ID_CUA_HANG)
            form_point.append("SO_DIEM",setting.SO_DIEM)
            form_point.append("SO_TIEN",setting.SO_TIEN)
            axios.post('/api/cai-dat-diem?api_token='+axios.defaults.params.token,form_point)
            .then((response) => {
                if(response.data.success == true)
                {
                    commit("SET_POINT",response.data.result)

                }
                resolve(response.data)
            })
            .catch((err) => {
                reject(err)
            })
        })
    }
}