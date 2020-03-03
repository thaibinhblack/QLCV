<template>
    <div id="data-list-list-view" class="data-list-container">
        <sidebar-action-customer :isSidebarActive="isSidebarActive" @closeSidebar="isSidebarActive = $event" :data="sidebarData" />
         <vs-table ref="table" :data="LIST_CUSTOMER" >
            <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">

                <vs-button type="border" icon-pack="feather" icon="icon-plus" @click="addNewData">Add New</vs-button>
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
          <vs-th sort-key="action"> </vs-th>
        </template>
        <template slot-scope="{data}">
          <tbody>
            <vs-tr>
              <vs-td></vs-td>
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
            data: []
        }
    },
    computed:{
      ...mapGetters(["LIST_CUSTOMER"])
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
      this.$store.dispatch('fetchCustomer')
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