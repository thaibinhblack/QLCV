export default {
    SET_PRODUCT(state,products) {
        state.LIST_PRODUCT = products
    },
    ADD_PRODUCT(state,product){
        state.LIST_PRODUCT.push(product)
    },
    DELETE_PRODUCT(state,ID_SAN_PHAM)
    {
        const IndexProduct = state.LIST_PRODUCT.findIndex((product) => product.ID_SAN_PHAM == ID_SAN_PHAM)
        console.log(ID_SAN_PHAM,IndexProduct)
        state.LIST_PRODUCT.splice(IndexProduct,1)
    }
}