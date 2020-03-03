<template>
    <div id="data-list-list-view" class="data-list-container">
        <sidebar-action-product :isSidebarActive="isSidebarActive" @closeSidebar="isSidebarActive = $event" :data="sidebarData" />
         <vs-table ref="table" :data="products" >
            <div slot="header" class="header-table-search flex flex-wrap-reverse items-center flex-grow justify-between">
                <!-- {{stores}} -->
                <v-select class="select-store"  placeholder="Chọn khách hàng"  v-model="selected_store" :options="stores" value="ID_CUA_HANG"  label="TEN_CUA_HANG" ></v-select>

                <vs-button type="border" icon-pack="feather" icon="icon-plus" @click="addNewData">Thêm mới</vs-button>

            </div>

        <template slot="thead">
          <vs-th sort-key="image">Hình ảnh</vs-th>
          <vs-th sort-key="managers">Cửa hàng</vs-th>
          <vs-th sort-key="managers">Tên sản phẩm</vs-th>
          <vs-th sort-key="category">Giá</vs-th>
          <vs-th sort-key="popularity">SL</vs-th>
          <vs-th sort-key="price">SL hiện tại </vs-th>
          <vs-th sort-key="price">SL còn lại </vs-th>
          <vs-th>Thao tác</vs-th>
        </template>
        <template slot-scope="{data}">
          <tbody>
            <vs-tr>
              <vs-td></vs-td>
              <vs-td> <vs-input type="text" v-model="SEARCH_TEN_SAN_PHAM" @change="search('TEN_SAN_PHAM',SEARCH_TEN_SAN_PHAM)"> </vs-input></vs-td>
              
              <vs-td>
                  <vs-input type="text" v-model="SEARCH_TEN_SAN_PHAM" @change="search('TEN_SAN_PHAM',SEARCH_TEN_SAN_PHAM)"></vs-input>
              </vs-td>

              <vs-td>
                  <vs-input class="w-50" type="number" v-model="SEARCH_TEN_SAN_PHAM" @change="search('TEN_SAN_PHAM',SEARCH_TEN_SAN_PHAM)"></vs-input>
              </vs-td>

              <vs-td>
                  <vs-input class="w-50" type="number" v-model="SEARCH_TEN_SAN_PHAM" @change="search('TEN_SAN_PHAM',SEARCH_TEN_SAN_PHAM)"></vs-input>
              </vs-td>

            </vs-tr>
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
              <vs-td>
               <img :src="$store.state.config.PUBLIC_URL + tr.HINH_ANH_DAI_DIEN" alt="" class="image-product">
              </vs-td>
              <vs-td>
                {{tr.TEN_CUA_HANG}}
              </vs-td>
              <vs-td>
                <p class="product-name font-medium truncate"><a :href="'/apps/product/'+tr.ID_SAN_PHAM"> {{ tr.TEN_SAN_PHAM }} </a> </p>
              </vs-td>
              <vs-td>
                <p class="product-name font-medium truncate">{{ tr.GIA_SAN_PHAM.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}} vnđ</p>
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
                <vs-button class="btn-not-color" @click="editData(tr)" size="small"> <vs-icon icon="edit"></vs-icon></vs-button>
                <vs-button class="btn-not-color" @click="deleteData(tr)" size="small"> <vs-icon icon="delete"></vs-icon></vs-button>
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
            selected_store: null,
            products: this.LIST_PRODUCT,
            SEARCH_TEN_SAN_PHAM: "",
            product: {}
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
    watch:
    {
      LIST_PRODUCT(products)
      {
        this.products = products
      },
      selected_store(store)
      {
        // console.log(store)
        if(store != null)
        {
          this.products = this.LIST_PRODUCT.filter((value,index,array) => {
            // console.log(array[index])
            return array[index].ID_CUA_HANG == store.ID_CUA_HANG
          })
        }
        else
        {
          this.products = this.LIST_PRODUCT;
        }
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
        },
        search(cloumn,value_saerch)
        {
          if(value_saerch != '')
          {
            this.products = this.products.filter((value,index,array) => {
              return (array[index][cloumn]).toLowerCase().indexOf((value_saerch).toLowerCase()) > -1
            })
          }
          else
          {
            this.products = this.LIST_PRODUCT
          }
        },
        deleteData(data)
        {
            this.product = data
            this.$vs.dialog({
              type:'confirm',
              color: 'warning',
              title: `Cảnh báo`,
              text: 'Bạn có đồng ý xóa sản phẩm này?',
              accept: this.acceptAlert
            })
        },
        acceptAlert(){
            this.$store.dispatch('deleteProduct',this.product.ID_SAN_PHAM)
          .then((response) => {
            if(response.success == true)
            {
              this.$vs.notify({
                title: 'Xóa sản phẩm',
                text:response.message,
                position: 'bottom-left',
                color:'success'
              })
            }
            else
            {
              this.$vs.notify({
                title: 'Thêm mới sản phần',
                text:response.message,
                position: 'bottom-left',
                color:'warning'
              })
            }
          })
          .catch(() => {
            this.$vs.notify({
                title: 'Thêm mới sản phần',
                text:'Lỗi server!',
                position: 'bottom-left',
                color:'danger'
              })
          })
        },
        callStoreDeleteProduct()
        {
         
        }
    },
    created()
    {
      this.$store.dispatch('fetchProduct').then(() => {
        this.$store.dispatch("fetchStore")
      })
    },
    destroyed()
    {
      this.$store.state.product.LIST_PRODUCT = []
    }
}
</script>

<style lang="css">
.vs-button.btn-not-color {background: transparent !important;color: #333;}

  .image-product {
    width: 100%;
    height: auto;
    max-width: 70px;
  }
  .select-store {min-width: 200px;}
  .header-table-search {margin-bottom: 15px;}
</style>