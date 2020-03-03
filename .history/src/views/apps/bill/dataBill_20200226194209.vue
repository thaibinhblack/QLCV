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
          <vs-th sort-key="managers">SDT</vs-th>
          <vs-th sort-key="category">GIỚI TÍNH</vs-th>
          <vs-th sort-key="category">THÀNH PHỐ</vs-th>
          <vs-th sort-key="category">QUẬN / HUYỆN</vs-th>
          <vs-th sort-key="popularity">DC KH</vs-th>
          <vs-th sort-key="price">LOẠI KHÁCH HÀNG </vs-th>
          <vs-th sort-key="money">TỔNG TIỀN CHI </vs-th>
          <vs-th sort-key="action"> </vs-th>
          </template>
          <template slot-scope="{data}">
            <tbody>
              <vs-tr>
                <vs-td>
                  <vs-input type="text" v-model="search_ten" @change="search_ten()"></vs-input>
                </vs-td>
                <vs-td>
                  
                </vs-td>
                <vs-td>
                  <vs-input type="text" v-model="search_sdt" @change="search_sdt()"></vs-input>
                </vs-td>
                <vs-td>
                  <v-select
                    :items="genders"
                    v-model="value"
                    label="label"
                  ></v-select>
                </vs-td>
                <vs-td></vs-td>
                <vs-td></vs-td>
                <vs-td></vs-td>
                <vs-td></vs-td>
                <vs-td></vs-td>
                <vs-td></vs-td>
              </vs-tr>
              <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">


                <vs-td>
                  <p class="product-name font-medium truncate"><a :href="'/apps/product/'+tr.UUID_KH"> {{ tr.TEN_KH }} </a> </p>
                </vs-td>

                <vs-td>
                  <p class="product-name font-medium truncate">{{ tr.NGAY_SINH_KH }}</p>
                </vs-td>

                <vs-td>
                  <p class="product-name font-medium truncate">{{ tr.SDT_KH }}</p>
                </vs-td>

                <vs-td>
                  <p class="product-name font-medium truncate">{{ tr.GT_KH == 0 ? 'Nam' : 'Nữ'}}</p>
                </vs-td>

                <vs-td>
                  <p class="product-name font-medium truncate">{{ tr.NAME_PROVINCE }}</p>
                </vs-td>
                <vs-td>
                  <p class="product-name font-medium truncate">{{ tr.NAME_DISTRICT }}</p>
                </vs-td>

                <vs-td>
                  <p class="product-name font-medium truncate">{{ tr.DC_NHA_KH }}</p>
                </vs-td>

                <vs-td>
                  <p class="product-name font-medium truncate">{{ tr.LOAI_KH }}</p>
                </vs-td>

                <vs-td>
                  <p class="product-name font-medium truncate">{{ tr.TONG_TIEN_KH_CHI.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') }}</p>
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