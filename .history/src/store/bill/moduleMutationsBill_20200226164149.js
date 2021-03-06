export default {
    ADD_BILL: (state,bill) => {
        var check_empty = 0;
        state.bills.forEach((bill_store) => {
            if(bill_store.ID_SAN_PHAM == bill.ID_SAN_PHAM)
            {
                check_empty = 1;
                if(bill.SO_LUONG == 0)
                {
                    const IndexBill = state.bills.findIndex((bill_local) => {
                        return bill_local.ID_SAN_PHAM == bill.ID_SAN_PHAM
                    })
                    state.bills.slice(IndexBill,1)
                }
                else
                {
                    bill_store.SO_LUONG = bill.SO_LUONG
                }
            }
        })
        if(check_empty == 0 || state.bills.length == 0)
        {
            state.bills.push(bill)
        }
        
    },
    REMOVE_BILL: (state,ID_SAN_PHAM) => {
        const IndexBill = state.bills.findIndex(bill => {
            bill.ID_SAN_PHAM == ID_SAN_PHAM
        })
        state.bills.slice(IndexBill,1)
    }
}