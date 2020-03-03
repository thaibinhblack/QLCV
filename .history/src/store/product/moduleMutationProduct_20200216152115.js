export default {
    SET_PRODUCT(state,products) {
        state.LIST_PRODUCT = products
    },
    ADD_PRODUCT(state,product){
        state.LIST_PRODUCT.push(product)
    }
}