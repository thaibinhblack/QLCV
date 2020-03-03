<template>
  <vs-sidebar click-not-close position-right parent="body" default-index="1" color="primary" class="add-new-data-sidebar items-no-padding" spacer v-model="isSidebarActiveLocal">
    <div class="mt-6 flex items-center justify-between px-6">
        <h4>{{ Object.entries(this.data).length === 0 ? "THÊM MỚI" : "CẬP NHẬT" }} NHÂN VIÊN</h4>
        <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>



    <div class="flex flex-wrap items-center p-6" slot="footer">
      <vs-button class="mr-6" @click="submitData" :disabled="!isFormValid">THÊM MỚI</vs-button>
      <vs-button type="border" color="danger" @click="isSidebarActiveLocal = false">Cancel</vs-button>
    </div>
  </vs-sidebar>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import API_USER from '@/apis/systems/UserAPI.js'
export default {
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
    isSidebarActive(val) {
      if(!val) return
      if(Object.entries(this.data).length === 0) {
        this.initValues()
        this.$validator.reset()
      }else {
        this.user = this.data
      }
      // Object.entries(this.data).length === 0 ? this.initValues() : { this.dataId, this.dataName, this.dataCategory, this.dataOrder_status, this.dataPrice } = JSON.parse(JSON.stringify(this.data))
    },
  },
  data() {
    return {
      gender: [
        {text: 'Nam', value: 0},
        {text: 'Nữ', value: 0}
      ],
      settings: { // perfectscrollbar settings
          maxScrollbarLength: 60,
          wheelSpeed: .60,
      },
      dataImg: null,
      user: {
    
      }
    }
  },
  computed: {
    isSidebarActiveLocal: {
      get() {
        return this.isSidebarActive
      },
      set(val) {
        if(!val) {
          this.$emit('closeSidebar')
          // this.$validator.reset()
          // this.initValues()
        }
      }
    },
    isFormValid() {
      return !this.errors.any()
    }
  },
  methods: {
    initValues() {
      if(this.user.username_user) return
        this.user = {
          gt_User: 0
        }
    },
    submitData() {
      this.$validator.validateAll().then(result => {
          if (result) {
            // const obj = {
            //   id: this.dataId,
            //   name: this.dataName,
            //   img: this.dataImg,
            //   category: this.dataCategory,
            //   order_status: this.dataOrder_status,
            //   price: this.dataPrice
            // }
            const form_user = new FormData();
            form_user.append("USERNAME_USER",this.user.username_user)
            form_user.append("PASSWORD_USER",this.user.password_user)
            form_user.append("GT_USER",1);
            form_user.append("ID_QUYEN",0)
            API_USER.createUser(form_user,'123')
            // if(this.dataId !== null && this.dataId >= 0) {
            //   // this.$store.dispatch("dataList/updateItem", obj).catch(err => { console.error(err) })
            // }
            // else{
            //   // delete obj.id
            //   // obj.popularity = 0
            //   // this.$store.dispatch("dataList/addItem", obj).catch(err => { console.error(err) })
            // }

            this.$emit('closeSidebar')
            this.initValues()
          }
      })
    },
    updateCurrImg(input) {
      if (input.target.files && input.target.files[0]) {
        var reader = new FileReader()
        reader.onload = e => {
          this.dataImg = e.target.result
        }
        reader.readAsDataURL(input.target.files[0])
      }
    }
  },
  components: {
    VuePerfectScrollbar,
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
