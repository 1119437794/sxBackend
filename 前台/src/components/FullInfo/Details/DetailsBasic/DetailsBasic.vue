<script>
  /*
  * @component 详情/基本资料 组件
  * @author yxc
  * */

  import DetailsTitile from "../DetailsTitile/DetailsTitile.vue"
  import DetailBasicBusinessInfo from "./DetailBasicBusinessInfo/DetailBasicBusinessInfo.vue"
  import DetailsBasicStocks from "./DetailsBasicStocks/DetailsBasicStocks.vue"
  import DetailBasicBusinessUpdate from "./DetailBasicBusinessUpdate/DetailBasicBusinessUpdate.vue"
  import DetailBasicBranch from "./DetailBasicBranch/DetailBasicBranch.vue"

  export default {
    props: ["listData"],

    data(){
      return {

        titles: [
          "工商资料",
          "股东情况",
          "董事会情况",
          "监事会情况",
          "高级管理人员",
          "工商变更信息",
          "分支机构",
        ], // 基本资料每一个模块标题

        stocks: ["股东", "股东类型"], //股东

        director: ["姓名", "职务"], // 董事会

        supervisor: ["姓名", "职务"], // 监事会

        executive: ["姓名", "职务"], // 管理人员
      }
    },

    components: {

      DetailsTitile,

      DetailBasicBusinessInfo,

      DetailsBasicStocks,

      DetailBasicBusinessUpdate,

      DetailBasicBranch
    }
  }
</script>

<template>
  <div class="detailBasic__root">

    <!--工商资料-->
    <DetailsTitile :title="titles[0]"></DetailsTitile>
    <DetailBasicBusinessInfo
      :list="listData.jbxx"
    ></DetailBasicBusinessInfo>

    <!--股东情况-->
    <DetailsTitile :title="titles[1]"></DetailsTitile>
    <DetailsBasicStocks
      type="stocks"
      :title="stocks"
      :list="listData.gdxx"
    ></DetailsBasicStocks>

    <!-- 董事会情况-->
    <DetailsTitile :title="titles[2]"></DetailsTitile>
    <DetailsBasicStocks
      type="director"
      :title="director"
      :list="listData.baxx"
    ></DetailsBasicStocks>

    <!-- 监事会情况-->
    <DetailsTitile :title="titles[3]"></DetailsTitile>
    <DetailsBasicStocks
      type="supervisor"
      :title="supervisor"
      :list="listData.baxx"
    ></DetailsBasicStocks>

    <!-- 高级管理人员-->
    <DetailsTitile :title="titles[4]"></DetailsTitile>
    <DetailsBasicStocks
      type="executive"
      :title="executive"
      :list="listData.baxx"
    ></DetailsBasicStocks>

    <!-- 工商变更信息-->
    <DetailsTitile :title="titles[5]"></DetailsTitile>
    <DetailBasicBusinessUpdate
      :list="listData.bgxx"
    ></DetailBasicBusinessUpdate>

    <!-- 分支机构-->
    <DetailsTitile :title="titles[6]"></DetailsTitile>
    <DetailBasicBranch
      :list="listData.fzjg"
    ></DetailBasicBranch>
  </div>
</template>

<style lang="scss">
  @import "DetailsBasic.scss";
</style>
