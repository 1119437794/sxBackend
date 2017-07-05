<script>
     /*
    * @component 组件
    * @author yxc
    * */
     import InputField from '../../components/InputField/InputField.vue'
     import RoleAuthority from '../../components/RoleAuthority/RoleAuthority.vue'
     import Btn from '../../components/Btn/Btn.vue'

     export default {
         data () {
             return {
                 userInfo: {}, // 用户基本信息
                 userRole: [], // 用户角色信息
                 userAuthority: {} // 用户权限信息
             }
         },
         computed: {
             userId () {
                 return this.$route.query.userId
             }
         },
         methods: {
             getUserInfo () {
                 this.store.scanUserInfoById(this.userId)
                         .then(res => {
                             const data = res.data
                             const content = data.content || {}
                             const message = content.message || {}
                             const adminUserMessage = message.adminUserMessage || {}
                             const roles = content.roles || {}
                             let scanPermission = []
                             let adminPermission = []
                             const roleList = roles.map(item => {
                                 const roleItem = item.adminRole || {}
                                 const tmp = this.store.getPermissionByRole(roleItem)
                                 scanPermission = scanPermission.concat(tmp[1])
                                 adminPermission = adminPermission.concat(tmp[0])
                                 return {
                                     name: roleItem.roleName
                                 }
                             })
                             const scanPermissionSet = new Set(scanPermission)
                             const adminPermissionSet = new Set(adminPermission)

                             this.userInfo = {
                                 username: message.username,
                                 realName: adminUserMessage.name,
                                 department: adminUserMessage.department,
                                 area: adminUserMessage.area,
                                 phone: adminUserMessage.phone,
                                 email: adminUserMessage.email
                             }
                             this.userRole = roleList
                             this.userAuthority = {
                                 0: [...adminPermissionSet],
                                 1: [...scanPermissionSet]
                             }
                         })
             },
             delUserInfo () {
                 this.store.showModal(2, '您确定需要删除该用户吗，删除之后将不能恢复该用户所有信息！')
             }
         },
         mounted () {
             this.getUserInfo()
             this.store.$once('sureModal', () => {
                 this.store.delUserById(this.userId)
                         .then(res => {
                             if (res.data.code) {
                                 this.$router.push('/userList')
                             }
                         })
             })
         },
         components: {
             InputField,
             RoleAuthority,
             Btn
         }
     }
</script>

<template>
    <div class="service_root">
        <h2 class="userInfoScan_title service_title">
            用户信息浏览
            <div class="userInfoScan_actWrap">
                <Btn class="userInfoScan_edit" status="active" @handleClick="$router.push(`/userInfoEdit?userId=${userId}`)">编辑</Btn>
                <Btn class="userInfoScan_del" status="active" @handleClick="delUserInfo">删除</Btn>
                <router-link
                        class="service_back"
                        tag="span"
                        to="/userList"
                ></router-link>
            </div>
        </h2>
        <div class="service_wrap">
            <div class="userInfoScan_inputs">
                <InputField title="用户名"
                            :isEnable="false"
                            :placeholder="userInfo.username"></InputField>
                <InputField title="真实姓名"
                            :isEnable="false"
                            :placeholder="userInfo.realName"
                ></InputField>
                <InputField title="所属部门"
                            :isEnable="false"
                            :placeholder="userInfo.department"
                ></InputField>
                <InputField title="行政区"
                            :isEnable="false"
                            :placeholder="userInfo.area"
                ></InputField>
                <InputField title="联系电话"
                            :isEnable="false"
                            :placeholder="userInfo.phone"
                ></InputField>
                <InputField title="邮箱"
                            :isEnable="false"
                            :placeholder="userInfo.email"
                ></InputField>
            </div>
            <RoleAuthority class="userInfoScan_role"
                           :readOnly="true"
                           :userRole="userRole"
                           :userAuthority0="userAuthority[0]"
                           :userAuthority1="userAuthority[1]"
            ></RoleAuthority>
        </div>
    </div>
</template>

<style lang="scss">
    @import "UserInfoScan.scss";
</style>