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
            <li style="width: 30%;">{{bill.TEN_SAN_PHAM}}</li>
            <li>{{bill.GIA_SAN_PHAM.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}}</li>
            <li style="width: 10%;">{{bill.SO_LUONG}}</li>
            <li>{{(bill.SO_LUONG * bill.GIA_SAN_PHAM).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}} vnđ</li>
          </ul>

          <ul class="list-point">
            <li>
              <button class="w-full" @click="bill_more = !bill_more">Đổi điểm / giảm giá   <vs-icon class="icon-right" :icon="bill_more == false ? 'keyboard_arrow_down' : 'keyboard_arrow_up'"></vs-icon></button>
              <ul class="list-child" :class="{active: bill_more}">
                <li><vs-input class="w-full" min="0" :max="selected_customer.DIEM_TICH_LUY" v-model="more.DOI_DIEM" type="number" label="Đổi điểm thưởng"></vs-input></li>
                <li><vs-input class="w-full" label="Giảm giá (%)" v-model="more.GIAM_GIA"></vs-input></li>
              </ul>
            </li>
          </ul>

          <ul class="total">
              <li>
                <small><strong>*Ghi chú</strong>  - {{SETTING_POINT.SO_TIEN == 0 ? 'Chưa có cài đặt điểm tích lũy!' : (SETTING_POINT.SO_TIEN).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + 'VNĐ = '}}   {{SETTING_POINT.SO_TIEN == 0 ? '' : SETTING_POINT.SO_DIEM}}</small>
                <br />
                <small>- {{SETTING_POINT.DOI_TIEN == 0 ? 'Chưa cài đặt đổi điểm thành tiền': (SETTING_POINT.DOI_TIEN).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + 'VNĐ / 1 điểm '}}</small>
                </li>
              <li  style="width: 35%;">Tích lũy điểm </li>
            
              <li  style="width: 65%;" class="right">{{((SETTING_POINT.SO_TIEN == 0 ? 0 :TOTAL_BILL/SETTING_POINT.SO_TIEN)*SETTING_POINT.SO_DIEM).toFixed(0)}}</li>
              <li style="width: 35%;">Thành tiền</li>
              <!-- {{(more.DOI_DIEM * SETTING_POINT.DOI_TIEN)}} -->
              <li class="right"  style="width: 65%;"> 
                <span class="money" :class="{active: more.GIAM_GIA > 0 || more.DOI_DIEM > 0}">{{TOTAL_BILL.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}} vnđ</span>
                <span class="money" style="margin-left: 5px;" v-if="more.GIAM_GIA > 0 || more.DOI_DIEM > 0">{{
                  ((TOTAL_BILL - ((TOTAL_BILL/100)*more.GIAM_GIA) - (more.DOI_DIEM * SETTING_POINT.DOI_TIEN) ).toFixed(2))
                  .toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}} vnđ</span>  
              </li>
              <li  style="width: 1005%;" v-if="(TOTAL_BILL - ((TOTAL_BILL/100)*more.GIAM_GIA) - (more.DOI_DIEM * SETTING_POINT.DOI_TIEN) ) < 0">
                <span class="text-danger text-sm" >Số tiền hóa đơn thấp hơn so với quy định!</span>
              </li>
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
    ...mapGetters(["LIST_PRODUCT", "LIST_CUSTOMER", "SETTING_POINT"]),
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
      sidebarData: {},
      isSidebarActive: false,
      selected_customer: {},
      selected_store: null,
      LIST_CUSTOMER_LOCAL: [],
      more: {
        DOI_DIEM: 0,
        GIAM_GIA: 0
      },
      bill_more: false
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
        this.$store.dispatch('fetchPoint',store.ID_CUA_HANG)
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
        BILL_MORE: true,
        DOI_DIEM: this.more.DOI_DIEM,
        GIAM_GIA: this.more.GIAM_GIA,
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
.icon-right {float: right}
.mr-5 {margin-right: 5px !important;}
.select-store {width: 250px;}
.scroll-product {
  width: 100%;
}
.list-product,.list-bill,.total {width:  100%;}
.total {margin-top: 25px;}
.list-product>li,.list-bill>li,.total>li{display: inline-block; width: 25%; padding: 10px 10px 0 0;}
.total>li {width: 50%;text-align: left}
.total>li:first-child {width: 100%;}
.total>li:last-child,.total>li.right {text-align: right}
.section-product,.section-bill,.bg-white{background: #fff;}
.section-bill  {border-radius: 5px;}
.btn-tt {margin-top: 15px;}
.list-point {margin-top: 10px;}
.list-point>li {cursor: pointer;padding: 10px 5px;background:  #e2e2e2;}
.list-point>li>ul>li {padding: 10px 0;}
.list-child {display: none;}
.list-child.active {display: block;}
.list-point>li>button {background: transparent;border: none;outline: none;text-align: left; cursor: pointer;}
.money.active {text-decoration: line-through}
</style>