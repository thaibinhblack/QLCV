<template>
<ul class="list-product" >
    <li>{{product.TEN_SAN_PHAM}}</li>
    <li>{{product.GIA_SAN_PHAM}}</li>
    <li>{{product.SO_LUONG_HT}}</li>
    <li><vs-input-number min="0" :max="product.SO_LUONG_HT" v-model="number"/></li>
</ul>
</template>

<script>
export default {
    props: ["product"],
    data()
    {
        return {
            number: 0
        }
    }
}
</script>