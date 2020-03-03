import state from './moduleUserState.js'
import actions from './moduleUserActions.js'
import mutations from './moduleUserMutations.js'

export default {
    isRegistered: false,
    namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters
  }