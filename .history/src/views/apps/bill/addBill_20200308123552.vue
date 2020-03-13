<template>
<vs-row vs-w="12">
  <setting-bill class="po-ab"/>
  <sidebar-setting />
  <vs-col class="p-6" vs-type="flex" vs-justify="left" vs-align="left" vs-lg="7" vs-sm="12" vs-xs="12" >
      <v-select class="select-store" placeholder="Chọn cửa hàng" v-model="selected_store" :options="stores" value="ID_CUA_HANG"  label="TEN_CUA_HANG"  ></v-select><br />  </vs-col>
  <vs-col class="p-6" vs-type="flex" vs-justify="center" vs-align="center" vs-lg="5" vs-sm="12" vs-xs="12" >
    <v-select class="select-store" placeholder="Chọn khách hàng" v-model="selected_customer" :options="LIST_CUSTOMER" value="UUID_KH"  label="SDT_KH" >
    </v-select>
    <vs-button style="margin-left: 5px;" @click="isSidebarActive = true">Thêm mới</vs-button>
  </vs-col>
  <vs-col class="p-6" vs-justify="left" vs-align="left" vs-lg="7" vs-sm="12" vs-xs="12" >
   <div class="section-product p-6">
      <span v-if="LIST_PRODUCT.length == 0">Chưa có sản phẩm!</span>
      <item-product v-for="(product,index) in LIST_PRODUCT" :key="index" :product="product"></item-product>
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
              <!-- {{more.DOI_DIEM}} -->
              <li  style="width: 65%;" class="right">{{DIEM_TICH_LUY}}</li>
              <li style="width: 35%;">Thành tiền</li>
              <!-- {{(more.DOI_DIEM * SETTING_POINT.DOI_TIEN)}} -->
              <li class="right"  style="width: 65%;"> 
                <span class="money" :class="{active: more.GIAM_GIA > 0 || more.DOI_DIEM > 0}">{{(TOTAL_BILL).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}} vnđ</span>
                <span class="money" style="margin-left: 5px;" v-if="more.GIAM_GIA > 0 || more.DOI_DIEM > 0">{{
                  (TOTAL_BILL_SALE.toFixed(2))
                  .toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}} vnđ</span>  
              </li>
              <li  style="width: 100%;" v-if="TOTAL_BILL_SALE < 0">
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
    ...mapGetters(["LIST_PRODUCT", "LIST_CUSTOMER", "LIST_BILL", "SETTING_POINT"]),
    stores: {
      get()
      {
          return this.$store.state.store.stores
          
      },
    },
    TOTAL_BILL_SALE()
    {
      var total = 0;
      this.LIST_BILL.forEach((bill) => {
        total = total + ( parseInt(bill.SO_LUONG) * parseInt( bill.GIA_SAN_PHAM))
      })
     
      if(this.more.GIAM_GIA > 0 || this.more.DOI_DIEM > 0)
      {
        
        total = (total - ((total/100)*this.more.GIAM_GIA) - (this.more.DOI_DIEM * this.SETTING_POINT.DOI_TIEN) ) 
      }
      return total;
    },
    TOTAL_BILL()
    {
      var total = 0;
      this.LIST_BILL.forEach((bill) => {
        total = total + ( parseInt(bill.SO_LUONG) * parseInt( bill.GIA_SAN_PHAM))
      })
      return total;
    },  
    DIEM_TICH_LUY()
    {
      return ((this.SETTING_POINT.SO_TIEN == 0 ? 0 : this.TOTAL_BILL/this.SETTING_POINT.SO_TIEN)*this.SETTING_POINT.SO_DIEM).toFixed(0)
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
      sidebarData: {},
      isSidebarActive: false,
      more: {
        DOI_DIEM: 0,
        GIAM_GIA: 0
      },
       bill_more: false
    }
  },
  watch:
  {
    selected_store(store)
    {
      this.selected_customer = null
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
        TONG_TIEN: this.TOTAL_BILL,
        TONG_TIEN_SAU_KHI_GIAM: this.TOTAL_BILL_SALE,
        BILL_MORE: false,
        DOI_DIEM: this.more.DOI_DIEM,
        GIAM_GIA: this.more.GIAM_GIA,
        DIEM_TICH_LUY: this.DIEM_TICH_LUY
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
     this.$store.dispatch("fetchStore").then((response) => {
      //  console.log(response)
       this.selected_store = response.result[0]
     })
  }
}
</script>


<style>
.icon-right {float: right}
.mr-5 {margin-right: 5px !important;}
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