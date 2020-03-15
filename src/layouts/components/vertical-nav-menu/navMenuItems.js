

export default [

  {
    header: 'stores',
    icon: 'StoreIcon',
    i18n: 'stores',
    items: [
      {
        url: null,
        name: 'CỬA HÀNG',
        icon: 'ShoppingCartIcon',
        i18n: 'store',
        submenu: [
          {
            url: '/apps/stores',
            slug: 'DANH SÁCH CỬA HÀNG',
            name: 'stores',
            i18n: 'listStore'
          },
        ]
      },
      {
        url: null,
        slug: '/apps/product',
        icon: 'PackageIcon',
        name: 'SẢN PHẨM',
        i18n: 'product',
        submenu: [
          {
            url: '/apps/products',
            name: 'DANH SÁCH SẢN PHẨM',
            slug: 'products',
            i18n: 'listProduct',
          },
          {
            url: '/apps/product',
            name: 'THÊM MỚI SẢN PHẨM',
            slug: 'add-product',
            i18n: 'addProduct',
          },
          {
            url: '/apps/type-product',
            name: 'THỂ LOẠI SẢN PHẨM',
            slug: 'type-product',
            i18n: 'typeProduct'
          },
          
          {
            url: '/apps/log-product',
            name: 'LỊCH SỬ SẢN PHẨM',
            slug: 'log-product',
            i18n: 'logProduct'
          },
          
          
        ]
      },
      {
        url: null,
        slug: '/apps/bill',
        icon: 'BookIcon',
        name: 'HÓA ĐƠN',
        i18n: 'bill',
        submenu: [
          {
            url: '/apps/bills',
            name: 'DANH SÁCH HÓA ĐƠN',
            slug: 'Bill',
            i18n: 'listBill',
          },
          {
            url: '/apps/bill',
            name: 'THÊM MỚI HÓA ĐƠN',
            slug: 'add-bill',
            i18n: 'addBill',
          },
          {
            url: '/apps/bill-more',
            name: 'THÊM MỚI HÓA ĐƠN KHÁC',
            slug: 'add-bill-more',
            i18n: 'addBillMore',
          },
          {
            url: '/apps/log-bill',
            name: 'LỊCH SỬ HÓA ĐƠN',
            slug: 'log-bill',
            i18n: 'logBill'
          }
        ]
      },
      {
        url: null,
        slug: '/apps/customer',
        icon: 'BookIcon',
        name: 'KHÁCH HÀNG',
        i18n: 'customer',
        submenu:
        [
          {
            url: '/apps/khach-hang',
            name: 'DANH SÁCH KHÁCH HÀNG',
            slug: 'data-customer',
            i18n: 'listCustomer'
          },
          {
            url: '/apps/phan-loai-khach-hang',
            name: 'PHÂN LOẠI KHÁCH HÀNG',
            slug: 'data-type-customer',
            i18n: 'typeCustomer'
          },
          {
            url: '/apps/khach-hang-he-thong',
            name: 'KHÁCH HÀNG CỦA HỆ THỐNG ECOSY',
            slug: 'dat-customer-ecosy',
            i18n: 'customerSystem'
          },
        ]
      }
    ]
  },
  {
    header: "users",
    icon: "PackageIcon",
    i18n: "userSystem",
    items: [
      {
        url: "/apps/users",
        name: "NHÂN VIÊN",
        slug: "user",
        icon: "UserIcon",
        i18n: "user",
      },
    ]
  },

  {
    header: "customer",
    icon: "PackageIcon",
    i18n: "customerSystem",
    items: [
      {
        url: null,
        name: "KHÁCH HÀNG",
        slug: "user",
        icon: "UserIcon",
        i18n: "customer",
        submenu: [
          {
            url: '/apps/customers',
            name: 'data-customers',
            slug: 'data-customers',
            i18n: 'DANH SÁCH KHÁCH HÀNG',
          },
          
          // {
          //   url: '/apps/buy-data-customer',
          //   name: 'MUA DỮ LIỆU KHÁCH HÀNG',
          //   slug: 'customers',
          //   i18n: 'MUA DỮ LIỆU KHÁCH HÀNG',
          // }
        ]
      },
    ]
  },
  
]

