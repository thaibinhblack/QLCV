<template>
    <div>
      <setting-customer />
      <sidebar-phan-loai />
        <sidebar-customer :isSidebarActive="isSidebarActive" @closeSidebar="isSidebarActive = $event" :data="sidebarData" />
        <vs-table ref="table" :data="LIST_TYPE_LOCAL" >
          <div style="margin-bottom: 15px;" slot="header" class="header-table-search flex flex-wrap-reverse  flex-grow ">
                <!-- {{stores}} -->
                <v-select class="select-store"  placeholder="Chọn khách hàng"  v-model="selected_store" :options="stores" value="ID_CUA_HANG"  label="TEN_CUA_HANG" ></v-select>
                
                
                <vs-button style="float: right;margin-left: 15px;" type="border" icon-pack="feather" icon="icon-plus" @click="isSidebarActive = true">Thêm mới</vs-button>

            </div>

            
          <template slot="thead">
            <vs-th sort-key="image">STT</vs-th>
            <vs-th>CỬA HÀNG</vs-th>
            <vs-th>LOẠI KHÁCH HÀNG</vs-th>
            <vs-th>SỐ TIỀN CHI ÍT NHẤT</vs-th>
            <vs-th>SỐ TIỀN CHI CAO NHẤT</vs-th>
            <vs-th>GHI CHÚ</vs-th>
            <vs-th>NGÀY TẠO</vs-th>
            <!-- <vs-th sort-key="popularity">NGÀY LẬP HÓA ĐƠN</vs-th> -->
            <vs-th sort-key="action"> </vs-th>
          </template>
          <template slot-scope="{data}">
            <tbody>
              <vs-tr :data="tr" :key="index" v-for="(tr, index) in data">

                <vs-td>
                 {{index + 1}}
                </vs-td>

                <vs-td>
                    {{tr.TEN_CUA_HANG}}
                </vs-td>

                <vs-td>
                    {{tr.TEN_PHAN_LOAI}}
                </vs-td>

                <vs-td>
                    {{tr.SO_TIEN_PHAN_LOAI_MIN}}
                </vs-td>

                 <vs-td>
                    {{tr.SO_TIEN_PHAN_LOAI_MAX}}
                </vs-td>

                <vs-td>
                    {{tr.GHI_CHU}}
                </vs-td>

                 <vs-td>
                    {{tr.CREATED_AT}}
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
import { mapGetters } from 'vuex'
export default {
    components:
    {
        'sidebar-customer': () => import('@/views/apps/customer/sidebarActionCustomer.vue'),
        'setting-customer': () => import('./settingCustomerStore'),
        'sidebar-phan-loai': () => import('./sidebarSettingCustomer')
    },
    data()
    {
        return {
            LIST_TYPE_LOCAL: [],
            selected_store: null,
            isSidebarActive: false,
            sidebarData: {},
            selected_type: null
        }  
    },
    computed:
    {
        ...mapGetters(["LIST_TYPE"]),
        stores:{
            get()
            {
                return this.$store.state.store.stores
            }
        }
    },
    watch:
    {
        selected_store(store)
        {
          if(store != null)
          {
            this.LIST_TYPE_LOCAL = this.LIST_TYPE.filter((value,index,array) => {
              return array[index].ID_CUA_HANG == store.ID_CUA_HANG
            })
          }
          else
          {
            this.LIST_TYPE_LOCAL = this.LIST_TYPE
          }
        },
        LIST_TYPE(types)
        {
            this.LIST_TYPE_LOCAL = types
        }
    },
    methods:
    {
      editData(data)
      {
        this.sidebarData = data
        this.isSidebarActive = true
      },
      deleteData(data)
      {
        this.$store.dispatch("deleteBill",data.ID_HOA_DON)
        .then((response) => {
            if(response.success == true)
            {
              this.$vs.notify({
                title: 'Xóa hóa đơn',
                text:response.message,
                position: 'bottom-left',
                color:'success'
              })
            }
            else
            {
              this.$vs.notify({
                title: 'Xóa hóa đơn',
                text:response.message,
                position: 'bottom-left',
                color:'warning'
              })
            }
        })
        .catch(() => {
            this.$vs.notify({
              title: 'Xóa hóa đơn',
              text: 'Lỗi server!',
              position: 'bottom-left',
              color:'danger'
            })
        })
      }
    },
    created()
    {
        this.$store.dispatch('fetchStore')
        this.$store.dispatch('fetchCustomerStore')
        this.$store.dispatch('fetchPhanLoaiKH').then((response) => {
          console.log('Phân loại khách hàng',response)
        })
    }
}
</script>
<style scoped>
.select-store,.select-phan-loai {min-width: 250px;;}
.select-phan-loai{margin-left:  15px;;}
</style>