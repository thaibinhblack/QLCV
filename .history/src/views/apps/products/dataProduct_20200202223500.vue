<template>
    <div id="data-list-list-view" class="data-list-container">
         <vs-table ref="table" pagination >
            <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">

                <vs-button type="border" icon-pack="feather" icon="icon-plus" @click="addNewData">Add New</vs-button>
            </div>
         </vs-table>
    </div>
</template>

<script>
import SidebarActionProduct from './sidebarActionProduct.vue'
export default {
    components:{
        'sidebar-action-product': SidebarActionProduct,
        
    },
    methods: 
    {
        addNewData() {
        this.sidebarData = {}
        // this.toggleDataSidebar(true)
        this.isSidebarActive = true
        },
    }
}
</script>