<template>
    <div>
        <vs-table ref="table" :data="LIST_CUSTOMER_SYSTEM_LOCAL" >
          <div style="margin-bottom: 15px;" slot="header" class="header-table-search flex flex-wrap-reverse  flex-grow ">
                <v-select class="select-store"  placeholder="Chọn thành phố"  v-model="select_province" :options="LIST_PROVINCE" value="ID_PROVINCE"  label="NAME_PROVINCE" ></v-select>
                
                <v-select class="select-phan-loai" placeholder="Chọn quận / huyện" v-model="select_district" :options="LIST_DISTRICT_LOCAL"  value="ID_DISTRICT"  label="NAME_DISTRICT" ></v-select>

                <vs-button style="margin-left: 10px;" type="border"><vs-icon icon="search"></vs-icon></vs-button>
            </div>

            
          <template slot="thead">
            <vs-th sort-key="image">STT</vs-th>
            <vs-th>TÊN KHÁCH HÀNG</vs-th>
            <vs-th>SĐT</vs-th>
            <vs-th>THÀNH PHỐ</vs-th>
            <vs-th>QUẬN HUYỆN</vs-th>
            <vs-th>ĐỊA CHỈ KHÁCH HÀNG</vs-th>
            <vs-th>NGÀY SINH</vs-th>
            <vs-th>GIỚI TÍNH</vs-th>
            <vs-th>SỐ TIỀN ĐÃ CHI</vs-th>
          </template>
          <template slot-scope="{data}">
            <tbody>
              <vs-tr :data="tr" :key="index" v-for="(tr, index) in data">


                <vs-td>
                 {{index + 1}}
                </vs-td>


                <vs-td>
                  <p>{{ tr.TEN_KH }}</p>
                </vs-td>

                <vs-td>
                  <p>{{ tr.SDT_KH }}</p>
                </vs-td>
                
                <vs-td>
                  <p>{{ tr.NAME_PROVINCE }}</p>
                </vs-td>

                <vs-td>
                  <p>{{ tr.NAME_DISTRICT }}</p>
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

                <vs-td>{{(tr.TONG_TIEN_KH_CHI).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}} vnđ</vs-td>

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
            select_province: null,
            select_district: null,
            isSidebarActive: false,
            LIST_DISTRICT_LOCAL: [],
            LIST_CUSTOMER_SYSTEM_LOCAL: [],
        }  
    },
    computed:
    {
        ...mapGetters([ "LIST_CUSTOMER_SYSTEM", "LIST_PROVINCE", "LIST_DISTRICT"]),
        stores:{
            get()
            {
                return this.$store.state.store.stores
            }
        }
    },
    watch:
    {
        LIST_CUSTOMER_SYSTEM(customers)
        {
            console.log('watch',customers)
            this.LIST_CUSTOMER_SYSTEM_LOCAL = customers
        },
        select_province(province)
        {
            if(province != null)
            {
                this.$store.dispatch('fetchDistrict',province.ID_PROVINCE)
            }
            else
            {
                this.LIST_DISTRICT_LOCAL = []
            }
        },
        LIST_DISTRICT(districts)
        {
            this.LIST_DISTRICT_LOCAL = districts
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
        this.$store.dispatch('fetchCustomerSystem')
        this.$store.dispatch('fetchProvince')
    }
}
</script>
<style scoped>
.select-store,.select-phan-loai {min-width: 250px;;}
.select-phan-loai{margin-left:  15px;;}
</style>