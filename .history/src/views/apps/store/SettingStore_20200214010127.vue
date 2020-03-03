<template>
    <div class="setting-store page-setting p-6">
        <vs-row vs-w="12">
            <vs-col class="p-6" vs-type="flex" vs-justify="center" vs-align="center" vs-lg="3" vs-sm="4" vs-xs="4" >
                <vs-input label="TÊN BIẾN THUỘC TÍNH"  class="mt-5 w-full" name="TEN_CUA_HANG" placeholder="Nhập tên thuộc tính" v-validate="'required'" />
            </vs-col>
            <vs-col class="p-6" vs-type="flex" vs-justify="center" vs-align="center" vs-lg="3" vs-sm="4" vs-xs="4">
                <vs-input label="TÊN THUỘC TÍNH"  class="mt-5 w-full" name="TEN_CUA_HANG" placeholder="Nhập tên thuộc tính" v-validate="'required'" />
            </vs-col>
            <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-lg="2" vs-sm="4" vs-xs="4">
                vs-lg="2" vs-sm="4" vs-xs="12"
            </vs-col>
        </vs-row>
    </div>
</template>

<script>
export default {
    data()
    {
        return {
            options: [
                {
                    text: 'Kiểu chuỗi',
                    value: 'text'
                },
                {
                    text: 'Kiểu số',
                    value: 'number'
                },
                {
                    text: 'Kiểu File',
                    value: file
                }
            ]
        }
    }
}
</script>