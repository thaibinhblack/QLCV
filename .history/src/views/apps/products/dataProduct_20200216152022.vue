<template>
    <div id="data-list-list-view" class="data-list-container">
        <sidebar-action-product :isSidebarActive="isSidebarActive" @closeSidebar="isSidebarActive = $event" :data="sidebarData" />
         <vs-table ref="table"  >
            <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">

                <vs-button type="border" icon-pack="feather" icon="icon-plus" @click="addNewData">Add New</vs-button>
            </div>

             <template slot="thead">
          <vs-th sort-key="image">Hình ảnh</vs-th>
          <vs-th sort-key="managers">Tên sản phẩm</vs-th>
          <vs-th sort-key="category">Giá</vs-th>
          <vs-th sort-key="popularity">SL</vs-th>
          <vs-th sort-key="price">SL hiện tại </vs-th>
          <vs-th sort-key="price">SL còn lại </vs-th>
          <vs-th>Thao tác</vs-th>
        </template>
        <template slot-scope="{data}">
          <tbody>
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">


              <vs-td class="whitespace-no-wrap">
                <vs-button @click="editData(tr)" size="small"> <vs-icon icon="edit"></vs-icon></vs-button>
                <vs-button @click="editManager(tr)" size="small"> <vs-icon icon="group"></vs-icon></vs-button>
              </vs-td>

            </vs-tr>
          </tbody>
        </template>
         </vs-table>
    </div>
</template>

<script>
import SidebarActionProduct from './sidebarActionProduct.vue'
export default {
    components:{
        'sidebar-action-product': SidebarActionProduct,
        
    },
    data()
    {
        return {
            sidebarData: {},
            isSidebarActive: false,
            data: []
        }
    },
    methods: 
    {
        addNewData() {
        this.sidebarData = {}
        // this.toggleDataSidebar(true)
        this.isSidebarActive = true
        },
    },
    created()
    {
      this.$store.dispatch('fetchProduct')
    }
}
</script>