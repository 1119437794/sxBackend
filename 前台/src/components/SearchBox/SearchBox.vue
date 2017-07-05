<script>
  /*
  * @component 搜索框组件
  * @author yxc
  * eg:
  * */

  import { clickOtherClose } from "../../assets/js/utils"

  export default {
    props: [
      "placeholder", // placeholder属性值
      "searchBoxVal", // 输入框内容

      "upDateSearchBoxVal", // 强制更新输入框内容

      "specialHandle", // 特殊处理

      "isHasResListNode", // 是否有下拉列表节点对象

      "allowedEmpty" // 是否允许空提交
    ],

    data() {
      return {
        searchVal: "", // 搜索内容
        isShowIcon: true, // 是否显示搜索框
      }
    },

    computed: {
      /*
      * @method setIcon 设置搜索框图标
      * */
      setSearchBtnIcon(){

        let icon = "iconfont searchBox__btn icon-weibiaoti4"; // 默认icon是搜索图标【放大镜】

        if(!this.specialHandle) return icon;

        let type = this.specialHandle.type;
        switch (type) {
          case "图谱搜索框":
            this.isShowIcon = this.searchVal ? true : false;
            icon = "iconfont searchBox__btn icon-guanbi";
            break;
        }

        return icon;
      }
    },

    methods: {

      /*
      * @method upKeyDown/downKeyDown 搜索框输入上下键时 搜索匹配结果下标相应变化
      * */
      upKeyDown(){
        this.$emit("searchResIndexChange", -1);
      },
      downKeyDown(){
        this.$emit("searchResIndexChange", 1);
      },

      /*
       * @method searchChange 搜索框输入变化时，展示匹配结果列表
       * */
      searchChange(){

        // 针对图谱搜索框 在有输入的时候 有删除图标
        if(this.specialHandle) {

          let type = this.specialHandle.type;
          switch (type) {
            case "图谱搜索框":
              this.isShowIcon = this.searchVal ? true : false; break;
          }
        }
        this.$emit("searchChange", this.searchVal);
      },

      /*
       * @method submit 点击搜索 提交搜索关键词
       * @param action 针对特殊处理 识别到底回车提交 还是点击按钮 提交
       * */
      searchSubmit(action) {

        // 回车提交 还是 点击提交
        let submmitType = action.type;

        if(!this.allowedEmpty && !this.searchVal) return ;

        /*
        * 针对需要特殊处理的
        * 不允许提交
        * */
        if(this.specialHandle) {

          let type = this.specialHandle.type;
          switch (type) {

            case "图谱搜索框":

             // if( submmitType === "key" ) return ;

              this.searchVal = "";
              this.isShowIcon = false;
              break;
          }
        }

        this.$emit("searchSubmit", {
          type: submmitType,
          searchVal: this.searchVal
        });
        this.searchVal = this.searchBoxVal;
      }
    },

    watch: {
      // 强制更新searchVal
      upDateSearchBoxVal(){
        this.searchVal = this.searchBoxVal;
      }
    },

    mounted(){

      if(!this.isHasResListNode) {
        clickOtherClose(this.$refs["searchBox__root"], () => {
          this.searchVal = this.searchBoxVal;
        })
      }
    }
  }
</script>

<template>

  <div
    ref="searchBox__root"
    class="searchBox__root"
  >
    <input
      type="text"
      class="searchBox__input"

      v-model.trim="searchVal"
      :placeholder="placeholder"

      @input="searchChange"
      @keydown.up.prevent="upKeyDown"
      @keydown.down.prevent="downKeyDown"
      @keydown.enter="searchSubmit({type: 'key'})"
    >
    <button
      :class="setSearchBtnIcon"
      v-show="isShowIcon"
      @click="searchSubmit({type: 'click'})"
    ></button>
  </div>

</template>

<style lang="scss">
  @import "SearchBox.scss";
</style>
