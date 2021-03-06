export default {
    LIST_BILL: state => {
        return state.bills
    },
    TOTAL_BILL: state => {
        var total = 0;
        state.bills.forEach((bill) => {
            total = total + (bill.GIA_SAN_PHAM * bill.SO_LUONG)
        })
        return total;
    },
    BILLS: state => {
        return state.LIST_BILL
    },
    LIST_LOG: state => {
        return state.LOGS
    },
    SETTING_BILL: state => {
        return state.SETTING_BILL
    }
}