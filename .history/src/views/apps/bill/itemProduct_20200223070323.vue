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
    },
    watch:
    {
        number(val)
        {
            if(val > 0)
            {
                this.$store.dispatch("addBill",{
                    ID_SAN_PHAM: this.product.ID_SAN_PHAM,
                    TEN_SAN_PHAM: this.product.TEN_SAN_PHAM,
                    SO_LUONG: val
                })
            }
            else
            {
                this.$store.dispatch("removeBill",this.product.ID_SAN_PHAM)
            }
        }
    }
}
</script>