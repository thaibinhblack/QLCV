<template>
<vs-row vs-w="12">
  <setting-bill class="po-ab"/>
  <sidebar-setting />
  <vs-col class="p-6" vs-type="flex" vs-justify="left" vs-align="left" vs-lg="7" vs-sm="12" vs-xs="12" >
      <v-select class="select-store" placeholder="Chọn cửa hàng" v-model="selected_store" :options="stores" value="ID_CUA_HANG"  label="TEN_CUA_HANG"  ></v-select><br />
      <!-- <vs-button style="margin-left: 5px;">Cài đặt điểm</vs-button> -->
  </vs-col>
  <vs-col class="p-6" vs-type="flex" vs-justify="center" vs-align="center" vs-lg="5" vs-sm="12" vs-xs="12" >
    <v-select class="select-store" placeholder="Chọn khách hàng" v-model="selected_customer" :options="LIST_CUSTOMER_LOCAL" value="UUID_KH"  label="SDT_KH" >
    </v-select>
    <vs-button style="margin-left: 5px;" @click="isSidebarActive = true">Thêm mới</vs-button>
  </vs-col>
  
  <vs-col class="p-6" vs-justify="left" vs-align="left" vs-lg="7" vs-sm="12" vs-xs="12" >
   <div class="section-product p-6">
      
      <span v-if="selected_store == null">Chưa chọn cửa hàng!</span>
      <div v-else class="layout-product">
        <vs-button @click="addProduct()">Thêm mới sản phẩm</vs-button>
        <vs-row vs-w="12" v-for="(bill,index) in LIST_BILL" :key="index">
         
                <vs-col vs-justify="left" vs-align="left" vs-lg="5" vs-sm="5" vs-xs="5" >
                    <vs-input v-model="bill.TEN_SAN_PHAM"  class="mt-5 mr-5 w-full" type="text"></vs-input>
                </vs-col>

                <vs-col vs-justify="left" vs-align="left" vs-lg="4" vs-sm="4" vs-xs="4" >
                    <vs-input v-model="bill.GIA_SAN_PHAM"  class="mt-5 mr-5 w-full" type="number"></vs-input>
                </vs-col>
            
                <vs-col vs-justify="left" vs-align="left" vs-lg="2" vs-sm="2" vs-xs="2" >
                    <vs-input min="1" v-model="bill.SO_LUONG"  class="mt-5 mr-5 w-full" type="number"></vs-input>
                </vs-col>

                <vs-col vs-justify="left" vs-align="left" vs-lg="1" vs-sm="1" vs-xs="1" >
                    <vs-button icon="delete" class="mt-5" @click="removeProduct(index)"></vs-button>
                </vs-col>
        </vs-row>
      </div>
   </div>

  </vs-col>
  <vs-col class="p-6" vs-justify="center" vs-align="center" vs-lg="5" vs-sm="12" vs-xs="12" >
    <div class="section-bill bg-white p-6">
           <span v-if="selected_customer == null">Chưa chọn khách hàng!</span>

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
    'sidebar-customer': SidebarCustomer,
    'setting-bill': () => import('./settingBill'),
    'sidebar-setting': () => import('./sidebarSetting')
  },
  computed:
  {
    ...mapGetters(["LIST_PRODUCT", "LIST_CUSTOMER"]),
    stores: {
      get()
      {         
          return this.$store.state.store.stores
          
      },
     
    },
    TOTAL_BILL()
    {
      var total = 0;
      this.LIST_BILL.forEach((bill) => {
        total = total + ( parseInt(bill.SO_LUONG) * parseInt( bill.GIA_SAN_PHAM))
      })
      return total;
    }

  },
  data()
  {
    return {
      settings: { // perfectscrollbar settings
          maxScrollbarLength: 60,
          wheelSpeed: .60,
      },
      LIST_BILL: [
        {
          TEN_SAN_PHAM: '',
          GIA_SAN_PHAM: 1000,
          SO_LUONG: 1
        }
      ],
      number: [],
      setting_point: [
        {LABEL: 'CÀI ĐẶT THEO % HÓA ĐƠN', ID: 'CAI_DAT_THEO_HOA_DON'},
        {LABEL: 'CÀI ĐẶT THEO SỐ TIỀN SỬ DỤNG', ID: 'CAI_DAT_THEO_SO_TIEN'}
      ],
      sidebarData: {},
      isSidebarActive: false,
      selected_customer: {},
      selected_store: null,
      LIST_CUSTOMER_LOCAL: []
    }
  },
  watch:
  {
    stores()
    {
      this.selected_store = this.$store.state.store.stores[0];
    },
    selected_store(store)
    {
      // console.log('watch',store)
     
      this.LIST_CUSTOMER_LOCAL = []
      this.selected_customer = null
      if(store != null)
      {
        this.$store.dispatch('fetchProductByIDCH',store.ID_CUA_HANG)
        this.$store.dispatch('fetchCustomerByIDCH',store.ID_CUA_HANG)
      }
      
    },
    selected_customer()
    {
      this.initValue()
    },
    LIST_CUSTOMER()
    {
      this.LIST_CUSTOMER_LOCAL = this.LIST_CUSTOMER
    }
  },
  methods:
  {
    initValue()
    {
      // this.$store.state.product.LIST_PRODUCT = []
      // this.selected_customer = null
      this.LIST_BILL = [
         {
          TEN_SAN_PHAM: '',
          GIA_SAN_PHAM: 1000,
          SO_LUONG: 1
        }
      ]
    },
    addProduct()
    {
        this.LIST_BILL.push({
            TEN_SAN_PHAM: '',
            GIA_SAN_PHAM: 0,
            SO_LUONG: 1
        })
    },
    removeProduct(index)
    {
        this.LIST_BILL.splice(index,1)
    },
    createBill()
    {
      this.$store.dispatch('createBill',{
        VALUE_HOA_DON: this.LIST_BILL,
        UUID_KH: this.selected_customer.UUID_KH,
        ID_CUA_HANG: this.selected_store.ID_CUA_HANG,
        TONG_TIEN: this.TOTAL_BILL,
        BILL_MORE: true
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
.mr-5 {margin-right: 5px !important;}
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