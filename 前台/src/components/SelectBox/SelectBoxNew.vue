<script>
  /*
  * @component 下拉选择框组件
  * @author csy
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
  *
  *
  *ps：为啥子要写一个新的组件：因为原生的select框点击option之后默认就会赋值,现在的组件通过状态来赋值，就可以加判断逻辑
  *
  *
  * */
  import {clickOtherClose} from "../../assets/js/utils.js"

  export default {

    data(){
      return {
        ulShow:false,//这种方式是用v-if切换隐藏的，没有动画效果，所以暂时用的height
        ulHeight:0,
        theValue:"",
        shorthandValue:""
      }
    },

    // props: [
    //   "dataList"
    //   // "defaultIndex"
    // ],

    props:{
      defaultIndex:{
        //DOTO:目前get到的props默认值的写法,当然也可以在dataList()里判断
        default:1
      },
      dataList:{
        default:""
      },
      same:{
        //这个返回值，用来判断两个框选择的值是否一样
        same:false
      },
      randomTrigger:{
        //用一个随机数，确保每次点击都会更新，如果same一直为true，就不会触发watch
        randomTrigger:null
      }
    },

    watch:{
      dataList(){
        //需求要求只保留年和月
        if(this.dataList.length>1){          
          this.theValue = this.dataList[this.defaultIndex].substr(0, 7)
        } else {
          this.theValue = this.dataList[0].substr(0, 7)
        }
      },
      randomTrigger(){
          if(this.same == false){
            //只有当左右两边的值不一样的时候，才改变值
            this.theValue = this.shorthandValue;
        }
      }
    },

    methods: {
      /*
       * @method handleOnchange 下拉选改变值时调用
       * */
      clickOption(e){
        let completeValue =  e.target.getAttribute("data-value");
        this.shorthandValue = e.target.innerHTML;
        let _this = this;
        // document.addEventListener("click",(e)=>{
        //   // 这一段是点击空白区域关闭的逻辑
        //   // if(_this.uiHeight == 280){ _this.ulHeight = 0 };
        //   // console.log("s")
        // });
        //

        this.$emit("selectChange",completeValue);
        // this.theValue = shorthandValue;
      },
      /*
       * @method handleClick 点击时展开下拉列表
       * */
      handleClick(){
        // this.ulShow = !!this.ulShow?false:true;
        this.ulHeight = !!this.ulHeight?0:280
      }
    },

    mounted(){
      clickOtherClose(this.$refs["fuck"],()=>{
          this.ulHeight = 0;
        })
    }
  }
</script>

<template>
<div class="selectNew__root" @click="handleClick" ref="fuck">
    <div class="selectNew__root__title">
      {{theValue}}
    </div>
    <i class="iconfont icon-xialajiantou"></i>
    <ul class="selectNew__root__ul"  :style="{maxHeight:ulHeight+'px'}">
      <li
        class="selectNew__root__option"
        @click="clickOption"
        :key="key"
        :data-value="item"
        v-text="item.substr(0, 7)"
        v-for="(item, key) of dataList"
      ></li>
    </ul>
</div>
</template>

<style lang="scss">
  @import "../../assets/css/px2rem.scss";
 .selectNew__root {
   width: px2rem(120);
   display: inline-block;
   position: relative;
   cursor: pointer;
   height: 28px;
   line-height: 28px;
   padding: 0 px2rem(13) px2rem(30);
   font-size: 14px;
   border-radius: 2px;
   border: 1px solid #e4eaec;
   background: #fff;
   vertical-align: middle;
   z-index: 10;
}

.selectNew__root .selectNew__root__title {
  height: 28px;
  line-height: 26px;
  overflow: hidden;
  color: #000;
}

.selectNew__root .iconfont {
  position: absolute;
  right: 5px;
  top: 0px;
  color: #838486;
}

.selectNew__root .selectNew__root__ul {
  position: absolute;
  left: -1px;
  right: -1px;
  top: 100%;
  padding: 5px;
  padding-top:0px;
  padding-bottom:0px;
  background: #fff;
  border: 1px solid #e4eaec;
  color: #b7c1cf;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.05);
  overflow: auto;
  max-height: 260px;
  transition:all .4s ease;
}

.selectNew__root .selectNew__root__ul .selectNew__root__option {
  position: relative;
  padding: 0 4px;
  transition: 0.3s;
  height: 28px;
  line-height: 28px;
  overflow: hidden;
}

.selectNew__root .selectNew__root__ul .selectNew__root__option:hover {
  background: #e6e6e6;
  color: #000;
}
</style>


