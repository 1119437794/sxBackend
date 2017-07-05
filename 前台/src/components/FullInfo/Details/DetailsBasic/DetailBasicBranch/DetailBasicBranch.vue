<script>
     /*
   * @component 组件
   * @author yxc
   * @date 2016/11/28 0028
   * */

     import NoResNotice from "../../../../NoResNotice/NoResNotice.vue"

    export default {

      props: ["list"],

      data(){
        return {
          isHasRes: true // 是否有数据
        }
      },

      watch: {
        list(){
          this.isHasRes = this.list.length ? true : false;
        }
      },

      components: {
        NoResNotice
      }
    }
</script>

<template>
  <div class="detailBasicBranch__root">
    <div class="detailBasicBranch__wrap">

      <template v-if="isHasRes">
        <h2 class="detailBasicBranch__title">
          <span>序号</span>
          <span>注册号</span>
          <span>名称</span>
          <span>登记状态</span>
          <span>成立日期</span>
          <span>地址</span>
        </h2>
        <ul class="detailBasicBranch__list">
          <li
            v-for="(item, index) of list"
            class="detailBasicBranch__item"
          >
            <span v-text="index + 1"></span>
            <span v-text="item.regNo">变更前内容</span>
            <router-link
                    tag="span"
                    :to="{path: '/fullinfo/details', query: {company: item.name}}"
                    v-text="item.name"
            ></router-link>
            <!--<span v-text="item.name">变更后内容</span>-->
            <span v-text="item.enterpriseStatus">变更时间</span>
            <span v-text="item.esDate">变更时间</span>
            <span v-text="item.address">变更时间</span>
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
  @import "DetailBasicBranch.scss";
</style>
