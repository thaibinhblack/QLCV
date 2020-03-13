<template>
  <vs-sidebar @keyup.esc="isSidebarActiveLocal = false" click-not-close position-right parent="body" default-index="1" color="primary" class="add-new-data-sidebar items-no-padding" spacer v-model="isSidebarActiveLocal">
    <div class="mt-6 flex items-center justify-between px-6">
        <h4>PHÂN LOẠI KHÁCH HÀNG</h4>
        <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>
    <VuePerfectScrollbar class="scroll-area--data-list-add-new">
        <div class="p-6">
            <v-select class="select-store w-full" placeholder="Chọn cửa hàng" v-model="selected_store" :options="LIST_STORE" value="ID_CUA_HANG"  label="TEN_CUA_HANG"  ></v-select><br />
            <vs-input v-model="type_customer.TEN_PHAN_LOAI" class="w-full" type="text" label="Loại khách hàng" placeholder="Nhập loại khách hàng"></vs-input>
            <vs-input v-model="type_customer.SO_TIEN_PHAN_LOAI_MAX" class="w-full mt-15" type="number" label="Số tiền lớn nhất" placeholder="Nhập số tiền lớn nhất"></vs-input>
            <vs-textarea  v-model="type_customer.GHI_CHU"  label="Ghi chú" class="mt-15 w-full" name="MO_TA_SAN_PHAM" placeholder="Nhập ghi chú"  />    

        </div>
    </VuePerfectScrollbar>
    <div class="flex flex-wrap items-center p-6" slot="footer">
      <vs-button class="mr-6" @click="submitAction" >THÊM MỚI</vs-button>
      <vs-button type="border" color="danger" @click="isSidebarActiveLocal = false">Cancel</vs-button>
    </div>
  </vs-sidebar>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import {mapGetters} from 'vuex'

export default {
    components:
    {
      VuePerfectScrollbar
    },
    data()
    {
        return {
            isSidebarActiveLocal: false,
            selected_store: null,
            type_customer: {
                TEN_PHAN_LOAI: '',
                SO_TIEN_PHAN_LOAI_MAX: 0,
                GHI_CHU: ''
            }
        }
    },
    computed:
    {
        ...mapGetters(["SETTING_PHAN_LOAI", "LIST_STORE"]),
    },
    watch:
    {
        SETTING_PHAN_LOAI(boolean)
        {
            this.isSidebarActiveLocal = boolean
        },
        isSidebarActiveLocal(boolean)
        {
            if(boolean == false)
            {
                this.$store.state.customer.SETTING_PHAN_LOAI = false
            }
        },
        selected_store(store)
        {
            this.type_customer.ID_CUA_HANG = store.ID_CUA_HANG
        }
    },
    methods:
    {
        submitAction()
        {
            this.$store.dispatch('createPhanLoaiKH',this.type_customer).then((response) => {
                if(response.success == true)
                {
                // this.initValue()
                this.$vs.notify({
                    title: 'TẠO PHÂN LOẠI KHÁCH HÀNG',
                    text:response.message,
                    position: 'bottom-left',
                    color:'success'
                })
                }
                else
                {
                    this.$vs.notify({
                        title: 'TẠO PHÂN LOẠI KHÁCH HÀNG',
                        text:response.message,
                        position: 'bottom-left',
                        color:'warning'
                    })
                }
            })
            .catch(() => {
                 this.$vs.notify({
                        title: 'TẠO PHÂN LOẠI KHÁCH HÀNG',
                        text: 'Lỗi server! Xin vui lòng thử lại',
                        position: 'bottom-left',
                        color:'warning'
                    })
            })
        }
    }
}
</script>


<style lang="scss" scoped>
.card-image-customer {
  width: 150px;
  height: 200px;
  margin: auto;
  margin-bottom: 15px;
  position: relative;
}
.input-file, .Imagecustomer {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 999;
  opacity: 0;
}
.Imagecustomer {z-index: 998;opacity: 1;height: auto;}
.icon-upload-file {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 997;
  transform: translate(-50%,-50%)
}
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