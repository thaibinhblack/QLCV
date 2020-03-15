
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
            path:'/register',
            component: () => import('@/views/pages/register/Register.vue'),
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
             {
                    path: '/',
                    redirect: '/login'
                },
                //profile
                //store
                {
                    path: '/apps/stores',
                    name: 'DANH SÁCH CỬA HÀNG',
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
                //user
                {
                    path: '/apps/users',
                    name: 'DANH SÁCH NHÂN VIÊN',
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
                    name: 'DANH SÁCH SẢN PHẨM',
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
                    name: 'THÔNG TIN SẢN PHẨM',
                    component: () => import('@/views/apps/products/infoProduct.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/' },
                            { title: 'Sản phẩm', url: '/apps/products'},
                            { title: 'Thông tin sản phẩm', active: true },
                        ],
                        pageTitle: 'THÔNG TIN SẢN PHẨM',
                        rule: 'editor'
                    },
                },
                {
                    path: '/apps/product',
                    name: 'THÊM MỚI SẢN PHẨM',
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
                    name: 'LỊCH SỬ SẢN PHẨM',
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
                    name: 'DANH SÁCH HÓA ĐƠN',
                    component: () => import('@/views/apps/bill/dataBill.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/' },
                            // { title: 'Hóa đơn', url: '/apps/bills'},
                            { title: 'Danh sách hóa đơn', active: true },
                        ],
                        pageTitle: 'HÓA ĐƠN',
                        rule: 'editor'
                    },
                },
                {
                    path: '/apps/bill',
                    name: 'THÊM MỚI HÓA ĐƠN',
                    component: () => import('@/views/apps/bill/addBill.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/' },
                            { title: 'Danh sách hóa đơn', url: '/apps/bills'},
                            { title: 'Thêm mới hóa đơn', active: true },
                        ],
                        pageTitle: 'HÓA ĐƠN',
                        rule: 'editor'
                    },
                },
                {
                    path: '/apps/bill-more',
                    name: 'THÊM MỚI HÓA ĐƠN KHÁC',
                    component: () => import('@/views/apps/bill/addBillMore.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/' },
                            { title: 'Danh sách hóa đơn', url: '/apps/bills'},
                            { title: 'Thêm mới hóa đơn', active: true },
                        ],
                        pageTitle: 'HÓA ĐƠN',
                        rule: 'editor'
                    },
                },
                {
                    path: '/apps/log-bill',
                    name: 'LỊCH SỬ HÓA ĐƠN',
                    component: () => import('@/views/apps/bill/logBill.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/' },
                            { title: 'Danh sách hóa đơn', url: '/apps/bills'},
                            { title: 'Lịch sử hóa đơn', active: true },
                        ],
                        pageTitle: 'LỊCH SỬ',
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
                    path: '/apps/phan-loai-khach-hang',
                    name: 'PHÂN LOẠI KHÁCH HÀNG',
                    component: () => import('@/views/apps/customerStore/dataTypeCustomers.vue'),
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
                    path: '/apps/khach-hang-he-thong',
                    name: 'KHÁCH HÀNG CỦA HỆ THỐNG',
                    component: () => import('@/views/apps/customerStore/dataCustomersSystem.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/' },
                            { title: 'Danh sách khách hàng của hệ thống', active: true },
                        ],
                        pageTitle: 'Khách hàng hệ thống',
                        rule: 'editor'
                    },
                },

    
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
    const appLoading = document.getElementById('loading-bg')
        if (appLoading) {
            appLoading.style.display = "none";
        }
})



export default router
