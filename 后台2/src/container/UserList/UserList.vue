<script>
     /*
    * @component 组件
    * @author yxc
    * */
     import Btn from '../../components/Btn/Btn.vue'
     import InputField from '../../components/InputField/InputField.vue'
     import SelectBox from '../../components/SelectBox/SelectBox.vue'
     import Pagination from '../../components/Pagination/Pagination.vue'
     import { mySessionStorage } from '../../assets/js/webStorage'

     export default {
         data () {
             return {
                 username: '',
                 usernamePl: '', // 用于 placeholder 显示

                 realName: '',
                 realNamePl: '',

                 department: '',
                 departmentPl: '',

                 area: '',
                 areaList: Object.freeze(['全部'].concat(this.store.allArea)),

                 curShowType: '',
                 curRealType: '',
                 userType: ['全部', '前台用户', '后台系统管理员'],

                 list: [],

                 curPageNum: 0,
                 rowsTotal: 0,

                 delItemId: 0
             }
         },
         methods: {
             areaSelect (area) {
                 this.area = area ? this.areaList[area] : ''
             },

             userTypeSelect (type) {
                 const typesNum = this.userType.length - 1
                 this.curShowType = this.userType[type]
                 this.curRealType = type ? (typesNum - type) : ''
             },

             lookUpUser () {
                 this.curPageNum = 0
                 this.getUserList()
             },

             getUserList () {
                 const adminUserMessage = mySessionStorage.adminUserMessage
                 const body = {
                     area: this.area,
                     currentAccountId: adminUserMessage.id,
                     department: this.department,
                     name: this.realName,
                     pageNumber: this.curPageNum,
                     pageSize: 10,
                     userType: this.curRealType,
                     username: this.username
                 }
                 this.store.getUserList(body)
                         .then(res => {
                             const data = res.data
                             const content = data.content || {}
                             this.list = content.list || []
                             this.rowsTotal = content.count || 0

                             this.usernamePl = this.username
                             // this.username = ''

                             this.realNamePl = this.realName
                             // this.realName = ''

                             this.departmentPl = this.department
                             // this.department = ''
                         })
             },

             // 针对数组内容 处理
             getSplitText (arr) {
                 return arr.join('<br>')
             },

             delUser (delItemId) {
                 this.delItemId = delItemId
                 this.store.showModal(2, '您确定需要删除该用户吗，删除之后将不能恢复该用户所有信息！')
             },

             pageChange (pageNum) {
                 this.curPageNum = pageNum - 1
                 this.getUserList()
             }
         },
         mounted () {
             this.getUserList()
             // 事件总线机制 实现模块通信
             this.store.$on('sureModal', () => {
                 this.store.delUserById(this.delItemId)
                         .then(res => {
                             if(res.data.code) {
                                 this.store.showModalAutoClose(1, '删除成功')
                                 this.getUserList()
                             } else {
                                 this.store.showModal(0, '删除失败')
                             }
                         })
             })
         },
         destroyed () {
             this.store.$off('sureModal')
         },
         components: {
             Btn,
             SelectBox,
             InputField,
             Pagination
         }
     }
</script>

<template>
    <div class="service_root">
        <h2 class="service_title">
            用户列表
            <Btn class="userList_add" status="active" @handleClick="$router.push('/userInfoAdd')">+&nbsp;新增用户</Btn>
        </h2>
        <div class="userList_wrap">
            <div class="userList_limit">
                <div class="userList_limitWrap">
                    <InputField class="userList_username"
                                title="用户名"
                                :placeholder="usernamePl"
                                v-model="username"
                    ></InputField>
                    <InputField class="userList_realName"
                                title="真实名字"
                                :placeholder="realNamePl"
                                v-model="realName"
                    ></InputField>
                    <InputField class="userList_depart"
                                title="所属部门"
                                :placeholder="departmentPl"
                                v-model="department"
                    ></InputField>
                    <div class="userList_district">
                        <span>行政区</span>
                        <SelectBox
                                :list="areaList"
                                :defaultVal="area"
                                @selectItem="areaSelect"></SelectBox>
                    </div>
                    <div class="userList_userType">
                        <span>用户类型</span>
                        <SelectBox
                                :list="userType"
                                :defaultVal="curShowType"
                                @selectItem="userTypeSelect"></SelectBox>
                    </div>
                </div>
                <Btn class="userList_search" status="active" @handleClick="lookUpUser">查询</Btn>
            </div>
            <table class="service_table">
                <tr class="service_th">
                    <td class="userList_td1">序号</td>
                    <td class="userList_td2">用户</td>
                    <td class="userList_td3">真实姓名</td>
                    <td class="userList_td4">所属部门</td>
                    <td class="userList_td5">行政区</td>
                    <td class="userList_td6">联系方式</td>
                    <td class="userList_td7">角色</td>
                    <td class="userList_td8">创建者</td>
                    <td class="userList_td9">用户类型</td>
                    <td class="userList_td10"></td>
                </tr>
                <tr class="service_tb"
                    v-for="(item, index) of list"
                >
                    <td class="userList_td1" v-text="index + 1">序号</td>
                    <td class="userList_td2" v-text="item.username">用户</td>
                    <td class="userList_td3" v-text="item.adminUserMessage.name">真实姓名</td>
                    <td class="userList_td4" v-text="item.adminUserMessage.department">所属部门</td>
                    <td class="userList_td5" v-text="item.adminUserMessage.area">行政区</td>
                    <td class="userList_td6" v-text="item.adminUserMessage.phone">联系方式</td>
                    <td class="userList_td7" v-html="getSplitText(item.adminUserMessage.roles)">角色</td>
                    <td class="userList_td8" v-text="item.adminUserMessage.createByName">创建者</td>
                    <td class="userList_td9" v-html="getSplitText(item.adminUserMessage.userTypeList)">用户类型</td>
                    <td class="userList_td10">
                        <router-link
                                tag="span"
                                :to="`/userInfoScan?userId=${item.id}`"
                                class="service_tableActIcon iconfont icon-yulan"
                        ></router-link>
                        <router-link
                                tag="span"
                                :to="`/userInfoEdit?userId=${item.id}`"
                                class="service_tableActIcon iconfont icon-bianji"
                        ></router-link>
                        <router-link
                                tag="span"
                                :to="`/logList?username=${item.username}`"
                                class="service_tableActIcon iconfont icon-1dingdanjiluchaxun"
                        ></router-link>
                        <span class="service_tableActIcon iconfont icon-shanchu"
                              @click="delUser(item.id)"
                        ></span>
                    </td>
                </tr>
            </table>
            <div class="service_page">
                <span class="service_count">共计：{{rowsTotal}}个</span>
                <Pagination
                        :showPages="5"
                        :pageSize="10"
                        :curPageNum="curPageNum + 1"
                        :rowsTotal="rowsTotal"
                        @pageChange="pageChange"
                ></Pagination>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    @import "UserList.scss";
</style>