<script>
     /*
    * @component 下拉框组件
    * @author yxc
    * */
     import clickOtherClose from '../../assets/js/clickOtherClose'

     export default {
         props: {
             defaultVal: {
                 default: ''
             },
             list: {
                 default: () => ['1000', '2']
             }
         },
         data () {
             return {
                 isFold: true
             }
         },
         computed: {
             // 针对默认值处理
             fixDefaultVal () {
                 if (this.defaultVal === '') {
                     this.$emit('selectItem', 0)
                     return this.list[0]
                 }
                 return this.defaultVal
             }
         },
         methods: {
             // 点击展开 或 收起
             clickFold () {
                 this.isFold = !this.isFold
             },

             clickSelectItem (index) {
                 this.$emit('selectItem', index)
                 this.isFold = true
             }
         },
         mounted () {
             clickOtherClose(this.$refs['selectBox_root'], () => this.isFold = true)
         }
     }
</script>

<template>
    <div ref="selectBox_root" class="selectBox_root">
        <div class="selectBox_title" @click="clickFold">
            <div class="selectBox_val" v-text="fixDefaultVal"></div>
            <div
                    :class="['iconfont icon-xiala', isFold ? 'selectBox_arrow-unfold' : 'selectBox_arrow-fold']"
            ></div>
        </div>
        <ul class="selectBox_list" v-show="!isFold">
            <li
                    :class="{
                        'selectBox_item': true,
                        'selectBox_item-active': item === fixDefaultVal
                    }"
                    v-for="(item, index) of list"
                    v-text="item"
                    @click="clickSelectItem(index)"
            ></li>
        </ul>
    </div>
</template>

<style lang="scss">
    @import "SelectBox.scss";
</style>