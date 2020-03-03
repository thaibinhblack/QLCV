<template>
<vs-row vs-w="12" class="form-add-product">
    <vs-col class="p-6"  vs-justify="left" vs-align="left" vs-lg="8" vs-sm="12" vs-xs="12" >
        <div class="content-product p-6">
            <vs-input v-model="product.TEN_SAN_PHAM" 
                v-validate="'required'"
                class="full-width" 
                type="text" 
                label="Tên sản phẩm" 
                name="TEN_SAN_PHAM"></vs-input>
            <span class="text-danger text-sm" v-show="errors.has('TEN_SAN_PHAM')">{{ errors.has('TEN_SAN_PHAM') == true ? 'Chưa nhập tên sản phẩm' : '' }}</span>

            <vue-editor v-model="product.NOI_DUNG_SAN_PHAM"  style="margin-top: 15px;"/>
            <vs-textarea label="Mô tả sản phẩm" v-model="product.MO_TA_SAN_PHAM" class="mt-5 w-full" name="MO_TA_SAN_PHAM" placeholder="Nhập mô tả sản phẩm"  />
        </div>

    </vs-col>

    <vs-col class="p-6"  vs-align="left" vs-lg="4" vs-sm="12" vs-xs="12" >
        <!-- {{isFormValid}} -->
        <div class="sidebar-add-product">
            <p class="title-sidebar">Cửa hàng</p>
            <div class="card-store card-sidebar p-6">
                <v-select placeholder="Chọn cửa hàng" 
                v-model="product.ID_CUA_HANG" 
                v-validate="'required'"
                :options="LIST_STORE" 
                :reduce="store => store.ID_CUA_HANG" label="TEN_CUA_HANG" 
                name="ID_CUA_HANG"/>
                <span class="text-danger text-sm" v-show="errors.has('ID_CUA_HANG')">{{ errors.has('ID_CUA_HANG') == true ? 'Chưa chọn cửa hàng' : '' }}</span>

            </div>
            <p class="title-sidebar" @click="active_info = !active_info">Thông tin sản phẩm  <vs-icon class="icon-left" :icon="active_info == false ? 'keyboard_arrow_down' : 'keyboard_arrow_up'"></vs-icon></p>
            <div class="card-sidebar card-info-product p-6" :class="{active: active_info}">
                <vs-input v-model="product.GIA_SAN_PHAM" class="full-width input-sidebar" type="number" label="Giá sản phẩm" min="1000" placeholder="Nhập giá sản phẩm"></vs-input>
                <vs-input class="full-width input-sidebar" label="Số lượng sản phẩm" type="number" v-model="product.SO_LUONG_HT" min="1"></vs-input>
                <vs-list-item class="promotion" title="Khuyến mãi">
                    <template slot="avatar">
                        <vs-checkbox v-model="product.PROMOTION" color="success"/>
                    </template>
                </vs-list-item>
               <div class="card-promotion" :class="{active: product.PROMOTION}">
                    <vs-input v-model="product.VALUE_SALE" class="full-width input-sidebar" type="number" min="0" max="100" label="Phần trăm khuyến mãi"></vs-input>
                    <vs-input v-model="product.NGAY_BD_KM" class="full-width input-sidebar" type="date" label="Ngày bắt đầu khuyến mãi"></vs-input>
                    <vs-input v-model="product.NGAY_KT_KM" class="full-width input-sidebar" type="date" label="Ngày kết thúc khuyến mãi"></vs-input>
               </div>
            </div>
            <p class="title-sidebar" @click="active_iamge = !active_iamge">Ảnh nổi bật sản phẩm  <vs-icon class="icon-left" :icon="active_iamge == false ? 'keyboard_arrow_down' : 'keyboard_arrow_up'"></vs-icon></p>
            <div class="card-image-product card-sidebar p-6" :class="{active : active_iamge}">
                <!-- {{product.HINH_ANH_DAI_DIEN}} -->
                <img class="ImageProduct" v-if="image_product != null" :src="image_product" alt="">
                <img class="ImageProduct" v-else :src="$store.state.config.PUBLIC_URL + product.HINH_ANH_DAI_DIEN" alt="">
                <input  ref="ImageProduct" type="file" class="input-file" @change="renderImageProduct()">
                <vs-icon class="icon-upload-file" icon="cloud_upload" size="20px"></vs-icon>
            </div>
            <vs-button class="btn-add-product" @click="createProduct()">Thêm mới</vs-button>
        </div>
    </vs-col>
</vs-row>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    data(){
        return {
            product: {
                GIA_SAN_PHAM: 1000,
                PROMOTION: false,
                VALUE_SALE: 0,
                NGAY_BD_KM: new Date().toISOString().substr(0,10),
                NGAY_KT_KM: new Date().toISOString().substr(0,10),
                SO_LUONG_HT: 1
            },
            active_iamge: false,
            active_info: false,
            image_product: null
        }
    },
    computed:
    {
        ...mapGetters(["LIST_STORE"]),
        isFormValid() {
            return !this.errors.any()
        },
    },
    methods:
    {
        renderImageProduct()
        {
        // var reader  = new FileReader()
        const file = this.$refs.ImageProduct.files[0]
        this.product.HINH_ANH_DAI_DIEN = file
        this.image_product  = URL.createObjectURL(file)
        },
        createProduct()
        {
            this.$store.dispatch('createProduct',this.product)
        }
    },
    created()
    {
        this.$store.dispatch("fetchStore")

    }
}
</script>

<style >
.sidebar-add-product, .content-product{background: #fff;border-radius: 5px;padding-bottom: 15px;;}
.icon-left {float: right;}
.full-width {width: 100%;}
.card-image-product {
  width: 150px;
  height: 200px;
  margin: auto;
  margin-bottom: 15px;
  position: relative;
}
.input-file, .ImageProduct {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 999;
  opacity: 0;
}
.ImageProduct {z-index: 998;opacity: 1;height: auto;}
.icon-upload-file {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 997;
  transform: translate(-50%,-50%)
}
.title-sidebar {border-bottom: 1px solid #e2e2e2;margin: 12px; padding: 12px 0;cursor: pointer;}
.card-image-product.active,.card-sidebar.active{display: none;}
.card-sidebar {padding-top: 7px !important;}
.promotion .vs-list--title{font-weight: normal !important;}
.vs-list--item.promotion {border-bottom: none;margin: 0 0 10px 0;}
.input-sidebar {margin-bottom: 10px;}
.card-promotion {display: none;}
.card-promotion.active {display: block}
.btn-add-product {margin: 10px; }
</style>px;