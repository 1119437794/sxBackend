<script>
     /*
    * @component 输入框组件
    * @author yxc
    * */
     import getRandom from '../../assets/js/getPwdByRandom'

     export default {
         props: {
             // 输入框标题
             title: {
                 default: '用户名'
             },
             // 默认为文本输入框
             type: {
                 default: 'text'
             },
             // 是否必须字段
             isRequired: {
                 default: false
             },
             // 是否可用
             isEnable: {
                 default: true
             },
             // 默认提示内容
             placeholder: {
                 default: ''
             },
             // 输入文本
             value: {
                 default: ''
             },
             // 错误提示内容
             msg: {
                 default: false
             }
         },
         data () {
             return {
                 id: getRandom(10, 20), // input 唯一 id属性
             }
         },
         methods: {
             inputChange (e) {
                 this.$emit('input', e.target.value)
             },

             inputBlur (e) {
                 this.$emit('blur', e.target.value)
             }
         }
     }
</script>
<template>
    <div class="inputField_root">
        <label class="inputField_name" :for="id">
            {{title}}
            <span class="inputField_required" v-if="isRequired">*</span>
        </label>
        <input v-if="isEnable" class="inputField_input"
               :type="type"
               :id="id"
               :value="value"
               :placeholder="placeholder"
               @blur="inputBlur"
               @input="inputChange"
        >
        <input v-else class="inputField_input" :id="id" type="text" :placeholder="placeholder" disabled="isEnable" >

        <span class="inputField_msg"
              v-if="msg !== false"
              v-text="msg"
        ></span>
    </div>
</template>

<style lang="scss">
    @import "InputField.scss";
</style>