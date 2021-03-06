

export default [

  {
    url: null,
    name: "Dashboard",
    tag: "2",
    tagColor: "warning",
    icon: "HomeIcon",
    i18n: "Thống kê",
    submenu: [
      {
        url: '/dashboard/analytics',
        name: "Analytics",
        slug: "dashboard-analytics",
        i18n: "Analytics",
      },
      {
        url: '/dashboard/ecommerce',
        name: "eCommerce",
        slug: "dashboard-ecommerce",
        i18n: "eCommerce",
      },
    ]
  },
  {
    header: 'stores',
    icon: 'StoreIcon',
    i18n: 'CỬA HÀNG HỆ THỐNG',
    items: [
      {
        url: null,
        name: 'store',
        icon: 'ShoppingCartIcon',
        i18n: 'CỬA HÀNG',
        submenu: [
          {
            url: '/apps/stores',
            slug: 'stores',
            name: 'stores',
            i18n: 'DANH SÁCH CH'
          },
          {
            url: '/apps/setting-store',
            slug: 'setting-store',
            name: 'setting-store',
            i18n: 'CÀI ĐẶT'
          }
        ]
      },
      {
        url: 'app/kho',
        slug: 'scooter-kho',
        icon: 'CheckSquareIcon',
        name: 'kho',
        i18n: 'KHO CỦA CỬA HÀNG'
      },
      {
        url: null,
        slug: '/apps/product',
        icon: 'PackageIcon',
        name: 'product',
        i18n: 'SẢN PHẨM',
        submenu: [
          {
            url: '/apps/products',
            name: 'products',
            slug: 'products',
            i18n: 'DANH SÁCH SẢN PHẨM',
          },
          {
            url: '/apps/product',
            name: 'add-product',
            slug: 'add-product',
            i18n: 'THÊM MỚI SẢN PHẨM',
          },
          {
            url: '/apps/type-product',
            name: 'type-product',
            slug: 'type-product',
            i18n: 'THỂ LOẠI'
          },
          
        ]
      },
      {
        url: null,
        slug: '/apps/bill',
        icon: 'NoteIcon',
        name: 'bill',
        i18n: 'HÓA ĐƠN',
        submenu: [
          {
            url: '/apps/bills',
            name: 'Bills',
            slug: 'Bill',
            i18n: 'DANH HÓA ĐƠN',
          },
          {
            url: '/apps/bill',
            name: 'add-bill',
            slug: 'add-bill',
            i18n: 'THÊM MỚI HÓA ĐƠN',
          },
        ]
      }
    ]
  },
  {
    header: "users",
    icon: "PackageIcon",
    i18n: "Nhân viên hệ thống",
    items: [
      {
        url: "/apps/users",
        name: "User",
        slug: "user",
        icon: "UserIcon",
        i18n: "Nhân viên",
      },
    ]
  },

  {
    header: "customer",
    icon: "PackageIcon",
    i18n: "Khách hàng của hệ thống",
    items: [
      {
        url: null,
        name: "User",
        slug: "user",
        icon: "UserIcon",
        i18n: "Khách hàng",
        submenu: [
          {
            url: '/apps/customers',
            name: 'customers',
            slug: 'customers',
            i18n: 'DANH SÁCH KHÁCH HÀNG',
          },
          
          {
            url: '/apps/buy-data-customer',
            name: 'customers',
            slug: 'customers',
            i18n: 'MUA DỮ LIỆU KHÁCH HÀNG',
          }
        ]
      },
    ]
  },
  
]

