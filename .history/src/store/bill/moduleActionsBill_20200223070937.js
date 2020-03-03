export default {
    addBill({commit},bill)
    {
        commit("ADD_BILL",bill)
    },
    removeBill({commit},ID_SAN_PHAM)
    {
        commit("REMOVE_BILL", ID_SAN_PHAM)
    }
}