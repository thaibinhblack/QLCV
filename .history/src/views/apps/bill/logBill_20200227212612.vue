<template>
    <div>
        <vs-table ref="table" :data="LIST_LOG_LOCAL" >
           
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

                <vs-td>{{HO_TEN_USER}}</vs-td>
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
            LIST_LOG_LOCAL: []
        }  
    },
    computed:
    {
        ...mapGetters(["LIST_LOG"])
    },
    watch:
    {
        LIST_LOG(new_logs)
        {
            this.LIST_LOG_LOCAL = new_logs
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