import store from '@/store/store'
export default {
    ADD_BILLS: (state,bill) =>
    {
        state.LIST_BILL.push(bill)
        store.state.product.products.forEach((product) => {
            bill.VALUE_HOA_DON.forEach((product_bill) => {
                if(product.ID_SAN_PHAM == product_bill.ID_SAN_PHAM)
                {
                    product.SO_LUONG_HT = product.SO_LUONG_HT - product_bill.SO_LUONG
                }
            })
        })
    },
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
        
    },
    REMOVE_BILL: (state,ID_SAN_PHAM) => {
        
        const IndexBill = state.bills.findIndex((bill) => 
            bill.ID_SAN_PHAM == ID_SAN_PHAM
        )
    //     const ItemIndex = state.products.findIndex((p) => p.id == itemId)
    //   state.products.splice(ItemIndex, 1)
        // console.log('REMOVE',IndexBill,ID_SAN_PHAM)
        state.bills.splice(IndexBill,1)
        if(state.bills == null)
        {
            state.bills = []
        }
    }
}