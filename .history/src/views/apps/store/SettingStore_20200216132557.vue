<template>
    <div class="setting-store page-setting p-0">
        {{SETTING_STORE}}
        <vs-row vs-w="12" v-for="(setting,index) in settings" :key="index">
            <vs-col class="p-1" vs-type="flex" vs-justify="center" vs-align="center" vs-lg="3" vs-sm="3" vs-xs="3" >
                <vs-input label="TÊN  THUỘC TÍNH" v-model="setting.NAME_ATTRIBUTE" class="mt-5 w-full" name="TEN_CUA_HANG" placeholder="Nhập tên thuộc tính" v-validate="'required'" />
            </vs-col>
            <vs-col class="p-1" vs-type="flex" vs-justify="center" vs-align="center" vs-lg="4" vs-sm="4" vs-xs="4">
                <vs-input label="GHI CHÚ" v-model="setting.NOTE_ATTRIBUTE"  class="mt-5 w-full" name="TEN_CUA_HANG" placeholder="Nhập tên thuộc tính" v-validate="'required'" />
            </vs-col>
            <vs-col class="p-1" vs-type="flex" vs-justify="center" vs-align="center" vs-lg="3" vs-sm="3" vs-xs="3">
                <!-- <p>KIỂU THUỘC TÍNH</p> <br/> -->
                <select class="vs-inputx vs-input--input normal" v-model="setting.TYPE_ATTRIBUTE" id="select-type-attribute">
                    <option value="0">Kiểu thuộc tính</option>
                    <option value="text">Kiểu chuỗi - string</option>
                    <option value="number">Kiểu số - number </option>
                    <option value="file">Kiểu file - file</option>
                </select>
            </vs-col>
            <vs-col  vs-type="flex" vs-justify="center" vs-align="center" vs-lg="2" vs-sm="2" vs-xs="2">
                <vs-button @click="remove_setting(index)" class="btn-remove" color="warning" icon="close"></vs-button>
            </vs-col>
            
        </vs-row>
        <vs-row  vs-w="12" style="margin-top: 15px;">
            <vs-col class="p-1" vs-type="flex"  vs-align="center" vs-lg="12" vs-sm="12" vs-xs="12">
                <vs-button class="mr-6" color="success" @click="add_setting()">THÊM MỚI</vs-button>
                <vs-button class="mr-6" color="primary" @click="update_setting()">CẬP NHẬT</vs-button>
             </vs-col>
        </vs-row>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data()
    {
        return {
           settings: [
               {
                   NAME_ATTRIBUTE: '',
                   NOTE_ATTRIBUTE: '',
                   TYPE_ATTRIBUTE: '0'
               }
           ]
        }
    },
    computed:
    {
        ...mapGetters(["SETTING_STORE"])
    },
    watch:
    {
        SETTING_STORE(val)
        {
            this.settings = val
        }
    },
    methods:
    {
        add_setting()
        {
            this.settings.push(
                {
                   NAME_ATTRIBUTE: '',
                   NOTE_ATTRIBUTE: '',
                   TYPE_ATTRIBUTE: '0'
               }
            )
        },
        remove_setting(index)
        {
            this.settings.splice(index,1)
        },
        update_setting()
        {
            this.$store.dispatch("createSetting",{
                type_setting: 'store',
                value_setting: this.settings
            }).then((response) => {
                console.log(response)
            })
        }
    },
    created()
    {
        this.$store.dispatch('fetchSetting','store')

    }
}
</script>

<style scoped>
#select-type-attribute,.btn-remove {margin-top: 33px;}
</style>