export default {
    LIST_STORE: state => {
        state.OPTION_STORE = JSON.parse(state.OPTION_STORE)
        return state.stores
    },
    LIST_MANAGER: state => {
        return state.managers
    },
    SETTINGS: state => {
        return state.settings
    }
}