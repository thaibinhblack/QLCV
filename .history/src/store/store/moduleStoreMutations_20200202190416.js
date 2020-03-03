export default {

    SET_STORE(state,stores)
    {
        state.stores = stores
    },

    ADD_STORE(state,store)
    {
        state.stores.push(store)
    },

    UPDATE_STORE(state,store)
    {
        const storeIndex = state.stores.findIndex((s) => s.ID_CUA_HANG == store.ID_CUA_HANG)
        Object.assign(state.stores[storeIndex], store)
    },
    /// manager
    SET_MANAGER(state,managers)
    {
        state.managers = managers
    },
    ADD_MANAGER(state,manager)
    {

        state.managers.push(manager.USER)
        state.stores.filter((value,index,array) => {
            if(array[index].ID_CUA_HANG == manager.ID_CUA_HANG)
            {
                console.log(array[index])
                array[index].managers.push(manager.USER)
            }
        })
    },
    REMOVE_MANAGER(state,manager)
    {
        const store = state.stores.filter((value,index,array) => {
            return array[index].ID_CUA_HANG == manager.ID_CUA_HANG
        })[0]
        
        const ItemManagerIndex = store.managers.findIndex((m) => m.ID_USER == manager.ID_USER)
        store.managers.splice(ItemManagerIndex, 1)
        state.stores.filter((value,index,array) => {
            if(array[index].ID_CUA_HANG == store.ID_CUA_HANG)
            {
                array[index] = store
            }
        })
        const ItemManagerActionIndex = state.managers.findIndex((m) => m.ID_USER == manager.ID_USER)
        state.managers.splice(ItemManagerActionIndex,1)
    }
}