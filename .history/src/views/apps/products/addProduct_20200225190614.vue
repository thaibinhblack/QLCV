<template>
<vs-row vs-w="12" class="form-add-product">
    <vs-col class="p-6"  vs-justify="left" vs-align="left" vs-lg="8" vs-sm="12" vs-xs="12" >
        <vs-input class="full-width" type="text" label="Tên sản phẩm" ></vs-input>
        <vue-editor v-model="product.NOI_DUNG_SAN_PHAM"  style="margin-top: 15px;"/>
                  <vs-textarea label="Mô tả sản phẩm" v-model="product.MO_TA_SAN_PHAM" class="mt-5 w-full" name="MO_TA_SAN_PHAM" placeholder="Nhập mô tả sản phẩm"  />

    </vs-col>
    <vs-col class="p-6"  vs-align="left" vs-lg="4" vs-sm="12" vs-xs="12" >
        <div class="sidebar-add-product">
             <vs-card class="card-image-product">
                <!-- {{product.HINH_ANH_DAI_DIEN}} -->
                <img class="ImageProduct" v-if="image_product != null" :src="image_product" alt="">
                <img class="ImageProduct" v-else :src="$store.state.config.PUBLIC_URL + product.HINH_ANH_DAI_DIEN" alt="">
                <input  ref="ImageProduct" type="file" class="input-file" @change="renderImageProduct()">
                <vs-icon class="icon-upload-file" icon="cloud_upload" size="20px"></vs-icon>
          </vs-card>
        </div>
    </vs-col>
</vs-row>
</template>

<script>
export default {
    data(){
        return {
            product: {}
        }
    }
}
</script>

<style scoped>
.full-width {width: 100%;}
</style>