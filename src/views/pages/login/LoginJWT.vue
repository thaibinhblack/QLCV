<template>
  <div>
    <vs-input
        v-validate="'required|min:3'"
        data-vv-validate-on="blur"
        name="email"
        icon-no-border
        icon="icon icon-user"
        icon-pack="feather"
        label-placeholder="Tài khoản"
        v-model="email"
        class="w-full"/>
    <span class="text-danger text-sm">{{ errors.first('email') }}</span>

    <vs-input
        data-vv-validate-on="blur"
        v-validate="'required|min:6|max:10'"
        type="password"
        name="password"
        icon-no-border
        icon="icon icon-lock"
        icon-pack="feather"
        label-placeholder="Mật khẩu"
        v-model="password"
        class="w-full mt-6" />
    <span class="text-danger text-sm">{{ errors.first('password') }}</span>

    <div class="flex flex-wrap justify-between my-5">
        <!-- <vs-checkbox v-model="checkbox_remember_me" class="mb-3">Remember Me</vs-checkbox> -->
      </div>
    <div class="flex flex-wrap justify-between ">
      <vs-button :disabled="!validateForm" @click="loginSystem"  class="mt-6">Đăng nhập</vs-button>
    </div>
  </div>
</template>

<script>
import axios from '@/axios'
export default {
  data() {
    return {
      email: '',
      password: '',
      checkbox_remember_me: false
    }
  },
  computed: {
    validateForm() {
      return !this.errors.any() && this.email != '' && this.password != '';
    },
  },
  methods: {
    checkLogin() {
      // If user is already logged in notify
      if (this.$store.state.auth.isUserLoggedIn()) {

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
    loginSystem()
    {
      this.$vs.loading()
      const payload = {
        checkbox_remember_me: this.checkbox_remember_me,
        userDetails: {
          email: this.email,
          password: this.password
        }
      }
      // console.log(payload)
      this.$store.dispatch('user/loginSystem',payload).then((response) => {
          // console.log('login',response)
          if(response.success == false)
          {
            this.$vs.notify({
              text:response.message,
              color:'red'
            })
          }
          else
          {
            // console.log(response.result)
            this.$cookies.set('token',response.result)
            axios.defaults.params.token = response.result
            this.$router.push('/apps/stores')
            
            
          }
          this.$vs.loading.close()
          
      }).catch(() => {
          this.$vs.loading.close()
      });
    },
  },
  created()
  {
    if(this.$cookies.isKey('token'))
    {
        axios.defaults.params.token = this.$cookies.get('token')
        this.$router.push('/apps/stores')
    }
  }
}

</script>

