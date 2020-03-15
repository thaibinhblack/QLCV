import Vue from 'vue'
import Vuex from 'vuex'

import state from "./state"
import getters from "./getters"
import mutations from "./mutations"
import actions from "./actions"

Vue.use(Vuex)

import moduleUser from './users/moduleUser.js'
import moduleStore from './store/moduleStore.js'
import moduleProduct from './product/moduleProduct.js'
import moduleSetting from './setting/moduleSetting'
import moduleCustomer from './customer/moduleCustomer'
import moduleLocation from './location/moduleLocation'
import moduleBill from  './bill/moduleBill'
export default new Vuex.Store({
    getters,
    mutations,
    state,
    actions,
    modules: {
        user: moduleUser,
        store: moduleStore,
        product: moduleProduct,
        setting: moduleSetting,
        customer: moduleCustomer,
        location: moduleLocation,
        bill: moduleBill
    },
    strict: process.env.NODE_ENV !== 'production'
})
