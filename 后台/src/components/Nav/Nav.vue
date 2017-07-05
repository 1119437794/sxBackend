<script>
     /*
    * @component 导航组件
    * @author yxc
    * */
     import { mySessionStorage } from '../../assets/js/webStorage'

     export default {
         data () {
             return {
                 navArr: [
                     {
                         permissionId: 4,
                         title: '用户管理',
                         list: [
                             {
                                 name: '用户列表',
                                 url: 'userList'
                             },
                             {
                                 name: '新增用户',
                                 url: 'userInfoAdd'
                             }
                         ],
                         listShow: true,
                     },
                     {
                         permissionId: 6,
                         title: '角色及权限管理',
                         list: [
                             {
                                 name: '角色列表',
                                 url: 'roleList'
                             },
                             {
                                 name: '新增角色',
                                 url: 'roleAdd'
                             }
                         ],
                         listShow: true,
                     },
                     {
                         permissionId: 5,
                         title: '日志管理',
                         list: [
                             {
                                 name: '日志列表',
                                 url: 'logList'
                             }
                         ],
                         listShow: true,
                     }
                 ]
             }
         },
         computed: {
             fixedNavArr () {
                 const permissionIds = mySessionStorage.permissionIds
                 return this.navArr.filter(item => permissionIds.includes(item.permissionId))
             }
         }
     }
</script>

<template>
    <div class="nav_root">
        <div class="nav_item" v-for="item of fixedNavArr">
            <div class="nav_title" @click="item.listShow = !item.listShow">
                {{item.title}}
                <span
                        v-if="item.list.length"
                        :class="{
                            'service_arrow iconfont icon-xiala': true,
                            'service_arrow-unfold': item.listShow
                        }"
                ></span>
            </div>
            <ul class="nav_list" v-show="item.listShow">
                <router-link
                        tag="li"
                        :to="`/${item.url}`"
                        v-text="item.name"
                        class="nav_listItem"
                        active-class="nav_listItem-active"
                        v-for="item of item.list"
                ></router-link>
            </ul>
        </div>
    </div>
</template>

<style lang="scss">
    @import "Nav.scss";
</style>