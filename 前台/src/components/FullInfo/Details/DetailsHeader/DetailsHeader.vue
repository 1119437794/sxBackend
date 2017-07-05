<script>
  /*
  * @component 详情/头部组件 包括公司名称 搜索框 按钮
  * @author yxc
  * */

  // 引入组件
  import SearchBoxHasResList from "../../../SearchBoxHasResList/SearchBoxHasResList.vue"
  import mixin from '../../../../assets/js/mixins'

  export default {
      mixins: [mixin],
    props: [
      "title", // 标题
      "searchBoxVal", // 搜索输入框内容
      "placeholder", // placeholder属性值
      "searchResList", // 搜索匹配结果列表
      "isHasSearchRes", // 是否有匹配结果
      "isAllowedLookupRisk", // 是否可以查看风险
       "checkBranch"
    ],

      data () {
           return {
               analysisWarnTotal: {
                   jq: {},
                   yj: {}
               }
           }
      },

    computed: {
        headerClassName(){

        switch (true) {
          case this.$route.path === "/fullinfo/details":
            return "detailsHeader__title detailsHeader__title--details";

          default:
            return "detailsHeader__title detailsHeader__title--risk";
        }
      },
        jqStartTime() {
          const list = this.analysisWarnTotal.jq.list || []
          if (list.length) {
              const cjsj = list[0].cjsj || ''
              return cjsj.substr(0, 8)
          }

          return ''
        },
        jqEndTime() {
            const list = this.analysisWarnTotal.jq.list || []
            if (list.length) {
                const cjsj = list[list.length - 1].cjsj || ''
                return cjsj.substr(0, 8)
            }

            return ''
        },
        yjStartTime() {
            const list = this.analysisWarnTotal.yj.list || []
            return list.length ? list[0].fbrq : ''
        },
        yjEndTime() {
            const list = this.analysisWarnTotal.yj.list || []
            return list.length ? list[list.length - 1].fbrq : ''
        },
        // 跳转举报分析平台地址
        analysisUrl () {
            return `/#/analysis?companyName=${this.title}&jqStartTime=${this.jqStartTime}&jqEndTime=${this.jqEndTime}&yjStartTime=${this.yjStartTime}&yjEndTime=${this.yjEndTime}`
        }
    },

    methods: {
      searchChange(searchVal){
        this.$emit("searchChange", searchVal)
      },
      searchResListSubmit(searchVal){
        this.$emit("searchResListSubmit", searchVal)
      },
      searchSubmit(searchVal){
        this.$emit("searchSubmit", searchVal)
      },
        // 点击是否跳转举报分析平台
        handleIsRedirect (e, val) {
            !val && e.preventDefault()
        }
    },

      mounted () {
        this.getWarnTotalNum(this.title, res => this.analysisWarnTotal = res)
      },

    components: { SearchBoxHasResList },
  }

</script>

<template>
  <div class="detailsHeader__root">
    <h2 :class="headerClassName" v-text="title"></h2>
      <div class="detailsHeader__analysis" v-if="isHasPermission([3])">
          <a
                  :href="analysisUrl"
                  target="_blank"
                  @click="e => handleIsRedirect(e, analysisWarnTotal.jq.count)">{{analysisWarnTotal.jq.count}}</a>+<a
              :href="`${analysisUrl}&type=1`"
              target="_blank"
              @click="e => handleIsRedirect(e, analysisWarnTotal.yj.count)"
      >{{analysisWarnTotal.yj.count}}</a>
      </div>
    <SearchBoxHasResList
      :placeholder="placeholder"
      :searchBoxVal="searchBoxVal"
      :searchResList="searchResList"
      :isHasRes="isHasSearchRes"
      :checkBranch="checkBranch"
      @searchChange="searchChange"
      @searchResListSubmit="searchResListSubmit"
      @searchSubmit="searchSubmit"
    ></SearchBoxHasResList>
    <slot></slot>
  </div>
</template>

<style lang="scss">
  @import "DetailsHeader.scss";
</style>
