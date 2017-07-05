<script>
     /*
    * @component 框架组件
    * @author yxc
    * */
     import HeaderCom from '../Header/Header.vue'
     import NavCom from '../Nav/Nav.vue'
     import Modal from '../Modal/Modal.vue'

     export default {
         components: {
             NavCom,
             HeaderCom,
             Modal
         }
     }
</script>

<template>
    <div class="framework_root">
        <!-- 头部 -->
        <HeaderCom :store="store"></HeaderCom>

        <!-- 主体 -->
        <div class="framework_body">
            <NavCom></NavCom>
            <router-view :store="store"></router-view>
        </div>

        <!-- 弹窗 -->
        <Modal
                v-show="store.modalShow"
                :type="store.modalType"
                :text="store.modalText"
                :roleUser="store.modalRoleUser"

                @closeModal="store.closeModal"
                @sureModal="store.$emit('sureModal')"

                @sureRoleUserModal="store.$emit('sureRoleUserModal')"
                @actModalRoleUser="store.actModalRoleUser"
        ></Modal>
    </div>
</template>

<style lang="scss">
    .framework_root { height: 100%; }

    .framework_body {
        display: flex;
        height: calc(100% - 70px);
    }
</style>