<script>
     /*
    * @component 组件
    * @author yxc
    * */
     import HeaderCom from '../Header/Header.vue'
     import NavCom from '../Nav/Nav.vue'
     import store from '../../store'
     import Modal from '../Modal/Modal.vue'

     export default {
         data () {
             return {
                 store
             }
         },
         computed: {
             // 是否显示公共组件部分
             headerNavShow () {
                 return this.$route.path !== '/login'
             }
         },
         components: {
             NavCom,
             HeaderCom,
             Modal
         }
     }
</script>

<template>
    <div class="framework_root">
        <HeaderCom :store="store" v-if="headerNavShow"></HeaderCom>
        <div class="framework_body">
            <NavCom v-if="headerNavShow"></NavCom>
            <router-view :store="store"></router-view>
        </div>
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
    @import "../../assets/css/public.css";
    @import "../../assets/css/common.css";
    @import "../../assets/css/font/iconfont.css";

    .framework_root {
        height: 100%;
    }
    .framework_body {
        display: flex;
        height: calc(100% - 70px);
    }
</style>