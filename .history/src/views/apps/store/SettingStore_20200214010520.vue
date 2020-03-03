<template>
    <div class="setting-store page-setting p-0">
        <vs-row vs-w="12">
            <vs-col class="p-6" vs-type="flex" vs-justify="center" vs-align="center" vs-lg="4" vs-sm="4" vs-xs="4" >
                <vs-input label="TÊN BIẾN THUỘC TÍNH"  class="mt-5 w-full" name="TEN_CUA_HANG" placeholder="Nhập tên thuộc tính" v-validate="'required'" />
            </vs-col>
            <vs-col class="p-6" vs-type="flex" vs-justify="center" vs-align="center" vs-lg="4" vs-sm="4" vs-xs="4">
                <vs-input label="TÊN THUỘC TÍNH"  class="mt-5 w-full" name="TEN_CUA_HANG" placeholder="Nhập tên thuộc tính" v-validate="'required'" />
            </vs-col>
            <vs-col class="p-6" vs-type="flex" vs-justify="center" vs-align="center" vs-lg="4" vs-sm="4" vs-xs="4">
                <p>KIỂU THUỘC TÍNH</p>
                <select class="vs-inputx vs-input--input normal" name="" id="">
                    <option value="0">KIỂU THUỘC TÍNH</option>
                </select>
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