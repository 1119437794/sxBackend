<script>
     /*
    * @component 组件
    * @author yxc
    * */
     import InputField from '../../components/InputField/InputField.vue'
     import Btn from '../../components/Btn/Btn.vue'
     import RoleAuthority from '../../components/RoleAuthority2/RoleAuthority2.vue'
     import roleMixin from '../../assets/mixins/roleMixin'

     export default {
         mixins: [roleMixin],
         computed: {
             userAuthority0 () {
                 return this.getRolePermission().filter(item => this.permissionIds0.includes(item.id))
             },
             userAuthority1 () {
                 return this.getRolePermission(1).filter(item => this.permissionIds1.includes(item.id))
             }
         },
         methods: {
             // 链接到角色编辑
             linkToRoleEdit () {
                 this.$router.push(`/roleEdit?roleId=${this.roleId}`)
             },
             // 分配角色
             distributeRole () {
                 this.store.getRoleUser(this.roleId)
                         .then(res => {
                             const data = res.data
                             const content = data.content || {}
                             if (data.code) {
                                 this.store.showModal(3)
                                 this.store.setModalRoleUser({
                                     distributed: content.userListAllocation,
                                     unDistributed: content.notUserListAllocation
                                 })
                             }
                         })
             },

             // 删除角色
             delRole () {
                 this.store.showModal(2, '您确定要删除该角色吗？绑定该角色的用户将失去相应权限！')
             }
         },
         mounted () {
             this.initRoleInfo()

             // 点击确认删除角色
             this.store.$once('sureModal', () => {
                 this.store.delRole(this.roleId)
                         .then(res => {
                             if (res.data.code) {
                                 this.linkToRoleList()
                             }
                         })
             })

             // 点击确认保存更改的角色用户
             this.store.$on('sureRoleUserModal', () => {
                 const distributedIds = this.store.modalRoleUser.distributed.map(item => item.id)
                 this.store.saveRoleUser(+this.roleId, distributedIds)
                         .then(res => {
                             if (res.data.code) {
                                 this.initRoleInfo()
                             }
                         })
             })

         },
         destroyed () {
             this.store.$off('sureRoleUserModal')
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
        <h2 class="roleScan_title service_title">
            角色浏览
            <div class="roleScan_btns">
                <Btn class="roleScan_edit" status="active" @handleClick="linkToRoleEdit">&nbsp;编辑</Btn>
                <Btn class="roleScan_fp" @handleClick="distributeRole">&nbsp;分配</Btn>
                <Btn class="roleScan_del" @handleClick="delRole">&nbsp;删除</Btn>
                <router-link
                        class="service_back"
                        tag="span"
                        to="/roleList"
                ></router-link>
            </div>
        </h2>
        <div class="service_wrap">
            <InputField
                    title="角色代码"
                    :isEnable="false"
                    :placeholder="roleCode"
            ></InputField>
            <InputField
                    title="角色名称"
                    :isEnable="false"
                    :placeholder="roleName"
            ></InputField>
            <InputField
                    title="角色描述"
                    :isEnable="false"
                    :placeholder="roleDescription"
            ></InputField>

            <RoleAuthority

                    :readOnly="true"
                    :isRequired="false"
                    :userRole="roleList"
                    :userAuthority0="userAuthority0"
                    :userAuthority1="userAuthority1"

                    :userRolePermission0="permissionIds0"
                    :userRolePermission1="permissionIds1"
            ></RoleAuthority>
        </div>
    </div>
</template>

<style lang="scss">
    @import "RoleScan.scss";
</style>