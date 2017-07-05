<script>

  /*
  * @component 选项卡组件
  * @author yxc
  * done
  *
  * eg:
  * <Tab
    :tabs="tabs"
    @tabChange="tabChange"
   ></Tab>

   @props { Array } tabs 选项卡列表值
   @props { Function } tabChange 选项值改变时回调 参数为选中的选项卡下标
  * */

  export default {

    props: [
      "tabs",
      "tabIndex"
    ],

    methods: {
      handleClick(index){
        this.$emit("tabChange", index);
      }
    }
}
</script>

<template>
  <ul class="tab__root">
    <li
      :key="key"
      v-html="item"
      @click="handleClick(key)"
      v-for="(item, key) of tabs"
      :class="{'tab__item': true, 'tab__item--active': key == tabIndex}"
    ></li>
  </ul>
</template>

<style lang="scss">
  @import "Tab.scss";
</style>
