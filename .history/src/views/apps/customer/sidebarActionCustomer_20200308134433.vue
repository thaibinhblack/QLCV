<template>
  <vs-sidebar @keyup.esc="isSidebarActiveLocal = false" click-not-close position-right parent="body" default-index="1" color="primary" class="add-new-data-sidebar items-no-padding" spacer v-model="isSidebarActiveLocal">
    <div class="mt-6 flex items-center justify-between px-6">
        <h4>{{ Object.entries(this.data).length === 0 ? "THÊM MỚI" : "CẬP NHẬT" }} KHÁCH HÀNG</h4>
        <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>
    <VuePerfectScrollbar class="scroll-area--data-list-add-new" :settings="settings">
      {{customer}}
        <div class="p-6">
          <v-select class="select-store w-full" placeholder="Chọn cửa hàng" v-model="selected_store" :options="stores" value="ID_CUA_HANG"  label="TEN_CUA_HANG"  ></v-select><br />
          <!-- {{selected_store}} -->
          <vs-input label="Số điện thoại khách hàng" v-model="customer.SDT_KH" class="mt-5 w-full" name="SDT_KH" v-validate="'required'" @change="SearchCustomerSDT" />
          <span class="text-danger text-sm" v-show="errors.has('SDT_KH')">{{ errors.has('SDT_KH') == true ? 'Chưa nhập số điện thoại khách hàng' : '' }}</span>
          <!-- <v-select v-model="customer.ID_CUA_HANG" :options="LIST_STORE" :reduce="store => store.ID_CUA_HANG" label="TEN_CUA_HANG" /> -->
          <vs-input label="Tên khách hàng" v-model="customer.TEN_KH" class="mt-5 w-full" name="TEN_KH" v-validate="'required'" />
          <span class="text-danger text-sm" v-show="errors.has('TEN_KH')">{{ errors.has('TEN_KH') == true ? 'Chưa nhập tên khách hàng' : '' }}</span>
          <vs-input type="date" label="NGÀY SINH" v-model="customer.NGAY_SINH_KH" class="mt-5 w-full" name="NGAY_SINH_KH" v-validate="'required'" />
          <span class="text-danger text-sm" v-show="errors.has('NGAY_SINH_KH')">{{ errors.has('NGAY_SINH_KH') == true ? 'Chưa nhập ngày sinh khách hàng' : '' }}</span>
        
          <p class="text-sm" style="margin-top: 15px;">TỈNH / THÀNH PHỐ</p>
          <v-select v-model="selected_province" :options="LIST_PROVINCE" label="NAME_PROVINCE" />
          <p class="text-sm" style="margin-top: 15px;">QUẬN / HUYỆN</p>
          <v-select v-model="selected_district" :options="LIST_DISTRICT" label="NAME_DISTRICT" />
        <vs-textarea label="Địa chỉ" v-model="customer.DC_NHA_KH" class="mt-5 w-full" name="MO_TA_SAN_PHAM" placeholder="Nhập địa chỉ khách hàng"  />    
        </div>
    </VuePerfectScrollbar>
    <div class="flex flex-wrap items-center p-6" slot="footer">
      <vs-button class="mr-6" @click="submitCustomer" :disabled="!isFormValid">{{Object.entries(this.data).length === 0 ? "THÊM MỚI": "CẬP NHẬT"}}</vs-button>
      <vs-button type="border" color="danger" @click="isSidebarActiveLocal = false">Cancel</vs-button>
    </div>
  </vs-sidebar>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import {mapGetters} from 'vuex'

export default {
    components:
    {
      VuePerfectScrollbar
    },
   props: {
     isSidebarActive: {
       type: Boolean,
       required: true
     },
    data: {
      type: Object,
      default: () => {},
    }
  },
  watch: {
    isSidebarActiveLocal(val) {
      if(!val) return
      if(Object.entries(this.data).length === 0) {
        this.initValues()
        this.$validator.reset()
      }else {
        this.customer = this.data
      }
    },
    selected_province(val)
    {
        console.log('watch')
        this.customer.DC_TP_KH = val.ID_PROVINCE
        this.FilterProvince()
    },
    selected_district(val)
    {
      this.customer.DC_QH_KH = val.ID_DISTRICT 
    },
    selected_store(store)
    {
      this.customer.ID_CUA_HANG= store.ID_CUA_HANG
    }
  },
  computed: {
    ...mapGetters(["LIST_PROVINCE", "LIST_DISTRICT"]),
    isFormValid() {
      return !this.errors.any()
    },
    isSidebarActiveLocal:{
      get()
      {
        return this.isSidebarActive
      },
      set(val)
      {
        this.$emit('closeSidebar',val)
        this.initValues() 
      }
    },
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
      customer: {
        ID_CUA_HANG: 1,
        TEN_KH: "",
        NGAY_SINH_KH:0,
        SDT_KH: 0,
        GT_KH: "",
        NOI_DUNG_SAN_PHAM: "",
        HINH_ANH_DAI_DIEN: null
      },
      files: [],
      selected_province: {},
      selected_store: null,
      selected_district: null
    }
  },
  methods: {
    initValues() {
        this.customer = {
        TEN_KH: "",
        NGAY_SINH_KH:0,
        SDT_KH: 0,
        GT_KH: "",
        NOI_DUNG_SAN_PHAM: "",
        HINH_ANH_DAI_DIEN: null
      }
      this.image_customer = null
    },

    submitCustomer(){
      this.$store.dispatch('createCustomer',this.customer).then((response) => {
          if(response.success == true)
            {
              // this.initValue()
              this.$vs.notify({
                  title: 'TẠO KHÁCH HÀNG',
                  text:response.message,
                  position: 'bottom-left',
                  color:'success'
              })
            }
            else
            {
              this.$vs.notify({
                title: 'TẠO KHÁCH HÀNG',
                text:response.message,
                position: 'bottom-left',
                color:'warning'
              })
            }
          })
          .catch(() => {
            this.$vs.notify({
                title: 'TẠO KHÁCH HÀNG',
                text:'Lỗi server!',
                position: 'bottom-left',
                color:'danger'
            })
          })
    },
    FilterProvince()
    {
        this.$store.dispatch('fetchDistrict',this.customer.DC_TP_KH).then((response) => {
          console.log('district',response)
        })  
    },
    SearchCustomerSDT()
    {
      this.$store.dispatch('fetchCustomerBySDT',this.customer.SDT_KH).then((response) => {
        console.log(response)
          // response.result[0].NGAY_SINH_KH = new Date(response.result[0].NGAY_SINH_KH)
          this.selected_province = this.LIST_PROVINCE.filter((value,index,array) => {
            return array[index].ID_PROVINCE == response.result.DC_TP_KH
          })[0]
          this.customer = response.result
          this.customer.ID_CUA_HANG = this.selected_store.ID_CUA_HANG
        })
    }
  },
  created()
  {
    this.$store.dispatch('fetchProvince')
  }
}
</script>


<style lang="scss" scoped>
.card-image-customer {
  width: 150px;
  height: 200px;
  margin: auto;
  margin-bottom: 15px;
  position: relative;
}
.input-file, .Imagecustomer {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 999;
  opacity: 0;
}
.Imagecustomer {z-index: 998;opacity: 1;height: auto;}
.icon-upload-file {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 997;
  transform: translate(-50%,-50%)
}
.add-new-data-sidebar {
  ::v-deep .vs-sidebar--background {
    z-index: 52010;
  }

  ::v-deep .vs-sidebar {
    z-index: 52010;
    width: 600px;
    max-width: 90vw;

    .img-upload {
      margin-top: 2rem;

      .con-img-upload {
        padding: 0;
      }

      .con-input-upload {
        width: 100%;
        margin: 0;
      }
    }
  }
}

.scroll-area--data-list-add-new {
    height: calc(100% - 4.3rem);
}
</style>