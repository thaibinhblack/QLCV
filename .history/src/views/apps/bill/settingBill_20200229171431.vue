<template>
  <vs-dropdown vs-trigger-click class="ml-auto md:block hidden cursor-pointer po-ab">
      <vs-button radius icon="icon-settings" icon-pack="feather" />

      <vs-dropdown-menu class="w-32">
        <vs-dropdown-item>
          <div class="items-center" @click="openSidrbarSetting(true)">
            <span>Cài đặt điểm tích lũy</span>
          </div>
        </vs-dropdown-item>

      </vs-dropdown-menu>

    </vs-dropdown>
</template>

<script>
export default {
  methods:
  {
    openSidebarSetting(boolean)
    {
      this.$store.state.bill.SETTING_BILL = boolean
    }
  }
}
</script>