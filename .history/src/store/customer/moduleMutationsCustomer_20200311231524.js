export default {
    SET_CUSTOMER(state,customers)
    {
        state.LIST_CUSTOMER = customers
    },
    ADD_CUSTOMER(state,customer){
        state.LIST_CUSTUMER.push(customer)
    },
    SET_CUSTOMER_SEARCH(state,customer) {
        state.CUSTOMER_SEARCH = customer
    },
    DELETE_CUSTOMER(state,customer)
    {
        const IndexCustomer = state.LIST_CUSTOMER.findIndex((c) => c.UUID_KH == customer.UUID_KH && c.ID_CUA_HANG == customer.ID_CUA_HANG)
        state.LIST_CUSTOMER.splice(IndexCustomer,1)
    },
    SET_TYPE_CUSTOMER(state,LIST_TYPE)
    {
        state.LIST_TYPE = LIST_TYPE
    },
    UPDATE_TYPE_CUSTOMER(state,type_customer)
    {
        const IndexType = state.LIST_TYPE.findIndex((type) => type.ID_PHAN_LOAI == type_customer.ID_PHAN_LOAI);
        Object.assign(state.LIST_TYPE[IndexType], type_customer)
    }
}