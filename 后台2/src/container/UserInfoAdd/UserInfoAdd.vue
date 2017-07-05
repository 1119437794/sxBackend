<script>
     /*
    * @component 新增用户组件
    * @author yxc
    * */
     import InputField from '../../components/InputField/InputField.vue'
     import RoleAuthority from '../../components/RoleAuthority/RoleAuthority.vue'
     import SelectBox from '../../components/SelectBox/SelectBox.vue'
     import Btn from '../../components/Btn/Btn.vue'
     import validate from '../../assets/js/validate'
     import userMixin from '../../assets/mixins/userMixin'

     export default {
         mixins: [userMixin],
         data () {
             return {
                 usernameMsg: '',
             }
         },
         methods: {
             checkBtnIsAble () {
                 const usernameFlag = this.username && !this.usernameMsg
                 const realNameFlag = this.realName && !this.realNameMsg
                 const departFlag = this.department && !this.departmentMsg
                 const passwordFlag = this.password && !this.passwordMsg
                 const optionFlag = this.phoneMsg || this.emailMsg
                 const roleIdsFlag = this.roleIds.length
                 this.btnIsAble = usernameFlag && realNameFlag && departFlag && passwordFlag && !optionFlag && roleIdsFlag
             },

             blurUsername (text) {
                 const flag = validate.roleName.test(text)
                 if (flag) {
                     this.store.checkUsernameIsRepeat(text)
                             .then(res => {
                                 this.usernameMsg = res.data.code ? '' : '用户名重复'
                                 this.checkBtnIsAble()
                             })
                 } else {
                     this.usernameMsg = '格式错误'
                     this.checkBtnIsAble()
                 }
             },

             blurPassword (text) {
                 this.passwordMsg = validate.pwd.test(text) ? '' : '密码输入格式不正确'
                 this.checkBtnIsAble()
             },

             // 提交用户信息
             submit () {
                 // TODO 此处箭头函数 有问题
                 const roleIds = this.roleIds.map(item => {
                     return { roleId: item }
                 })
                 const {
                         area,
                         department,
                         email,
                         realName,
                         phone,
                         username,
                         password
                 } = this
                 const body = {
                     adminUserMessage: {
                         area,
                         department,
                         email,
                         name: realName,
                         phone
                     },
                     username,
                     password,
                     roleMidList: roleIds
                 }
                 this.store.addUser(body)
                         .then(res => {
                             if (res.data.code) {
                                 this.store.showModalAutoClose(1, '提交成功')
                                 // this.linkToUserList()
                             }
                         })
             }
         },
         mounted () {
             this.store.initUserAdd()
                     .then(res => {
                         const data = res.data
                         const content = data.content || {}
                         const roles = content.map(item => {
                             return {
                                 id: item.id,
                                 name: item.roleName
                             }
                         })

                         this.userRole = roles
                         this.initData = content
                     })

             this.store.$once('closeModalOk', this.linkToUserList)
         },
         watch: {
             username: 'blurUsername'
         },
         components: {
             InputField,
             SelectBox,
             RoleAuthority,
             Btn
         }
     }
</script>

<template>
    <div class="service_root">
        <h2 class="service_title">新增用户信息</h2>
        <div class="service_wrap">
            <div class="userInfoEdit_inputs">
                <InputField class="userInfoEdit_username"
                            title="用户名"
                            :isRequired="true"
                            :msg="usernameMsg"
                            v-model.trim="username"
                            placeholder="4-20个非特殊字符,提交后不能改"
                ></InputField>
                <InputField class="userInfoEdit_realName"
                            title="真实姓名"
                            :isRequired="true"
                            :msg="realNameMsg"
                            v-model.trim="realName"
                ></InputField>
                <InputField class="userInfoEdit_depart"
                            title="所属部门"
                            :isRequired="true"
                            :msg="departmentMsg"
                            v-model.trim="department"
                ></InputField>
                <div class="userInfoEdit_district">
                    <span class="service_itemTitle">
                        行政区<span class="userInfoEdit_required">*</span>
                    </span>
                    <SelectBox
                            :list="areaList"
                            :defaultVal="area"
                            @selectItem="areaSelect"
                    ></SelectBox>
                </div>
                <InputField class="userInfoEdit_tel"
                            title="联系电话"
                            :msg="phoneMsg"
                            v-model.trim="phone"
                            placeholder="13333333333、028-1111111"
                ></InputField>
                <InputField class="userInfoEdit_email"
                            title="邮箱"
                            :msg="emailMsg"
                            v-model.trim="email"
                            placeholder="22425462356513@gmail.com"
                ></InputField>
            </div>
            <RoleAuthority class="userInfoEdit_role"
                           :userRole="userRole"
                           :userAuthority0="userAuthority0"
                           :userAuthority1="userAuthority1"
                           @selectedRoleChange="selectedRoleChange"
            ></RoleAuthority>
            <div class="userInfoEdit_setPwd">
                <InputField
                        title="设置密码"
                        :isRequired="true"
                        :msg="passwordMsg"
                        v-model.trim="password"
                        placeholder="请输入密码：6-12位数字及字母的组合，区分大小写"
                ></InputField>
                <Btn status="active" @handleClick="getPwdByRandom">生成随机密码</Btn>
            </div>
            <p class="service_tip">注：其中<span>*</span>为必填项</p>
            <div class="service_btns">
                <Btn :class="{'service_disable': !btnIsAble}" status="active" @handleClick="submit">提交</Btn>
                <Btn @handleClick="linkToUserList">取消</Btn>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    /*@import "UserInfoAdd.scss";*/
</style>