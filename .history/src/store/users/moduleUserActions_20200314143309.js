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
    },
    submitUser({commit},user)
    {
      return new Promise((resolve,reject) => {
          var form_user = new FormData();
          
          if(user.ID_USER)
          {
            form_user.append("GT_USER",user.GT_USER)
            form_user.append("HO_TEN_USER",user.HO_TEN_USER)
            form_user.append("AVATAR",user.AVATAR)
            form_user.append("BIRTH_DAY",user.BIRTH_DAY)
            form_user.append("SDT_USER",user.SDT_USER)
            form_user.append("DC_USER",user.DC_USER)

            axios.post('/api/user/'+user.ID_USER+'?api_token='+axios.defaults.params.token,form_user)
            .then((response) => {
              resolve(response.data)
              commit("UPDATE_USER",user)
            })
            .catch((err) => {
              reject(err)
            })
          }
          else
          {
            form_user.append("USERNAME_USER",user.USERNAME_USER)
            form_user.append("PASSWORD_USER",user.PASSWORD_USER)
            form_user.append("ID_QUYEN",0)
            form_user.append("GT_USER",user.GT_USER)
            form_user.append("HO_TEN_USER",user.HO_TEN_USER)
            form_user.append("AVATAR",user.AVATAR)
            form_user.append("BIRTH_DAY",user.BIRTH_DAY)
            form_user.append("SDT_USER",user.SDT_USER)
            form_user.append("DC_USER",user.DC_USER)

            axios.post('/api/user?api_token='+axios.defaults.params.token,form_user)
            .then((response) => {
              resolve(response.data)
              commit("UPDATE_USER",user)
            })
            .catch((err) => {
              reject(err)
            })
          }
      })
    },
    //check username
    checkUsername(USERNAME_USER)
    {
      console.log(USERNAME_USER)
      return new Promise((resolve,reject) => {
        axios.get(`/api/check-username?USERNAME=${USERNAME_USER}`).then((response) => {
          resolve(response.data)
        })
        .catch((err) => {
          reject(err)
        })
      })
    }
}