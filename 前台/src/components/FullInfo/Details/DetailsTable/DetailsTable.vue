<script>
     /*
   * @component 详情/table展示组件
   * @author yxc
   * */

     import NoResNotice from "../../../NoResNotice/NoResNotice.vue"

    export default {

      props: [
        "dataTitle",  // 表格头部信息
        "dataList", // 表格渲染数据

        "pageNum", // 页码值
        "pageSize", // 每页数据量

        "isHasRes", // 是否有请求的数据 用于没有数据提示处理

        "litigationTabIndex" // 诉讼tab下标 用于针对不同选项卡下 做不同处理
      ],

      data(){
        return {

          /*
          * action 特别操作
          * 标为 1
          * 对应字段为 title
          * 点击弹出弹窗
          * */
          action: {
            tabIndex: 1,
            key: "title",
            type: "modal"
          },
        }
      },

      methods: {
        /*
        * @method getValByKey
        * @param data
        * @param key 字段
        * @param index 行下标
        * */
        getValByKey(data, key, index){

          switch (key) {
            case "ID":
              return this.pageNum * this.pageSize + index + 1;

            default:
              return data[key];
          }

        },

        /*
        * @method handleClick 监听点击事件
        * */
        handleClick(key, index){

          switch (true) {

            // 针对裁判文书 点击标题
            case this.litigationTabIndex === this.action.tabIndex && key === this.action.key:
              this.$emit("titleClick", index);
              break;

            default:
              return false;
          }

        },

        /*
        * 添加cursor样式
        * */
        cursorStyle(key){
          let flag = this.litigationTabIndex === this.action.tabIndex && key === this.action.key;
          return {
            cursor: flag ? "pointer" : "auto"
          }
        }
      },

      directives: {
        /*
        * @directives v-width 根据传入的值转成百分比来设置td的宽
        * */
        width(el, binding){
          el.width = `${binding.value * 100}%`;
        }
      },

      components: { NoResNotice }
    }
</script>

<template>
  <table class="detailsTable__root">

    <tr
      v-show="isHasRes"
      class="detailsTable__th">
      <td
        v-text="item.text"
        v-width="item.width"
        v-for="item of dataTitle"
      ></td>
    </tr>

    <tr
      class="detailsTable__tr"
      v-for="(itemRow, indexRow) of dataList">

      <td
        v-for="itemCol of dataTitle"
        @click="handleClick(itemCol.key, indexRow)"
        v-text="getValByKey(itemRow, itemCol.key, indexRow)"
        :style="cursorStyle(itemCol.key)"
      ></td>
    </tr>

    <tr
      v-show="!isHasRes"
      is="NoResNotice"
      msg="截至目前为止，暂无相关数据！"
    ></tr>
  </table>
</template>

<style lang="scss">
  @import "DetailsTable.scss";
</style>
