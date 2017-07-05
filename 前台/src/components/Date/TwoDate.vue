<script>
     /*
    * @component 组件
    * @author yxc
    * */
     import Date from './Date.vue'
     import mixin from '../../assets/js/mixins'

     export default {
         mixins: [mixin],
         props: {
             name: {
                 default: 'date'
             },
             defaultDate1: {
                 default: () => ['2000', '01', '01']
             },
             defaultDate2: {
                 default: () => ['', '', '']
             },
             isShowDay: {
                 default: true
             },
             // 针对项目 显示陈案
             showOldCase: {
                 default: false
             },
             // 针对项目 此处用于控制保证两个日期间隔小于一年
             dateGap: {
                 default: 0
             }
         },
         data () {
             return {
                 // 判断陈案的标准日期
                 basicDate: 20080101,
                 selectDate1: ['', '', ''],
                 selectDate2: ['', '', ''],
                 currDate: '' // 当前日期
             }
         },
         computed: {
             // 针对日期1 和 日期2 显隐 陈案
             showOldCaseDate1 () {
                 return this.selectDate1.join('') < this.basicDate
             },
             showOldCaseDate2 () {
                 return this.selectDate2.join('') < this.basicDate
             }
         },
         methods: {
             func1 (val) {
                 this.selectDate1 = val
                 const selectDate2 = this.selectDate2.join('')
                 if (selectDate2) {
                     const _max = this.getMinMaxVal().max
                     const _maxStr = _max.join('')
                     const tmpCurrDate = this.currDate
                     let tmpDate2 = [val[0] + this.dateGap, val[1], val[2]]
                     const tmpDate2Str = tmpDate2.join('')

                     if (tmpDate2Str > tmpCurrDate) {
                         tmpDate2 = [tmpCurrDate.substr(0, 4), tmpCurrDate.substr(4, 2), tmpCurrDate.substr(6, 2)]
                     }
                     if (this.dateGap) {
                         this.selectDate2 =  selectDate2 > tmpDate2Str ? tmpDate2 : _max
                     } else if (!this.dateGap && _maxStr !== selectDate2) {
                         this.selectDate2 = _max
                     }
                     this.emitSelectDate()
                 }
             },
             func2 (val) {
                 this.selectDate2 = val
                 const selectDate1 = this.selectDate1.join('')
                 if (selectDate1) {
                     const _min = this.getMinMaxVal().min
                     const _minStr = _min.join('')
                     const tmpDate1 = [val[0] - this.dateGap, val[1], val[2]]
                     const tmpDate1Str = tmpDate1.join('')
                     if (this.dateGap) {
                         this.selectDate1 = selectDate1 < tmpDate1Str ? tmpDate1 : _min
                     } else if (!this.dateGap && _minStr !== selectDate1) {
                         this.selectDate1 = _min
                     }
                     this.emitSelectDate()
                 }
             },
             getMinMaxVal () {
                 let o
                 const _val = +this.selectDate1.join('')
                 const _va2 = +this.selectDate2.join('')

                 if (_val < _va2) {
                     o = {
                         min: this.selectDate1,
                         max: this.selectDate2
                     }
                 } else {
                     o = {
                         min: this.selectDate2,
                         max: this.selectDate1
                     }
                 }
                 return o
             },
             emitSelectDate () {
                 const o = {}
                 o[this.name] = [this.selectDate1, this.selectDate2]
                 this.$emit('callback', o)
             }
         },
         created () {
             this.selectDate1 = this.defaultDate1
             this.selectDate2 = this.defaultDate2
             this.currDate = this.getFormattedDate().join('')
         },
         watch: {
             defaultDate1 () {
                 this.selectDate1 = this.defaultDate1
             },
             defaultDate2 () {
                 this.selectDate2 = this.defaultDate2
             }
         },
         components: {
             Date
         }
     }
</script>

<template>
    <div class="twoDate_root">
        <Date
                :isShowDay="isShowDay"
                :defaultDate="selectDate1"
                @callback="func1"
        ></Date>
        <span class="twoDate_space"></span>
        <Date
                :isShowDay="isShowDay"
                :defaultDate="selectDate2"
                @callback="func2"
        ></Date>
        <template v-if="showOldCase">
            <span v-show="showOldCaseDate1" class="twoDate_shade-1">陈案</span>
            <span v-show="showOldCaseDate2" class="twoDate_shade-2">陈案</span>
        </template>
    </div>
</template>

<style lang="scss">
    @import "TwoDate.scss";
</style>
