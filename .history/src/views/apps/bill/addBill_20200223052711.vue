<template>
<vs-row vs-w="12">
    <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-lg="9" vs-sm="12" vs-xs="12" >
        <v-select
          :items=""
          v-model="value"
          label="label"
        ></v-select>
  </vs-col>
     <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-lg="3" vs-sm="12" vs-xs="12" >
    vs-lg="2" vs-sm="4" vs-xs="12"
  </vs-col>
</vs-row>
</template>

<script>
export default {
  created()
  {
     this.$store.dispatch("fetchStore")
  }
}
</script>