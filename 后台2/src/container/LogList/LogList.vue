<script>
     /*
    * @component 日志组件
    * @author yxc
    * */
     import InputField from '../../components/InputField/InputField.vue'
     import SelectBox from '../../components/SelectBox/SelectBox.vue'
     import Date from '../../components/Date/Date.vue'
     import Btn from '../../components/Btn/Btn.vue'
     import Pagination from '../../components/Pagination/Pagination.vue'
     import { mySessionStorage } from '../../assets/js/webStorage'

     export default {
         data () {
             return {
                 username: '',
                 usernamePl: '', // 用于placeholder显示

                 ip: '',
                 ipPl: '',

                 systemAddress: '',
                 systemAddressList: ['全部', '前台', '后台'],

                 type: '',
                 typeList: [],
                 frontTypes: Object.freeze([
                     '全部',
                     '搜索',
                     '浏览',
                     '导出',
                     '修改',
                     '登录',
                     '退出'
                 ]),
                 backTypes: Object.freeze([
                     '全部',
                     '修改',
                     '登录',
                     '退出'
                 ]),

                 page: '',
                 pageList: [],
                 allPages: Object.freeze([
                     {
                         name: '金融风险监测预警平台',
                         type: 1
                     },
                     {
                         name: '全息信息查询平台',
                         type: 1
                     },
                     {
                         name: '举报监测平台-警情',
                         type: 1
                     },
                     {
                         name: '举报监测平台-预警',
                         type: 1
                     },
                     {
                         name: '金融风险监测预警平台-首页',
                         type: 1
                     },
                     {
                         name: '金融风险监测预警平台-静态风险指数',
                         type: 1
                     },
                     {
                         name: '金融风险监测预警平台-动态风险指数',
                         type: 1
                     },
                     {
                         name: '金融风险监测预警平台-首页',
                         type: 1
                     },
                     {
                         name: '金融风险监测预警平台-企业详情页',
                         type: 1
                     },
                     {
                         name: '角色编辑',
                         type: 0
                     },
                     {
                         name: '角色列表',
                         type: 0
                     },
                     {
                         name: '角色浏览',
                         type: 0
                     },
                     {
                         name: '日志管理',
                         type: 0
                     },
                     {
                         name: '新增角色',
                         type: 0
                     },
                     {
                         name: '新增用户',
                         type: 0
                     },
                     {
                         name: '用户列表',
                         type: 0
                     },
                     {
                         name: '用户信息编辑',
                         type: 0
                     },
                     {
                         name: '用户信息浏览',
                         type: 0
                     },
                     {
                         name: '用户自行修改信息',
                         type: [0, 1]
                     },
                     {
                         name: '用户自行修改密码',
                         type: [0, 1]
                     }
                 ]),

                 startDate: [],
                 endDate: [],


                 order: -1, // 列表排序方向
                 list: [],

                 pageNumber: 0,
                 rowsTotal: 0
             }
         },
         computed: {
             exportUrl () {
                 return `/log/export.do?token=${mySessionStorage.accessToken}`
             }
         },
         methods: {
             getLogList () {
                 const {
                         username,
                         ip,
                         systemAddress,
                         type,
                         page,
                         startDate,
                         endDate,
                         pageNumber
                 } = this
                 const body = {
                     ip,
                     page,
                     pageNumber,
                     pageSize: 10,
                     startDateString: startDate.join(''),
                     endDateString: endDate.join(''),
                     systemAddress,
                     type,
                     userName: username
                 }
                 this.store.getLogList(body)
                         .then(res => {
                             const data = res.data
                             const content = data.content || {}
                             this.ipPl = this.ip
                             this.usernamePl = this.username
                             // this.ip = ''
                             // this.username = ''
                             this.list = content.list || []
                             this.rowsTotal = content.count || 0
                         })
             },
             systemAddressSelect (index) {
                 let pageList = [],
                     typeList = [],
                     type = 1
                 this.systemAddress = index ? this.systemAddressList[index] : ''
                 if (index) {
                     if (index === 1) {
                         typeList = this.frontTypes
                     } else {
                         type = 0
                         typeList = this.backTypes
                     }

                     pageList = this.allPages.filter(function( item ) {
                         return Array.isArray(item.type) || item.type === type
                     })
                     pageList = pageList.map(item => item.name)
                 } else {
                     pageList = this.allPages.map(item => item.name)
                     typeList = this.frontTypes
                 }

                 pageList.unshift('全部')

                 this.pageList = pageList
                 this.typeList = typeList
             },
             typeSelect (index) {
                 this.type = index ? this.typeList[index] : ''
             },
             pageSelect (index) {
                 this.page = index ? this.pageList[index] : ''
             },
             startDateChange (date) {
                 const dateStr = +(date.join(''))
                 const endDate = +(this.endDate.join(''))

                 this.startDate = date
                 if (dateStr > endDate) {
                     this.endDate = date
                 }
             },
             endDateChange (date) {
                 const dateStr = +(date.join(''))
                 const startDate = +(this.startDate.join(''))

                 this.endDate = date
                 if (dateStr < startDate) {
                     this.startDate = date
                 }
             },
             pageChange (num) {
                 this.pageNumber = --num
                 this.getLogList()
             },
             lookup () {
                 this.pageNumber = 0
                 this.getLogList()
             },
             getListOrder () {
                 this.order = this.order === 1 ? -1 : 1
                 this.list = this.list.sort((a, b) => {
                     return this.order * (a.updateString - b.updateString)
                 })
             }
         },
         mounted () {
             const pageList = this.allPages.map(item => item.name)
             pageList.unshift('全部')
             this.pageList = pageList

             this.typeList = this.frontTypes

             this.username = this.$route.query.username
             this.getLogList()
         },
         components: {
             InputField,
             SelectBox,
             Date,
             Btn,
             Pagination
         }
     }
</script>

<template>
    <div class="service_root">
        <div class="log_title">
            <div class="log_titleL">
                <InputField class="log_username"
                            :placeholder="usernamePl"
                            v-model.trim="username"
                ></InputField>
                <InputField class="log_ip"
                            title="IP地址"
                            :placeholder="ipPl"
                            v-model.trim="ip"
                ></InputField>
                <div class="log_addr">
                    系统位置
                    <SelectBox
                            :list="systemAddressList"
                            :defaultVal="systemAddress"
                            @selectItem="systemAddressSelect"
                    ></SelectBox>
                </div>
                <div class="log_type">
                    操作类型
                    <SelectBox
                            :list="typeList"
                            :defaultVal="type"
                            @selectItem="typeSelect"
                    ></SelectBox>
                </div>
                <div class="log_page">
                    操作页面
                    <SelectBox
                            :list="pageList"
                            :defaultVal="page"
                            @selectItem="pageSelect"
                    ></SelectBox>
                </div>
                <div class="log_date">
                    开始时间
                    <Date
                            :noValShow="1"
                            :defaultDate="startDate"
                            @callback="startDateChange"
                    ></Date>
                </div>
                <div class="log_date">
                    结束时间
                    <Date
                            :noValShow="1"
                            :defaultDate="endDate"
                            @callback="endDateChange"
                    ></Date>
                </div>
            </div>
            <div class="log_titleR">
                <Btn status="active" @handleClick="lookup">查询</Btn>
                <a class="log_export btn_root-default" :href="exportUrl" download="download">导出</a>
               <!-- <Btn class="log_export">导出</Btn>-->
            </div>
        </div>
        <table class="log_table service_table">
            <tr class="service_th">
                <td class="log_td1">序号</td>
                <td class="log_td2">日志编号</td>
                <td class="log_td3">用户名</td>
                <td class="log_td4">IP地址</td>
                <td class="log_td5">系统位置</td>
                <td class="log_td6">操作类型</td>
                <td class="log_td7">操作页面</td>
                <td class="log_td8">
                    发生时间
                    <span class="log_order" @click="getListOrder"></span>
                </td>
                <td class="log_td9">详情</td>
            </tr>
            <tr class="service_tb"
                v-for="(item, index) of list"
            >
                <td class="log_td1" v-text="index + 1">序号</td>
                <td class="log_td2" v-text="item.number">用户</td>
                <td class="log_td3" v-text="item.userName">真实姓名</td>
                <td class="log_td4" v-text="item.ip">所属部门</td>
                <td class="log_td5" v-text="item.systemAddress">行政区</td>
                <td class="log_td6" v-text="item.type">联系方式</td>
                <td class="log_td7" v-html="item.page">角色</td>
                <td class="log_td8" v-html="store.getFormedDate(item.updateString)">创建者</td>
                <td class="log_td9" v-html="item.content">用户类型</td>
            </tr>
        </table>
        <div class="service_page">
            <span class="service_count">共计：{{rowsTotal}}个</span>
            <Pagination
                    :showPages="5"
                    :pageSize="10"
                    :curPageNum="pageNumber + 1"
                    :rowsTotal="rowsTotal"
                    @pageChange="pageChange"
            ></Pagination>
        </div>
    </div>
</template>

<style lang="scss">
    @import "LogList.scss";
</style>