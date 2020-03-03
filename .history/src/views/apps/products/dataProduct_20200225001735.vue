<template>
    <div id="data-list-list-view" class="data-list-container">
        <sidebar-action-product :isSidebarActive="isSidebarActive" @closeSidebar="isSidebarActive = $event" :data="sidebarData" />
         <vs-table ref="table" :data="LIST_PRODUCT" >
            <div slot="header" class="header-table-search flex flex-wrap-reverse items-center flex-grow justify-between">
                <!-- {{stores}} -->
                <v-select class="select-store"  placeholder="Chọn khách hàng"  v-model="selected_store" :options="stores" value="ID_CUA_HANG"  label="TEN_CUA_HANG" ></v-select>

                <vs-button type="border" icon-pack="feather" icon="icon-plus" @click="addNewData">Thêm mới</vs-button>

            </div>

        <template slot="thead">
          <vs-th sort-key="image">Hình ảnh</vs-th>
          <vs-th sort-key="managers">Tên sản phẩm</vs-th>
          <vs-th sort-key="managers">Mô tả</vs-th>
          <vs-th sort-key="category">Giá</vs-th>
          <vs-th sort-key="popularity">SL</vs-th>
          <vs-th sort-key="price">SL hiện tại </vs-th>
          <vs-th sort-key="price">SL còn lại </vs-th>
          <vs-th>Thao tác</vs-th>
        </template>
        <template slot-scope="{data}">
          <tbody>
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">

              <vs-td>
               <img :src="$store.state.config.PUBLIC_URL + tr.HINH_ANH_DAI_DIEN" alt="" class="image-product">
              </vs-td>
              <vs-td>
                <p class="product-name font-medium truncate"><a :href="'/apps/product/'+tr.ID_SAN_PHAM"> {{ tr.TEN_SAN_PHAM }} </a> </p>
              </vs-td>
               <vs-td>
                <p class="product-name font-medium truncate">{{ tr.MO_TA_SAN_PHAM }}</p>
              </vs-td>
              <vs-td>
                <p class="product-name font-medium truncate">{{ tr.GIA_SAN_PHAM }}</p>
              </vs-td>
               <vs-td>
                <p class="product-name font-medium truncate">{{ tr.SO_LUONG }}</p>
              </vs-td>
               <vs-td>
                <p class="product-name font-medium truncate">{{ tr.SO_LUONG_HT }}</p>
              </vs-td>
                 <vs-td>
                <p class="product-name font-medium truncate">{{ tr.SO_LUONG_CL }}</p>
              </vs-td>
              <vs-td class="whitespace-no-wrap">
                <vs-button @click="editData(tr)" size="small"> <vs-icon icon="edit"></vs-icon></vs-button>
                <vs-button @click="editManager(tr)" size="small"> <vs-icon icon="delete"></vs-icon></vs-button>
              </vs-td>

            </vs-tr>
          </tbody>
        </template>
         </vs-table>
    </div>
</template>

<script>
import SidebarActionProduct from './sidebarActionProduct.vue'
import VSelect from 'vue-select'
import { mapGetters } from 'vuex'
export default {
    components:{
        'sidebar-action-product': SidebarActionProduct,
        VSelect
        
    },
    data()
    {
        return {
            sidebarData: {},
            isSidebarActive: false,
            data: [],
            selected_store: null
        }
    },
    computed:{
      ...mapGetters(["LIST_PRODUCT", "LIST_STORE"]),
      stores: {
          get()
          {
              return this.$store.state.store.stores
              
          },

      },
    },
    methods: 
    {
        addNewData() {
        this.sidebarData = {}
        // this.toggleDataSidebar(true)
        this.isSidebarActive = true
        },
        editData(data)
        {
          this.isSidebarActive = true
          this.sidebarData = data
        }
    },
    created()
    {
      this.$store.dispatch('fetchProduct').then(() => {
        this.$store.dispatch("fetchStore")
      })
      

    }
}
</script>

<style lang="css">
  .image-product {
    width: 100%;
    height: auto;
    max-width: 70px;
  }
  .select-store {min-width: 200px;}
  .header-table-search {margin-bottom: 15px;}
</style>