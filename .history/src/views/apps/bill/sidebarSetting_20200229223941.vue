<template>
  <vs-sidebar @keyup.esc="isSidebarActiveLocal = false" click-not-close position-right parent="body" default-index="1" color="primary" class="add-new-data-sidebar items-no-padding" spacer v-model="isSidebarActiveLocal">
    <div class="mt-6 flex items-center justify-between px-6">
        <h4>CÀI ĐẶ ĐIỂM TÍCH LŨY CHO CỬA HÀNG {{SETTING_BILL}}</h4>

        <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>
    <VuePerfectScrollbar class="scroll-area--data-list-add-new" >
        <v-select class="p-5" :options="stores" v-model="selected_store" label="TEN_CUA_HANG">
        </v-select>
        <vs-input type="number" v-model="setting.SO_TIEN" class="w-full p-5" label="Cài đặt số tiền hóa đơn"></vs-input>
        <vs-input class="p-5 w-full" v-model="setting.SO_DIEM" type="number" label="Cài đặt điểm"></vs-input>
        <p class="p-5">
          *Lưu ý: Dựa vào số tiền hóa đơn để đổi thành điểm <br/>
          - Ví dụ: 100,000 vnđ = 1 điểm thì hóa đơn khi 150,000 vnđ sẽ là 1 điểm, 200,000 vnđ sẽ là 2 điểm <br/>
          - Điểm tích lũy cũ của khách hàng sẽ không thay đổi nếu cập nhật lại, điểm lích lũy các hóa đơn từ các lần thanh toán sau sẽ thay đổi. <br/>
          - Điểm tích lũy của khách A tại cửa hàng A sẽ không được cộng ở cửa hàng B
        </p>
    </VuePerfectScrollbar>
    <div class="flex flex-wrap items-center p-6" slot="footer">
      <vs-button @click="createPoint()" type="border" color="primary" style="margin-right: 5px;">Cập nhật</vs-button>
      <vs-button type="border" color="danger" @click="isSidebarActiveLocal = false">Cancel</vs-button>
    </div>
  </vs-sidebar>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import { mapGetters } from 'vuex'

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
            setting: {
              SO_DIEM: 0,
              SO_TIEN: 0
            }
        }
    },
    computed:
    {
        ...mapGetters(["SETTING_BILL", 'SETTING_POINT']),
        stores:
        {
          get()
          {
            return this.$store.state.store.stores
          }
        }
    },
    watch:
    {
        SETTING_BILL(setting)
        {
            this.selected_store = this.$store.state.store.stores[0]
            this.isSidebarActiveLocal = setting
        },
        isSidebarActiveLocal(val)
        {
            this.$store.state.bill.SETTING_BILL = val
        },
        selected_store(store)
        {
          this.setting.ID_CUA_HANG = store.ID_CUA_HANG
          this.$store.dispatch('fetchPoint',store.ID_CUA_HANG)
        }
    },
    methods:
    {
      createPoint()
      {
        this.$store.dispatch('createPoint',this.setting)
        .then((response) => {
          if(response.success == true)
          {
              this.$vs.notify({
                title: 'CÀI ĐẶT ĐIỂM TÍCH LŨY',
                text:response.message,
                position: 'bottom-left',
                color:'success'
              })
          }
          else
          {
              this.$vs.notify({
                title: 'CÀI ĐẶT ĐIỂM TÍCH LŨY',
                text: response.message,
                position: 'bottom-left',
                color:'danger'
                })
          }
        })
        .catch(() => {
            this.$vs.notify({
              title: 'CÀI ĐẶT ĐIỂM TÍCH LŨY',
              text:'Lỗi server!',
              position: 'bottom-left',
              color:'danger'
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