<script>
     /*
    * @component 组件
    * @author yxc
    *
    * eg:
    * <SelectBox
      :selectCurVal="selectCurVal"
      :selectOptions="['2016-02', '2016-03', '2016-04', '2016-05']"
      @clickSelectVal="clickSelectVal"
      ></SelectBox>
    * */

     import { clickOtherClose } from '../../assets/js/utils'

     export default {
         props: {
             showToggle: {
                 default: true
             },
             addIndex: {
                 default: false
             },
             // 是否合法 针对案件状态需要检测是否合法
             isValid: {
                 default: true
             },
             selectCurVal: {
                 type: String
             },
             selectOptions: {
                 default: () => []
             }
         },

         data () {
             return {
                 selectListHeight: 0, // 用于样式过渡
                 selectListShow: false, // 用于toggle切换样式类名
                 selectListDom: null // 用于操作dom的高度
             }
         },
         methods: {
             // 隐藏下拉列表
             hideSelectList () {
                 this.selectListShow = false
                 this.selectListDom.style.height = 0
             },

             // 切换显隐下拉列表
             toggle () {
                 if (!this.showToggle) return
                 this.selectListDom.style.height = this.selectListShow ? 0 : this.selectListHeight + 'px'
                 this.selectListShow = !this.selectListShow
             },

             // 下拉列表项点击
             clickSelectVal (val) {
                 this.$emit('clickSelectVal', val) // 单向数据流
                 this.hideSelectList()
             },

             // 显示所选择的值
             setOption (val, index) {
                 return this.addIndex ? `${index + 1}、${val}` : val
             }
         },

         mounted () {
             this.selectListDom = this.$refs['select_list']
             this.selectListHeight = Number.parseInt(getComputedStyle(this.selectListDom).height, 10)
             this.selectListDom.style.height = 0
             clickOtherClose(this.$refs['select_root'], this.hideSelectList) // 点击其他地方关闭下拉列表
         }
     }
</script>

<template>
    <div ref="select_root" class="selectHasArrow_root">
        <div
                :class="{
                'selectHasArrow_valBox': true,
                'selectHasArrow_valBox-err': !isValid,
                'selectHasArrow_valBox-disable': !showToggle
                }"
                @click="toggle"
        >
            <div class="selectHasArrow_curVal" v-text="selectCurVal"></div>
            <div v-show="showToggle" :class="['iconfont icon-xiala', selectListShow ? 'selectHasArrow_toggle-up' : 'selectHasArrow_toggle-down']"></div>
        </div>
        <ul ref="select_list" class="selectHasArrow_list">
            <li
                    v-text="setOption(item, index)"
                    @click="clickSelectVal(setOption(item, index))"
                    v-for="(item, index) of selectOptions"
                    :class="{'selectHasArrow_item': true,'selectHasArrow_item-active': item === selectCurVal}"
            ></li>
        </ul>
    </div>
</template>

<style lang="scss">
    @import "SelectHasArrow.scss";
</style>
