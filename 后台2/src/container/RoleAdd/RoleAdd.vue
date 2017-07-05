<script>
     /*
    * @component 组件
    * @author yxc
    * */
     import Btn from '../../components/Btn/Btn.vue'
     import InputField from '../../components/InputField/InputField.vue'
     import RoleAuthority2 from '../../components/RoleAuthority2/RoleAuthority2.vue'
     import validate from '../../assets/js/validate'
     import roleMixin from '../../assets/mixins/roleMixin'

     let rolePermission = {} // 角色对应权限

     export default {
         mixins: [roleMixin],
         data () {
             return {
                 userAuthority0: this.getRolePermission(), // 后台角色权限
                 userAuthority1: this.getRolePermission(1), // 前台角色权限
             }
         },
         methods: {
             selectedRoleChange (roleIds) {
                 let permissionIds = []  // 获取角色下对应的所有权限
                 let permissionIds0 = [] // 获取角色下对应的所有后台权限
                 let permissionIds1 = [] // 获取角色下对应的所有浏览权限
                 const adminPermissionIds = this.userAuthority0.map(item => item.id)

                 roleIds.map(item => {
                     [].push.apply(permissionIds, rolePermission[item])
                 })
                 permissionIds = [...new Set(permissionIds)]
                 permissionIds.map(item => {
                     if (adminPermissionIds.includes(item)) {
                         permissionIds0.push(item)
                     } else {
                         permissionIds1.push(item)
                     }
                 })

                 this.permissionIds0 = permissionIds0
                 this.permissionIds1 = permissionIds1
             },

             // 提交
             submit () {
                 // TODO  [].push.apply() 慎用
                 const { permissionIds1, permissionIds0 } = this;
                 const permissionIds = permissionIds0.concat(permissionIds1)
                 const fixedPermissionIds = permissionIds.map(item => {
                     return {
                         adminPermissionsId: item
                     }
                 })
                 const body = {
                     adminMidPermissionsRoles: fixedPermissionIds,
                     description: this.roleDescription,
                     roleName: this.roleName
                 }

                 this.store.addRole(body)
                         .then(res => {
                             const data = res.data
                             if (data.code) {
                                 this.store.showModalAutoClose(1, '提交成功')
                             } else {
                                 this.store.showModal(0, data.msg)
                             }
                         })
             }
         },
         mounted () {
             this.store.initRoleAdd()
                     .then(res => {
                         const data = res.data
                         const content = data.content || {}
                         const roleInfo = content.roleMessage || []
                         const roleList = roleInfo.map(item => {
                             const roleId = item.id
                             const permissionIds = []

                             item.adminMidPermissionsRoles.map(item => {
                                 permissionIds.push(item.adminPermissionsId)
                             })
                             rolePermission[roleId] = permissionIds

                             return {
                                 id: roleId,
                                 name: item.roleName
                             }
                         })

                         this.roleList = roleList
                     })

             this.store.$once('closeModalOk', this.linkToRoleList)
         },
         components: {
             Btn,
             InputField,
             RoleAuthority2
         }
     }
</script>

<template>
    <div class="service_root">
        <h2 class="service_title">新增角色</h2>
        <div class="service_wrap">
            <InputField class="roleAdd_name"
                        title="角色名称"
                        :isRequired="true"
                        :msg="roleNameMsg"
                        v-model.trim="roleName"
                        placeholder="请输入4-20位字母，数字或中文"
            ></InputField>
            <InputField
                    title="角色描述"
                    v-model.trim="roleDescription"
            ></InputField>
            <RoleAuthority2
                    :roleAdd="true"
                    :userRole="roleList"
                    :userAuthority0="userAuthority0"
                    :userAuthority1="userAuthority1"

                    :userRolePermission0="permissionIds0"
                    :userRolePermission1="permissionIds1"

                    @selectedRoleChange="selectedRoleChange"
                    @permissionIdsChange="permissionIdsChange"
            ></RoleAuthority2>
            <p class="service_tip">注：其中<span>*</span>为必填项</p>
            <div class="service_btns">
                <Btn status="active"
                     :class="{'service_disable': !btnIsAble}"
                     @handleClick="submit"
                >提交</Btn>
                <Btn @handleClick="linkToRoleList">取消</Btn>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    @import "RoleAdd.scss";
</style>