<script>
     /*
   * @component 举报分析组件
   * @author yxc
   * @date 2016/11/24
   * */
     import { ajax } from '../../assets/js/utils'
     import DetailsNav from '../FullInfo/Details/DetailsNav/DetailsNav.vue'
     import DetailsTitile from '../FullInfo/Details/DetailsTitile/DetailsTitile.vue'
     import SelectBox from '../SelectBox/SelectBox.vue'
     import TwoDate from '../Date/TwoDate.vue'
     import SearchBox from '../SearchBox/SearchBox.vue'
     import Pagination from '../Pagination/Pagination.vue'
     import WarnRiskDetails from '../Warn/WarnRiskDetails/WarnRiskDetails.vue'
     import AccuseTimesBar from '../../Echarts/AccuseTimesBar.vue'
     import WarnTimesBar from '../../Echarts/WarnTimesBar.vue'
     import AccuseTypePie from '../../Echarts/AccuseTypePie.vue'
     import AreaPie from '../../Echarts/AreaPie.vue'
     import NoResNotice from '../NoResNotice/NoResNotice.vue'
     import mixin from '../../assets/js/mixins'

     export default {
         mixins: [mixin],
         data(){
             return {
                 navIndex: 0, // tab切换下标
                 navs: ['警情', '预警'],
                 curInfoOccurredArea: '', // 警情信息发生地区
                 infoOccurredAreaArr: [], // 警情信息发生地区
                 infoDefaultTime1: [], // 警情信息初始化起始时间
                 infoDefaultTime2: ['', '', ''], // 警情信息初始化截止时间
                 infoTimeGap: [], // 警情信息发生时间区间
                 curCodePrefix: '', // 警情编号
                 allCodePrefix: [], // 所有敬请编号
                 curInfoAccuseType: '', // 警情信息举报类型
                 infoAccuseTypeArr: [], // 警情信息举报类型
                 infoAccuseSubject: '', // 警情信息举报主体
                 infoCurPageNum: 1, // 警情信息页码
                 infoRowsTotal: 0, // 警情信息记录总数
                 infoListData: [], // 警情列表数据
                 hasInfoListData: true, // 是否有警情列表数据
                 infoDetailsIndex: -1, // 警情信息详情下标
                 infoDetailSubTitle: '', // 警情弹框副标题

                 nowYear: '', //当前年份
                 nowMonth: '', //当前月份
                 curAccusedRankDate: '', // 当前被举报时间
                 accusedRankDate: [], // 举报排名日期列表
                 accusedTop100Company: [], // 被举报排名前100公司
                 hasAccusedTop100Data: true, // 是否有被举报排名前100公司数据

                 infoCount: {}, // 警情信息统计
                 infoCountTimeGap: [], // 警情信息统计时间区间
                 curInfoCountArea: '', // 当前警情信息统计地区
                 infoCountTime1: [], // 警情信息统计起始时间
                 infoCountTime2: ['', '', ''], // 警情信息统计截止时间
                 infoCountData: {}, // 警情信息统计数据

                 curInfoAreaDate: '', // 当前警情地区时间
                 infoAreaData: [] // 警情地区数据
             }
         },
         computed: {
             // 接口前缀
             navApi () {
                 return this.navIndex ? 'yj' : 'jq'
             }
         },
         methods: {
             // 导航切换回调
             detailsNavIndexChange (index) {
                 const {
                         companyName,
                         jqStartTime,
                         jqEndTime,
                         yjStartTime,
                         yjEndTime,
                 } = this.$route.query
                 this.infoListData = []
                 this.navIndex = index
                 this.infoDetailsIndex = -1
                 this.curInfoOccurredArea = ''
                 this.infoCurPageNum = 1
                 this.curAccusedRankDate = this.nowYear
                 this.curInfoAreaDate = this.nowYear
                 this.infoDefaultTime1 = [this.nowYear - 1, this.nowMonth]
                 this.infoDefaultTime2 = [this.nowYear, this.nowMonth]
                 this.infoCountTime1 = this.infoDefaultTime1
                 this.infoCountTime2 = this.infoDefaultTime2
                 this.infoCountTimeGap = [this.infoCountTime1, this.infoCountTime2]
                 let startDate = ''
                 let endDate = ''
                 if (index) {
                     startDate = yjStartTime
                     endDate = yjEndTime
                     setLog('', '举报监测平台-预警')
                 } else {
                     startDate = jqStartTime
                     endDate = jqEndTime
                     setLog('', '举报监测平台-警情')
                 }
                 if (startDate) {
                     this.infoDefaultTime1 = [startDate.substr(0, 4), startDate.substr(4, 2), startDate.substr(6, 2)]
                 }
                 if (endDate) {
                     this.infoDefaultTime2 = [endDate.substr(0, 4), endDate.substr(4, 2), endDate.substr(6, 2)]
                 }
                 this.infoTimeGap = [this.infoDefaultTime1, this.infoDefaultTime2]
                 this.infoAccuseSubject = companyName ? companyName : ''
                 index ? this.infoOccurredAreaArr = ['全部', '是', '否'] : this.getOccurredArea()
                 this.getWarnInfo()
                 this.getAccusedRankDate()
                 this.getInfoCount()
                 this.getInfoCountData()
                 this.getInfoByArea()
                 this.getAccusedRankCompany()
             },

             // 获取发生地区
             getOccurredArea () {
                 ajax({
                     method: 'get',
                     url: '/jq/getJqAllArea.do',
                     success: res => {
                         const content = res.content || []
                         this.infoOccurredAreaArr = ['全市'].concat(content)
                     }
                 })
             },

             // 举报发生地区回调
             infoOccurredAreaCallback (area) {
                 this.curInfoOccurredArea = area
                 this.getWarnInfo(1)
             },

             // 警情信息日期筛选回调
             infoDateCallback (date) {
                 this.infoTimeGap = date.date
             },

             // 获取警情信息举报类型
             getAccuseType () {
                 ajax({
                     method: 'get',
                     url: '/jq/getType.do',
                     success: res => {
                         this.infoAccuseTypeArr = ['所有类型'].concat(res.content || [])
                     }
                 })
             },

             // 举报类型回调
             infoAccuseTypeCallback (type) {
                 this.curInfoAccuseType = type
                 this.getWarnInfo(1)
             },

             // 举报主体回调
             infoAccuseSubjectCallback (o) {
                 this.infoAccuseSubject = o.searchVal || ''
                 this.getWarnInfo(1)
             },

             // 获取警情信息
             getWarnInfo (pageNum) {
                 if (pageNum) this.infoCurPageNum = pageNum
                 const {
                         navIndex,
                         infoTimeGap,
                         infoCurPageNum,
                         infoAccuseSubject,
                         curInfoAccuseType,
                         curInfoOccurredArea,
                         curCodePrefix
                 } = this
                 // 起止时间
                 const dateEndString = infoTimeGap[1].join('')
                 const dateStartString = infoTimeGap[0].join('')

                 // 针对发生地区 举报类型默认值处理
                 let area = ''
                 let isOccurCase = ''
                 const type = curInfoAccuseType === '所有类型' ? '' : curInfoAccuseType
                 const input = infoAccuseSubject === '被举报主体' ? '' : infoAccuseSubject
                 if (navIndex) {
                     isOccurCase = curInfoOccurredArea === '全部' ? '' : curInfoOccurredArea
                 } else {
                     area = curInfoOccurredArea === '全市' ? '' : curInfoOccurredArea
                 }

                 // 警情编号
                 const codePrefix = curCodePrefix === '全部' ? '' : curCodePrefix

                 ajax({
                     method: 'post',
                     url: `/${this.navApi}/getPage.do`,
                     emulateJSON: false,
                     body: {
                         area, // 发生区域
                         dateEndString, // 结束日期
                         dateStartString, // 开始日期
                         input: input, // 输入框
                         isOccurCase, // 是否发案("是","否")
                         pageNumber: infoCurPageNum - 1, // 页数
                         pageSize: 12, // 页面大小
                         type, //举报类型
                         queryEnd: '',
                         queryStart: '',
                         codePrefix
                     },
                     success: res => {
                         const content = res.content || {}
                         const list = content.list || []
                         this.infoRowsTotal = content.count || 0
                         // 针对警情信息记录加相应字段
                         this.infoListData = list.map(item => {
                             item.unfold = true; // 含多个公司 展开与收起
                             item.showDetailsModal = false; // 公司详情弹框
                             return item;
                         })

                         this.hasInfoListData = list.length
                     }
                 })
             },

             // 获取警情编号
             getWarnCode () {
                 ajax({
                     method: 'get',
                     url: '/jq/findAllCodePrefix.do',
                     success: res => {
                         const content = res.content || []
                         this.allCodePrefix = ['全部', ...content]
                     }
                 })

             },

             // 警情编号回调
             codePrefixCallback (type) {
                 this.curCodePrefix = type
                 this.getWarnInfo(1)
             },

             // 获取重置后的警情信息
             getResetWarnInfo () {
                 this.curCodePrefix = ''
                 this.curInfoAccuseType = ''
                 this.infoAccuseSubject = ''
                 this.infoCurPageNum = 1
                 this.curInfoOccurredArea = ''
                 this.infoDefaultTime1 = [this.nowYear - 1, this.nowMonth, '01']
                 this.infoDefaultTime2 = [this.nowYear, this.nowMonth, '31']
                 this.infoTimeGap = [this.infoDefaultTime1, this.infoDefaultTime2]
                 this.getWarnInfo()
             },

             // 格式化日期时间
             getFormattedDateTime(dateTime) {
                 let tmpDateTime = dateTime || ''
                 return tmpDateTime.replace(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})\d*/, '$1/$2/$3 $4:$5')
             },

             // 检测是否有多家被举报主体
             checkManySubject (subject) {
                 return /\,/.test(subject)
             },

             // 格式化被举报主体
             getFormattedSubject (subject) {
                 let tmpSubject = subject || ''
                 const infoAccuseSubject = this.infoAccuseSubject // 匹配搜索关键词
                 const infoAccuseSubject2 = infoAccuseSubject.replace(/(\*)/g, '\\$1') // 针对匹配关键词里含有*特殊字符
                 const reg = new RegExp(infoAccuseSubject2, 'g')
                 const subjectArr = tmpSubject.split(',')

                 return subjectArr.map(item => {
                     const o = {
                         companyName: item,
                         showCompanyName: item
                     }
                     if (infoAccuseSubject) {
                         o.showCompanyName = item.replace(reg, `<span class="match__key__class">${infoAccuseSubject}</span>`)
                     }
                     return o
                 })
             },

             // 举报来源
             getAccusedSrc (tel) {
                 return '举报来源：' + (tel || '').replace(/^(\d{3})(\d*?)(\d{4}$)/, '$1****$2')
             },

             // 警情信息页码回调
             infoPageChange (pageNum) {
                 this.infoCurPageNum = pageNum
                 this.getWarnInfo()
             },

             // 获取跳转地址
             getUrlByCompany (companyName) {
                 const preUrl = window.location.protocol + window.location.host
                 const notBbdUrl = encodeURIComponent(`${preUrl}/#/fullinfo?company=${companyName}`)
                 const bbdUrl = encodeURIComponent(`${preUrl}/#/fullinfo/details?company=${companyName}`)
                 return `/basedata/toPage.do?companyName=${companyName}&bbd=${bbdUrl}&notBbd=${notBbdUrl}`
             },

             // 获取被举报公司起始时间
             getAccusedRankDate () {
                 // GET
                 const tmpArr = []
                 const nowYear = this.nowYear
                 ajax({
                     method: 'get',
                     url: `/${this.navApi}/getStartDate.do`,
                     success: res => {
                         const startYear = res.content || 2000
                         for(let i = startYear; i <= nowYear; i++) {
                             tmpArr.unshift(i)
                         }
                         this.accusedRankDate = tmpArr
                     }
                 })
             },

             // 被举报公司时间选择回调
             accusedRankDateCallback (year) {
                 this.curAccusedRankDate = year
                 this.getAccusedRankCompany()
             },

             // 获取被举报公司排名
             getAccusedRankCompany () {
                 ajax({
                     method: 'get',
                     url: `/${this.navApi}/getTop.do`,
                     params: {
                         year: this.curAccusedRankDate
                     },
                     success: res => {
                         const content = res.content || []
                         this.accusedTop100Company = content
                         this.hasAccusedTop100Data = content.length
                     }
                 })
             },

             // 点击举报次数
             handleClickAccusedTimes (companyName) {
                 this.infoAccuseSubject = companyName
                 this.curInfoAccuseType = ''
                 this.curInfoOccurredArea = ''
                 this.infoCurPageNum = 1
                 this.infoDefaultTime1 = [this.curAccusedRankDate, '01', '01']
                 this.infoDefaultTime2 = [this.curAccusedRankDate, '12', '31']
                 this.infoTimeGap = [this.infoDefaultTime1, this.infoDefaultTime2]
                 this.getWarnInfo()
                 document.body.scrollTop = document.documentElement.scrollTop = 0
             },

             // 获取警情信息统计
             getInfoCount () {
                 ajax({
                     method: 'get',
                     url: `/${this.navApi}/getJqCount.do`,
                     success: res => {
                         this.infoCount = res.content || {}
                     }
                 })
             },

             // 警情信息日期筛选回调
             infoCountDateCallback (date) {
                 this.infoCountTimeGap = date.date
                 this.getInfoCountData()
             },

             // 警情信息统计当前地区
             infoCountAreaCallback (area) {
                 this.curInfoCountArea = area
                 this.getInfoCountData()
             },

             // 获取警情信息统计数据
             getInfoCountData () {
                 const {
                         curInfoCountArea: area,
                         infoCountTimeGap
                 } = this

                 ajax({
                     method: 'post',
                     emulateJSON: false,
                     url: `/${this.navApi}/getJqStatistics.do`,
                     body: JSON.stringify({
                         area: area === '全市' ? '' : area, // 发生区域 ,
                         dateEndString: infoCountTimeGap[1].join(''), // 结束日期 ,
                         dateStartString: infoCountTimeGap[0].join('') // 开始日期 ,
                     }),
                     success: res => {
                         this.infoCountData = res.content || {}
                     }
                 })
             },

             // 警情地区时间回调
             infoAreaDateCallback (date) {
                 this.curInfoAreaDate = date
                 this.getInfoByArea()
             },

             // 获取警情地区分析
             getInfoByArea () {
                 ajax({
                     method: 'get',
                     url: `/${this.navApi}/getJqStatisticsByArea.do`,
                     params: {
                         year: this.curInfoAreaDate
                     },
                     success: res => {
                         this.infoAreaData = res.content || []
                     }
                 })
             },

             // 点击其他地方详情弹框关闭
             closeDetailsModal () {
                 const infoListData = this.infoListData
                 if (this.infoDetailsIndex === -1) return
                 for(let i = 0; i < infoListData.length; i++) {
                     this.infoListData[i].showDetailsModal = this.infoDetailsIndex === i
                 }
                 this.infoDetailsIndex = -1
             }
         },
         created () {
             // 获取警情信息的起始时间
             const curFormattedDate = this.getFormattedDate()
             let curYear = curFormattedDate[0]
             this.nowYear = curYear
             this.nowMonth = curFormattedDate[1]
             this.curAccusedRankDate = curYear
             this.curInfoAreaDate = curYear
             curFormattedDate[0] = -- curYear
             this.infoDefaultTime1 = curFormattedDate
             this.infoCountTime1 = curFormattedDate
         },
         mounted () {
             const {
                     companyName,
                     jqStartTime,
                     jqEndTime,
                     yjStartTime,
                     yjEndTime,
                     type } = this.$route.query
             let startDate = ''
             let endDate = ''
             setLog('', '举报监测平台-警情')
             if (type) {
                 startDate = yjStartTime
                 endDate = yjEndTime
                 this.navIndex = 1
             } else {
                 startDate = jqStartTime
                 endDate = jqEndTime
                 this.navIndex = 0
             }
             this.infoAccuseSubject = companyName ? companyName : ''

             this.getOccurredArea()
             this.getAccuseType()
             this.getAccusedRankDate()
             this.getAccusedRankCompany()
             this.getInfoCount()
             this.getInfoByArea()
             setTimeout(() => {
                 if (startDate) {
                     this.infoDefaultTime1 = [startDate.substr(0, 4), startDate.substr(4, 2), startDate.substr(6, 2)]
                 }
                 if (endDate) {
                     this.infoDefaultTime2 = [endDate.substr(0, 4), endDate.substr(4, 2), endDate.substr(6, 2)]
                     this.infoTimeGap = [this.infoDefaultTime1, this.infoDefaultTime2]
                 }
                 this.getWarnInfo()
                 this.getInfoCountData()
             })

             this.getWarnCode()
         },
         components: {
             DetailsNav,
             DetailsTitile,
             SelectBox,
             TwoDate,
             SearchBox,
             Pagination,
             WarnRiskDetails,
             AccuseTimesBar,
             WarnTimesBar,
             AccuseTypePie,
             AreaPie,
             NoResNotice
         }
     }
</script>

<template>
    <div class="analysis__root">

        <DetailsNav
                :navs="navs"
                :defaultIndex="navIndex"
                @detailsNavIndexChange="detailsNavIndexChange"
        ></DetailsNav>

        <div class="analysis__wrap">
            <div class="analysis__left">
                <div class="analysis__info">

                    <DetailsTitile :title="navs[navIndex] + '信息'">
                        <div :class="[navIndex ? 'analysis__isOccurred' : 'analysis__occurred']">
                            <span v-text="navIndex ? '是否发案' : '发生地区'"></span>
                            <SelectBox
                                    :dataList="infoOccurredAreaArr"
                                    :defaultVal="curInfoOccurredArea"
                                    @selectChange="infoOccurredAreaCallback"
                            ></SelectBox>
                        </div>

                        <TwoDate
                                :isShowDay="false"
                                :defaultDate1="infoDefaultTime1"
                                :defaultDate2="infoDefaultTime2"
                                @callback="infoDateCallback"
                        ></TwoDate>

                        <button class="analysis__searchBtn" @click=" () => getWarnInfo(1)">确认</button>

                        <button class="analysis__reset" @click="getResetWarnInfo">重置</button>

                        <span class="analysis__count">总计<em v-text="infoRowsTotal"></em>条</span>

                    </DetailsTitile>

                    <div class="analysis__infoList">

                        <ul class="analysis__infoTitle">
                            <template v-if="navIndex">
                                <li class="analysis__i10">预警编号</li>
                                <li class="analysis__i11">发布日期</li>
                                <li class="analysis__i12">发布地</li>
                                <li class="analysis__i13">
                                    <SearchBox
                                            :placeholder="infoAccuseSubject || '涉及公司'"
                                            :allowedEmpty="true"
                                            @searchSubmit="infoAccuseSubjectCallback"
                                    ></SearchBox>
                                </li>
                                <li class="analysis__i14">涉及人数</li>
                                <li class="analysis__i15">涉及金额（万元）</li>
                            </template>
                            <template v-else>
                                <li class="analysis__i00">
                                    警情编号
                                    <SelectBox
                                            :dataList="allCodePrefix"
                                            :defaultVal="curCodePrefix"
                                            @selectChange="codePrefixCallback"
                                    ></SelectBox>
                                </li>
                                <li class="analysis__i01">
                                    类型
                                    <SelectBox
                                            :dataList="infoAccuseTypeArr"
                                            :defaultVal="curInfoAccuseType"
                                            @selectChange="infoAccuseTypeCallback"
                                    ></SelectBox>
                                </li>
                                <li class="analysis__i02">
                                    <SearchBox
                                            :placeholder="infoAccuseSubject || '被举报主体'"
                                            :allowedEmpty="true"
                                            @searchSubmit="infoAccuseSubjectCallback"
                                    ></SearchBox>
                                </li>
                                <li class="analysis__i03">处警时间</li>
                                <li class="analysis__i04">发生地区</li>
                            </template>
                            <li >详情</li>
                        </ul>

                        <ul ref="analysis__infoTable" class="analysis__infoTable">
                            <li class="analysis__item" v-for="(item, index) of infoListData">
                                <template v-if="navIndex">
                                        <span class="analysis__i10 ellipsis" v-text="item.yjid"></span>
                                        <span class="analysis__i11" v-text="getFormattedDateTime(item.fbrq)"></span>
                                        <span class="analysis__i12" v-text="item.fbd"></span>
                                        <span class="analysis__i13">
                                            <span
                                                    :class="{
                                                        'analysis__isWarn': true,
                                                        'analysis__isWarn--none': item.sffa === '否'
                                                        }"
                                            ></span>
                                            <span
                                                    :class="[
                                                    item.unfold ?
                                                        'analysis__showMoreCompany--fold' :
                                                        'analysis__showMoreCompany--unfold']"
                                            >
                                                <template v-for="item of getFormattedSubject(item.sjgsmc)">
                                                    <a
                                                            :class="`${isHasPermission([2]) ? 'analysis__companyName' : ''} ellipsis`"
                                                            :href="isHasPermission([2]) ? getUrlByCompany(item.companyName) : null"
                                                            v-html="item.showCompanyName"
                                                            target="_blank"
                                                    ></a><br>
                                                </template>
                                            </span>
                                            <span
                                                    v-if="checkManySubject(item.sjgsmc)"
                                                    :class="[
                                                        'iconfont icon-jiantouxiangshang',
                                                        item.unfold ? 'analysis__arrow--unfold' : 'analysis__arrow--fold']"
                                                    @click="item.unfold = !item.unfold"
                                            ></span>
                                        </span>
                                        <span class="analysis__i14" v-text="item.sjrs"></span>
                                        <span class="analysis__i15" v-text="item.sjje"></span>
                                        <span
                                                class="analysis__i16"
                                                @click="e => {showWarnRiskDetails(e, 'analysis__infoTable', '预警内容', item.yjnr); infoDetailSubTitle = ''}"
                                        ></span>
                                    </template>
                                <template v-else>
                                        <span class="analysis__i00  ellipsis" v-text="item.jjbh" :title="item.jjbh"></span>
                                        <span class="analysis__i01" v-text="item.cjmc"></span>
                                        <span class="analysis__i02">
                                            <span
                                                    :class="[
                                                    item.unfold ?
                                                        'analysis__showMoreCompany--fold' :
                                                        'analysis__showMoreCompany--unfold']"
                                            >
                                                <template v-for="item of getFormattedSubject(item.sjgsmc)">
                                                    <a
                                                            :class="`${isHasPermission([2]) ? 'analysis__companyName' : ''} ellipsis`"
                                                            :href="isHasPermission([2]) ? getUrlByCompany(item.companyName) : null"
                                                            v-html="item.showCompanyName"
                                                            :title="item.companyName"
                                                            target="_blank"
                                                    ></a><br>
                                                </template>
                                            </span>
                                            <span
                                                    v-if="checkManySubject(item.sjgsmc)"
                                                    :class="[
                                                        'iconfont icon-jiantouxiangshang',
                                                        item.unfold ? 'analysis__arrow--unfold' : 'analysis__arrow--fold']"
                                                    @click="item.unfold = !item.unfold"
                                            ></span>
                                        </span>
                                        <span class="analysis__i03" v-text="getFormattedDateTime(item.cjsj)"></span>
                                        <span class="analysis__i04" v-text="item.area"></span>
                                        <span
                                                class="analysis__i05"
                                                @click="e => {showWarnRiskDetails(e, 'analysis__infoTable', '警情来源', item.bjnr); infoDetailSubTitle = getAccusedSrc(item.bjdh)}"
                                        ></span>
                                    </template>
                            </li>
                            <WarnRiskDetails
                                    v-show="WarnRiskDetails.show"
                                    :title="WarnRiskDetails.title"
                                    :subTitle="infoDetailSubTitle"
                                    :text="WarnRiskDetails.details"
                                    :top="WarnRiskDetails.top"
                                    :left="WarnRiskDetails.left"
                                    @callback="closeWarnRiskDetails"
                            ></WarnRiskDetails>
                            <NoResNotice v-show="!hasInfoListData" msg="暂无相关数据"></NoResNotice>
                        </ul>
                        <Pagination
                                :showPages="5"
                                :curPageNum="infoCurPageNum"
                                :rowsTotal="infoRowsTotal"
                                :pageSize="12"
                                @pageChange="infoPageChange"
                        ></Pagination>
                    </div>
                </div>
                <div class="analysis__rank">
                    <DetailsTitile :title="navIndex ? '预警次数排名' : '被举报公司排名'">
                        <div class="analysis__rankTime">
                            <span>时间</span>
                            <SelectBox
                                    :dataList="accusedRankDate"
                                    @selectChange="accusedRankDateCallback"
                            ></SelectBox>
                        </div>
                    </DetailsTitile>

                    <div class="analysis__rankList">

                        <ul class="analysis__rankTitle">
                            <template v-if="navIndex">
                                <li class="analysis__r10">序号</li>
                                <li class="analysis__r11">涉及公司</li>
                                <li class="analysis__r12">累计预警次数</li>
                                <li class="analysis__r13">累计涉及人数</li>
                                <li class="analysis__r14">累计涉及金额（万元）</li>
                            </template>
                            <template v-else>
                                <li class="analysis__r00">序号</li>
                                <li class="analysis__r01">被举报主体</li>
                                <li class="analysis__r02">累计被举报次数</li>
                                <li class="analysis__r03">最近处警时间</li>
                                <li class="analysis__r04">发生地区</li>
                            </template>
                        </ul>

                        <ul class="analysis__rankTable">
                            <li
                                    class="analysis__item"
                                    v-for="(item, index) of accusedTop100Company"
                            >
                                <template v-if="navIndex">
                                    <span class="analysis__r10" v-text="index + 1">J12306.COM</span>
                                    <span class="analysis__r11 analysis__r11--hover">
                                        <a
                                                :class="`${isHasPermission([2]) ? 'analysis__companyName' : ''} ellipsis`"
                                                :href="isHasPermission([2]) ? getUrlByCompany(item.name) : null"
                                                v-text="item.name"
                                                target="_blank"
                                        ></a>
                                    </span>
                                    <span class="analysis__r12" v-text="item.amount" @click="handleClickAccusedTimes(item.name)">J12306.COM</span>
                                    <span class="analysis__r13" v-text="item.person">J12306.COM</span>
                                    <span class="analysis__r14" v-text="item.money">J12306.COM</span>
                                </template>

                                <template v-else>
                                    <span class="analysis__r00" v-text="index + 1"></span>
                                    <span class="analysis__r01 analysis__r01--hover ">
                                        <a
                                                :class="`${isHasPermission([2]) ? 'analysis__companyName' : ''} ellipsis`"
                                                :href="isHasPermission([2]) ? getUrlByCompany(item.name) : null"
                                                v-text="item.name"
                                                target="_blank"
                                                :title="item.name"
                                        ></a>
                                    </span>
                                    <span class="analysis__r02" v-text="item.count" @click="handleClickAccusedTimes(item.name)"></span>
                                    <span class="analysis__r03" v-text="getFormattedDateTime(item.time)"></span>
                                    <span class="analysis__r04" v-text="item.area"></span>
                                </template>
                            </li>
                            <NoResNotice v-show="!hasAccusedTop100Data" msg="暂无相关数据"></NoResNotice>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="analysis__right">
                <div class="analysis__warnAccept">
                    <div v-text="navs[navIndex] + '接收情况'"></div>
                    <div>
                        本月新增：<em>{{infoCount.month}}</em><br>
                        历史累计：<em>{{infoCount.total}}</em>
                    </div>
                </div>
                <div class="analysis__infoCount">
                    <DetailsTitile :title="navs[navIndex] + '信息统计'">
                        <TwoDate
                                :isShowDay="false"
                                :dateGap="1"
                                :defaultDate1="infoCountTime1"
                                :defaultDate2="infoCountTime2"
                                @callback="infoCountDateCallback"
                        ></TwoDate>

                        <SelectBox
                                v-if="!navIndex"
                                :dataList="infoOccurredAreaArr"
                                :defaultVal="curInfoCountArea"
                                @selectChange="infoCountAreaCallback"
                        ></SelectBox>
                    </DetailsTitile>

                    <div class="analysis__timesCanvas">
                        <WarnTimesBar
                                v-if="navIndex"
                                :barData="infoCountData"
                        ></WarnTimesBar>
                        <AccuseTimesBar
                                v-else
                                :barData="infoCountData"
                        ></AccuseTimesBar>
                    </div>
                    <div class="analysis__typeCanvas">
                        <AccuseTypePie
                                :title="navIndex ? '案件分布' : '举报类型分析'"
                                :pieData="infoCountData"
                        ></AccuseTypePie>
                    </div>
                </div>
                <div class="analysis__area">
                    <DetailsTitile :title="navIndex ? '发布地区分析' : '警情地区分析'">
                        <div class="analysis__rankTime">
                            <SelectBox
                                    :dataList="accusedRankDate"
                                    @selectChange="infoAreaDateCallback"
                            ></SelectBox>
                        </div>
                    </DetailsTitile>
                    <div class="analysis__areaCanvas">
                        <AreaPie
                                :pieData="infoAreaData"
                        ></AreaPie>
                    </div>
                </div>
            </div>
        </div>

        <a href=""></a>
    </div>
</template>

<style lang="scss">
  @import "Analysis.scss";
</style>
