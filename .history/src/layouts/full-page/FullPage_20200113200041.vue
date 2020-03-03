
<template>
  <div class="layout--full-page">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  mounted()
  {
    console.log(this.$cookies.isKey('token'))
    if(!this.$cookies.isKey('token'))
    {
      this.$router.push('/pages/login')
    }
  }
}
</script>