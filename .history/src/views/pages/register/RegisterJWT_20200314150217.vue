<!-- =========================================================================================
File Name: RegisterJWT.vue
Description: Register Page for JWT
----------------------------------------------------------------------------------------
Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <vs-tabs v-model="next">
      <vs-tab label="">
         <div class="clearfix">
          <vs-input
            v-validate="'required|alpha_dash|min:3'"
            data-vv-validate-on="blur"
            label-placeholder="Họ & Tên"
            name="displayName"
            placeholder="Họ & Tên"
            v-model="user.HO_TEN_USER"
            class="w-full" />
            <!-- {{errors}} -->
          <span class="text-danger text-sm">{{ errors.has('displayName') == '' ? 'Bạn chưa nhập họ tên' : '' }}</span>

          <vs-input
            v-validate="'required'"
            data-vv-validate-on="blur"
            name="username_user"
            type="text"
            label-placeholder="Tài khoản"
            placeholder="Tài khoản"
            v-model="user.USERNAME_USER"
            @input="checkUser()"
            @change="checkUser()"
            class="w-full mt-6" />
          <span class="text-danger text-sm">{{ errors.has('username_user') ? 'Bạn chưa nhập tài khoản': ''}}</span>
           <span class="text-danger text-sm">{{ errors_username == true? 'Tài khoản đã tồn tại': ''}}</span>
          <vs-input
            ref="password"
            type="password"
            data-vv-validate-on="blur"
            v-validate="'required|min:6|max:20'"
            name="password"
            label-placeholder="Mật khẩu"
            placeholder="Mật khẩu"
            v-model="user.PASSWORD_USER"
            class="w-full mt-6" />
          <span class="text-danger text-sm">{{ errors.has('password') ? 'Bạn chưa nhập mật khẩu' : '' }}</span>

          <vs-input
            type="password"
            v-validate="'min:6|max:10|confirmed:password'"
            data-vv-validate-on="blur"
            data-vv-as="password"
            name="confirm_password"
            label-placeholder="Xác nhận lại mật khẩu"
            placeholder="Xác nhận lại mật khẩu"
            v-model="confirm_password"
            class="w-full mt-6" />
          <span class="text-danger text-sm">{{ errors.has('confirm_password') ? 'Bạn chưa xác nhận lại mật khẩu' : '' }}</span>
          <vs-button class="float-right mt-6" @click="next = 1">Tiếp</vs-button>
          <!-- <vs-checkbox v-model="isTermsConditionAccepted" class="mt-6">I accept the terms & conditions.</vs-checkbox>
          <vs-button  type="border" to="/pages/login" class="mt-6">Login</vs-button>
          <vs-button class="float-right mt-6" @click="registerUserJWt" :disabled="!validateForm">Register</vs-button> -->
        </div>
      </vs-tab>
      <vs-tab label="">
       <div class="clearfix">
          <v-select class="select-store" placeholder="Nhập thể loại cửa hàng" v-model="selected_type_store" :options="TYPE_STORE" 
          value="ID_LOAI_CUA_HANG"  label="TEN_LOAI_CUA_HANG"  ></v-select>
          <vs-input class="w-full" v-model="store.TEN_CUA_HANG" type="text" placeholder="Nhập tên cửa hàng" label="Tên cửa hàng"></vs-input>
          <v-select class="select-province mt-15" placeholder="Chọn Tỉnh / Thành Phố" v-model="select_province" :options="LIST_PROVINCE" 
          value="ID_PROVINCE"  label="NAME_PROVINCE"  ></v-select>
          <v-select class="select-district mt-15" placeholder="Chọn Quận / Huyện" v-model="select_district" :options="LIST_DISTRICT_LOCAL" 
          value="ID_DISTRICT"  label="NAME_DISTRICT"  ></v-select>
           <vs-input  label="Địa chỉ" v-model="store.DIA_CHI_CUA_HANG" class="mt-5 w-full" name="DIA_CHI_CUA_HANG" placeholder="Nhập địa chỉ cửa hàng" v-validate="'required'" />
          <span class="text-danger text-sm" v-show="errors.has('DIA_CHI_CUA_HANG')">{{ errors.has('DIA_CHI_CUA_HANG') == true ? 'Chưa nhập địa chỉ cửa hàng' : '' }}</span>

          <vs-input label="Số điện thoại" v-model="store.SDT_CUA_HANG" class="mt-5 w-full" name="SDT_CUA_HANG" placeholder="Nhập địa số điện thoại cửa hàng" v-validate="'required'" />
          <span class="text-danger text-sm" v-show="errors.has('SDT_CUA_HANG')">{{ errors.has('SDT_CUA_HANG') == true ? 'Số điện thoại cửa hàng' : '' }}</span>
          
          
          <vs-button  type="border"  @click="next = 0" class="mt-6">Quay lại</vs-button>

          <vs-button class="float-right mt-6" :disabled="!validateForm" @click="Resignter()">Đăng ký</vs-button>

       </div>
      </vs-tab>
  </vs-tabs>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            next: 0,
            password: '',
            isTermsConditionAccepted: true,
            select_province: null,
            select_district: null,
            user: {
              HO_TEN_USER: '',
              USERNAME_USER: '',
              PASSWORD_USER: ''
            },
            store: {
              TEN_CUA_HANG: '',
              DIA_CHI_CUA_HANG: '',
              SDT_CUA_HANG: ''
            },
            errors_username: false,
            LIST_DISTRICT_LOCAL: [],
            selected_type_store: null
        }
    },
    computed: {
        ...mapGetters(["TYPE_STORE", "LIST_PROVINCE", "LIST_DISTRICT"]),
        validateForm() {
            return !this.errors.any() && this.displayName != '' && this.email != '' && this.password != '' && this.confirm_password != '' && this.isTermsConditionAccepted === true && this.errors_username === true;
        }
    },
    watch:
    {
      select_province(province)
      {
        if(province != null)
        {
          this.$store.dispatch('fetchDistrict',province.ID_PROVINCE)
          this.store.ID_PROVINCE = province.ID_PROVINCE
        }
        else
        {
          this.LIST_DISTRICT_LOCAL = []
        }
      },
      select_district(district)
      {
        this.store.ID_DISTRICT = district.ID_DISTRICT
      },
      selected_type_store(type)
      {
        this.store.ID_LOAI_CUA_HANG = type.ID_LOAI_CUA_HANG
      }
    },
    methods: {
        checkUser()
        {
          console.log('change')
          this.$store.dispatch('user/checkUsername',this.user.USERNAME_USER).then((response)=> {
            if(response.success == true)
            {
              this.errors_username = true
            }
            else{
              this.errors_username = false
            }
          }).catch(() => {
            this.errors_username = true
          })
        },
        Resignter()
        {
          this.$store.dispatch('resignterStore',{
            user: this.user,
            store: this.store
          }).then((response) => {
            console.log(response)
          })
        }
    }
}
</script>
<style>
.ul-tabs.vs-tabs--ul.ul-tabs-left {display: none !important;}
</style>