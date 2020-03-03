<template>
<vs-row vs-w="12" class="form-add-product">
    <vs-col class="p-6"  vs-justify="left" vs-align="left" vs-lg="8" vs-sm="12" vs-xs="12" >
        <div class="content-product p-6">
            <vs-input class="full-width" type="text" label="Tên sản phẩm" ></vs-input>
            <vue-editor v-model="product.NOI_DUNG_SAN_PHAM"  style="margin-top: 15px;"/>
            <vs-textarea label="Mô tả sản phẩm" v-model="product.MO_TA_SAN_PHAM" class="mt-5 w-full" name="MO_TA_SAN_PHAM" placeholder="Nhập mô tả sản phẩm"  />
        </div>

    </vs-col>
    <vs-col class="p-6"  vs-align="left" vs-lg="4" vs-sm="12" vs-xs="12" >
        <div class="sidebar-add-product">
            <p class="title-sidebar" @click="active_iamge = !active_iamge">Ảnh nổi bật sản phẩm  <vs-icon class="icon-left" :icon="active_iamge == false ? 'keyboard_arrow_down' : 'keyboard_arrow_up'"></vs-icon></p>
            <div class="card-image-product p-6" :class="{active : active_iamge}">
                <!-- {{product.HINH_ANH_DAI_DIEN}} -->
                <img class="ImageProduct" v-if="image_product != null" :src="image_product" alt="">
                <img class="ImageProduct" v-else :src="$store.state.config.PUBLIC_URL + product.HINH_ANH_DAI_DIEN" alt="">
                <input  ref="ImageProduct" type="file" class="input-file" @change="renderImageProduct()">
                <vs-icon class="icon-upload-file" icon="cloud_upload" size="20px"></vs-icon>
            </div>
            <p class="title-sidebar">Thể loại sản phẩm  <vs-icon class="icon-left" :icon="active_iamge == false ? 'keyboard_arrow_down' : 'keyboard_arrow_up'"></vs-icon></p>
            <div class="card-type-product p-6">
                    <vs-list-item title="Snickerdoodle" subtitle="An excellent companion">
                    </vs-list-item>
            </div>
        </div>
    </vs-col>
</vs-row>
</template>

<script>
export default {
    data(){
        return {
            product: {},
            active_iamge: false,
            image_product: null
        }
    },
    methods:
    {
        renderImageProduct()
        {
        // var reader  = new FileReader()
        const file = this.$refs.ImageProduct.files[0]
        this.product.HINH_ANH_DAI_DIEN = file
        this.image_product  = URL.createObjectURL(file)
        }
    }
}
</script>

<style scoped>
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
.card-image-product.active {display: none;}
</style>px;