/*=========================================================================================
  File Name: store.js
  Description: Vuex store
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import Vuex from 'vuex'

import state from "./state"
import getters from "./getters"
import mutations from "./mutations"
import actions from "./actions"

Vue.use(Vuex)

import moduleAuth from './auth/moduleAuth.js'
import moduleECommerce from './eCommerce/moduleECommerce.js'
import moduleUser from './users/moduleUser.js'
import moduleStore from './store/moduleStore.js'
import moduleProduct from './product/moduleProduct.js'
import moduleSetting from './setting/moduleSetting'
export default new Vuex.Store({
    getters,
    mutations,
    state,
    actions,
    modules: {
        // todo: moduleTodo,
        // calendar: moduleCalendar,
        // chat: moduleChat,
        // email: moduleEmail,
        auth: moduleAuth,
        eCommerce: moduleECommerce,
        user: moduleUser,
        store: moduleStore,
        product: moduleProduct,
        setting: moduleSetting
    },
    strict: process.env.NODE_ENV !== 'production'
})
