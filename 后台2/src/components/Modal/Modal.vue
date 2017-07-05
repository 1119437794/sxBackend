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
     import Btn from '../Btn/Btn.vue'
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
             },

             // 角色用户
             roleUser: {
                 default: {
                     distributed: [],
                     unDistributed: []
                 }
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
         },
         components: {
             Btn
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

            <template v-if="type === 2">
                <p class="modal_msg-confirm" v-text="text"></p>
                <div class="modal_confirmBtn">
                    <Btn status="active" @handleClick="closeModal">再想想</Btn>
                    <Btn @handleClick="sureModal">我确定</Btn>
                </div>
            </template>

            <template v-if="type === 3">
                <h2 class="modal_roleTitle">角色分配—浏览角色1</h2>
                <div class="modal_roleWrap">
                    <div class="modal_roleLeft">
                        <h3 class="modal_roleSubTitle">未分配用户</h3>
                        <ul class="modal_roleList modal_roleList-border">
                            <li class="modal_roleItem"
                                v-for="item of roleUser.unDistributed"
                            >
                                <span class="modal_roleName" v-text="item.username">用户A</span>
                                <span class="modal_role-add" @click="actRoleUser(item.id, 1)"></span>
                            </li>
                        </ul>
                    </div>
                    <div class="modal_roleRight">
                        <h3 class="modal_roleSubTitle">已分配用户</h3>
                        <ul class="modal_roleList">
                            <li class="modal_roleItem"
                                v-for="item of roleUser.distributed"
                            >
                                <span class="modal_roleName" v-text="item.username">用户A</span>
                                <span class="modal_role-sub" @click="actRoleUser(item.id, -1)"></span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="modal_roleBtn">
                    <Btn status="active" @handleClick="sureRoleUserModal">确认</Btn>
                    <Btn @handleClick="closeModal">取消</Btn>
                </div>
            </template>

            <div class="modal_close" @click="closeModal"></div>
        </div>
    </div>
</template>

<style lang="scss">
    @import "Modal.scss";
</style>