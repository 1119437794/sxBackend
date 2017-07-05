<script>
     /*
    * @component 组件
    * @author yxc
    * */
     import { clickOtherClose } from '../../assets/js/utils'
     export default {
         props: {
             defaultDate: {
                 type: Array,
                 default: () => ['', '', '']
             },
             // 是否显示日历切换icon
             showToggle: {
                 default: true
             },
             // 日期分隔符
             joinLink: {
                 default: '-'
             },
             // 是否显示日
             isShowDay: {
                 default: true
             },
             // 是否可以清除选择的日期
             isClearDate: {
                 default: false
             },
             // 没有值时如何显示 0 => 最新时间 1 => -
             noValShow: {
                 default: 0
             }
         },
         data () {
             return {
                 nowYear: 0, // 当前用户的年月日
                 nowMonth: 0,
                 nowDay: 0,
                 currentYear: 0, // 当前选择的年月日
                 currentMonth: 0,
                 currentDay: 0,

                 data: [], // 日历列表数据
                 show: false, // 显隐日历列表
                 // 所有月份对应的天数
                 monthDayCount: [
                     31, 28, 31, 30,
                     31, 30, 31, 31,
                     30, 31, 30, 31
                 ],
                 noValShow2: this.noValShow, // 针对没有值时 点击选择某一个具体值时是可以显示的

                 curUnit: 2 // 0 - 年 1 -月 2 - 日
             }
         },
         computed: {
             getYMD () {
                 let _str = ''
                 const yyyymm = this.currentYear + this.joinLink + this.currentMonth
                 const yyyymmdd = this.currentYear + this.joinLink + this.currentMonth + this.joinLink + this.currentDay
                 if (!this.noValShow2) {
                     _str = this.isShowDay ? yyyymmdd : yyyymm
                 } else {
                     _str = '-'
                 }
                 return _str
             }
         },
         methods: {
             // 将小于10的数添加前缀0
             fixLt10AddPreZero (val) {
                 return +val < 10 ? `0${val}` : val
             },
             // 格式化日期
             getFormattedDate (date = new Date()) {
                 const nowY = date.getFullYear()
                 const nowM = this.fixLt10AddPreZero(date.getMonth() + 1)
                 const nowD = this.fixLt10AddPreZero(date.getDate())
                 return [nowY, nowM, nowD]
             },
             // 针对年份变化时 调整二月的天数
             fixMonthDayCount () {
                 if ((this.currentYear % 4 === 0 && this.currentYear % 100 !== 0) || (this.currentYear % 100 === 0 && this.currentYear % 400 === 0)) {
                     this.monthDayCount[1] = 29
                 } else {
                     this.monthDayCount[1] = 28
                 }
             },
             // 针对年份 或 月份变化时 调整当前显示的日期
             fixDay () {
                 const monthMaxDay = this.monthDayCount[+this.currentMonth - 1]
                 this.currentDay = this.currentDay > monthMaxDay ? monthMaxDay : this.currentDay
             },
             // 根据显示内容设置样式
             setClassName (val) {
                 let _className = ''
                 const _val = Number.parseInt(val, 10)

                 if (/[日一二三四五六]/.test(val)) {
                     _className = 'date_week'
                 } else if (val === '') {
                     _className = 'date_day-space'
                 } else if (/年$/.test(val)) {
                     if (!this.dateIsValid(+_val, +this.currentMonth, +this.currentDay)) {
                         _className = 'date_year-disable'
                     } else {
                         _className = +this.currentYear === _val ? 'date_year-active' : 'date_year'
                     }
                 } else if (/月$/.test(val)) {
                     if (this.dateIsValid(+this.currentYear, _val, +this.currentDay)) {
                         _className = +this.currentMonth === _val ? 'date_month-active' : 'date_month'
                     } else {
                         _className = 'date_month-disable'
                     }
                 } else if (/^\d{1,2}$/.test(val)) {
                     if (this.dateIsValid(+this.currentYear, +this.currentMonth, _val)) {
                         _className = +this.currentDay === _val ? 'date_day-active' : 'date_day'
                     } else {
                         _className = 'date_day-disable'
                     }
                 }
                 return _className
             },
             // 前后选择日期
             selectPreNext (dir = 1) {
                 let newDate = ''
                 let currentDay = +this.currentDay
                 let currentMonth = +this.currentMonth
                 let currentYear = +this.currentYear
                 const _curShowVal = this.data[this.data.length - 1]
                 if (/\d$/.test(_curShowVal)) {
                     currentDay = currentDay + dir
                     setTimeout(this.getDaysList) // 异步排队执行代码
                 } else if (/月$/.test(_curShowVal)) {
                     currentMonth = currentMonth + dir
                     setTimeout(this.getMonthList)
                 } else if (/年$/.test(_curShowVal)) {
                     currentYear = currentYear + dir
                     setTimeout(() => this.getYearList(dir))
                 }
                 if (this.dateIsValid(currentYear, currentMonth, currentDay)) {
                     newDate = this.getFormattedDate(new Date(currentYear, currentMonth - 1, currentDay))
                     this.currentYear = newDate[0]
                     this.currentMonth = newDate[1]
                     this.currentDay = newDate[2]
                     this.noValShow2 = 0
                 } else {
                     this.currentDay = this.nowDay
                     this.currentMonth = this.nowMonth
                     this.currentYear = this.nowYear
                 }
             },
             // 获取 日列表
             getDaysList () {
                 this.curUnit = 2
                 let curMonthDays = 0 // 获取指定月份的天数
                 let curYearMonthFirstDay = null // 指定年月的第一天的时间对象
                 let curYearMonthFirstDayWeekday = 0 // 指定年月的第一天的星期几
                 let tmpArr = [] // 填充空元素给数组
                 let tmpDaysList = ['日', '一', '二', '三', '四', '五', '六']

                 this.currentYear = this.currentYear || this.nowYear
                 this.currentMonth = this.currentMonth || this.nowMonth
                 this.currentDay = this.currentDay || this.nowDay

                 curYearMonthFirstDay = new Date(`${this.currentYear}/${+this.currentMonth}/01`)
                 curYearMonthFirstDayWeekday = curYearMonthFirstDay.getDay()
                 tmpArr = new Array(curYearMonthFirstDayWeekday).fill('')

                 this.fixMonthDayCount(this.currentYear) // 判断是否闰年
                 tmpDaysList = tmpDaysList.concat(tmpArr)
                 curMonthDays = this.monthDayCount[+this.currentMonth - 1]

                 for (let i = 1; i <= curMonthDays; i++) {
                     tmpDaysList.push(i)
                 }

                 this.data = tmpDaysList
             },
             // 获取 月列表
             getMonthList () {
                 this.curUnit = 1
                 this.currentYear = this.currentYear || this.nowYear
                 this.currentMonth = this.currentMonth || this.nowMonth
                 const monthsArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] // 月份列表
                 this.data = monthsArr.map(item => {
                     return item + '月'
                 })
             },
             // 获取 年列表
             getYearList (dir) {
                 this.curUnit = 0
                 const _yearArr = []
                 const currentYear = +this.currentYear
                 const actType = dir > 0 ? 'push' : 'unshift'

                 if (!this.data.includes(currentYear + '年')) {
                     for (let i = 0; i < 9; i++) {
                         _yearArr[actType](currentYear + dir * i + '年')
                     }
                     this.data = _yearArr
                 }
             },
             // 显示日历
             showCalender () {
                 this.show = true
                 this.isShowDay ? this.getDaysList() : this.getMonthList()
             },
             // 隐藏日历
             hideCalender () {
                 this.show = false
             },
             // 点击选择某一个列表项
             selectItem (val) {
                 let currentDay = +this.currentDay
                 let currentMonth = +this.currentMonth
                 let currentYear = +this.currentYear
                 const _val = Number.parseInt(val, 10)
                 if (/\d$/.test(_val)) {
                     if (/\d$/.test(val)) {
                         currentDay = _val
                     } else if (/月$/.test(val)) {
                         currentMonth = _val
                     } else if (/年$/.test(val)) {
                         currentYear = _val
                     }
                     if (this.dateIsValid(currentYear, currentMonth, currentDay)) {
                         this.currentDay = this.fixLt10AddPreZero(currentDay)
                         this.currentMonth = this.fixLt10AddPreZero(currentMonth)
                         this.currentYear = currentYear
                         this.fixDay()
                         this.fixMonthDayCount()
                         this.hideCalender()
                         this.noValShow2 = 0
                     } else {
                         this.currentDay = this.nowDay
                         this.currentMonth = this.nowMonth
                         this.currentYear = this.nowYear
                     }
                 }
             },
             // 清除选择的日期
             clearDate () {
                 this.currentYear = ''
                 this.currentMonth = ''
                 this.currentDay = ''
                 this.hideCalender()
             },
             // 获取默认传入的日期
             getPropsDate () {
                 this.currentYear = this.defaultDate[0]
                 this.currentMonth = this.defaultDate[1]
                 this.currentDay = this.defaultDate[2]
                 if (!this.noValShow2) {
                     this.currentYear = this.currentYear || this.nowYear
                     this.currentMonth = this.currentMonth || this.nowMonth
                     this.currentDay = this.currentDay || this.nowDay
                 }
             },
             // 判断是否大于当前日期
             dateIsValid (y, m, d) {
                 const valDate = +new Date(+y, +m, +d)
                 const nowDate = +new Date(+this.nowYear, +this.nowMonth, +this.nowDay)
                 return valDate <= nowDate
             }
         },
         created () {
             const now = this.getFormattedDate()
             this.nowYear = now[0]
             this.nowMonth = now[1]
             this.nowDay = now[2]
             this.getPropsDate()
         },
         watch: {
             getYMD () {
                 let dateArr = [this.currentYear, this.currentMonth, this.currentDay]
                 if (!this.isShowDay) {
                     dateArr = [this.currentYear, this.currentMonth]
                 }
                 this.$emit('callback', dateArr)
             },
             defaultDate () {
                 if (this.defaultDate[0]) {
                     // 有默认值就显示
                     this.noValShow2 = 0
                 } else if (this.noValShow === 1) {
                     // 没得默认值且显示为 -
                     this.noValShow2 = 1
                 }
                 this.getPropsDate()
             }
         },
         mounted () {
             clickOtherClose(this.$refs['date_root'], this.hideCalender)
         }
     }
</script>

<template>
    <div class="date_root" ref="date_root">
        <div class="date_current">{{getYMD}}<em v-show="showToggle" @click="showCalender"></em></div>
        <div v-show="show" class="date_calender">
            <ul class="date_act">
                <li class="date_pre" @click="selectPreNext(-1)">&lt;</li>
                <li :class="{'date_actYear': true, 'date_act-active': curUnit === 0}" v-text="currentYear" @click="getYearList(-1)"></li>
                <li >/</li>
                <li :class="{'date_actMonth': true, 'date_act-active': curUnit === 1}" v-text="currentMonth" @click="getMonthList"></li>
                <template v-if="isShowDay">
                    <li>/</li>
                    <li :class="{'date_actDay': true, 'date_act-active': curUnit === 2}" v-text="currentDay" @click="getDaysList"></li>
                </template>
                <li class="date_next" @click="selectPreNext(1)">&gt;</li>
                <li v-if="isClearDate" class="date_clear" @click="clearDate">清除</li>
            </ul>
            <ul>
                <li
                        v-text="item"
                        v-for="item of data"
                        @click="selectItem(item)"
                        :class="setClassName(item)"
                ></li>
            </ul>
        </div>
    </div>
</template>

<style lang="scss">
    @import "Date.scss";
</style>
