<template>
<vs-row vs-w="12" class="form-add-product">
    <vs-col class="p-6"  vs-justify="left" vs-align="left" vs-lg="8" vs-sm="12" vs-xs="12" >
        <vs-input class="full-width" type="text" label="Tên sản phẩm" ></vs-input>
        <vue-editor v-model="product.NOI_DUNG_SAN_PHAM"  style="margin-top: 15px;"/>
    </vs-col>
    <vs-col class="p-6"  vs-align="left" vs-lg="4" vs-sm="12" vs-xs="12" >
        <div class="sidebar-add-product">
            
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