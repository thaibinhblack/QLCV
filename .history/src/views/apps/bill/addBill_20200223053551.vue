<template>
<vs-row vs-w="12">
    <vs-col vs-type="flex" vs-justify="left" vs-align="left" vs-lg="9" vs-sm="12" vs-xs="12" >
        <v-select v-model="selected_store" :options="stores" value="ID_CUA_HANG"  label="TEN_CUA_HANG"  ></v-select>
        <vs-divider class="mb-0"></vs-divider>
        <VuePerfectScrollbar class="scroll-area--data-list-add-new" :settings="settings">
            <div class="p-6">

                <span>Cửa hàng</span>
                <v-select v-model="selected_store" :options="stores" value="ID_CUA_HANG"  label="TEN_CUA_HANG"  ></v-select>

                <span>Nhân viên trong hệ thống</span>
                <v-select v-model="selected_user" :options="users" value="ID_USER"  label="HO_TEN_USER"  taggable multiple ></v-select>
            </div>

            <vs-divider class="mb-0"></vs-divider>

            <vs-list>
                <vs-list-header icon="supervisor_account" title="Danh sách nhân viên của cửa hàng"></vs-list-header>
                 <vs-list-item v-for="(user,index) in selected_user" :key="index" icon="check"  :title="user.HO_TEN_USER" :subtitle="user.USERNAME_USER"></vs-list-item>
                <vs-list-item v-for="(user,index) in LIST_MANAGER" :key="index"  :title="user.HO_TEN_USER" :subtitle="user.USERNAME_USER">
                    <vs-button color="warning" type="border" icon="close" @click="REMOVE_MANAGER(user.ID_USER)"></vs-button>
                </vs-list-item>          
            </vs-list>
        </VuePerfectScrollbar>
  </vs-col>
     <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-lg="3" vs-sm="12" vs-xs="12" >
    vs-lg="2" vs-sm="4" vs-xs="12"
  </vs-col>
</vs-row>
</template>

<script>
import vSelect from 'vue-select'
export default {
  components:
  {
    vSelect,
  },
  computed:
  {
    stores: {
      get()
      {
          return this.$store.state.store.stores
          
      },
    }

  },
  data()
  {
    return {
      settings: { // perfectscrollbar settings
          maxScrollbarLength: 60,
          wheelSpeed: .60,
      },
    }
  },
  created()
  {
     this.$store.dispatch("fetchStore")
  }
}
</script>