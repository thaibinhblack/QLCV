export default {
    ADD_BILL: (state,bill) => {
        var check_empty = 0;
        state.bills.forEach((bill_store) => {
            if(bill_store.ID_SAN_PHAM == bill.ID_SAN_PHAM)
            {
                check_empty = 1;
                bill_store.SO_LUONG = bill.SO_LUONG
            }
        })
        if(check_empty == 0 || state.bills.length == 0)
        {
            state.bills.push(bill)
        }
        
    }
}