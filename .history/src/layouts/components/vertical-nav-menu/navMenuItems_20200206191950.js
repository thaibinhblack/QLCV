

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
            url: 'app/manager-store',
            slug: 'manager-store',
            name: 'manager-store',
            i18n: 'NV QUẢN LÝ'
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
        slug: '/app/product',
        icon: 'PackageIcon',
        name: 'product',
        i18n: 'SẢN PHẨM',
        submenu: [
          {
            url: '/app/products',
            name: 'products',
            slug: 'products',
            i18n: 'DANH SÁCH SP',

          },
          {
            url: 'app/type-product',
            name: 'type-product',
            slug: 'type-product',
            i18n: 'THỂ LOẠI'
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
      {
        url: "/apps/chat",
        name: "Chat",
        slug: "chat",
        icon: "UserIcon",
        i18n: "Chat",
      },
      {
        url: "/apps/todo",
        name: "Todo",
        slug: "todo",
        icon: "CheckSquareIcon",
        i18n: "Todo",
      },
      {
        url: "/apps/calendar/vue-simple-calendar",
        name: "Calendar",
        slug: "calendar-simple-calendar",
        icon: "CalendarIcon",
        tagColor: "success",
        i18n: "Calendar",
      },
      {
        url: null,
        name: "eCommerce",
        icon: "ShoppingCartIcon",
        i18n: "eCommerce",
        submenu: [
          {
            url: '/apps/eCommerce/shop',
            name: "Shop",
            slug: "ecommerce-shop",
            i18n: "Shop",
          },
          {
            url: '/apps/eCommerce/wish-list',
            name: "Wish List",
            slug: "ecommerce-wish-list",
            i18n: "WishList",
          },
          {
            url: '/apps/eCommerce/checkout',
            name: "Checkout",
            slug: "ecommerce-checkout",
            i18n: "Checkout",
          },
        ]
      },
    ]
  },
  
]

