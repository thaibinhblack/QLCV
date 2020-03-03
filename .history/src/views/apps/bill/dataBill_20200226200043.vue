<template>
    <div>
        <vs-table ref="table" :data="BILLS_LOCAL" >
            <div slot="header" style="width:100%">
              <vs-row vs-w="12">
                  <vs-col class="p-6"  vs-justify="left" vs-align="left" vs-lg="3" vs-sm="12" vs-xs="12" >
                      <vs-button type="border" icon-pack="feather" icon="icon-plus" @click="addNewData">Add New</vs-button>
                  </vs-col>
                   <vs-col class="p-6"  vs-justify="left" vs-align="left" vs-lg="3" vs-sm="12" vs-xs="12" >
                     <v-select class="select-store" placeholder="Nhập thể loại cửa hàng" v-model="selected_type_store" :options="TYPE_STORE" 
                value="ID_LOAI_CUA_HANG"  label="TEN_LOAI_CUA_HANG"  ></v-select>
                  </vs-col>
              </vs-row>
              
            </div>

             <template slot="thead">
          <vs-th sort-key="image">STT</vs-th>
          <vs-th sort-key="managers">CỬA HÀNG</vs-th>
          <vs-th sort-key="managers">KHÁCH HÀNG</vs-th>
          <vs-th sort-key="category">SẢN PHẨM MUA</vs-th>
          <vs-th sort-key="category">TỔNG TIỀN HÓA ĐƠN</vs-th>
          <vs-th sort-key="category">NGƯỜI LẬP HÓA ĐƠN</vs-th>
          <vs-th sort-key="popularity">NGÀY LẬP HÓA ĐƠN</vs-th>
          <vs-th sort-key="action"> </vs-th>
          </template>
          <template slot-scope="{data}">
            <tbody>
              <vs-tr :data="tr" :key="indextr" v-for="(tr, index) in data">


                <vs-td>
                 {{index}}
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
                  <p class="product-name font-medium truncate">{{ tr.TONG_TIEN }}</p>
                </vs-td>
                <vs-td>
                  <p class="product-name font-medium truncate">{{ tr.HO_TEN_USER }}</p>
                </vs-td>

                <vs-td>
                  <p class="product-name font-medium truncate">{{ tr.CREATED_AT }}</p>
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
    created()
    {
        this.$store.dispatch('fetchBill')
    }
}
</script>