<template>
    <div>
        <vs-table ref="table" :data="BILLS_LOCAL" >
           
        <template slot="thead">
          <vs-th sort-key="image">STT</vs-th>
          <vs-th sort-key="managers">NGƯỜI THAO TÁC</vs-th>
          <vs-th sort-key="managers">HÓA ĐƠN</vs-th>
          <vs-th sort-key="category">HÌNH THỨC THAO TÁC</vs-th>
          <vs-th sort-key="category">NGÀY THAO TÁC</vs-th>
          </template>
          <template slot-scope="{data}">
            <tbody>
              <vs-tr :data="tr" :key="index" v-for="(tr, index) in data">


                <vs-td>
                 {{index + 1}}
                </vs-td>

                <vs-td>
                  <p class="product-name font-medium truncate">{{ tr.TEN_CUA_HANG }}</p>
                </vs-td>

                <vs-td>
                  <p class="product-name font-medium truncate">{{ tr.TEN_KH }}</p>
                </vs-td>

                <vs-td>
                 
                </vs-td>

                <vs-td>
                  <p class="product-name font-medium truncate">{{ (tr.TONG_TIEN).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') }} vnđ    </p>
                </vs-td>
                <vs-td>
                  <p class="product-name font-medium truncate">{{ tr.HO_TEN_USER }}</p>
                </vs-td>

                <vs-td>
                  <p class="product-name font-medium truncate">{{ tr.CREATED_AT }}</p>
                </vs-td>



                <vs-td class="whitespace-no-wrap">
                  <vs-button @click="editData(tr)" size="small"> <vs-icon icon="edit"></vs-icon></vs-button>
                  <vs-button @click="deleteData(tr)" size="small"> <vs-icon icon="delete"></vs-icon></vs-button>
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
    data()
    {
        return {
            BILLS_LOCAL: []
        }  
    },
    computed:
    {
        ...mapGetters(["BILLS"])
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
        this.$store.dispatch('fetchLogBill')
    }
}
</script>