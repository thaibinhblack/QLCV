<template>
<vs-row vs-w="12">
  <vs-col vs-type="flex" vs-justify="left" vs-align="left" vs-lg="8" vs-sm="12" vs-xs="12" >
        <v-select class="select-store" placeholder="Chọn cửa hàng" v-model="selected_store" :options="stores" value="ID_CUA_HANG"  label="TEN_CUA_HANG"  ></v-select><br />
  </vs-col>
  <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-lg="4" vs-sm="12" vs-xs="12" >
    <v-select class="select-store" placeholder="Chọn khách hàng" v-model="selected_customer" :options="LIST_CUSTOMER" value="UUID_KH"  label="SDT_KH"  ></v-select><br />
  </vs-col>
  <vs-col vs-justify="left" vs-align="left" vs-lg="8" vs-sm="12" vs-xs="12" >
      <ul class="list-product" v-for="(product,index) in LIST_PRODUCT" :key="index">
        <li>{{product.TEN_SAN_PHAM}}</li>
        <li>{{product.GIA_SAN_PHAM}}</li>
        <li>{{product.SO_LUONG_HT}}</li>
        <!-- <li><vs-input-number min="0" @change="CHOSE_PRODUCT"/></li> -->
      </ul>
  </vs-col>
  <vs-col vs-justify="center" vs-align="center" vs-lg="4" vs-sm="12" vs-xs="12" v-if="selected_customer != null">
    <vs-input label="Tên khách hàng" disabled v-model="selected_customer.TEN_KH" class="mt-5 w-full" name="TEN_KH" placeholder="Nhập tên cửa hàng" v-validate="'required'" />
    <vs-input label="Số điện thoại" disabled v-model="selected_customer.SDT_KH" class="mt-5 w-full" name="SDT_KH" placeholder="Nhập tên cửa hàng" v-validate="'required'" />

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
    ...mapGetters(["LIST_PRODUCT", "LIST_CUSTOMER"]),
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
      selected_store: null,
      selected_customer: null
    }
  },
  watch:
  {
    selected_store(store)
    {
      this.$store.dispatch('fetchProductByIDCH',store.ID_CUA_HANG)
      this.$store.dispatch('fetchCustomerByIDCH',store.ID_CUA_HANG)
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
.list-product>li{display: inline-block; width: 25%; padding: 15px;}
</style>