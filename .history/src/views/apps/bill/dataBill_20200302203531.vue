<template>
    <div>
        <vs-table ref="table" :data="BILLS_LOCAL" >
          <div slot="header" class="header-table-search flex flex-wrap-reverse items-center flex-grow justify-between">
                <!-- {{stores}} -->
                <v-select class="select-store"  placeholder="Chọn khách hàng"  v-model="selected_store" :options="stores" value="ID_CUA_HANG"  label="TEN_CUA_HANG" ></v-select>

                <vs-button type="border" icon-pack="feather" icon="icon-plus" @click="addNewData">Thêm mới</vs-button>

            </div>

            
          <template slot="thead">
            <vs-th sort-key="image">STT</vs-th>
            <vs-th sort-key="managers">CỬA HÀNG</vs-th>
            <vs-th sort-key="managers">KHÁCH HÀNG</vs-th>
            <vs-th sort-key="category">SẢN PHẨM MUA</vs-th>
            <vs-th sort-key="category">TỔNG TIỀN HÓA ĐƠN</vs-th>
            <vs-th>TỔNG TIỀN SAU KHI THANH TOÁN</vs-th>
            <vs-th sort-key="category">NGƯỜI LẬP HÓA ĐƠN</vs-th>
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
                  <p class="product-name font-medium truncate">{{ tr.TEN_CUA_HANG }}</p>
                </vs-td>

                <vs-td>
                  <p class="product-name font-medium truncate">{{ tr.TEN_KH }}</p>
                </vs-td>

                <vs-td class="content-table">
                  <p v-for="(product,indx) in renderListProduct(tr.VALUE_HOA_DON)" :key="indx">
                    <strong>Tên sản phẩm: </strong> {{product.TEN_SAN_PHAM}}  <br/>
                    <strong>Giá sản phẩm: </strong> {{(product.GIA_SAN_PHAM).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}} vnđ  <br/>
                    <strong>Số lượng mua: </strong> {{product.SO_LUONG}}  <br/>
                  </p>
                </vs-td>

                <vs-td>
                  <p class="product-name font-medium truncate">{{ (tr.TONG_TIEN).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') }} vnđ    </p>
                </vs-td>
                 <vs-td>
                  <p class="product-name font-medium truncate">{{ (tr.TONG_TIEN_SAU_KHI_GIAM).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') }} vnđ    </p>
                </vs-td>
                <vs-td>
                  <p class="product-name font-medium truncate">{{ tr.HO_TEN_USER }}</p>
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
    data()
    {
        return {
            BILLS_LOCAL: []
        }  
    },
    computed:
    {
        ...mapGetters(["BILLS"]),
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
      renderListProduct(ListProduct)
      {
        const LIST = JSON.parse(ListProduct)
        return LIST
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
        this.$store.dispatch('fetchBill')
    }
}
</script>