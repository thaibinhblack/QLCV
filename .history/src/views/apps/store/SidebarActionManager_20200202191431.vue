<template>
    <vs-sidebar click-not-close position-right parent="body" default-index="1" color="primary" class="add-new-data-sidebar items-no-padding" spacer v-model="isSidebarActiveLocal">
        <div class="mt-6 flex items-center justify-between px-6">
            <h4>NHÂN VIÊN QUẢN LÝ {{store.TEN_CUA_HANG}}</h4>
            <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
        </div>

        <vs-divider class="mb-0"></vs-divider>
        <VuePerfectScrollbar class="scroll-area--data-list-add-new" :settings="settings">
            <div class="p-6">

                <span>Cửa hàng</span>
                <v-select v-model="selected_store" :options="stores" value="ID_CUA_HANG"  label="TEN_CUA_HANG"  ></v-select>

                <span>Nhân viên trong hệ thống</span>
                <v-select v-model="selected_user" :options="users" value="ID_USER"  label="HO_TEN_USER"  taggable multiple ></v-select>
            </div>

            <vs-divider class="mb-0"></vs-divider>

            <vs-list>
                <vs-list-header icon="supervisor_account" title="Danh sách nhân viên của cửa hàng"></vs-list-header>
                 <vs-list-item v-for="(user,index) in selected_user" :key="index" icon="check"  :title="user.HO_TEN_USER" :subtitle="user.USERNAME_USER"></vs-list-item>
                <vs-list-item v-for="(user,index) in LIST_MANAGER" :key="index"  :title="user.HO_TEN_USER" :subtitle="user.USERNAME_USER">
                    <vs-button color="warning" type="border" icon="close" @click="REMOVE_MANAGER(user.ID_USER)"></vs-button>
                </vs-list-item>          
            </vs-list>
        </VuePerfectScrollbar>
        <div class="flex flex-wrap items-center p-6" slot="footer">
            <vs-button class="mr-6" @click="actionManagerStore()">CẬP NHẬT</vs-button>
           
        </div>
    </vs-sidebar>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import vSelect from 'vue-select'
import {mapGetters} from 'vuex'
export default {
    components:{
        VuePerfectScrollbar,
        vSelect
    },
    props: {
        store: {
            type: Object,
            required: true
        },
        isSidebarActive: {
            type: Boolean,
            required: true
        }
    },
    computed:{
        ...mapGetters(["LIST_MANAGER"]),
        users(){
            return  this.$store.state.user.users
        },
        stores: {
           get()
           {
                return this.$store.state.store.stores
               
           },

        },
        isSidebarActiveLocal: {
            get()
            {
                return this.isSidebarActive
            },
            set(val)
            {
                this.$emit('closeSidebar',val)
            }
        },
    },
    watch:
    {   
        store(val)
        {
            this.selected_store = val
            this.$store.dispatch('fetchManagerStore',val.ID_CUA_HANG)
            this.FilterManager();
        },
        selected_store()
        {
             this.$store.dispatch('fetchManagerStore',val.ID_CUA_HANG)
            this.FilterManager();
        }
    },
    data()
    {
        return {
            settings: { // perfectscrollbar settings
                maxScrollbarLength: 60,
                wheelSpeed: .60,
            },
            selected_user: [],
            selected_store: this.store
        }
    },
    methods:
    {
        actionManagerStore()
        {
            const data = {
                array_user: this.selected_user,
                id_cua_hang: this.selected_store.ID_CUA_HANG
            }
            this.$store.dispatch("createManagerStore",data).then((response) => {
                if(response.success == true)
                {
                    this.selected_user = []
                    this.$vs.notify({
                        title: 'THÊM MỚI NHÂN VIÊN',
                        text:response.message,
                        position: 'bottom-left',
                        color:'success'
                    })
                }
                else
                { this.$vs.notify({
                    title: 'THÊM MỚI NHÂN VIÊN',
                    text:response.message,
                    position: 'bottom-left',
                    color:'danger'
                    })
                }
            }).catch(() => {
                this.$vs.notify({
                    title: 'THÊM MỚI NHÂN VIÊN',
                    text:'Lỗi server!',
                    position: 'bottom-left',
                    color:'danger'
                    })
            })
        },
        FilterManager()
        {
            const managers =  this.$store.state.user.users
            this.LIST_MANAGER.forEach((manager) => {
                    const ItemStoreIndex = this.$store.state.user.users.findIndex((m) => m.ID_USER == manager.ID_USER)
                    managers.splice(ItemStoreIndex, 1)
                })
            this.users = managers
        },
        REMOVE_MANAGER(ID_USER)
        {
            this.$store.dispatch('REMOVE_MANAGER',{
                ID_USER: ID_USER,
                ID_CUA_HANG: this.store.ID_CUA_HANG
            }).then((response) => {
                if(response.success == true)
                {
                    
                    this.$vs.notify({
                        title: 'XÓA NHÂN VIÊN CỬA HÀNG',
                        text:response.message,
                        position: 'bottom-left',
                        color:'success'
                    })
                }
                else
                { this.$vs.notify({
                    title: 'XÓA NHÂN VIÊN CỬA HÀNG',
                    text:response.message,
                    position: 'bottom-left',
                    color:'danger'
                    })
                }
            })
        }
    },
    created()
    {
        this.$store.dispatch('user/fetchUsers').then((response) => {
            console.log(response)
        });
    }
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