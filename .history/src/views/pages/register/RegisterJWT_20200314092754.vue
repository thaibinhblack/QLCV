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
            class="w-full mt-6" />
          <span class="text-danger text-sm">{{ errors.has('username_user') ? 'Bạn chưa nhập tài khoản': ''}}</span>

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

      </vs-tab>
  </vs-tabs>
</template>

<script>
export default {
    data() {
        return {
            displayName: '',
            next: 0,
            password: '',
            confirm_password: '',
            isTermsConditionAccepted: true,
            user: {
              HO_TEN_USER: '',
              USERNAME_USER: '',
              PASSWORD_USER: ''
            }
        }
    },
    computed: {
        validateForm() {
            return !this.errors.any() && this.displayName != '' && this.email != '' && this.password != '' && this.confirm_password != '' && this.isTermsConditionAccepted === true;
        }
    },
    methods: {
        checkLogin() {
          // If user is already logged in notify
          if(this.$store.state.auth.isUserLoggedIn()) {

            // Close animation if passed as payload
            // this.$vs.loading.close()

            this.$vs.notify({
              title: 'Login Attempt',
              text: 'You are already logged in!',
              iconPack: 'feather',
              icon: 'icon-alert-circle',
              color: 'warning'
            })

            return false
          }
          return true
        },
        registerUserJWt() {
            // If form is not validated or user is already login return
            if (!this.validateForm || !this.checkLogin()) return

            const payload = {
              userDetails: {
                displayName: this.displayName,
                email: this.email,
                password: this.password,
                confirmPassword: this.confirm_password
              },
              notify: this.$vs.notify
            }
            this.$store.dispatch('auth/registerUserJWT', payload)
        }
    }
}
</script>
