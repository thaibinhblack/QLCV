export default {
    SET_USERS(state,users)
    {   
        state.users = users
    },
    ADD_TOKEN(state,token)
    {
        state.token = token
    },
    SET_AUTH(state,auth)
    {
        state.auth = auth
    },
    UPDATE_USER(state,user)
    {
        const userIndex = state.users.findIndex((u) => u.ID_USER == user.ID_USER)
        Object.assign(state.users[userIndex], user)
    }
}