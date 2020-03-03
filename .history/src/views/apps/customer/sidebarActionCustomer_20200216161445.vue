<template>
  <vs-sidebar click-not-close position-right parent="body" default-index="1" color="primary" class="add-new-data-sidebar items-no-padding" spacer v-model="isSidebarActiveLocal">
    <div class="mt-6 flex items-center justify-between px-6">
        <h4>{{ Object.entries(this.data).length === 0 ? "THÊM MỚI" : "CẬP NHẬT" }} KHÁCH HÀNG</h4>
        <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>
    <VuePerfectScrollbar class="scroll-area--data-list-add-new" :settings="settings">
        <div class="p-6">
          <!-- {{selected_store}} -->
          <!-- <v-select v-model="cusomter.ID_CUA_HANG" :options="LIST_STORE" :reduce="store => store.ID_CUA_HANG" label="TEN_CUA_HANG" /> -->
          <vs-input label="Tên khách hàng" v-model="cusomter.TEN_KH" class="mt-5 w-full" name="TEN_KH" placeholder="Nhập tên khách hàng" v-validate="'required'" />
          <span class="text-danger text-sm" v-show="errors.has('TEN_KH')">{{ errors.has('TEN_KH') == true ? 'Chưa nhập tên khách hàng' : '' }}</span>
          <vs-row>
            <div class="mt-6">
               <vs-input type="number" min="0" label="Giá khách hàng" v-model="cusomter.NGAY_SINH_KH" class="w-full" name="NGAY_SINH_KH" placeholder="Nhập giá khách hàng" v-validate="'required'" />
              <span class="text-danger text-sm" v-show="errors.has('NGAY_SINH_KH')">{{ errors.has('NGAY_SINH_KH') == true ? 'Chưa nhập giá khách hàng' : '' }}</span>
            </div>
            <div class="mt-6" style="margin-left:15px;">
              <vs-input type="number" min="0" label="Số lượng khách hàng" v-model="cusomter.SDT_KH" class="w-full" name="SDT_KH" placeholder="Nhập số lượng khách hàng" v-validate="'required'" />
              <span class="text-danger text-sm" v-show="errors.has('SDT_KH')">{{ errors.has('SDT_KH') == true ? 'Chưa nhập số lượng khách hàng' : '' }}</span>
            </div>
            
          </vs-row>
          <vue-editor v-model="cusomter.NOI_DUNG_SAN_PHAM"  style="margin-top: 15px;"/>
          <vs-textarea label="Mô tả khách hàng" v-model="cusomter.GT_KH" class="mt-5 w-full" name="GT_KH" placeholder="Nhập mô tả khách hàng"  />
          <vs-card class="card-image-cusomter">
            <!-- {{cusomter.HINH_ANH_DAI_DIEN}} -->
            <img class="Imagecusomter" v-if="image_cusomter != null" :src="image_cusomter" alt="">
            <img class="Imagecusomter" v-else :src="$store.state.config.PUBLIC_URL + cusomter.HINH_ANH_DAI_DIEN" alt="">
            <input  ref="Imagecusomter" type="file" class="input-file" @change="renderImagecusomter()">
            <vs-icon class="icon-upload-file" icon="cloud_upload" size="20px"></vs-icon>
          </vs-card>
          <vs-card>
            <vs-button icon="cloud_upload"></vs-button>
          </vs-card>
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
        this.$validator.reset()
      }else {
        console.log(this.data)
        this.cusomter = this.data
      }
      // Object.entries(this.data).length === 0 ? this.initValues() : { this.dataId, this.dataName, this.dataCategory, this.dataOrder_status, this.dataPrice } = JSON.parse(JSON.stringify(this.data))
    }
  },
  computed: {
    ...mapGetters(["LIST_STORE"]),
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
      cusomter: {
        ID_CUA_HANG: 1,
        TEN_KH: "",
        NGAY_SINH_KH:0,
        SDT_KH: 0,
        GT_KH: "",
        NOI_DUNG_SAN_PHAM: "",
        HINH_ANH_DAI_DIEN: null
      },
      files: [],
      image_cusomter: null,
    }
  },
  methods: {
    initValues() {
        this.cusomter = {
        TEN_KH: "",
        NGAY_SINH_KH:0,
        SDT_KH: 0,
        GT_KH: "",
        NOI_DUNG_SAN_PHAM: "",
        HINH_ANH_DAI_DIEN: null
      }
      this.image_cusomter = null
    },
    submitCH()
    {
      if(Object.entries(this.data).length == 0)
      {
         this.$store.dispatch("createcusomter",this.cusomter).then((response) => {
          if(response.success == true)
          {
            this.$vs.notify({
                title: 'Thêm mới sản phần',
                text:response.message,
                position: 'bottom-left',
                color:'success'
              })
            this.initValues()
          }
          else
          {
            this.$vs.notify({
                title: 'Thêm mới khách hàng',
                text:response.message,
                position: 'bottom-left',
                color:'warning'
              })
          }
        }).catch(() => {
          this.$vs.notify({
                title: 'Thêm mới khách hàng',
                text:'Lỗi server! xin vui lòng thử lại',
                position: 'bottom-left',
                color:'danger'
              })
        })
      } 
     
    },
    renderImagecusomter()
    {
      // var reader  = new FileReader()
      const file = this.$refs.Imagecusomter.files[0]
      this.cusomter.HINH_ANH_DAI_DIEN = file
      this.image_cusomter  = URL.createObjectURL(file)
    }
  },
  created()
  {
    this.$store.dispatch('fetchStore')
  }
}
</script>


<style lang="scss" scoped>
.card-image-cusomter {
  width: 150px;
  height: 200px;
  margin: auto;
  margin-bottom: 15px;
  position: relative;
}
.input-file, .Imagecusomter {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 999;
  opacity: 0;
}
.Imagecusomter {z-index: 998;opacity: 1;height: auto;}
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