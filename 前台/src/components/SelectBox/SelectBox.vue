<script>
  /*
  * @component 下拉选择框组件 
  * @author yxc
  * done
  * eg：
  * <SelectBox
   defaultVal="2015-06"
   :dataList="selectShowDataList"
   @selectChange="selectChange"
   ></SelectBox>

  * @props  { String } defaultVal 默认值
  * @props  { Array } dataList 列表项
  * @props  { Function } selectChange 下拉框回调函数 参数为列表项下标值
  * */

  export default {
    props: [
      "dataList",
      "defaultVal",
      "id"
    ],

    data () {
        return {
            selected: this.defaultVal || this.dataList[0]
        }
    },

    watch: {
        defaultVal () {
            this.selected = this.defaultVal || this.dataList[0]
        },
        dataList () {
            this.selected = this.dataList[0]
        }
    },

    methods: {
      /*
       * @method handleOnchange 下拉选改变值时调用
       * */
      selectChange(e){
        this.$emit("selectChange", e.target.value,e.target);
      }
    }
  }
</script>

<template>
  <select       
    :id = "id"
    class="select__root"
    v-model="selected"
    @change="selectChange"
    >
    <option
      :value="item"
      v-text="item"
      v-for="(item, key) of dataList"
    ></option>
  </select>
</template>

<style lang="scss">
  @import "SelectBox.scss";
</style>


