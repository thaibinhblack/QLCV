<template>
    <div class="setting-store page-setting p-0">
        <vs-row vs-w="12" v-for="(setting,index) in settings" :key="index">
            <vs-col class="p-6" vs-type="flex" vs-justify="center" vs-align="center" vs-lg="3" vs-sm="3" vs-xs="3" >
                <vs-input label="TÊN BIẾN THUỘC TÍNH" v-model="setting.name_cloumn" class="mt-5 w-full" name="TEN_CUA_HANG" placeholder="Nhập tên thuộc tính" v-validate="'required'" />
            </vs-col>
            <vs-col class="p-6" vs-type="flex" vs-justify="center" vs-align="center" vs-lg="4" vs-sm="4" vs-xs="4">
                <vs-input label="TÊN THUỘC TÍNH" v-model="setting.value_column"  class="mt-5 w-full" name="TEN_CUA_HANG" placeholder="Nhập tên thuộc tính" v-validate="'required'" />
            </vs-col>
            <vs-col class="p-6" vs-type="flex" vs-justify="center" vs-align="center" vs-lg="3" vs-sm="3" vs-xs="3">
                <!-- <p>KIỂU THUỘC TÍNH</p> <br/> -->
                <select class="vs-inputx vs-input--input normal" v-model="setting.type_column" id="select-type-attribute">
                    <option value="0">Kiểu thuộc tính</option>
                    <option value="text">Kiểu chuỗi - string</option>
                    <option value="number">Kiểu số - number </option>
                    <option value="file">Kiểu file - file</option>
                </select>
            </vs-col>
            <vs-col  vs-type="flex" vs-justify="center" vs-align="center" vs-lg="2" vs-sm="2" vs-xs="2">
                <vs-button color="warning" icon="close"></vs-button>
            </vs-col>
            <vs-col class="p-6" vs-type="flex"  vs-align="center" vs-lg="12" vs-sm="12" vs-xs="12">
                <vs-button class="mr-6" color="success" @click="add_setting()">THÊM MỚI</vs-button>
                <vs-button class="mr-6" color="primary" @click="update_setting()">CẬP NHẬT</vs-button>
             </vs-col>
        </vs-row>
    </div>
</template>

<script>
export default {
    data()
    {
        return {
           settings: [
               {
                   name_cloumn: '',
                   value_column: '',
                   type_column: '0'
               }
           ]
        }
    },
    methods()
    {
        add_setting()
        {

        }
    }
}
</script>

<style scoped>
#select-type-attribute {margin-top: 33px;}
</style>