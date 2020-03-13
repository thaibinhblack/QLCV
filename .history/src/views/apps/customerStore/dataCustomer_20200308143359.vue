<template>
    <div>
        <sidebar-customer :isSidebarActive="isSidebarActive" @closeSidebar="isSidebarActive = $event" :data="sidebarData" />
        <vs-table ref="table" :data="LIST_CUSTOMER" >
          <div style="margin-bottom: 15px;" slot="header" class="header-table-search flex flex-wrap-reverse items-center flex-grow justify-between">
                <!-- {{stores}} -->
                <v-select class="select-store"  placeholder="Chọn khách hàng"  v-model="selected_store" :options="stores" value="ID_CUA_HANG"  label="TEN_CUA_HANG" ></v-select>

                <vs-button type="border" icon-pack="feather" icon="icon-plus" @click="isSidebarActive = true">Thêm mới</vs-button>

            </div>

            
          <template slot="thead">
            <vs-th sort-key="image">STT</vs-th>
            <vs-th>CỬA HÀNG</vs-th>
            <vs-th>TÊN KHÁCH HÀNG</vs-th>
            <vs-th>SĐT</vs-th>
            <vs-th>ĐỊA CHỈ KHÁCH HÀNG</vs-th>
            <vs-th>NGÀY SINH</vs-th>
            <vs-th>GIỚI TÍNH</vs-th>
            <vs-th>ĐIỂM TÍCH LŨY</vs-th>
            <vs-th>SỐ TIỀN ĐÃ CHI</vs-th>
            <!-- <vs-th sort-key="popularity">NGÀY LẬP HÓA ĐƠN</vs-th> -->
            <vs-th sort-key="action"> </vs-th>
          </template>
          <template slot-scope="{data}">
            <tbody>
              <vs-tr :data="tr" :key="index" v-for="(tr, index) in data">


                <vs-td>
                 {{index + 1}}
                </vs-td>
                
                <vs-td>{{tr.TEN_CUA_HANG}}</vs-td>

                <vs-td>
                  <p>{{ tr.TEN_KH }}</p>
                </vs-td>

                <vs-td>
                  <p>{{ tr.SDT_KH }}</p>
                </vs-td> 

                <vs-td>
                  <p>{{ tr.DC_NHA_KH }}</p>
                </vs-td>

                <vs-td>
                  <p>{{ tr.NGAY_SINH_KH }}</p>
                </vs-td>

                 <vs-td>
                  <p>{{ tr.GT_KH == 1 ? 'Nam' : 'Nữ' }}</p>
                </vs-td>

                 <vs-td>
                  <p>{{ tr.DIEM_TICH_LUY}}</p>
                </vs-td>

                 <vs-td style="width: 250px;">
                  <p>{{( tr.SO_TIEN_DA_CHI).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') }} vnđ</p>
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
        'sidebar-customer': () => import('@/views/apps/customer/sidebarActionCustomer.vue')
    },
    data()
    {
        return {
            BILLS_LOCAL: [],
            selected_store: null,
            isSidebarActive: false,
            sidebarData: {}
        }  
    },
    computed:
    {
        ...mapGetters(["BILLS", "LIST_CUSTOMER"]),
        stores:{
            get()
            {
                return this.$store.state.store.stores
            }
        }
    },
    watch:
    {
        BILLS(new_bills)
        {
            this.BILLS_LOCAL = new_bills
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
    }
}
</script>
<style scoped>
.select-store {width: 200px;;}
</style>