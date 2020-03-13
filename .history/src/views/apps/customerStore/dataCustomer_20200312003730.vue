<template>
    <div>
      <setting-customer />
      <sidebar-phan-loai :data="{}" />
        <sidebar-customer :isSidebarActive="isSidebarActive" @closeSidebar="isSidebarActive = $event" :data="sidebarData" />
        <vs-table ref="table" :data="LIST_CUSTOMER_LOCAL" >
          <div style="margin-bottom: 15px;" slot="header" class="header-table-search flex flex-wrap-reverse  flex-grow ">
                <!-- {{stores}} -->
                <v-select class="select-store"  placeholder="Chọn khách hàng"  v-model="selected_store" :options="stores" value="ID_CUA_HANG"  label="TEN_CUA_HANG" ></v-select>
                
                <v-select class="select-phan-loai" placeholder="Nhập loại khách hàng" v-model="selected_type" :options="LIST_TYPE_LOCAL"  value="ID_PHAN_LOAI"  label="TEN_PHAN_LOAI" ></v-select>
                
                <vs-button style="float: right;margin-left: 15px;" type="border" icon-pack="feather" icon="icon-plus" @click="isSidebarActive = true">Thêm mới</vs-button>

            </div>

            
          <template slot="thead">
            <vs-th sort-key="image">STT</vs-th>
            <vs-th>LOẠI KH</vs-th>
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

                <vs-td>
                    {{rednerPhanLoaiKH(tr)}}
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

                 <vs-td style="width: 150px;">
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
        'sidebar-customer': () => import('@/views/apps/customer/sidebarActionCustomer.vue'),
        'setting-customer': () => import('./settingCustomerStore'),
        'sidebar-phan-loai': () => import('./sidebarSettingCustomer')
    },
    data()
    {
        return {
            BILLS_LOCAL: [],
            selected_store: null,
            isSidebarActive: false,
            sidebarData: {},
            LIST_CUSTOMER_LOCAL: [],
            LIST_TYPE_LOCAL: [],
            selected_type: null
        }  
    },
    computed:
    {
        ...mapGetters(["BILLS", "LIST_CUSTOMER", "LIST_TYPE"]),
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
        },
        selected_store(store)
        {
          if(store != null)
          {
            this.LIST_TYPE_LOCAL = this.LIST_TYPE.filter((value,index,array) => {
              return array[index].ID_CUA_HANG == store.ID_CUA_HANG
            })
            this.LIST_CUSTOMER_LOCAL =  this.LIST_CUSTOMER.filter((value,index,array) => {
              return array[index].ID_CUA_HANG == store.ID_CUA_HANG
            })
          }
          else
          {
            this.LIST_TYPE_LOCAL = []
            this.LIST_CUSTOMER_LOCAL = this.LIST_CUSTOMER
          }
        },
        LIST_CUSTOMER(customers)
        {
          this.LIST_CUSTOMER_LOCAL = customers
        },
        selected_type(type)
        {
          if(type != null)
          {
            const IndexType = this.LIST_TYPE.findIndex((t) => t.TEN_PHAN_LOAI =  type.TEN_PHAN_LOAI)
            console.log(IndexType)
            this.LIST_CUSTOMER_LOCAL = this.LIST_CUSTOMER.filter((value,index,array) => {
              return array[index].SO_TIEN_DA_CHI >= type.SO_TIEN_PHAN_LOAI_MIN && array[index].SO_TIEN_DA_CHI < type.SO_TIEN_PHAN_LOAI_MAX
            })
          }else
          {
            this.LIST_CUSTOMER_LOCAL = this.LIST_CUSTOMER.filter((value,index,array) => {
              return array[index].ID_CUA_HANG == this.selected_store.ID_CUA_HANG 
            })
          }
        }
    },
    methods:
    {
      rednerPhanLoaiKH(data)
      {
        const TEN_PHAN_LOAI =  this.LIST_TYPE.filter((value,index,array) => {
          return array[index].ID_CUA_HANG == data.ID_CUA_HANG && data.SO_TIEN_DA_CHI >= array[index].SO_TIEN_PHAN_LOAI_MIN && data.SO_TIEN_DA_CHI < array[index].SO_TIEN_PHAN_LOAI_MAX
        })
        console.log(TEN_PHAN_LOAI)
        if(TEN_PHAN_LOAI.length > 0)
        {
          return TEN_PHAN_LOAI[0].TEN_PHAN_LOAI
        }
        else{
          return 'Chưa phân loại'
        }
        // console.log(TEN_PHAN_LOAI)
      },
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