import axios from '@/axios.js'

export default {
    fetchUsers({commit}){
        return new Promise((resolve, reject) => {
            axios.get("/api/users?api_token="+axios.defaults.params.token)
              .then((response) => {
                commit('SET_USERS', response.data.result)
                resolve(response.data)
              })
              .catch((error) => { reject(error) })
          })
    },

    loginSystem({commit},user)
    {
      // console.log('login',user)
      return new Promise((resolve,reject) => {
        const form_login = new FormData();
        form_login.append("USERNAME_USER",user.userDetails.email)
        form_login.append("PASSWORD_USER",user.userDetails.password)
        axios.post('/api/login',form_login).then((response) => {
          if(response.success == true)
          {
            axios.defaults.params.token = response.data.result
            commit("ADD_TOKEN",response.data.result)
          }
          resolve(response.data)
        }).catch(() => {
          reject({
            success: false,
            message: 'Lỗi server!',
            result: null
          })
        })
      })
    },
    checkUser({commit},token)
    {
      return new Promise((resolve,reject) => {
        console.log('token',token)
        axios.get('/api/info?api_token='+token).then((response) => {
          // axios.defaults.params.token = token
          commit("SET_AUTH",response.data.result)
          resolve(response.data)
        }).catch(() => {
          axios.defaults.params.token = null
          commit("SET_AUTH",null)
          reject({
            success: false,
            message: 'User này không tồn tại'
          })
        })
      })
    }
}