<script>
     /*
    * @component 组件
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
                 initSelectedRole: [], // 初始化勾选的角色
             }
         },
         computed: {
             // 用户id
             userId () {
                 return this.$route.query.userId
             }
         },
         methods: {
             checkBtnIsAble () {
                 const realNameFlag = this.realName && !this.realNameMsg
                 const departFlag = this.department && !this.departmentMsg
                 const optionFlag = this.phoneMsg || this.emailMsg || this.passwordMsg
                 const roleIdsFlag = this.roleIds.length
                 this.btnIsAble = realNameFlag && departFlag && !optionFlag && roleIdsFlag
             },

             blurPassword (text) {
                 if (!text) {
                     this.passwordMsg = ''
                     return this.checkBtnIsAble()
                 }
                 const flag = validate.pwd.test(text)
                 if (flag) {
                     this.store.checkPasswordIsRepeat(this.userId, text)
                             .then(res => {
                                 this.passwordMsg = res.data.code ? '' : '与旧密码相同，请重新输入'
                                 this.checkBtnIsAble()
                             })
                 } else {
                     this.passwordMsg = '密码输入格式不正确'
                     this.checkBtnIsAble()
                 }
             },

             // 提交用户信息
             submit () {
                 // TODO 此处箭头函数 有问题
                 const roleIds = this.roleIds.map(item => {
                     return { roleId: item }
                 })
                 const body = {
                     adminUserMessage: {
                         area: this.area,
                         department: this.department,
                         email: this.email,
                         name: this.realName,
                         phone: this.phone
                     },
                     username: this.username,
                     password: this.password,
                     roleMidList: roleIds,
                     id: this.userId
                 }
                 this.store.editUser(body)
                         .then(res => {
                             if (res.data.code) {
                                this.store.showModalAutoClose(1, '修改成功')
                                // this.linkToUserList()
                            }
                         })
             }
         },
         mounted () {
             // 获取用户初始信息
             this.store.initUserEdit(this.userId)
                     .then(res => {
                         const data = res.data;
                         const content = data.content || {};
                         const message = content.message || {};
                         const adminUserMessage = message.adminUserMessage || {};
                         let scanPermission = [];
                         let adminPermission = [];

                         this.initData = content.allRole || []
                         const roleList = this.initData.map(item => {
                             const tmp = this.store.getPermissionByRole(item);
                             scanPermission = scanPermission.concat(tmp[1])
                             adminPermission = adminPermission.concat(tmp[0])
                             return {
                                 id: item.id,
                                 name: item.roleName
                             }
                         })

                         this.username = message.username 
                         this.realName = adminUserMessage.name
                         this.department = adminUserMessage.department
                         this.area = adminUserMessage.area
                         this.phone = adminUserMessage.phone
                         this.email = adminUserMessage.email
                         this.initSelectedRole = content.selected || []
                         this.userRole = roleList
                     })

             this.store.$once('closeModalOk', this.linkToUserList)
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
        <h2 class="service_title">用户信息编辑</h2>
        <div class="service_wrap">
            <div class="userInfoEdit_inputs">
                <InputField class="userInfoEdit_username"
                            title="用户名"
                            :isEnable="false"
                            :placeholder="username"></InputField>
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
                ></InputField>
                <InputField class="userInfoEdit_email"
                            title="邮箱"
                            :msg="emailMsg"
                            v-model.trim="email"
                ></InputField>
            </div>
            <RoleAuthority class="userInfoEdit_role"
                           :userRoleChecked="initSelectedRole"
                           :userRole="userRole"
                           :userAuthority0="userAuthority0"
                           :userAuthority1="userAuthority1"
                           @selectedRoleChange="selectedRoleChange"
            ></RoleAuthority>
            <div class="userInfoEdit_setPwd">
                <InputField
                        title="设置密码"
                        :msg="passwordMsg"
                        v-model.trim="password"
                        placeholder="请输入密码：6-12位数字及字母的组合，区分大小写"
                ></InputField>
                <Btn status="active" @handleClick="getPwdByRandom">生成随机密码</Btn>
            </div>
            <p class="service_tip">注：其中<span>*</span>为必填项</p>
            <div class="service_btns">
                <Btn :class="{'service_disable': !btnIsAble}" status="active" @handleClick="submit">确认修改</Btn>
                <Btn @handleClick="linkToUserList">取消</Btn>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    @import "UserInfoEdit.scss";
</style>