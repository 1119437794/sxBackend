<script>
  /*
  * @component 详情/基本资料/股东情况|董事会情况|监事会信息|高级管理人员情况 组件
  * @author yxc
  * */

  import NoResNotice from "../../../../NoResNotice/NoResNotice.vue"

    export default {

      props: ["type", "title", "list"],

      data(){
        return {
          isHasRes: true // 是否有数据
        }
      },

      computed: {

        // 根据传入的title确定数据
        // 格式化数据 使之成为数组
        listData(){
          let tmpArr = [];
          if(this.list) {
            switch (this.type){
              case "stocks":
                this.list.map((item, index) => {
                  tmpArr.push({
                    title: item.shareholderName,
                    text: item.shareholderType
                  })
                });
                break;

              default:
                this.list.map((item, index) => {
                  if(item.type == this.type) {
                    tmpArr.push({
                      title: item.name,
                      text: item.position
                    })
                  }

                });
                break;
            }
          }
          return tmpArr;
        }
      },

      watch: {
        listData(){
          this.isHasRes = this.listData.length ? true : false;
        }
      },

      components: {
        NoResNotice
      }
    }
</script>

<template>
  <div class="detailBasicStocks__root">
    <div class="detailBasicStocks__wrap">

      <template v-if="isHasRes">
        <h2 class="detailBasicStocks__title">
          <span v-text="title[0]"></span>
          <span v-text="title[1]"></span>
        </h2>
        <ul class="detailBasicStocks__list">
          <li
            v-for="item of listData"
            class="detailBasicStocks__item"
          >
            <span v-text="item.title"></span>
            <span v-text="item.text"></span>
          </li>
        </ul>
      </template>

      <NoResNotice
        v-show="!isHasRes"
        msg="截至目前为止，暂无相关数据！"
      ></NoResNotice>
    </div>
  </div>
</template>

<style lang="scss">
  @import "DetailsBasicStocks.scss";
</style>
