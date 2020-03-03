<template>
    <vs-sidebar click-not-close position-right parent="body" default-index="1" color="primary" class="add-new-data-sidebar items-no-padding" spacer v-model="isSidebarActiveLocal">
        <div class="mt-6 flex items-center justify-between px-6">
            <h4>NHÂN VIÊN QUẢN LÝ {{store.TEN_CUA_HANG}}</h4>
        <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    </vs-sidebar>
</template>

<script>
export default {
    props: {
        store: {
            type: Object,
            required: true
        },
        isSidebarActive: {
            type: Boolean,
            required: true
        }
    }
}
</script>