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
        <template v-if="dataImg">

          <!-- Image Container -->
          <div class="img-container w-64 mx-auto flex items-center justify-center">
            <img :src="dataImg" alt="img" class="responsive">
          </div>

          <!-- Image upload Buttons -->
          <div class="modify-img flex justify-between mt-5">
            <input type="file" class="hidden" ref="updateImgInput" @change="updateCurrImg" accept="image/*">
            <vs-button class="mr-4" type="flat" @click="$refs.updateImgInput.click()">Update Image</vs-button>
            <vs-button type="flat" color="#999" @click="dataImg = null">Remove Image</vs-button>
          </div>
        </template>

        <vs-input label="Tài khoản" v-model="user.HO_TEN_USER" class="mt-5 w-full" name="HO_TEN_USER" v-validate="'required'" />
        <span class="text-danger text-sm" v-show="errors.has('HO_TEN_USER')">{{ errors.has('HO_TEN_USER') == true ? 'Họ & Tên' : '' }}</span>

        <!-- USERNMAE -->
        <vs-input label="Tài khoản" v-model="user.USERNAME_USER" class="mt-5 w-full" name="username_user" v-validate="'required'" />
        <span class="text-danger text-sm" v-show="errors.has('username_user')">{{ errors.has('username_user') == true ? 'Chưa nhập tài khoản' : '' }}</span>

        <!-- PASSWORD -->
        <vs-input label="Mật khẩu" type="password" v-model="user.password_user" class="mt-5 w-full" name="password_user" v-validate="'required'" />
        <span class="text-danger text-sm" v-show="errors.has('password_user')">{{ errors.has('password_user') == true ? 'Chưa nhập mật khẩu' : '' }}</span>

         <!-- HỌ & TÊN -->
        <vs-input label="Họ & Tên" type="text" v-model="user.HO_TEN_USER" class="mt-5 w-full" name="ho_ten_user" v-validate="'required'" />
        <span class="text-danger text-sm" v-show="errors.has('ho_ten_user')">{{ errors.first('ho_ten_user') }}</span>

        <vs-row vs-w="12">
          <!-- NGÀY SINH -->
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-lg="6" vs-sm="6" vs-xs="12" style="padding-right:5px;" >
             <vs-input label="Ngày sinh" type="date" v-model="user.birth_day" class="mt-5 w-full" name="ho_ten_user" />
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
        <vs-input label="Số điện thoại" type="text" v-model="user.sdt_user" class="mt-5 w-full" name="sdt_user" />

        <!-- ĐỊA CHỈ USER -->
        <vs-textarea class="mt-5 w-full"  counter="255" label="Địa chỉ" v-model="user.dc_user" />
        <!-- Upload -->
        <!-- <vs-upload text="Upload Image" class="img-upload" ref="fileUpload" /> -->

        <div class="upload-img mt-5" v-if="!dataImg">
          <input type="file" class="hidden" ref="uploadImgInput" @change="updateCurrImg" accept="image/*">
          <vs-button @click="$refs.uploadImgInput.click()">Upload Image</vs-button>
        </div>
      </div>
    </VuePerfectScrollbar>

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
      this.$validator.validateAll().then(result => {
          if (result) {

            const form_user = new FormData();
            form_user.append("USERNAME_USER",this.user.username_user)
            form_user.append("PASSWORD_USER",this.user.password_user)
            form_user.append("GT_USER",1);
            form_user.append("ID_QUYEN",0)

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
