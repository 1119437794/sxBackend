<script>
     /*
    * @component 角色及权限 针对角色模块 组件
    * @author yxc
    * */
     import userRoleCheckMixin from '../../assets/mixins/userRoleCheckMixin'

     export default {
         mixins: [userRoleCheckMixin],
         props: {
             // 默认勾选的后台角色权限
             userRolePermission0: {
                 default: () => []
             },

             // 默认勾选的前台角色权限
             userRolePermission1: {
                 default: () => []
             },

             roleAdd: {
                 default: false
             }
         },
         data () {
             return {
                 scanChecked: 0, // 浏览权限状态 0 - 没有勾选 1 - 部分勾选 2 - 全选
                 adminChecked: 0, // 后台权限状态 0 1 2

                 scanRights: [], // 所有勾选的浏览权限
                 adminRights: [], // 所有勾选的后台权限
             }
         },
         methods: {
             // 勾选权限变化回调
             rightIdsChange () {
                 this.$emit('permissionIdsChange', {
                     0: this.adminRights,
                     1: this.scanRights,
                 })
             }
         },
         watch: {
             userRolePermission0 () {
                 this.adminRights = this.userRolePermission0
             },
             userRolePermission1 () {
                 this.scanRights = this.userRolePermission1
             },

             scanRights () {
                 const checkedScanLen = this.scanRights.length
                 const allScanLen = this.userAuthority1.length

                 if (checkedScanLen > 0) {
                     if (checkedScanLen === allScanLen) {
                         this.scanChecked = 2
                     } else {
                         this.scanChecked = 1
                     }
                 } else {
                     this.scanChecked = 0
                 }

                 this.rightIdsChange()
             },
             adminRights () {
                 const checkedAdminLen = this.adminRights.length
                 const allAdminLen = this.userAuthority0.length

                 if (checkedAdminLen > 0) {
                     if (checkedAdminLen === allAdminLen) {
                         this.adminChecked = 2
                     } else {
                         this.adminChecked = 1
                     }
                 } else {
                     this.adminChecked = 0
                 }

                 this.rightIdsChange()
             },

             // 针对点击浏览权限、后台权限状态时回调
             scanChecked () {
                 const scanChecked = this.scanChecked
                 if (scanChecked === 0) {
                     this.scanRights = []
                 } else if (scanChecked === 2) {
                     this.scanRights = this.userAuthority1.map(item => item.id)
                 }
             },
             adminChecked () {
                 const adminChecked = this.adminChecked
                 if (adminChecked === 0) {
                     this.adminRights = []
                 } else if (adminChecked === 2) {
                     this.adminRights = this.userAuthority0.map(item => item.id)
                 }
             }
         }
     }
</script>

<template>
    <div class="roleAuthority2_root">
        <div class="roleAuthority2_1" v-if="userRole.length">
            <div class="roleAuthority_listName" v-text="roleAdd ? '选择模板' : '用户配置'"></div>
            <div class="roleAuthority_roleWrap">
                <label
                        v-for="(item, index) of userRole"
                        class="roleAuthority_roleItem"
                        :for="`roleAuthority_role${index}`"
                >
                    <input v-if="roleAdd"
                           :id="`roleAuthority_role${index}`"
                           type="checkbox"
                           :value="item.id"
                           v-model="selectedRole"
                    >{{item.name}}
                </label>
            </div>
        </div>
        <div class="roleAuthority2_1">
            <div class="service_itemTitle">权限设置<div v-if="isRequired" class="roleAuthority_required">*</div></div>
            <div class="roleAuthority_listWrap">

                <div class="roleAuthority_scan" v-if="userAuthority1.length">

                    <label class="roleAuthority_scanName" for="roleAuthority_scanName-1">
                        <template v-if="!readOnly">
                            <span class="roleAuthority2_halfChecked" v-show="scanChecked === 1"></span>
                            <input id="roleAuthority_scanName-1" type="checkbox"
                                   :true-value="2"
                                   :false-value="0"
                                   v-model="scanChecked"
                            >
                        </template>浏览权限
                    </label>

                    <div class="roleAuthority_scanList">
                        <label
                                class="roleAuthority_scanItem"
                                v-for="(item, index) of userAuthority1"
                                :for="`roleAuthority_0${index}`"
                        >
                            <input v-if="!readOnly"
                                   :id="`roleAuthority_0${index}`"
                                   type="checkbox"
                                   :value="item.id"
                                   v-model="scanRights"
                            >{{item.name}}
                        </label>
                    </div>
                </div>

                <div class="roleAuthority_scan" v-if="userAuthority0.length">

                    <label class="roleAuthority_scanName" for="roleAuthority_scanName-0">
                        <template v-if="!readOnly">
                            <span class="roleAuthority2_halfChecked" v-show="adminChecked === 1"></span>
                            <input id="roleAuthority_scanName-0" type="checkbox"
                                   :true-value="2"
                                   :false-value="0"
                                   v-model="adminChecked"
                            >
                        </template>后台管理权限
                    </label>

                    <div class="roleAuthority_scanList">
                        <label
                                class="roleAuthority_scanItem"
                                v-for="(item, index) of userAuthority0"
                                :for="`roleAuthority_1${index}`"
                        >
                            <input v-if="!readOnly"
                                   :id="`roleAuthority_1${index}`"
                                   type="checkbox"
                                   :value="item.id"
                                   v-model="adminRights"
                            >{{item.name}}
                        </label>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .roleAuthority2_root {
        width: percentage(1443 / 1631);
    }

    .roleAuthority2_1 {
        display: flex;
    }

    .roleAuthority2_halfChecked {
        position: absolute;
        left: 23px;
        top: 8px;
        width: 6px;
        height: 2px;
        background-color: #424242;
    }

    .roleAuthority2_1:first-of-type {
        margin-bottom: 40px;
    }
</style>