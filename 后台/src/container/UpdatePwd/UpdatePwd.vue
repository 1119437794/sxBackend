<script>
     /*
    * @component 组件
    * @author yxc
    * */
     import InputField from '../../components/InputField/InputField.vue'
     import Btn from '../../components/Btn/Btn.vue'
     import { mySessionStorage } from '../../assets/js/webStorage'
     import validate from '../../assets/js/validate'

     export default {
         props: ['store'],
         data () {
             return {
                 username: mySessionStorage.username,

                 oldPwd: '',
                 oldPwdMsg: '',

                 newPwd: '',
                 newPwdMsg: '',

                 againPwd: '',
                 againPwdMsg: '',

                 btnIsAble: false
             }
         },
         methods: {
             // 验证按钮是否可用
             checkBtnIsAble () {
                 const oldFlag = this.oldPwd && !this.oldPwdMsg
                 const newFlag = this.newPwd && !this.newPwdMsg
                 const againFlag = this.againPwd && !this.againPwdMsg
                 this.btnIsAble = oldFlag && newFlag && againFlag
             },

             blurOldPwd (text) {
                 this.oldPwdMsg = text === mySessionStorage.password ? '' : '密码错误，请重新输入'
                 this.checkBtnIsAble()
             },
             blurNewPwd (text) {
                 if (text === mySessionStorage.password) {
                     return this.newPwdMsg = '与旧密码相同，请重新输入'
                 } else {
                     this.newPwdMsg = validate.pwd.test(text) ? '' : '请输入新密码：6-12位数字及字母的组合，区分大小写'
                 }
                 this.checkBtnIsAble()
             },
             blurAgainPwd (text) {
                 this.againPwdMsg = text === this.newPwd ? '' : '密码不一致，请重新输入'
                 this.checkBtnIsAble()
             },

             // 提交修改
             submit () {
                 this.store.updatePwd(this.oldPwd, this.newPwd)
                         .then(res => {
                             const data = res.data
                             data.code ? this.store.showModalAutoClose(1, '密码修改成功') :
                                     this.store.showModal(0, '密码修改失败')
                         })
             }
         },
         mounted () {
             this.store.$once('closeModalOk', () => this.$router.push('/login'))
         },
         watch: {
             oldPwd: 'blurOldPwd',
             newPwd: 'blurNewPwd',
             againPwd: 'blurAgainPwd'
         },
         components: {
             InputField,
             Btn
         }
     }
</script>

<template>
    <div class="service_root">
        <h2 class="service_title">修改密码</h2>
        <div class="service_wrap">
            <InputField
                    title="用户名"
                    :isEnable="false"
                    :placeholder="username"
            ></InputField>
            <InputField class="updatePwd_old"
                        title="旧密码"
                        placeholder="请输入旧密码"
                        v-model.trim="oldPwd"
                        :msg="oldPwdMsg"
                        type="password"
            ></InputField>
            <InputField class="updatePwd_new"
                        title="新密码"
                        regType="pwd"
                        placeholder="请输入新密码：6-12位数字及字母的组合，区分大小写 "
                        v-model.trim="newPwd"
                        :msg="newPwdMsg"
                        type="password"
            ></InputField>
            <InputField class="updatePwd_again"
                        title="再次输入"
                        placeholder="请再次输入新密码"
                        v-model.trim="againPwd"
                        :msg="againPwdMsg"
                        type="password"
            ></InputField>
            <div class="service_btns">
                <Btn :class="{'service_disable': !btnIsAble}" status="active" @handleClick="submit">确认修改</Btn>
                <Btn @handleClick="$router.back()">取消</Btn>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    @import "UpdatePwd.scss";
</style>