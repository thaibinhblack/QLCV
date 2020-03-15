
import Vue from 'vue'
import App from './App.vue'

// Vuesax Component Framework
import Vuesax from 'vuesax'
import 'material-icons/iconfont/material-icons.css' //Material Icons
import 'vuesax/dist/vuesax.css'; // Vuesax
import VueCookies from 'vue-cookies'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
import Vue2Editor from "vue2-editor";

Vue.use(Vue2Editor);
Vue.component('v-select', vSelect)
Vue.use(Vuesax)

Vue.use(VueCookies)

// set default config
Vue.$cookies.config('7d')

// // set global cookie
// Vue.$cookies.set('theme','default');
// Vue.$cookies.set('hover-time','1s');

// axios
import axios from "./axios.js"
Vue.prototype.$http = axios

// Theme Configurations
import '../themeConfig.js'
// ACL
import acl from './acl/acl'

// Globally Registered Components


// Styles: SCSS
import './assets/scss/main.scss'


// Tailwind
import '@/assets/css/main.css'


// Vue Router
import router from './router'


// Vuex Store
import store from './store/store'


// i18n
import i18n from './i18n/i18n'


// Vuejs - Vue wrapper for hammerjs
import { VueHammer } from 'vue2-hammer'
Vue.use(VueHammer)

// VeeValidate
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);



// Feather font icon
import './globalComponents.js'

require('./assets/css/iconfont.css')



Vue.config.productionTip = false

new Vue({
    router,
    store,
    acl,
    i18n,
    render: h => h(App)
}).$mount('#app')
