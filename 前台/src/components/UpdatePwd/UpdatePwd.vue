<script>
     /*
    * @component 修改密码组件
    * @author yxc
    * */
     import { ajax } from '../../assets/js/utils'
     import Modal from '../Modal/Modal.vue'

     const pwdReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/

    export default {
        data () {
            return {
                username: sessionStorage.account,
                oldPwd: '',
                newPwd: '',
                againPwd: '',
                msg: '',
                modalShow: false,
                modalType: 0
            }
        },
        computed: {
            isBtnAble () {
                return this.oldPwd && this.newPwd && this.againPwd && !this.msg
            }
        },
        methods: {
            submit () {
                ajax({
                    method: 'get',
                    url: '/updatePassword.do',
                    params: {
                        id: sessionStorage.id,
                        oldPassWord: sessionStorage.pwd,
                        passWord: this.newPwd
                    },
                    success: res => {
                        if (res.code) {
                            this.modalType = 1
                            this.modalShow = true
                            setTimeout(this.closeModal, 3000)
                        }
                    }
                })
            },
            closeModal () {
                this.$router.push('/login')
            }
        },
        watch: {
            oldPwd (text) {
                if (pwdReg.test(text)) {
                    this.msg = this.oldPwd === sessionStorage.pwd ? '' : '旧密码输入错误'
                } else {
                    this.msg = '密码格式输入不正确'
                }
            },
            newPwd (text) {
                if (pwdReg.test(text)) {
                    this.msg = text === sessionStorage.pwd ? '与旧密码相同' : ''
                } else {
                    this.msg = '密码格式输入不正确'
                }
            },
            againPwd (text) {
                this.msg = this.newPwd === text ? '' : '与新密码不一致'
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
            <div class="update_box">
                <label class="update_item" for="update_username">
                    <span class="update_title">用户名</span>
                    <input class="update_input-readOnly" id="update_username"
                           type="text"
                           :placeholder="username"
                           readonly
                    >
                </label>

                <label class="update_item" for="update_old">
                    <span class="update_title">旧密码</span>
                    <input class="update_input" id="update_old"
                           placeholder="请输入旧密码"
                           type="password"
                           v-model.trim="oldPwd"
                    >
                </label>

                <label class="update_item" for="update_new">
                    <span class="update_title">新密码</span>
                    <input class="update_input" id="update_new"
                           type="password"
                           placeholder="6-12位数字及字母的组合，区分大小写"
                           v-model.trim="newPwd"
                    >
                </label>

                <label class="update_item" for="update_again">
                    <span class="update_title">再次输入</span>
                    <input class="update_input" id="update_again"
                           type="password"
                           placeholder="请再次输入新密码"
                           v-model.trim="againPwd"
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
    @import "UpdatePwd.scss";
</style>