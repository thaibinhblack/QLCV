import state from './moduleUserState.js'
import actions from './moduleUserActions.js'
export default {
    isRegistered: false,
    namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters
  }