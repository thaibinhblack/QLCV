<template>
<vs-row vs-w="12">

  <vs-col class="p-6" vs-justify="left" vs-align="left" vs-lg="7" vs-sm="12" vs-xs="12" >
   <div class="section-product p-6">
       <vs-button>Thêm mới sản phẩm</vs-button>
        <vs-row vs-w="12">
                <vs-col vs-justify="left" vs-align="left" vs-lg="7" vs-sm="7" vs-xs="7" >
                    <vs-input  class="mt-5 ml-5 w-full" type="text"></vs-input>
                </vs-col>
                <vs-col vs-justify="left" vs-align="left" vs-lg="4" vs-sm="4" vs-xs="4" >
                    <vs-input  class="mt-5 ml-5 w-full" type="number"></vs-input>
                </vs-col>
                <vs-col vs-justify="left" vs-align="left" vs-lg="1" vs-sm="1" vs-xs="1" >
                    <vs-button icon="delete" class="mt-5"></vs-button>
                </vs-col>
        </vs-row>
   </div>

  </vs-col>
  <vs-col class="p-6" vs-justify="center" vs-align="center" vs-lg="5" vs-sm="12" vs-xs="12" >
    <!-- {{LIST_BILL}} -->
    <div class="section-bill bg-white p-6">
           <span v-if="LIST_PRODUCT.length == 0">Chưa chọn khách hàng!</span>

      <div class="selected_customer" v-if="selected_customer != null">
           <vs-input label="Tên khách hàng" disabled v-model="selected_customer.TEN_KH" class="mt-5 w-full" name="TEN_KH" placeholder="Nhập tên cửa hàng" v-validate="'required'" />
          <vs-input label="Số điện thoại" disabled v-model="selected_customer.SDT_KH" class="mt-5 w-full" name="SDT_KH" placeholder="Nhập tên cửa hàng" v-validate="'required'" />
          <vs-input label="Điểm tích lũy" disabled v-model="selected_customer.DIEM_TICH_LUY" class="mt-5 w-full" name="DIEM_TICH_LUY" />

          <ul class="list-bill" v-for="(bill,index) in LIST_BILL" :key="index">
            <li style="width: 35%;">{{bill.TEN_SAN_PHAM}}</li>
            <li>{{bill.GIA_SAN_PHAM.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}}</li>
            <li style="width: 15%;">{{bill.SO_LUONG}}</li>
            <li>{{(bill.SO_LUONG * bill.GIA_SAN_PHAM).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}} vnđ</li>
          </ul>
          <ul class="total">
            <li>Tích lũy điểm</li>
            <li>{{TOTAL_BILL/1000}}</li>
            <li>Thành tiền</li>
            <li> {{TOTAL_BILL.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}} vnđ</li>
          </ul>
          <vs-button class="btn-tt" @click="createBill()">Thanh toán</vs-button>
      </div>
    </div>
  </vs-col>
  <sidebar-customer :isSidebarActive="isSidebarActive" @closeSidebar="isSidebarActive = $event" :data="sidebarData" />
</vs-row>
</template>

<script>
import vSelect from 'vue-select'
import { mapGetters } from 'vuex'
import ItemProduct from './itemProduct'
import SidebarCustomer from '../customer/sidebarActionCustomer'
export default {
  components:
  {
    vSelect,
    'item-product': ItemProduct,
    'sidebar-customer': SidebarCustomer
  },
  computed:
  {
    ...mapGetters(["LIST_PRODUCT", "LIST_CUSTOMER", "LIST_BILL", "TOTAL_BILL"]),
    stores: {
      get()
      {
          return this.$store.state.store.stores
          
      },
    }

  },
  data()
  {
    return {
      settings: { // perfectscrollbar settings
          maxScrollbarLength: 60,
          wheelSpeed: .60,
      },
      selected_store: null,
      selected_customer: null,
      number: [],
      setting_point: [
        {LABEL: 'CÀI ĐẶT THEO % HÓA ĐƠN', ID: 'CAI_DAT_THEO_HOA_DON'},
        {LABEL: 'CÀI ĐẶT THEO SỐ TIỀN SỬ DỤNG', ID: 'CAI_DAT_THEO_SO_TIEN'}
      ],
      sidebarData: {},
      isSidebarActive: false
    }
  },
  watch:
  {
    selected_store(store)
    {
      this.$store.dispatch('fetchProductByIDCH',store.ID_CUA_HANG)
      this.$store.dispatch('fetchCustomerByIDCH',store.ID_CUA_HANG)
    },
    selected_customer()
    {
      this.$store.state.bill.bills = []
    }
  },
  methods:
  {
    initValue()
    {
      this.$store.state.product.LIST_PRODUCT = []
      this.selected_customer = null
    },
    createBill()
    {
      this.$store.dispatch('createBill',{
        VALUE_HOA_DON: this.LIST_BILL,
        UUID_KH: this.selected_customer.UUID_KH,
        ID_CUA_HANG: this.selected_store.ID_CUA_HANG,
        TONG_TIEN: this.TOTAL_BILL
      }).then((response) => {
        if(response.success == true)
        {
          this.initValue()
          this.$vs.notify({
              title: 'TẠO HÓA ĐƠN',
              text:response.message,
              position: 'bottom-left',
              color:'success'
          })
        }
        else
        {
          this.$vs.notify({
            title: 'TẠO HÓA ĐƠN',
            text:response.message,
            position: 'bottom-left',
            color:'warning'
          })
        }
      })
      .catch(() => {
        this.$vs.notify({
            title: 'TẠO HÓA ĐƠN',
            text:'Lỗi server!',
            position: 'bottom-left',
            color:'danger'
        })
      })
    }
  },
  created()
  {
     this.$store.dispatch("fetchStore")
  }
}
</script>

<style>
.select-store {width: 250px;}
.scroll-product {
  width: 100%;
}
.list-product,.list-bill,.total {width:  100%;}
.total {margin-top: 25px;}
.list-product>li,.list-bill>li,.total>li{display: inline-block; width: 25%; padding: 10px 10px 0 0;}
.total>li {width: 50%;}
.total>li:last-child,.total>li:nth-child(2) {text-align: right}
.section-product,.section-bill,.bg-white{background: #fff;}
.section-bill  {border-radius: 5px;}
.btn-tt {margin-top: 15px;}
</style>