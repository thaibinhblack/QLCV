<template>
  <vs-sidebar click-not-close position-right parent="body" default-index="1" color="primary" class="add-new-data-sidebar items-no-padding" spacer v-model="isSidebarActiveLocal">
    <div class="mt-6 flex items-center justify-between px-6">
        <h4>{{ Object.entries(this.data).length === 0 ? "THÊM MỚI" : "CẬP NHẬT" }} SẢN PHẨM</h4>
        <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>
    <VuePerfectScrollbar class="scroll-area--data-list-add-new" :settings="settings">
       <div class="p-6">
          <vs-input label="Tên cửa hàng" v-model="store.TEN_CUA_HANG" class="mt-5 w-full" name="TEN_CUA_HANG" placeholder="Nhập tên cửa hàng" v-validate="'required'" />
          
       </div>
    </VuePerfectScrollbar>
    <div class="flex flex-wrap items-center p-6" slot="footer">
      <vs-button class="mr-6" @click="submitCH" :disabled="!isFormValid">{{Object.entries(this.data).length === 0 ? "THÊM MỚI": "CẬP NHẬT"}}</vs-button>
      <vs-button type="border" color="danger" @click="isSidebarActiveLocal = false">Cancel</vs-button>
    </div>
  </vs-sidebar>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

export default {
    components:
    {
      VuePerfectScrollbar
    },
   props: {
     isSidebarActive: {
       type: Boolean,
       required: true
     },
    data: {
      type: Object,
      default: () => {},
    }
  },

}
</script>


<style lang="scss" scoped>
.add-new-data-sidebar {
  ::v-deep .vs-sidebar--background {
    z-index: 52010;
  }

  ::v-deep .vs-sidebar {
    z-index: 52010;
    width: 400px;
    max-width: 90vw;

    .img-upload {
      margin-top: 2rem;

      .con-img-upload {
        padding: 0;
      }

      .con-input-upload {
        width: 100%;
        margin: 0;
      }
    }
  }
}

.scroll-area--data-list-add-new {
    height: calc(100% - 4.3rem);
}
</style>