<script>
     /*
    * @component 用户信息组件
    * @author yxc
    * */
     import InputField from '../../components/InputField/InputField.vue'
     import Btn from '../../components/Btn/Btn.vue'
     import { mySessionStorage } from '../../assets/js/webStorage'
     import validate from '../../assets/js/validate'

     export default {
         data () {
             return {
                 adminMsg: Object.freeze(mySessionStorage.adminUserMessage),
                 username: Object.freeze(mySessionStorage.username),

                 phone: '',
                 phoneMsg: '',

                 email: '',
                 emailMsg: '',

                 btnIsAble: false // 按钮是否可用
             }
         },
         computed: {
             realName () { return this.adminMsg.name },
             depart () { return this.adminMsg.department },
             district () { return this.adminMsg.area }
         },
         created () {
             this.phone = this.adminMsg.phone
             this.email = this.adminMsg.email
         },
         methods: {
             // 检测按钮是否可用
             checkBtnIsAble () {
                 const { phone, email } = this.adminMsg
                 const msgFlag = this.phoneMsg || this.emailMsg
                 const textFlag = this.phone !== phone || this.email !== email
                 this.btnIsAble = textFlag && !msgFlag
             },
             // 验证电话号码
             blurPhone (text) {
                 if (text) {
                     this.phoneMsg = validate.phone.test(text) ? '' : '格式输入错误'
                 } else {
                     this.phoneMsg = ''
                 }
                 this.checkBtnIsAble()
             },
             // 验证邮箱
             blurEmail (text) {
                 if (text) {
                     this.emailMsg = validate.email.test(text) ? '' : '格式输入错误'
                 } else {
                     this.emailMsg = ''
                 }
                 this.checkBtnIsAble()
             },
             // 提交
             submit () {
                 // if (!this.isAble) return
                 this.store.updatePhoneEmail(this.phone, this.email)
                         .then(res => {
                             const data = res.data
                             const code = data.code
                             // 修改成功后 修改sessionStorage
                             if (code) {
                                 const adminMsg = Object.assign({}, this.adminMsg)
                                 adminMsg.phone = this.phone
                                 adminMsg.email = this.email
                                 mySessionStorage.adminUserMessage = adminMsg
                                 this.store.showModalAutoClose(1, '修改成功！')
                             } else {
                                 this.store.showModal(0, '修改失败！')
                             }
                         })
             },

             // 取消更改用户电话 或 邮箱
             cancel () {
                 this.$router.back()
             }
         },
         mounted () {
             this.store.$once('closeModalOk', () => {
                 this.cancel()
             })
         },
         watch: {
             phone: 'blurPhone',
             email: 'blurEmail'
         },
         components: {
             InputField,
             Btn
         }
     }
</script>

<template>
    <div class="service_root">
        <h2 class="service_title">用户信息</h2>
        <div class="service_wrap">
            <InputField
                    title="用户名"
                    :isEnable="false"
                    :placeholder="username"
            ></InputField>
            <InputField
                    title="真实姓名"
                    :isEnable="false"
                    :placeholder="realName"
            ></InputField>
            <InputField
                    title="所属部门"
                    :isEnable="false"
                    :placeholder="depart"
            ></InputField>
            <InputField
                    title="行政区"
                    :isEnable="false"
                    :placeholder="district"
            ></InputField>
            <InputField class="userInfo_tel"
                        title="联系电话"
                        :msg="phoneMsg"
                        v-model.trim="phone"
            ></InputField>
            <InputField class="userInfo_email"
                        title="邮箱"
                        :msg="emailMsg"
                        v-model.trim="email"
            ></InputField>
            <div class="service_btns">
                <Btn :class="{'service_disable': !btnIsAble}" status="active" @handleClick="submit">确认修改</Btn>
                <Btn @handleClick="cancel">取消</Btn>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    @import "UserInfo.scss";
</style>