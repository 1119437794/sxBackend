<script>
     /*
    * @component 组件
    * @author yxc
    * */
     import Btn from '../../components/Btn/Btn.vue'
     import Pagination from '../../components/Pagination/Pagination.vue'

     export default {
         props: ['store'],
         data () {
             return {
                 delItemId: 0,
                 pageNum: 0,
                 rowsTotal: 0,
                 list: []
             }
         },
         methods: {
             linkToAddRole () {
                 this.$router.push('/roleAdd')
             },
             getRoleList () {
                 const body = {
                     pageSize: 10,
                     pageNumber: this.pageNum
                 }
                 this.store.getRoleList(body)
                         .then(res => {
                             const data = res.data
                             const content = data.content || {}
                             this.rowsTotal = content.count || 0
                             this.list = content.list || []
                         })
             },
             delRole (id) {
                 this.delItemId = id
                 this.store.showModal(2, '您确定要删除该角色吗？绑定该角色的用户将失去相应权限！')
             },
             pageChange (pageNum) {
                 this.pageNum = pageNum - 1
                 this.getRoleList()
             }
         },
         mounted () {
             this.getRoleList()

             this.store.$on('sureModal', () => {
                 this.store.delRole(this.delItemId)
                         .then(res => {
                             const data = res.data
                             if (data.code) {
                                 this.getRoleList()
                             }
                         })
             })
         },
         destroyed () {
             this.store.$off('sureModal')
         },
         components: {
             Btn,
             Pagination
         }
     }
</script>

<template>
    <div class="roleList_root service_root">
        <h2 class="service_title">
            角色列表
            <Btn class="roleList_add"
                 status="active"
                 @handleClick="linkToAddRole"
            >+&nbsp;新增角色</Btn>
        </h2>
        <div class="service_wrap">
            <table class="service_table">
                <tr class="service_th">
                    <td class="roleList_td1">序号</td>
                    <td class="roleList_td2">角色代码</td>
                    <td class="roleList_td3">角色名称</td>
                    <td class="roleList_td4">更新时间</td>
                    <td class="roleList_td5">角色描述</td>
                    <td class="roleList_td6"></td>
                </tr>
                <tr class="service_tb"
                    v-for="(item, index) of list"
                >
                    <td class="roleList_td1" v-text="index + 1">序号</td>
                    <td class="roleList_td2" v-text="item.code">角色代码</td>
                    <td class="roleList_td3" v-text="item.roleName">角色名称</td>
                    <td class="roleList_td4" v-text="store.getFormedDate2(item.updateString)">更新时间</td>
                    <td class="roleList_td5" v-text="item.description">角色描述</td>
                    <td class="roleList_td6">
                        <router-link
                                tag="span"
                                :to="`/roleScan?roleId=${item.id}`"
                                class="service_tableActIcon iconfont icon-yulan"
                        ></router-link>
                        <router-link
                                tag="span"
                                :to="`/roleEdit?roleId=${item.id}`"
                                class="service_tableActIcon iconfont icon-bianji"
                        ></router-link>
                        <span class="service_tableActIcon iconfont icon-shanchu"
                              @click="delRole(item.id)"
                        ></span>
                    </td>
                </tr>
            </table>
        </div>
        <div class="service_page">
            <span class="service_count">共计：{{rowsTotal}}个</span>
            <Pagination
                    :showPages="5"
                    :pageSize="10"
                    :curPageNum="pageNum + 1"
                    :rowsTotal="rowsTotal"
                    @pageChange="pageChange"
            ></Pagination>
        </div>
    </div>
</template>

<style lang="scss">
    @import "RoleList.scss";
</style>