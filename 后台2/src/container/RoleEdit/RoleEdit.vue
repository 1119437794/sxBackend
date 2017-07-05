<script>
     /*
    * @component 角色编辑组件
    * @author yxc
    * */
     import Btn from '../../components/Btn/Btn.vue'
     import InputField from '../../components/InputField/InputField.vue'
     import RoleAuthority from '../../components/RoleAuthority2/RoleAuthority2.vue'
     import roleMixin from '../../assets/mixins/roleMixin'

     export default {
         mixins: [roleMixin],
         data () {
             return {
                 userAuthority0: this.getRolePermission(), // 后台角色权限
                 userAuthority1: this.getRolePermission(1), // 前台角色权限
             }
         },
         methods: {
             // 提交
             submit () {
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
                     roleName: this.roleName,
                     id: this.roleId
                 }
                 this.store.editRole(body)
                         .then(res => {
                             const data = res.data
                             if (data.code) {
                                 this.store.showModalAutoClose(1, '修改成功')
                             } else {
                                 this.store.showModal(0, data.msg)
                             }
                         })
             }
         },
         mounted () {
             this.initRoleInfo()
             this.store.$once('closeModalOk', this.linkToRoleList)
         },
         components: {
             Btn,
             InputField,
             RoleAuthority
         }
     }
</script>

<template>
    <div class="service_root">
        <h2 class="service_title">角色编辑</h2>
        <div class="service_wrap">
            <InputField class="roleAdd_name"
                        title="角色代码"
                        :isEnable="false"
                        :placeholder="roleCode"
            ></InputField>
            <InputField class="roleAdd_name"
                        title="角色名称"
                        :isRequired="true"
                        :msg="roleNameMsg"
                        v-model.trim="roleName"
            ></InputField>
            <InputField
                    title="角色描述"
                    v-model.trim="roleDescription"
            ></InputField>
            <RoleAuthority
                    :userRole="roleList"
                    :userAuthority0="userAuthority0"
                    :userAuthority1="userAuthority1"

                    :userRolePermission0="permissionIds0"
                    :userRolePermission1="permissionIds1"

                    @permissionIdsChange="permissionIdsChange"
            ></RoleAuthority>
            <p class="service_tip">注：其中<span>*</span>为必填项</p>
            <div class="service_btns">
                <Btn status="active"
                     :class="{'service_disable': !btnIsAble}"
                     @handleClick="submit">确认修改</Btn>
                <Btn @handleClick="linkToRoleList">取消</Btn>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    @import "RoleEdit.scss";
</style>