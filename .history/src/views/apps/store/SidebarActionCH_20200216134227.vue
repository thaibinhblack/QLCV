<template>
  <vs-sidebar click-not-close position-right parent="body" default-index="1" color="primary" class="add-new-data-sidebar items-no-padding" spacer v-model="isSidebarActiveLocal">
    <div class="mt-6 flex items-center justify-between px-6">
        <h4>{{ Object.entries(this.data).length === 0 ? "THÊM MỚI" : "CẬP NHẬT" }} CỬA HÀNG</h4>
        <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>
    <VuePerfectScrollbar class="scroll-area--data-list-add-new" :settings="settings">
       <div class="p-6">
          <vs-input label="Tên cửa hàng" v-model="store.TEN_CUA_HANG" class="mt-5 w-full" name="TEN_CUA_HANG" placeholder="Nhập tên cửa hàng" v-validate="'required'" />
          <span class="text-danger text-sm" v-show="errors.has('TEN_CUA_HANG')">{{ errors.has('TEN_CUA_HANG') == true ? 'Chưa nhập tên cửa hàng' : '' }}</span>

          <vs-input label="Địa chỉ" v-model="store.DIA_CHI_CUA_HANG" class="mt-5 w-full" name="DIA_CHI_CUA_HANG" placeholder="Nhập địa chỉ cửa hàng" v-validate="'required'" />
          <span class="text-danger text-sm" v-show="errors.has('DIA_CHI_CUA_HANG')">{{ errors.has('DIA_CHI_CUA_HANG') == true ? 'Chưa nhập địa chỉ cửa hàng' : '' }}</span>

          <vs-input label="Số điện thoại" v-model="store.SDT_CUA_HANG" class="mt-5 w-full" name="SDT_CUA_HANG" placeholder="Nhập địa số điện thoại cửa hàng" v-validate="'required'" />
          <span class="text-danger text-sm" v-show="errors.has('SDT_CUA_HANG')">{{ errors.has('SDT_CUA_HANG') == true ? 'Số điện thoại cửa hàng' : '' }}</span>
          
          <vs-textarea class="mt-5 w-full"  counter="255" label="Địa chỉ" v-model="store.GHI_CHU" />
          <!-- {{SETTING_STORE}} -->
          {{store.OPTION_STORE}}
          <vs-input v-for="(setting,index) in SETTING_STORE" :key="index" 
          :label="setting.NAME_ATTRIBUTE"  v-model="store.OPTION_STORE[NAME_ATTRIBUTE]" class="mt-5 w-full" :placeholder="setting.NOTE_ATTRIBUTE" v-validate="'required'" />

       </div>
    </VuePerfectScrollbar>
    <div class="flex flex-wrap items-center p-6" slot="footer">
      <vs-button class="mr-6" @click="submitCH" :disabled="!isFormValid">{{Object.entries(this.data).length === 0 ? "THÊM MỚI": "CẬP NHẬT"}}</vs-button>
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
        this.update_option()
        this.$validator.reset()
      }else {
        // console.log(this.data)
        this.store = this.data
        this.map_option_store()
        // this.update_option()
        // if(this.data.OPTION_STORE)
      }
      // Object.entries(this.data).length === 0 ? this.initValues() : { this.dataId, this.dataName, this.dataCategory, this.dataOrder_status, this.dataPrice } = JSON.parse(JSON.stringify(this.data))
    },
  },
  computed: {
    ...mapGetters(["SETTING_STORE"]),
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
    }
  },
  data()
  {
    return {
      settings: { // perfectscrollbar settings
          maxScrollbarLength: 60,
          wheelSpeed: .60,
      },
      store: {
        TEN_CUA_HANG: "",
        DIA_CHI_CUA_HANG: "",
        SDT_CUA_HANG: "",
        GHI_CHU: "",
        OPTION_STORE: []
      }
    }
  },
  methods: {
    initValues() {
        this.store = {
          TEN_CUA_HANG: "",
          DIA_CHI_CUA_HANG: "",
          SDT_CUA_HANG: "",
          GHI_CHU: "",
          OPTION_STORE: []
        }
    },
    map_option_store()
    {
      if(this.store.OPTION_STORE.length == 0)
      {
        this.update_option()
      }
      else
      {
        for(const i = this.store.OPTION_STORE.length -1 ; i < this.SETTING_STORE.length; I++ )
        {
          this.store.OPTION_STORE[i] = this.SETTING_STORE[i]
        }
      }
    },
    update_option()
    {
      this.SETTING_STORE.forEach(element => {
          element.VALUE_ATTRIBUTE = ""
          this.store.OPTION_STORE.push(element)
      });
    },
    submitCH()
    {
      if(Object.entries(this.data).length === 0)
      {
        this.$store.dispatch('createStore',this.store).then((response) => {
          if(response.success == true)
          {
              this.$vs.notify({
                title: 'Thêm mới cửa hàng',
                text:response.message,
                position: 'bottom-left',
                color:'success'
              })
          }
          else
          { this.$vs.notify({
              title: 'Thêm mới cửa hàng',
              text:response.message,
              position: 'bottom-left',
              color:'danger'
            })
          }
        })
      }
      else
      {
        this.$store.dispatch("updateStore",this.store).then((response) => {
           if(response.success == true)
          {
              this.$vs.notify({
                title: 'Cập nhật cửa hàng',
                position: 'bottom-left',
                text:response.message,
                color:'success'
              })
          }
          else
          { this.$vs.notify({
              title: 'Cập nhật cửa hàng',
              position: 'bottom-left',
              text:response.message,
              color:'danger'
            })
          }
        }).catch(() => {
          this.$vs.notify({
              title: 'Cập nhật cửa hàng',
              position: 'bottom-left',
              text: 'Lỗi server!',
              color:'danger'
            })
        })
      }
    }
  },
  created()
  {
    this.$store.dispatch('fetchSetting','store')
  }
}
</script>


<style lang="scss" scoped>
.add-new-data-sidebar {
  ::v-deep .vs-sidebar--background {
    z-index: 52010;
  }

  ::v-deep .vs-sidebar {
    z-index: 52010;
    width: 400px;
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