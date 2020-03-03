<template>
  <vs-sidebar @keyup.esc="isSidebarActiveLocal = false" click-not-close position-right parent="body" default-index="1" color="primary" class="add-new-data-sidebar items-no-padding" spacer v-model="isSidebarActiveLocal">
    <div class="mt-6 flex items-center justify-between px-6">
      
        <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>
    <VuePerfectScrollbar class="scroll-area--data-list-add-new" :settings="settings">
       
    </VuePerfectScrollbar>
    <div class="flex flex-wrap items-center p-6" slot="footer">
    
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
        console.log(this.data)
        this.customer = this.data
      }
      // Object.entries(this.data).length === 0 ? this.initValues() : { this.dataId, this.dataName, this.dataCategory, this.dataOrder_status, this.dataPrice } = JSON.parse(JSON.stringify(this.data))
    },
    selected_province(val)
    {
        console.log(val)
        this.customer.DC_TP_KH = val
        this.FilterProvince()
    },
    selected_store(store)
    {
      this.customer.ID_CUA_HANG= store.ID_CUA_HANG
    },
    SETTING_BILL(boolean)
    {
        this.isSidebarActiveLocal = boolean
    }
  },
  computed: {
    ...mapGetters(["LIST_PROVINCE", "LIST_DISTRICT", "SETTING_BILL"]),
    isFormValid() {
      return !this.errors.any()
    },
    // isSidebarActiveLocal:{
    //   get()
    //   {
    //     return this.SETTING_BILL
    //   },
    //   set(val)
    //   {
    //     this.$emit('closeSidebar',val)
    //     this.initValues() 
    //   }
    // },
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
    isSidebarActiveLocal: false,
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
      selected_store: null
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
      if(Object.entries(this.data).length == 0)
      {
        this.$store.dispatch('createCustomer',this.customer).then((response) => {
          console.log(response)
        })
      }
    },
    FilterProvince()
    {
        this.$store.dispatch('fetchDistrict',this.customer.DC_TP_KH)
    },
    SearchCustomerSDT()
    {
      this.$store.dispatch('fetchCustomerBySDT',this.customer.SDT_KH).then((response) => {
        console.log(response)
          // response.result[0].NGAY_SINH_KH = new Date(response.result[0].NGAY_SINH_KH)
          this.selected_province = this.LIST_PROVINCE.filter((value,index,array) => {
            return array[index].ID_PROVINCE == response.result.DC_TP_KH
          })
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