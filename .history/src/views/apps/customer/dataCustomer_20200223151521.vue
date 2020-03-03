<template>
    <div id="data-list-list-view" class="data-list-container">
        <sidebar-action-customer :isSidebarActive="isSidebarActive" @closeSidebar="isSidebarActive = $event" :data="sidebarData" />
        
         <vs-table ref="table" :data="LIST_CUSTOMER_LOCAL" >
            <div slot="header" >
              <vs-row vs-w="12">
                  <vs-col class="p-6" vs-type="flex" vs-justify="left" vs-align="left" vs-lg="4" vs-sm="12" vs-xs="12" >
                      <vs-button type="border" icon-pack="feather" icon="icon-plus" @click="addNewData">Add New</vs-button>
                  </vs-col>
                   <vs-col class="p-6" vs-type="flex" vs-justify="left" vs-align="left" vs-lg="4" vs-sm="12" vs-xs="12" >
                     <v-select class="select-store" placeholder="Nhập thể loại cửa hàng" v-model="selected_type_store" :options="TYPE_STORE" 
                value="ID_LOAI_CUA_HANG"  label="TEN_LOAI_CUA_HANG"  ></v-select>
                  </vs-col>
              </vs-row>
              
              
            </div>

             <template slot="thead">
          <vs-th sort-key="image">TEN KHÁCH HÀNG</vs-th>
          <vs-th sort-key="managers">NGÀY SINH</vs-th>
          <vs-th sort-key="managers">SDT</vs-th>
          <vs-th sort-key="category">GIỚI TÍNH</vs-th>
          <vs-th sort-key="category">THÀNH PHỐ</vs-th>
          <vs-th sort-key="category">QUẬN / HUYỆN</vs-th>
          <vs-th sort-key="popularity">DC KH</vs-th>
          <vs-th sort-key="price">LOẠI KHÁCH HÀNG </vs-th>
          <vs-th sort-key="money">TỔNG TIỀN CHI </vs-th>
          <vs-th sort-key="action"> </vs-th>
        </template>
        <template slot-scope="{data}">
          <tbody>
            <vs-tr>
              <vs-td>
                <vs-input type="text" v-model="search_ten" @change="search_ten()"></vs-input>
              </vs-td>
              <vs-td>
                
              </vs-td>
              <vs-td>
                <vs-input type="text" v-model="search_sdt" @change="search_sdt()"></vs-input>
              </vs-td>
              <vs-td>
                <v-select
                  :items="genders"
                  v-model="value"
                  label="label"
                ></v-select>
              </vs-td>
              <vs-td></vs-td>
              <vs-td></vs-td>
              <vs-td></vs-td>
              <vs-td></vs-td>
               <vs-td></vs-td>
              <vs-td></vs-td>
            </vs-tr>
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">


              <vs-td>
                <p class="product-name font-medium truncate"><a :href="'/apps/product/'+tr.UUID_KH"> {{ tr.TEN_KH }} </a> </p>
              </vs-td>

               <vs-td>
                <p class="product-name font-medium truncate">{{ tr.NGAY_SINH_KH }}</p>
              </vs-td>

              <vs-td>
                <p class="product-name font-medium truncate">{{ tr.SDT_KH }}</p>
              </vs-td>

               <vs-td>
                <p class="product-name font-medium truncate">{{ tr.GT_KH == 0 ? 'Nam' : 'Nữ'}}</p>
              </vs-td>

              <vs-td>
                <p class="product-name font-medium truncate">{{ tr.NAME_PROVINCE }}</p>
              </vs-td>
              <vs-td>
                <p class="product-name font-medium truncate">{{ tr.NAME_DISTRICT }}</p>
              </vs-td>

               <vs-td>
                <p class="product-name font-medium truncate">{{ tr.DC_NHA_KH }}</p>
              </vs-td>

               <vs-td>
                <p class="product-name font-medium truncate">{{ tr.LOAI_KH }}</p>
              </vs-td>

              <vs-td>
                <p class="product-name font-medium truncate">{{ tr.TONG_TIEN_KH_CHI.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') }}</p>
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
import { mapGetters } from 'vuex'
import sidebarActionCustomerVue from './sidebarActionCustomer.vue'
export default {
    components:{
        'sidebar-action-customer': sidebarActionCustomerVue,
        
    },
    data()
    {
        return {
            sidebarData: {},
            isSidebarActive: false,
            data: [],
            search_sdt: "",
            search_ten: "",
            LIST_CUSTOMER_LOCAL: this.LIST_CUSTOMER,
            selected_type_store: {}
        }
    },
    computed:{
      ...mapGetters(["LIST_CUSTOMER", "TYPE_STORE"])
    },
    watch:
    {
      LIST_CUSTOMER(val)
      {
        this.LIST_CUSTOMER_LOCAL = val
      },
      search_sdt(val)
      {
        this.LIST_CUSTOMER_LOCAL = this.LIST_CUSTOMER.filter((value,index,array) => {
          return array[index].SDT_KH.includes(val) == true
        })
      },
      search_ten(val)
      {
        this.LIST_CUSTOMER_LOCAL = this.LIST_CUSTOMER.filter((value,index,array) => {
          return array[index].TEN_KH.includes(val) == true
        })
      }
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
    },
    created()
    {
      this.$store.dispatch('fetchCustomer')
      this.$store.dispatch('fetchTypeStore')
    }
}
</script>

<style lang="css">
  .image-product {
    width: 100%;
    height: auto;
    max-width: 70px;
  }
</style>