<script>
     /*
   * @component 预警/静态风险指数/实际控制人风险/列表/列表项详情 组件
   * @author yxc
   * @date 2016/11/14
   * */

    export default {
      props: [
        "listData" // 渲染数据
      ],

      methods: {
        // 针对输入文本格式化处理
        setText(text){

          if(text === null || text === "") return "—"; // 必须有效值
          if(text === undefined) return text; //
          if(typeof text !== "string" ) return text; // 必须为字符串

          let flag = /(\|)/.test(text);
          let tmpText = text.replace(/(\|)/g, '<br/>');
          flag && (tmpText = `<div class="warnStaticRiskControlTable__multiWrap">${tmpText}</div>`);

          return tmpText;
        },

        // 根据输入的文本匹配对应的类
        setClassName(text){

          if(!text) return null;

          let flag = /(\||\、)/.test(text);

          return flag ? "warnStaticRiskControlTable__tdText--multi" : "warnStaticRiskControlTable__tdText"
        }
      }
    }
</script>

<template>
  <li class="warnStaticRiskControlTable__root">
    <table class="warnStaticRiskControlTable__table">

      <tr
        v-for="item of listData"
        class="warnStaticRiskControlTable__tr"
      >
        <td class="warnStaticRiskControlTable__tdTitle" v-text="item.text"></td>
        <td
          class="warnStaticRiskControlTable__tdText"
          v-html="setText(item.value)"
        ></td>
      </tr>
    </table>
  </li>
</template>

<style lang="scss">
  @import "WarnStaticRiskControlTable.scss";
</style>
