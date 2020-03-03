export default {
    SET_CUSTOMER(state,customers)
    {
        state.LIST_CUSTOMER = customers
    },
    ADD_CUSTOMER(state,customer){
        state.LIST_CUSTUMER.push(customer)
    }
}