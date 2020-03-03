<template>
  <vs-sidebar click-not-close position-right parent="body" default-index="1" color="primary" class="add-new-data-sidebar items-no-padding" spacer v-model="isSidebarActiveLocal">
    <div class="mt-6 flex items-center justify-between px-6">
        <h4>{{ Object.entries(this.data).length === 0 ? "THÊM MỚI" : "CẬP NHẬT" }} SẢN PHẨM</h4>
        <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>
    <VuePerfectScrollbar class="scroll-area--data-list-add-new" :settings="settings">
       <div class="p-6">


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
        console.log(this.data)
        this.store = this.data
      }
      // Object.entries(this.data).length === 0 ? this.initValues() : { this.dataId, this.dataName, this.dataCategory, this.dataOrder_status, this.dataPrice } = JSON.parse(JSON.stringify(this.data))
    }
  },
  computed: {
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
      store: {}
    }
  },
  methods: {
    initValues() {
        this.store = {}
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