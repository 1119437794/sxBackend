<script>
     /*
    * @component 角色及权限 针对用户模块 组件
    * @author yxc
    * */
     import userRoleCheckMixin from '../../assets/mixins/userRoleCheckMixin'

     export default {
         mixins: [userRoleCheckMixin],
         computed: {
             roleAuthorityShow () {
                 return this.userAuthority0.length || this.userAuthority1.length
             }
         }
     }
</script>

<template>
    <div class="roleAuthority_root">
        <div class="service_itemTitle">
            角色及权限<div v-if="isRequired" class="roleAuthority_required">*</div>
        </div>
        <div class="roleAuthority_wrap">

            <h2 class="roleAuthority_listName">角色列表</h2>
            <div class="roleAuthority_roleWrap">
                <label
                        v-for="(item, index) of userRole"
                        class="roleAuthority_roleItem"
                        :for="`roleAuthority_role${index}`"
                >
                    <input
                            v-if="!readOnly"
                            :id="`roleAuthority_role${index}`"
                            type="checkbox"
                            :value="item.id"
                            v-model="selectedRole"
                    >{{item.name}}
                </label>
            </div>

            <h2 class="roleAuthority_listName" v-show="roleAuthorityShow">权限列表</h2>
            <div class="roleAuthority_listWrap" v-show="roleAuthorityShow">
                <div class="roleAuthority_scan" v-show="userAuthority1.length">
                        <h2 class="roleAuthority_scanName">浏览权限</h2>
                        <div class="roleAuthority_scanList">
                            <label
                                    class="roleAuthority_scanItem"
                                    v-for="(item, index) of userAuthority1"
                                    :for="`roleAuthority_0${index}`"
                            >
                                <!--<input
                                        v-if="!readOnly"
                                        :id="`roleAuthority_0${index}`"
                                        type="checkbox"
                                        :value="index"
                                        v-model="selectedScanAuthority"
                                >-->{{item}}
                            </label>
                        </div>
                    </div>
                <div class="roleAuthority_scan" v-show="userAuthority0.length">
                        <h2 class="roleAuthority_scanName">后台管理权限</h2>
                        <div class="roleAuthority_scanList">
                            <label
                                    class="roleAuthority_scanItem"
                                    v-for="(item, index) of userAuthority0"
                                    :for="`roleAuthority_1${index}`"
                            >
                                <!--<input
                                        v-if="!readOnly"
                                        :id="`roleAuthority_1${index}`"
                                        type="checkbox"
                                        :value="index"
                                        v-model="selectedAdminAuthority"
                                >-->{{item}}
                            </label>
                        </div>
                    </div>
            </div>

        </div>
    </div>
</template>

<style lang="scss">
    @import "RoleAuthority.scss";
</style>