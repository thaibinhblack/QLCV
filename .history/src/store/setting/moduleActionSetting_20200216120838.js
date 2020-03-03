import axios from '@/axios'
export default {
    createSetting({commit},setting) {
        return new Promise((resolve,reject) => {
            const form_setting = new FormData()
            form_setting.append("VALUE_SETTING",JSON.stringify(setting.value_setting))
            axios.post('/api/setting-store?type='+setting.type_setting+'&api_token='+axios.defaults.params.token,form_setting).then((response) => {
                commit("UPDATE_SETTING",setting)
                resolve(response.data)
            })
            .catch((err) =>{
                reject(err)
            })
        })
    }
}