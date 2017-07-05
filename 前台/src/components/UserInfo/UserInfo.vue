<script>
     /*
    * @component 修改密码组件
    * @author yxc
    * */
     import { ajax } from '../../assets/js/utils'
     import Modal from '../Modal/Modal.vue'

     // 移动号码
     const phone = /(^1[34578]\d{9}$)|(^(\(\d{3,4}\)|\d{3,4})+\-\d{7,14}$)/
     // 邮箱
     const email =/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/

    export default {
        data () {
            return {
                adminInfo: Object.freeze(JSON.parse(sessionStorage.adminUserMessage)),
                username: sessionStorage.account,
                realName: '',
                department: '',
                area: '',
                phone: '',
                email: '',
                msg: '',
                modalShow: false,
                modalType: 0
            }
        },
        computed: {
            isBtnAble () {
                return (this.phone !== this.adminInfo.phone || this.email !== this.adminInfo.email) && !this.msg
            }
        },
        methods: {
            submit () {
                ajax({
                    method: 'get',
                    url: '/updateUser.do',
                    params: {
                        accountId: sessionStorage.id,
                        phone: this.phone,
                        email: this.email
                    },
                    success: res => {
                        if (res.code) {
                            const adminInfo = Object.assign({}, this.adminInfo)
                            this.modalType = 1
                            this.modalShow = true
                            adminInfo.phone = this.phone
                            adminInfo.email = this.email
                            sessionStorage.adminUserMessage = JSON.stringify(adminInfo)
                            setTimeout(this.closeModal, 3000)
                        }
                    }
                })
            },
            closeModal () {
                this.$router.push('/')
            }
        },
        mounted () {
            this.area = this.adminInfo.area
            this.phone = this.adminInfo.phone
            this.email = this.adminInfo.email
            this.realName = this.adminInfo.name
            this.department = this.adminInfo.department
        },
        watch: {
            phone (text) {
                if (text) {
                    this.msg = phone.test(text) ? '' : '格式输入不正确'
                }
            },
            email (text) {
                if (text) {
                    this.msg = email.test(text) ? '' : '格式输入不正确'
                }
            }
        },
        components: {
            Modal
        }
    }
</script>

<template>
    <div class="update_root">
        <div class="update_wrap">
            <img class="update_line1" src="../../assets/imgs/loginLine1.png" alt="">
            <div class="update_box userInfo_box">
                <label class="update_item" for="update_username">
                    <span class="update_title">用户名</span>
                    <input class="update_input-readOnly" id="update_username"
                           type="text"
                           :placeholder="username"
                           readonly
                    >
                </label>

                <label class="update_item" >
                    <span class="update_title">真实姓名</span>
                    <input class="update_input-readOnly" type="text"
                           :placeholder="realName"
                           readonly
                    >
                </label>

                <label class="update_item" >
                    <span class="update_title">所属部门</span>
                    <input class="update_input-readOnly" type="text"
                           :placeholder="department"
                           readonly
                    >
                </label>

                <label class="update_item" >
                    <span class="update_title">行政区</span>
                    <input class="update_input-readOnly" type="text"
                           :placeholder="area"
                           readonly
                    >
                </label>

                <label class="update_item" for="userInfo_tel">
                    <span class="update_title">联系电话</span>
                    <input class="update_input" id="userInfo_tel"
                           type="text"
                           v-model.trim="phone"
                    >
                </label>

                <label class="update_item" for="userInfo_email">
                    <span class="update_title">邮箱</span>
                    <input class="update_input" id="userInfo_email"
                           type="text"
                           v-model.trim="email"
                    >
                </label>

                <p class="update_msg" v-text="msg"></p>

                <div class="update_btns">
                    <button :class="isBtnAble ? 'update_btn-submit' : 'update_btn-disable'" @click="submit">提交</button>
                    <button class="update_btn-cancel" @click="$router.back()">取消</button>
                </div>
            </div>
            <img class="update_line2" src="../../assets/imgs/loginLine1.png" alt="">
        </div>
        <Modal
                v-if="modalShow"
                :type="modalType"
                @closeModal="closeModal"
        ></Modal>
    </div>
</template>

<style lang="scss">
    @import "../../assets/css/px2rem";
    .userInfo_box {
        padding-top: px2rem(15.5);
    }
</style>