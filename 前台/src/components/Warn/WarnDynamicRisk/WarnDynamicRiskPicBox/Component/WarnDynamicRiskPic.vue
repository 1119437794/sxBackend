<script>
     /*
   * @component 组件
   * @author csy
   * @date 2016/11/12 0012
   * */
    import SelectBox from "../../../../SelectBox/SelectBox.vue"
    import SelectBoxNew from "../../../../SelectBox/SelectBoxNew.vue"
    import { ajax } from "../../../../../assets/js/utils"

    export default {
       data(){
         return {
          csy:0,
          same:false,
          show:false,
          randomTrigger:null,
          imgPercentNum:100,
          imgInit:"25rem",
          imgSrc:'',
          transformStyle: {x: 0, y: 0} // 拖拽时 transform属性值
         }
       },

       components: {
        SelectBox,
        SelectBoxNew
       },

       props:[
        "AjaxDate",
        "company",
        "doubleList",
        "SelectDefaultVal",
        "id"
       ],

      watch: {
            doubleList(){
              this.getImgSrc(this.doubleList[this.SelectDefaultVal] || this.doubleList[0]);
              //云哥很担心，请求ajax的时候doubleList还没有传过来，所以先判断一下，很机智对不对
              //机智个锤子哦
            },
            AjaxDate(){
            }
      },

      methods:{
            /*
            * @method closePop 关闭弹窗
            * */
            closePop(){
              this.show = false;
            },
            selectChange(val){
              this.same = false;
              this.randomTrigger = Math.random()*1000;
              var _this = this;
              if (this.SelectDefaultVal == 0) {

                 if (val == this.doubleList[1]) {
                  this.same = true;
                  this.show = true;
                 } else {
                    this.getImgSrc(val);
                    this.$emit("callback",[val,this.doubleList[1]]);
                    //这里是把改变的日期传递给顶级父组件。
                 }

              } else {

                 if (val == this.doubleList[0]) {
                  this.same = true;
                  this.show = true;
                 } else {
                    this.getImgSrc(val);
                    this.$emit("callback",[this.doubleList[0],val]);
                    //这里是把改变的日期传递给顶级父组件。
                 }
              }
            },

            imgScale(e){
              //ie9 兼容
              var e = e || event;
              var $target = e.srcElement?e.srcElement:e.target;

              let num = this.imgPercentNum;
              $target.className == "add" ? num+=40 : num-=40;
              if (0<=num && num<=500) {
                this.imgPercentNum = num;
                this.imgInit = 25*(this.imgPercentNum/100)+"rem"
                // $target.style.cursor="point"
                    if (num == 20 || num == 500) {
                        // $target.style.cursor="not-allowed"
                    }
              }
            },

            imgReback(){
                this.imgInit = "25rem";
                this.imgPercentNum = 100;
              },

            getImgSrc(date){
              ajax({
                method: "GET",
                url: "/dynamicRisk/generatePic.do",
                params: {
                  companyName: this.company,
                  dataVersion:date
                },
                success: (res) => {
                    this.imgSrc =  res.content;
                },

              })
            },
             /*
             * @method dragPic 图谱拖拽
             * */
             dragPic(e){

               e.preventDefault();  // 阻止拖拽对象默认动作

               let docDom = document.documentElement;
               docDom.onselectstart = function () { return false }; // 阻止默认选中事件

               // 1. 获取拖拽对象相对视窗的left 和 top
               let dragDivDom = e.target;
               let dragDivDomRect = dragDivDom.getBoundingClientRect();
               let dragDivDomTop = dragDivDomRect.top;
               let dragDivDomLeft = dragDivDomRect.left;

               // 2. 获取鼠标相对拖拽元素的位置
               // 注意：此处使用的transform 故而需要适当处理下
               let offsetX = e.layerX - this.transformStyle.x;
               let offsetY = e.layerY - this.transformStyle.y;

               // 3. 拖拽中
               docDom.onmousemove = (e) => {

                 // 获取鼠标相对于视窗的坐标
                 let pageX = e.clientX;
                 let pageY = e.clientY;

                 let translateX = pageX-dragDivDomLeft-offsetX;
                 let translateY = pageY-dragDivDomTop-offsetY;
                 this.transformStyle = {
                   x: translateX,
                   y: translateY
                 };
                 dragDivDom.style.transform = `translate(${translateX}px,${translateY}px)`;
                /*console.log({
                  dragDivDomTop,
                  dragDivDomLeft,
                  offsetX,
                  offsetY,
                  pageX,
                  pageY,
                });*/
               }

               // 4. 拖拽结束
               docDom.onmouseup = function () {
                 docDom.onmouseup = null;
                 docDom.onmousemove = null;
               }
             }
       }

    }
</script>

<template>
  <div
    class="warnDynamicRisk__leftPic warnDynamicRisk__Pic"
    id="warnDynamicRisk__Pic"
    :style="{borderRight: '1px solid #e7eaf0'}">
    <div class="loader" v-show="show">
      <div class="loader__root">

      <!-- 错误消息提示 -->
      <div class="loader__error">
        <img class="loader__smileIcon" src="../../../../../assets/imgs/loaderErrorSmile.png" alt="">
        <p class="loader__msg">抱歉，请不要选择相同的日期，请重新选择</p>
        <span
          class="loader__close"
          @click="closePop"
        ></span>
      </div>

    </div>
    </div>
    <div class="warnDynamicRisk__toolBoxWrap warnDynamicRisk">
      <div class="warnDynamicRisk__toolBox ">

         <!--时间选择下拉框-->
         <span
           class="warnDynamicRisk__timeTitle"
           @click="getImgSrc">时间选项</span>

         <SelectBoxNew
          :dataList="AjaxDate"
          :defaultIndex="SelectDefaultVal"
          :same="same"
          :randomTrigger="randomTrigger"
          @selectChange="selectChange"
         ></SelectBoxNew>


         <!--放大缩小的功能-->
         <div class="warnDynamicRisk__scaleBox">
           <div class="reduce" @click="imgScale">-</div>
           {{imgPercentNum}}%
           <div class="add" @click="imgScale">+</div>
         </div>

         <!--还原的功能-->
         <div class="warnDynamicRisk__back iconfont icon-bofangqisuoxiao" @click="imgReback"></div>

      </div>
    </div>
    <!--支持拖拽和缩放的图片-->
    <img
      :src = "imgSrc"
      ref = "staticImg"
      id = "staticImgs"
      class = "warnDynamicRisk__img"
      :style = "{width:imgInit,height:imgInit}"
      @mousedown="dragPic"
      />

  </div>
</template>

<style lang="scss">
  @import "WarnDynamicRiskPic.scss";
</style>

