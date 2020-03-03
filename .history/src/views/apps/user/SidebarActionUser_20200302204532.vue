<template>
  <vs-sidebar click-not-close position-right parent="body" default-index="1" color="primary" class="add-new-data-sidebar items-no-padding" spacer v-model="isSidebarActiveLocal">
    <div class="mt-6 flex items-center justify-between px-6">
        <h4>{{ Object.entries(this.data).length === 0 ? "THÊM MỚI" : "CẬP NHẬT" }} NHÂN VIÊN</h4>
        <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <VuePerfectScrollbar class="scroll-area--data-list-add-new" :settings="settings">

      <div class="p-6">

        <!-- Product Image -->
        <template>

          <!-- Image Container -->
          <div class="img-container w-64 mx-auto flex items-center justify-center">
            <vs-avatar size="120px" :src="dataImg"/>
            <!-- <img :src="dataImg" alt="img" class="responsive"> -->
             <input type="file" class="hidden" ref="updateImgInput" @change="updateCurrImg" accept="image/*">
              <vs-button class="group-action-avatar mr-4 btn-not-color"  @click="$refs.updateImgInput.click()"><vs-icon icon="cloud_upload"></vs-icon></vs-button>
            <div class="mt-5">
             
              <!-- <vs-button type="flat" color="#999" @click="dataImg = null">Remove Image</vs-button> -->
            </div>
          </div>

          <!-- Image upload Buttons -->
          
        </template>

        <vs-input label="Họ & Tên" v-model="user.HO_TEN_USER" class="mt-5 w-full" name="HO_TEN_USER" v-validate="'required'" />
        <span class="text-danger text-sm" v-show="errors.has('HO_TEN_USER')">{{ errors.has('HO_TEN_USER') == true ? 'Họ & Tên' : '' }}</span>

        <!-- USERNMAE -->
        <vs-input label="Tài khoản" v-model="user.USERNAME_USER" class="mt-5 w-full" name="username_user" v-validate="'required'" />
        <span class="text-danger text-sm" v-show="errors.has('username_user')">{{ errors.has('username_user') == true ? 'Chưa nhập tài khoản' : '' }}</span>

        <!-- PASSWORD -->
        <vs-input label="Mật khẩu" type="password" v-model="user.PASSWORD_USER" class="mt-5 w-full" name="password_user" v-validate="'required'" />
        <span class="text-danger text-sm" v-show="errors.has('password_user')">{{ errors.has('password_user') == true ? 'Chưa nhập mật khẩu' : '' }}</span>

         <!-- HỌ & TÊN -->
        

        <vs-row vs-w="12">
          <!-- {{user}} -->
          <!-- NGÀY SINH -->
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-lg="6" vs-sm="6" vs-xs="12" style="padding-right:5px;" >
             <vs-input label="Ngày sinh" type="date" v-model="user.BIRTH_DAY" class="mt-5 w-full" name="ho_ten_user" />
          </vs-col>
          <!-- GIỚI TÍNH -->
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-lg="6" vs-sm="6" vs-xs="12">
            <vs-select v-model="user.GT_USER" label="Giới tính" class="mt-5 w-full" name="gt_user" v-validate="'required'">
              <vs-select-item :key="item.value" :value="item.text" :text="item.text" v-for="item in gender" />
            </vs-select>
            <span class="text-danger text-sm" v-show="errors.has('gt_user')">{{ errors.has('gt_user') == true ? 'Chưa chọn giới tính' : '' }}</span>
          </vs-col>
        </vs-row>

        <!-- SĐT USER -->
        <vs-input label="Số điện thoại" type="text" v-model="user.SDT_USER" class="mt-5 w-full" name="sdt_user" />

        <!-- ĐỊA CHỈ USER -->
        <vs-textarea class="mt-5 w-full"  counter="255" label="Địa chỉ" v-model="user.DC_USER" />
    
      </div>
    </VuePerfectScrollbar>

    <div class="flex flex-wrap items-center p-6" slot="footer">
      <vs-button class="mr-6" @click="submitData" :disabled="!isFormValid">{{Object.entries(data).length > 0 ? 'CẬP NHẬT': 'THÊM MỚI'}}</vs-button>
      <vs-button type="border" color="danger" @click="isSidebarActiveLocal = false">Cancel</vs-button>
    </div>
  </vs-sidebar>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
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
        this.dataImg = this.data.AVATAR == null ? null : this.$store.state.config.PUBLIC_URL + this.data.AVATAR
        this.data.BIRTH_DAY = this.data.BIRTH_DAY == null ? new Date().toISOString().substr(0,10) : new Date(this.data.BIRTH_DAY).toISOString().substr(0,10)
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
       this.$store.dispatch('user/submitUser',this.user)
      // this.$validator.validateAll().then(result => {
      //     if (result) {

      //       this.$emit('closeSidebar')
      //       this.initValues()
      //     }
      // })
    },
    updateCurrImg(input) {
      if (input.target.files && input.target.files[0]) {
        var reader = new FileReader()
        reader.onload = e => {
          this.dataImg = e.target.result
          this.user.AVATAR = input.target.files[0]
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
.group-action-avatar {position: absolute;transform: translate(-50%,-50%); left: 50%;right: 50%;}
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
