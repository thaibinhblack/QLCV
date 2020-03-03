<template>
  <div id="data-list-list-view" class="data-list-container">

    <sidebar-action-ch :isSidebarActive="isSidebarActive" @closeSidebar="isSidebarActive = $event"  :data="sidebarData" />
    <sidebar-action-manager :isSidebarActive="isSidebarActiveManager" @closeSidebar="isSidebarActiveManager = $event"  :store="sidebarDataStore" />
    <!-- {{products.length}} -->
    <vs-table ref="table" pagination :max-items="itemsPerPage" search :data="stores">

      <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">

        <vs-button type="border" icon-pack="feather" icon="icon-plus" @click="addNewData">Add New</vs-button>

        <!-- ITEMS PER PAGE -->
        <vs-dropdown vs-trigger-click class="cursor-pointer mb-4 mr-4">
          <!-- <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
            <span class="mr-2">{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ products.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : products.length }} of {{ products.length }}</span>
          </div> -->
          <vs-dropdown-menu>

            <vs-dropdown-item @click="itemsPerPage=4">
              <span>4</span>
            </vs-dropdown-item>
            <vs-dropdown-item @click="itemsPerPage=10">
              <span>10</span>
            </vs-dropdown-item>
            <vs-dropdown-item @click="itemsPerPage=15">
              <span>15</span>
            </vs-dropdown-item>
            <vs-dropdown-item @click="itemsPerPage=20">
              <span>20</span>
            </vs-dropdown-item>
          </vs-dropdown-menu>
        </vs-dropdown>
      </div>

        <template slot="thead">
          <vs-th sort-key="name">Tên cửa hàng</vs-th>
          <vs-th sort-key="managers">Nhân viên cửa hàng</vs-th>
          <vs-th sort-key="category">Địa chỉ</vs-th>
          <vs-th sort-key="popularity">Số điện thoại</vs-th>
          <vs-th sort-key="price">Ghi chú </vs-th>
          <vs-th v-for="(setting,index) in SETTING_STORE" :key="index"> {{setting.NAME_ATTRIBUTE}}</vs-th>
          <vs-th>Thao tác</vs-th>
        </template>
        <template slot-scope="{data}">
          <tbody>
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">

              <vs-td>
                <p class="product-name font-medium truncate">{{ tr.TEN_CUA_HANG }}</p>
              </vs-td>
              <vs-td>
                <span v-for="(user,index) in tr.managers" :key="index"> <a target="_blank" class="user_manager" :href="'/user/'+user.USERNAME_USER"> {{user.HO_TEN_USER}} </a> , </span>
                <!-- <vs-list>
                  
                    <vs-list-item v-for="(user,index) in tr.managers" :key="index" icon="check"  :title="user.HO_TEN_USER" :subtitle="user.USERNAME_USER"></vs-list-item>      
                </vs-list> -->
              </vs-td>
              <vs-td>
                <p class="product-category">{{ tr.DIA_CHI_CUA_HANG }}</p>
              </vs-td>
              
              <vs-td>
                <p class="product-category">{{ tr.SDT_CUA_HANG }}</p>
              </vs-td>

                <vs-td>
                <p class="product-category">{{ tr.GHI_CHU }}</p>
              </vs-td>
              <vs-td v-for="(option,index) in SETTING_STORE" :key="index">
                {{tr.OPTION_STORE[index].length > 0 ? tr.OPTION_STORE[index].VALUE_ATTRIBUTE : '' }}
              </vs-td>
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
import SidebarActionCH from './SidebarActionCH.vue'
import SidebarActionManager from './SidebarActionManager'
import { mapGetters } from 'vuex'

export default {
  components: {
    'sidebar-action-ch': SidebarActionCH,
    'sidebar-action-manager':  SidebarActionManager
  },
  data() {
    return {
      selected: [],
      // products: [],
      itemsPerPage: 4,
      isMounted: false,
      sidebarDataStore: {},
      // Data Sidebar
      addNewDataSidebar: false,
      sidebarData: {},
      isSidebarActive: false,
      isSidebarActiveManager: false
    }
  },
  computed: {
    ...mapGetters(["SETTING_STORE"]),
    currentPage() {
      if(this.isMounted) {
        return this.$refs.table.currentx
      }
      return 0
    },
    stores() {
      return this.$store.state.store.stores
    }
  },
  methods: {
    addNewData() {
      this.sidebarData = {}
      // this.toggleDataSidebar(true)
      this.isSidebarActive = true
    },
    deleteData(id) {
      this.$store.dispatch("dataList/removeItem", id).catch(err => { console.error(err) })
    },
    editData(data) {
      this.isSidebarActive = true
      this.sidebarData = data
      console.log(data)
    },
    editManager(data)
    {
      this.sidebarDataStore = data
      this.isSidebarActiveManager = true
    },
    getOrderStatusColor(status) {
      if(status == 'on_hold') return "warning"
      if(status == 'delivered') return "success"
      if(status == 'canceled') return "danger"
      return "primary"
    },
    getPopularityColor(num) {
      if(num > 90) return "success"
      if(num >70) return "primary"
      if(num >= 50) return "warning"
      if(num < 50) return "danger"
      return "primary"
    },
    toggleDataSidebar(val=false) {
      this.addNewDataSidebar = val
    }
  },
  created() {
    this.$store.dispatch("fetchStore")
     this.$store.dispatch('fetchSetting','store')
  },
  mounted() {
    this.isMounted = true;
  }
}
</script>

<style lang="scss">
.user_manager {
  color: #333
}
#data-list-list-view {
  .vs-con-table {

    .product-name {
      max-width: 23rem;
    }

    .vs-table--header {
      display: flex;
      flex-wrap: wrap-reverse;
      margin-left: 1.5rem;
      margin-right: 1.5rem;
      > span {
        display: flex;
        flex-grow: 1;
      }

      .vs-table--search{
        padding-top: 0;

        .vs-table--search-input {
          padding: 0.9rem 2.5rem;
          font-size: 1rem;

          &+i {
            left: 1rem;
          }

          &:focus+i {
            left: 1rem;
          }
        }
      }
    }

    .vs-table {
      border-collapse: separate;
      // border-spacing: 0 1.3rem;
      padding: 0 1rem;

      tr{
          box-shadow: 0 4px 20px 0 rgba(0,0,0,.05);
          td{
            padding: 20px;
            &:first-child{
              border-top-left-radius: .5rem;
              border-bottom-left-radius: .5rem;
            }
            &:last-child{
              border-top-right-radius: .5rem;
              border-bottom-right-radius: .5rem;
            }
          }
          td.td-check{
            padding: 20px !important;
          }
      }
    }

    .vs-table--thead{
      th {
        padding-top: 0;
        padding-bottom: 0;

        .vs-table-text{
          text-transform: uppercase;
          font-weight: 600;
        }
      }
      th.td-check{
        padding: 0 15px !important;
      }
      tr{
        background: none;
        box-shadow: none;
      }
    }

    .vs-table--pagination {
      justify-content: center;
    }
  }
}
</style>
