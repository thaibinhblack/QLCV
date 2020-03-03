import axios from '@/axios'
export default {
    fetchSetting({commit},type)
    {
        return new Promise((resolve,reject) => {
            axios.get('/api/setting?type='+type+'&api_token='+axios.defaults.params.token)
            .then((response) => {
                resolve(response.data)
                commit("SET_SETTING",response.data.result)
            })
            .catch((err) => {
                reject(err)
            })
        })
    },
    createSetting({commit},setting) {
        return new Promise((resolve,reject) => {
            const form_setting = new FormData()
            form_setting.append("VALUE_SETTING",JSON.stringify(setting.value_setting))
            axios.post('/api/setting?type='+setting.type_setting+'&api_token='+axios.defaults.params.token,form_setting).then((response) => {
                commit("UPDATE_SETTING",setting)
                resolve(response.data)
            })
            .catch((err) =>{
                reject(err)
            })
        })
    }
}