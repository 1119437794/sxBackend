<script>
     /*
    * @component 模态框组件
    * @author yxc
    *
    * <Modal
            :type="3"
            text="您确定需要删除该用户吗，删除之后将不能恢复该用户所有信息！"
            @closeModal="closeModal"
      ></Modal>
    * */
     export default {
         props: {
             /*
             * 弹框类型
             * 0 - 错误提示弹框
             * 1 - 正确提示弹框
             * 2 - 确认框
             * 3 - 角色添加框
             * */
             type: {
                 default: 0
             },

             // 弹框提示文本
             text: {
                 default: '提交成功！'
             }
         },
         computed: {
             // 针对 type = 3 时针对弹框设置大小
             style3Obj () {
                 return {
                     width: '600px',
                     height: '500px'
                 }
             }
         },
         methods: {
             closeModal () {
                 this.$emit('closeModal')
             },
             // 点击确认按钮回调
             sureModal () {
                 this.$emit('closeModal')
                 this.$emit('sureModal')
             },
             // 点击选择角色用户后确认按钮回调
             sureRoleUserModal () {
                 this.$emit('closeModal')
                 this.$emit('sureRoleUserModal')
             },
             // 增减角色用户回调
             actRoleUser (id, type) {
                 this.$emit('actModalRoleUser', {
                     id,
                     type
                 })
             }
         }
     }
</script>

<template>
    <div class="modal_root">

        <div class="modal_body" :style="type === 3 ? style3Obj : null">

            <template v-if="type === 0">
                <img class="modal_icon-err" src="../../assets/imgs/modal_err.png" alt="">
                <p class="modal_msg-err" v-text="text"></p>
            </template>

            <template v-if="type === 1">
                <img class="modal_icon-ok" src="../../assets/imgs/modal_ok.png" alt="">
                <p class="modal_msg-ok" v-text="text"></p>
            </template>

            <div class="modal_close" @click="closeModal"></div>
        </div>
    </div>
</template>

<style lang="scss">
    @import "Modal.scss";
</style>