export default {
    ADD_BILL: (state,bill) => {
        state.bills.forEach((bill_store) => {
            if(bill_store.ID_SAN_PHAM == bill.ID_SAN_PHAM)
            {
                bill_store.SO_LUONG = bill.SO_LUONG
            }
        })
        state.bills.push(bill)
    }
}