<template>
<vs-row vs-w="12">
    <vs-col vs-type="flex" vs-justify="left" vs-align="left" vs-lg="9" vs-sm="12" vs-xs="12" >
        <v-select class="select-store" placeholder="Chọn cửa hàng" v-model="selected_store" :options="stores" value="ID_CUA_HANG"  label="TEN_CUA_HANG"  ></v-select><br />
        <!-- <vs-divider class="mb-0"></vs-divider> -->
        <!-- {{}} -->
         <ul class="list-product">
          <li v-for="(product,index) in LIST_PRODUCT" :key="index">{{product.TEN_SAN_PHAM}}</li>
        </ul>
  </vs-col>
     <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-lg="3" vs-sm="12" vs-xs="12" >
    vs-lg="2" vs-sm="4" vs-xs="12"
  </vs-col>
</vs-row>
</template>

<script>
import vSelect from 'vue-select'
import { mapGetters } from 'vuex'
export default {
  components:
  {
    vSelect,
  },
  computed:
  {
    ...mapGetters(["LIST_PRODUCT"]),
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
      selected_store: null
    }
  },
  watch:
  {
    selected_store(store)
    {
      this.$store.dispatch('fetchProductByIDCH',store.ID_CUA_HANG)
    }
  },
  created()
  {
     this.$store.dispatch("fetchStore")
  }
}
</script>

<style scoped>
.select-store {width: 500px;}
.scroll-product {
  width: 100%;
}
.list-product {width:  100%;}
</style>