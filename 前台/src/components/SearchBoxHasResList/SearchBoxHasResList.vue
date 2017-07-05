<script>
  /*
  * @component 含有结果列表的搜索框
  * @author yxc
  * */

  import { ajax, clickOtherClose } from "../../assets/js/utils"

  // 引入组件
  import SearchBox from "../SearchBox/SearchBox.vue"
  import NoResNotice from "../NoResNotice/NoResNotice.vue"

  export default {

    props: [
      "placeholder", // placeholder属性值
      "searchBoxVal", // 父组件传入的输入框内容

      "isHasRes", // 是否有匹配结果
      "searchResList", // 搜索匹配结果列表

      'checkBranch', // 是否需要检测判断分支机构

      "specialHandle", // 特殊处理
    ],

    data(){
      return {
        searchVal: "", // 输入框内容
        searchResIndex: -1, // 搜索结果列表项下标
        showResList: true, // 是否显示下拉列表
        upDateSearchBoxVal: 0, // 强制搜索框内容更新
        /*
        * 表示是否下拉列表节点
        * 以便确定点击隐藏的事件绑定在哪个dom对象上
        * */
        isHasResListNode: true
      }
    },

    computed: {
      safeSearchResList(){
        if(!this.searchVal){
          this.showResList = false;
          return [];

        }else {
          this.showResList = true;
          return this.searchResList;
        }
      }
    },

    methods: {

      /*
       * @method searchChange 搜索框输入内容变化时
       * @param searchVal 搜索框关键词
       * */
      searchChange(searchVal){
        if(this.searchVal === searchVal) return;
        this.searchVal = searchVal;
        this.$emit("searchChange", searchVal);
      },

      // 是不是分支机构
      isFzjg (companyName, callback) {
            ajax({
                method: 'get',
                url: '/basedata/checkFzjg.do',
                params: { companyName },
                success: res => {
                    callback(res.content)
                }
            })
      },

      /*
       * searchResListSubmit 点击搜索框结果列表项
       * companyName 列表项的值
       * */
      searchResListSubmit(companyName, isCompany){
        this.searchVal = "";
        this.upDateSearchBoxVal ++;
        if (this.checkBranch) {
            this.isFzjg(companyName, flag => {
                if (flag) {
                    ajax({
                        method: 'get',
                        url: '/staticRisk/getLatestRiskValue.do',
                        params: { companyName },
                        success: res => {
                            const content = res.content || {}
                            const tmpCompanyName = content.parentName
                            if (tmpCompanyName && content.value) {
                                this.$emit("searchResListSubmit", tmpCompanyName);
                            }
                        }
                    })
                } else {
                    this.$emit("searchResListSubmit", companyName);
                }
            })
        } else {
            this.$emit("picSearchSubmit", {
                isCompany,
                companyName
            });
            this.$emit("searchResListSubmit", companyName);
        }
      },

      searchSubmit(searchObj){

        let type = searchObj.type;
        let searchVal = searchObj.searchVal;

        this.searchVal = "";

        if(type === "click") {
          this.$emit("searchSubmit", searchVal);

        }else {
          // 针对上下键选择 并回车提交
          if( this.searchResIndex > -1 ) {
            this.searchResListSubmit(this.searchResList[this.searchResIndex].companyName, this.searchResList[this.searchResIndex].nodeType);
            this.searchResIndex = -1;

          }else {
            this.$emit("searchSubmit", searchVal);
          }
        }
      },

      /*
       * @method searchResIndexChange 改变搜索匹配结果列表的下标
       * @param {Number} dir 1 向上 -1 向下
       * */
      searchResIndexChange(dir){
        let tmpIndex = this.searchResIndex + dir;
        tmpIndex < -1 && (tmpIndex = -1);

        let searchResLen = this.searchResList.length;
        tmpIndex >= searchResLen && (tmpIndex = searchResLen - 1);

        this.searchResIndex = tmpIndex;
      },
    },

    components: {
      SearchBox,
      NoResNotice
    },

    mounted(){
      clickOtherClose(this.$refs["searchBoxHasResList__root"], () => {
        this.showResList = false;
      });
    }
  }

</script>

<template>

  <div
    ref="searchBoxHasResList__root"
    class="searchBoxHasResList__root"
  >

    <!-- 搜索框 -->
    <SearchBox
      :searchBoxVal="searchBoxVal"
      :placeholder="placeholder"
      :upDateSearchBoxVal="upDateSearchBoxVal"
      :specialHandle="specialHandle"
      @searchResIndexChange="searchResIndexChange"
      @searchChange="searchChange"
      @searchSubmit="searchSubmit"
    >
    ></SearchBox>

    <!-- 搜索结果模糊匹配 -->
    <ul
      v-show="showResList"
      class="searchBoxHasResList__list"
    >
      <li
        :data="item.nodeType"
        v-html="item.showCompanyName"
        v-for="(item, index) in safeSearchResList"
        @click="searchResListSubmit(item.companyName, item.nodeType)"
        :class="{
          'searchBoxHasResList__item ellipsis': true,
          'searchBoxHasResList__item--active': index==searchResIndex
        }"
      ></li>

      <NoResNotice
        msg="暂无相关数据"
        v-show="!isHasRes && searchVal"
      ></NoResNotice>
    </ul>
  </div>
</template>

<style lang="scss">
  @import "SearchBoxHasResList.scss";
</style>
