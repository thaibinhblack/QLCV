<template>
<vs-row vs-w="12">
    <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-lg="9" vs-sm="12" vs-xs="12" >
        <v-select v-model="selected_store" :options="stores" value="ID_CUA_HANG"  label="TEN_CUA_HANG"  ></v-select>

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
  created()
  {
     this.$store.dispatch("fetchStore")
  }
}
</script>