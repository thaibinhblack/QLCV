
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const router = new Router({
    mode: 'history',

    routes: [
        {
            path:'/login',
            component: () => import('@/views/pages/login/Login.vue'),
            meta: {
                rule: 'editor'
            }
           
        },

        {
    // =============================================================================
    // MAIN LAYOUT ROUTES
    // =============================================================================
    
            path: '',
            component: () => import('./layouts/main/Main.vue'),
            children: [
        // =============================================================================
        // Theme Routes
        // =============================================================================
                
                {
                    path: '/',
                    redirect: '/dashboard/analytics'
                },
                //profile
                {
                    path: '/profile',
                    component: () => import('@/views/pages/Profile.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/' },
                            { title: 'Thông tin cá nhân' , active: true },
                        ],
                        pageTitle: 'Thôn tin cá nhân',
                        rule: 'editor'
                    },
                },
                //store
                {
                    path: '/apps/stores',
                    name: 'page-stores',
                    component: () => import('@/views/apps/store/DataStore.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/' },
                            { title: 'Cửa hàng'},
                            { title: 'Danh sách cửa hàng', active: true },
                        ],
                        pageTitle: 'Danh sách cửa hàng',
                        rule: 'editor'
                    },
                },
                {
                    path: '/apps/setting-store',
                    name: 'page-stores',
                    component: () => import('@/views/apps/store/SettingStore.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/' },
                            { title: 'Cửa hàng'},
                            { title: 'CÀI ĐẶT CÁC THÔNG KHÁC CỦA CỬA HÀNG', active: true },
                        ],
                        pageTitle: 'CÀI ĐẶT THÔNG TIN CHO CỬA HÀNG',
                        rule: 'editor'
                    },
                },
                //user
                {
                    path: '/apps/users',
                    name: 'data-list-users',
                    component: () => import('@/views/apps/user/DataListUser.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/' },
                            { title: 'Nhân viên'},
                            { title: 'Danh sách nhân viên', active: true },
                        ],
                        pageTitle: 'Danh sách nhân viên',
                        rule: 'editor'
                    },
                },
                //products
                {
                    path: '/apps/products',
                    name: 'data-list-products',
                    component: () => import('@/views/apps/products/dataProduct.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/' },
                            { title: 'Sản phẩm'},
                            { title: 'Danh sách sản phẩm', active: true },
                        ],
                        pageTitle: 'Danh sách sản phẩm',
                        rule: 'editor'
                    },
                },
                {
                    path: '/apps/product/:id',
                    name: 'info-products',
                    component: () => import('@/views/apps/products/infoProduct.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/' },
                            { title: 'Sản phẩm', url: '/apps/products'},
                            { title: 'Thông tin sản phẩm', active: true },
                        ],
                        pageTitle: 'Danh sách sản phẩm',
                        rule: 'editor'
                    },
                },
                {
                    path: '/apps/product',
                    name: 'add-products',
                    component: () => import('@/views/apps/products/addProduct.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/' },
                            { title: 'Danh sách phẩm', url: '/apps/products'},
                            { title: 'Thêm mới sản phẩm', active: true },
                        ],
                        pageTitle: 'Thêm mới sản phẩm',
                        rule: 'editor'
                    },
                },
                {
                    path: '/apps/log-product',
                    name: 'log-product',
                    component: () => import('@/views/apps/products/logProduct.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/' },
                            { title: 'Danh sách phẩm', url: '/apps/products'},
                            { title: 'Lịch sử sản phẩm', active: true },
                        ],
                        pageTitle: 'Lịch sử hóa đơn',
                        rule: 'editor'
                    },
                },
                {
                    path: '/apps/bills',
                    name: 'Bill',
                    component: () => import('@/views/apps/bill/dataBill.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/' },
                            // { title: 'Hóa đơn', url: '/apps/bills'},
                            { title: 'Danh sách hóa đơn', active: true },
                        ],
                        pageTitle: 'Danh sách sản phẩm',
                        rule: 'editor'
                    },
                },
                {
                    path: '/apps/bill',
                    name: 'add-bill',
                    component: () => import('@/views/apps/bill/addBill.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/' },
                            { title: 'Danh sách hóa đơn', url: '/apps/bills'},
                            { title: 'Thêm mới hóa đơn', active: true },
                        ],
                        pageTitle: 'Danh sách sản phẩm',
                        rule: 'editor'
                    },
                },
                {
                    path: '/apps/bill-more',
                    name: 'add-bill-more',
                    component: () => import('@/views/apps/bill/addBillMore.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/' },
                            { title: 'Danh sách hóa đơn', url: '/apps/bills'},
                            { title: 'Thêm mới hóa đơn', active: true },
                        ],
                        pageTitle: 'Thêm hóa đơn mới',
                        rule: 'editor'
                    },
                },
                {
                    path: '/apps/log-bill',
                    name: 'log-bill',
                    component: () => import('@/views/apps/bill/logBill.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/' },
                            { title: 'Danh sách hóa đơn', url: '/apps/bills'},
                            { title: 'Lịch sử hóa đơn', active: true },
                        ],
                        pageTitle: 'Danh sách lịch sử thao tác hóa đơn',
                        rule: 'editor'
                    },
                },
                {
                    path: '/apps/khach-hang',
                    name: 'DANH SÁCH KHÁCH HÀNG',
                    component: () => import('@/views/apps/customerStore/dataCustomer.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/' },
                            { title: 'Danh sách khách hàng', active: true },
                        ],
                        pageTitle: 'Khách hàng',
                        rule: 'editor'
                    },
                },
                {
                    path: '/apps/phan-loaikhach-hang',
                    name: 'PHÂN LOẠI KHÁCH HÀNG',
                    component: () => import('@/views/apps/customerStore/dataCustomer.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/' },
                            { title: 'Danh sách phân loại khách hàng', active: true },
                        ],
                        pageTitle: 'Phân loại khách hàng',
                        rule: 'editor'
                    },
                },
                {
                    path: '/dashboard/analytics',
                    name: 'dashboard-analytics',
                    component: () => import('./views/DashboardAnalytics.vue'),
                    meta: {
                        rule: 'editor',
                    }
                },
                {
                    path: '/dashboard/ecommerce',
                    name: 'dashboard-ecommerce',
                    component: () => import('./views/DashboardECommerce.vue'),
                    meta: {
                        rule: 'admin'
                    }
                },
                {
                    path: '/apps/customers',
                    name: 'data-customers',
                    component: () => import('@/views/apps/customer/dataCustomer.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/' },
                            { title: 'Danh sách khách hàng của hệ thống', active: true },
                        ],
                        pageTitle: 'Danh sách khách hàng',
                        rule: 'editor'
                    },
                },
                // {
                //     path: '/apps/buy-data-customer',
                //     name: 'data-customers',
                //     component: () => import('@/views/apps/customer/buyDataCustomer.vue'),
                //     meta: {
                //         breadcrumb: [
                //             { title: 'Home', url: '/' },
                //             { title: 'Khách hàng', url: '/apps/customers'},
                //             { title: 'Danh sách dữ liệu khách hàng', active: true },
                //         ],
                //         pageTitle: 'Danh sách dữ liệu khách hàng khách hàng',
                //         rule: 'editor'
                //     },
                // }
    
            ]
        },
        // Redirect to 404 page, if no match found
        {
            path: '*',
            redirect: '/pages/error-404'
        }
    ],
})

router.afterEach(() => {
  // Remove initial loading
    // console.log(router)
    // if(Object.entries(store.state.user.auth).length == 0)
    // {
    //     router.push('/pages/login')
    // }
    // console.log('after router', store)
    const appLoading = document.getElementById('loading-bg')
        if (appLoading) {
            appLoading.style.display = "none";
        }
})

// router.beforeEach((to, from, next) => {
//     axios.get('/api/info?api_token='+axios.defaults.params.token).then((response) => {
//         console.log(response.data)
//         if(response.data.success == false)
//         {
//             console.log('router login')
//             to.path === "/pages/login";
//             router.push("/pages/login")
//             return next();
//         }
//     })
//     // console.log('before router')
//     // firebase.auth().onAuthStateChanged(() => {

//     //     // get firebase current user
//     //     const firebaseCurrentUser = firebase.auth().currentUser

//     //     // if (
//     //     //     to.path === "/pages/login" ||
//     //     //     to.path === "/pages/forgot-password" ||
//     //     //     to.path === "/pages/error-404" ||
//     //     //     to.path === "/pages/error-500" ||
//     //     //     to.path === "/pages/register" ||
//     //     //     to.path === "/callback" ||
//     //     //     to.path === "/pages/comingsoon" ||
//     //     //     (auth.isAuthenticated() || firebaseCurrentUser)
//     //     // ) {
//     //     //     return next();
//     //     // }

//     //     // If auth required, check login. If login fails redirect to login page
//     //     if(to.meta.authRequired) {
//     //       if (!(auth.isAuthenticated() || firebaseCurrentUser)) {
//     //         router.push({ path: '/pages/login', query: { to: to.path } })
//     //       }
//     //     }

//     //     return next()
//     //     // Specify the current path as the customState parameter, meaning it
//     //     // will be returned to the application after auth
//     //     // auth.login({ target: to.path });

//     // });

// });

export default router
