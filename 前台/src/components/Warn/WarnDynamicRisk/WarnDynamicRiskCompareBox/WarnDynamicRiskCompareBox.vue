<script>
     /*
   * @component 组件
   * @author csy
   * @date 2016/11/12 0012
   * */
    import DetailsTitile from "../../../FullInfo/Details/DetailsTitile/DetailsTitile.vue"


    export default {
      props:[
        "relationVo",
        "doubleList",
      ],

      data(){
         return {
           itemHeight:284,
         }
       },

      computed: {
         // 判断两个日期是否交换
        compareTimeFlag(){
          let time0 = new Date(this.doubleList[0]);
          let time1 = new Date(this.doubleList[1]);

          return Math.min(time0, time1) === +time1 ? 1 : -1;
        }
      },

      methods:{

         // 时间匹配处理
         timeCompareHandle(type){
             if (!!this.doubleList[1]) {
                 let time0 = new Date(this.doubleList[0]);
                 let time1 = new Date(this.doubleList[1]);
                 if(type === -1){
                   return Math.min(time0, time1) === +time0 ? this.doubleList[0] : this.doubleList[1];

                 }else {
                   return Math.max(time0, time1) === +time0 ? this.doubleList[0] : this.doubleList[1];
                 }
             } else {
              return this.doubleList[0]
             }

         },

        // 第一个日期发生变化 则取 crp 否则 就去 crt
         numCompareHandleL(val1, val2){
           return this.compareTimeFlag === 1 ? val2 : val1;
         },

        // 第二个日期发生变化 则取 crp 否则 就去 crt
         numCompareHandleR(val1, val2){
           return this.compareTimeFlag === -1 ? val2 : val1;
         },

         stretch(e){
           let $this = e.currentTarget,
               itemBox = $this.parentNode,
               itemBoxWidth = itemBox.style.height,
               wrap = itemBox.parentNode,
               perItem = wrap.children,
               length = perItem.length

              for (let i=0;i<length;i++) {
                  if(perItem[i] != itemBox){
                      perItem[i].style.height = "50px";
                      perItem[i].children[0].style.background = "#e5f0f9";
                      perItem[i].children[0].children[0].lastChild.setAttribute("class","symbol iconfont icon-xialajiantou");
                  }
               }

               if(itemBoxWidth == "284px") {
                  itemBox.style.height = "50px";
                  $this.style.background = "#e5f0f9";
                  $this.children[0].lastChild.setAttribute("class","symbol iconfont icon-xialajiantou");
               } else {
                  itemBox.style.height = "284px";
                  $this.style.background = "#e9ecf3";
                  $this.children[0].lastChild.setAttribute("class","symbol iconfont icon-xiaojiantoushang");
               }
          }
       },

//      watch: {
//        // 通过doubleList的变化 判断是第一个日期 还是第二个日期变化 从而决定compareTimeFlag的值
//        doubleList(){
//          if(this.doubleListBack){
//            let time = this.doubleList;
//            let timeBack = this.doubleListBack;
//
//            if(time[0] !== timeBack[0]){
//              this.doubleListBack = time;
//              return -1;
//
//            }else if(time[1] !== timeBack[1]){
//              this.doubleListBack = time;
//              return 1;
//            }
//          }
//        }
//      },

      filters:{
        dateFixed(value){
          if (!!value) {
            return value.toString().substr(0,7);
          } else {
            return value
          }
        }
      },

      components: {
        DetailsTitile
      },
    }
</script>

<template>
  <div class="warnDynamicRisk__compareBox">
    <DetailsTitile title="企业关联方特征指数对比"></DetailsTitile>
    <div class="warnDynamicRisk__compareBoxInset" v-if="relationVo">
        <div class="warnDynamicRisk__contentTitle">
          <div class="contentTitleWrap">
            <p>{{  timeCompareHandle(-1) | dateFixed}}</p>
            <img src="../../../../assets/imgs/WarnDynamicChange.png" alt="">
            <p>{{  timeCompareHandle(1)  | dateFixed}}</p>

          </div>
          <!--item-->
          <div class="wrap">
            <div class="warnDynamicRisk__item">

                <!--标题-->
                <div class="warnDynamicRisk__itemTitle" @click="stretch">
                    关联自然人
                    <div class="itemTitleNum">
                        <!--<span class="reduceNum warnDynamicRisk__blue">{{numCompareHandleL(relationVo.crtRelationPersonNum, relationVo.cpeRelationPersonNum)}}</span>
                        <span class="addNum warnDynamicRisk__yellow">{{numCompareHandleR(relationVo.crtRelationPersonNum, relationVo.cpeRelationPersonNum)}}</span>-->
                        <span class="reduceNum warnDynamicRisk__blue">{{relationVo.crtRelationPersonNum}}</span>
                        <span class="addNum warnDynamicRisk__yellow">{{relationVo.cpeRelationPersonNum}}</span>
                        <span class="symbol iconfont icon-xialajiantou"></span>
                    </div>
                </div>

                <!--内容-->
                <div class="itemContent">

                    <!--内容之左边-->
                    <div class="itemContentLeft">
                        <div class="itemContentLeft-inset">
                            <div class="textWrap">
                                关联自然人对比明细
                            </div>
                        </div>
                    </div>

                    <!--内容之右边-->
                    <div class="itemContentRight">
                        <div class="itemContentRightAdd">
                            <div class="warnDynamicRisk__title">
                                <span>{{  timeCompareHandle(1)  | dateFixed}}</span>
                                <span>减少</span>
                               <!-- <span>{{numCompareHandleL(relationVo.decreaseRelationPerson.length, relationVo.addRelationPerson.length)}}人</span>-->
                                <span>{{relationVo.decreaseRelationPerson.length}}人</span>
                                <span class="warnDynamicRisk__blue iconfont icon-xiangxia"></span>
                            </div>
                            <ul class="scroll">
                                <!--<li v-for="item in numCompareHandleL(relationVo.decreaseRelationPerson, relationVo.addRelationPerson)">{{item}}</li>-->
                                <li v-for="item in relationVo.decreaseRelationPerson">{{item}}</li>
                            </ul>
                        </div>
                        <div class="itemContentRightReduce">
                            <div class="warnDynamicRisk__title">
                                <span>{{  timeCompareHandle(1)  | dateFixed}}</span>
                                <span>增加</span>
                                <!--<span>{{numCompareHandleR(relationVo.decreaseRelationPerson.length, relationVo.addRelationPerson.length)}}人</span>-->
                                <span>{{relationVo.addRelationPerson.length}}人</span>
                                <span class="warnDynamicRisk__yellow iconfont icon-xiangshang"></span>
                            </div>
                            <ul class="scroll">
                                <!--<li v-for="item in numCompareHandleR(relationVo.decreaseRelationPerson, relationVo.addRelationPerson)">{{item}}</li>-->
                                <li v-for="item in relationVo.addRelationPerson">{{item}}</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
            <div class="warnDynamicRisk__item" >

                <!--标题-->
                <div class="warnDynamicRisk__itemTitle" @click="stretch">
                    关联法人
                    <div class="itemTitleNum">
                        <span class="reduceNum warnDynamicRisk__blue">{{relationVo.crtCompanyPersonNum}}</span>
                        <span class="addNum warnDynamicRisk__yellow">{{relationVo.cpeCompanyPersonNum}}</span>
                        <span class="symbol iconfont icon-xialajiantou"></span>
                    </div>
                </div>

                <!--内容-->
                <div class="itemContent">

                    <!--内容之左边-->
                    <div class="itemContentLeft">
                        <div class="itemContentLeft-inset">
                            <div class="textWrap">
                                关联法人对比明细
                            </div>
                        </div>
                    </div>

                    <!--内容之右边-->
                    <div class="itemContentRight">
                        <div class="itemContentRightAdd">
                            <div class="warnDynamicRisk__title">
                                <span>{{  timeCompareHandle(1)  | dateFixed}}</span>
                                <span>减少</span>
                                <span>{{relationVo.decreaseCompanyPerson.length}}人</span>
                                <span class="warnDynamicRisk__blue iconfont icon-xiangxia"></span>
                            </div>
                            <ul class="scroll">
                                <li v-for="item in relationVo.decreaseCompanyPerson">{{item}}</li>
                            </ul>
                        </div>
                        <div class="itemContentRightReduce">
                            <div class="warnDynamicRisk__title">
                                <span>{{  timeCompareHandle(1)  | dateFixed}}</span>
                                <span>增加</span>
                                <span>{{relationVo.addCompanyPerson.length}}人</span>
                                <span class="warnDynamicRisk__yellow iconfont icon-xiangshang"></span>
                            </div>
                            <ul class="scroll">
                                <li v-for="item in relationVo.addCompanyPerson">{{item}}</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
            <div class="warnDynamicRisk__item" >

                <!--标题-->
                <div class="warnDynamicRisk__itemTitle" @click="stretch">
                    利益一致行动法人
                    <div class="itemTitleNum">
                        <span class="reduceNum warnDynamicRisk__blue">{{relationVo.crtAgreeActNum}}</span>
                        <span class="addNum warnDynamicRisk__yellow">{{relationVo.cpeAgreeActNum}}</span>
                        <span class="symbol iconfont icon-xialajiantou"></span>
                    </div>
                </div>

                <!--内容-->
                <div class="itemContent">

                    <!--内容之左边-->
                    <div class="itemContentLeft">
                        <div class="itemContentLeft-inset">
                            <div class="textWrap">
                                利益一致行动法人对比明细
                            </div>
                        </div>
                    </div>

                    <!--内容之右边-->
                    <div class="itemContentRight">
                        <div class="itemContentRightAdd">
                            <div class="warnDynamicRisk__title">
                                <span>{{  timeCompareHandle(1)  | dateFixed}}</span>
                                <span>减少</span>
                                <span>{{relationVo.decreaseAgreeComDet.length}}人</span>
                                <span class="warnDynamicRisk__blue iconfont icon-xiangxia"></span>
                            </div>
                            <ul class="scroll">
                                <li v-for="item in relationVo.decreaseAgreeComDet">{{item}}</li>
                            </ul>
                        </div>
                        <div class="itemContentRightReduce">
                            <div class="warnDynamicRisk__title">
                                <span>{{  timeCompareHandle(1)  | dateFixed}}</span>
                                <span>增加</span>
                                <span>{{relationVo.addAgreeComDet.length}}人</span>
                                <span class="warnDynamicRisk__yellow iconfont icon-xiangshang"></span>
                            </div>
                            <ul class="scroll">
                                <li v-for="item in relationVo.addAgreeComDet">{{item}}</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
            <div class="warnDynamicRisk__item" >

                <!--标题-->
                <div class="warnDynamicRisk__itemTitle" @click="stretch">
                    子公司
                    <div class="itemTitleNum">
                        <span class="reduceNum warnDynamicRisk__blue">{{relationVo.crtChildCompanyNum}}</span>
                        <span class="addNum warnDynamicRisk__yellow">{{relationVo.cpeChildCompanyNum}}</span>
                        <span class="symbol iconfont icon-xialajiantou"></span>
                    </div>
                </div>

                <!--内容-->
                <div class="itemContent">

                    <!--内容之左边-->
                    <div class="itemContentLeft">
                        <div class="itemContentLeft-inset">
                            <div class="textWrap">
                                子公司对比明细
                            </div>
                        </div>
                    </div>

                    <!--内容之右边-->
                    <div class="itemContentRight">
                        <div class="itemContentRightAdd">
                            <div class="warnDynamicRisk__title">
                                <span>{{  timeCompareHandle(1)  | dateFixed}}</span>
                                <span>减少</span>
                                <span>{{relationVo.decreaseChildCompany.length}}人</span>
                                <span class="warnDynamicRisk__blue iconfont icon-xiangxia"></span>
                            </div>
                            <ul class="scroll">
                                <li v-for="item in relationVo.decreaseChildCompany">{{item}}</li>
                            </ul>
                        </div>
                        <div class="itemContentRightReduce">
                            <div class="warnDynamicRisk__title">
                                <span>{{  timeCompareHandle(1)  | dateFixed}}</span>
                                <span>增加</span>
                                <span>{{relationVo.addChildCompany.length}}人</span>
                                <span class="warnDynamicRisk__yellow iconfont icon-xiangshang"></span>
                            </div>
                            <ul class="scroll">
                                <li v-for="item in relationVo.addChildCompany">{{item}}</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
            <div class="warnDynamicRisk__item" >

                <!--标题-->
                <div class="warnDynamicRisk__itemTitle" @click="stretch">
                    一度自然人
                    <div class="itemTitleNum">
                        <span class="reduceNum warnDynamicRisk__blue">{{relationVo.crtOnePersonNum}}</span>
                        <span class="addNum warnDynamicRisk__yellow">{{relationVo.cpeOnePersonNum}}</span>
                        <span class="symbol iconfont icon-xialajiantou"></span>
                    </div>
                </div>

                <!--内容-->
                <div class="itemContent">

                    <!--内容之左边-->
                    <div class="itemContentLeft">
                        <div class="itemContentLeft-inset">
                            <div class="textWrap">
                                一度自然人对比明细
                            </div>
                        </div>
                    </div>

                    <!--内容之右边-->
                    <div class="itemContentRight">
                        <div class="itemContentRightAdd">
                            <div class="warnDynamicRisk__title">
                                <span>{{  timeCompareHandle(1)  | dateFixed}}</span>
                                <span>减少</span>
                                <span>{{relationVo.decreaseOnePerson.length}}人</span>
                                <span class="warnDynamicRisk__blue iconfont icon-xiangxia"></span>
                            </div>
                            <ul class="scroll">
                                <li v-for="item in relationVo.decreaseOnePerson">{{item}}</li>
                            </ul>
                        </div>
                        <div class="itemContentRightReduce">
                            <div class="warnDynamicRisk__title">
                                <span>{{  timeCompareHandle(1)  | dateFixed}}</span>
                                <span>增加</span>
                                <span>{{relationVo.addOnePerson.length}}人</span>
                                <span class="warnDynamicRisk__yellow iconfont icon-xiangshang"></span>
                            </div>
                            <ul class="scroll">
                                <li v-for="item in relationVo.addOnePerson">{{item}}</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
            <div class="warnDynamicRisk__item" >

                <!--标题-->
                <div class="warnDynamicRisk__itemTitle" @click="stretch">
                    一度法人
                    <div class="itemTitleNum">
                        <span class="reduceNum warnDynamicRisk__blue">{{relationVo.crtOneCompanyNum}}</span>
                        <span class="addNum warnDynamicRisk__yellow">{{relationVo.cpeOneCompanyNum}}</span>
                        <span class="symbol iconfont icon-xialajiantou"></span>
                    </div>
                </div>

                <!--内容-->
                <div class="itemContent">

                    <!--内容之左边-->
                    <div class="itemContentLeft">
                        <div class="itemContentLeft-inset">
                            <div class="textWrap">
                                一度法人对比明细
                            </div>
                        </div>
                    </div>

                    <!--内容之右边-->
                    <div class="itemContentRight">
                        <div class="itemContentRightAdd">
                            <div class="warnDynamicRisk__title">
                                <span>{{  timeCompareHandle(1)  | dateFixed}}</span>
                                <span>减少</span>
                                <span>{{relationVo.decreaseOneCompany.length}}人</span>
                                <span class="warnDynamicRisk__blue iconfont icon-xiangxia"></span>
                            </div>
                            <ul class="scroll">
                                <li v-for="item in relationVo.decreaseOneCompany">{{item}}</li>
                            </ul>
                        </div>
                        <div class="itemContentRightReduce">
                            <div class="warnDynamicRisk__title">
                                <span>{{  timeCompareHandle(1)  | dateFixed}}</span>
                                <span>增加</span>
                                <span>{{relationVo.addOneCompany.length}}人</span>
                                <span class="warnDynamicRisk__yellow iconfont icon-xiangshang"></span>
                            </div>
                            <ul class="scroll">
                                <li v-for="item in relationVo.addOneCompany">{{item}}</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
            <div class="warnDynamicRisk__item" >

                <!--标题-->
                <div class="warnDynamicRisk__itemTitle" @click="stretch">
                    二度自然人
                    <div class="itemTitleNum">
                        <span class="reduceNum warnDynamicRisk__blue">{{relationVo.crtTwoPersonNum}}</span>
                        <span class="addNum warnDynamicRisk__yellow">{{relationVo.cpeTwoPersonNum}}</span>
                        <span class="symbol iconfont icon-xialajiantou"></span>
                    </div>
                </div>

                <!--内容-->
                <div class="itemContent">

                    <!--内容之左边-->
                    <div class="itemContentLeft">
                        <div class="itemContentLeft-inset">
                            <div class="textWrap">
                                二度自然人对比明细
                            </div>
                        </div>
                    </div>

                    <!--内容之右边-->
                    <div class="itemContentRight">
                        <div class="itemContentRightAdd">
                            <div class="warnDynamicRisk__title">
                                <span>{{  timeCompareHandle(1)  | dateFixed}}</span>
                                <span>减少</span>
                                <span>{{relationVo.decreaseTwoPerson.length}}人</span>
                                <span class="warnDynamicRisk__blue iconfont icon-xiangxia"></span>
                            </div>
                            <ul class="scroll">
                                <li v-for="item in relationVo.decreaseTwoPerson">{{item}}</li>
                            </ul>
                        </div>
                        <div class="itemContentRightReduce">
                            <div class="warnDynamicRisk__title">
                                <span>{{  timeCompareHandle(1) | dateFixed}}</span>
                                <span>增加</span>
                                <span>{{relationVo.addTwoPerson.length}}人</span>
                                <span class="warnDynamicRisk__yellow iconfont icon-xiangshang"></span>
                            </div>
                            <ul class="scroll">
                                <li v-for="item in relationVo.addTwoPerson">{{item}}</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
            <div class="warnDynamicRisk__item" >

                <!--标题-->
                <div class="warnDynamicRisk__itemTitle" @click="stretch">
                    二度法人
                    <div class="itemTitleNum">
                        <span class="reduceNum warnDynamicRisk__blue">{{relationVo.crtTwoCompanyNum}}</span>
                        <span class="addNum warnDynamicRisk__yellow">{{relationVo.cpeTwoCompanyNum}}</span>
                        <span class="symbol iconfont icon-xialajiantou"></span>
                    </div>
                </div>

                <!--内容-->
                <div class="itemContent">

                    <!--内容之左边-->
                    <div class="itemContentLeft">
                        <div class="itemContentLeft-inset">
                            <div class="textWrap">
                                二度法人对比明细
                            </div>
                        </div>
                    </div>

                    <!--内容之右边-->
                    <div class="itemContentRight">
                        <div class="itemContentRightAdd">
                            <div class="warnDynamicRisk__title">
                                <span>{{  timeCompareHandle(1) | dateFixed}}</span>
                                <span>减少</span>
                                <span>{{relationVo.decreaseTwoCompany.length}}人</span>
                                <span class="warnDynamicRisk__blue iconfont icon-xiangxia"></span>
                            </div>
                            <ul class="scroll">
                                <li v-for="item in relationVo.decreaseTwoCompany">{{item}}</li>
                            </ul>
                        </div>
                        <div class="itemContentRightReduce">
                            <div class="warnDynamicRisk__title">
                                <span>{{ timeCompareHandle(1) | dateFixed}}</span>
                                <span>增加</span>
                                <span>{{relationVo.addTwoCompany.length}}人</span>
                                <span class="warnDynamicRisk__yellow iconfont icon-xiangshang"></span>
                            </div>
                            <ul class="scroll">
                                <li v-for="item in relationVo.addTwoCompany">{{item}}</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
            <div class="warnDynamicRisk__item" >

                <!--标题-->
                <div class="warnDynamicRisk__itemTitle" @click="stretch">
                    三度自然人
                    <div class="itemTitleNum">
                        <span class="reduceNum warnDynamicRisk__blue">{{relationVo.crtThreePersonNum}}</span>
                        <span class="addNum warnDynamicRisk__yellow">{{relationVo.cpeThreePersonNum}}</span>
                        <span class="symbol iconfont icon-xialajiantou"></span>
                    </div>
                </div>

                <!--内容-->
                <div class="itemContent">

                    <!--内容之左边-->
                    <div class="itemContentLeft">
                        <div class="itemContentLeft-inset">
                            <div class="textWrap">
                                三度自然人对比明细
                            </div>
                        </div>
                    </div>

                    <!--内容之右边-->
                    <div class="itemContentRight">
                        <div class="itemContentRightAdd">
                            <div class="warnDynamicRisk__title">
                                <span>{{ timeCompareHandle(1)  | dateFixed}}</span>
                                <span>减少</span>
                                <span>{{relationVo.decreaseThreePerson.length}}人</span>
                                <span class="warnDynamicRisk__blue iconfont icon-xiangxia"></span>
                            </div>
                            <ul class="scroll">
                                <li v-for="item in relationVo.decreaseThreePerson">{{item}}</li>
                                </ul>
                        </div>
                        <div class="itemContentRightReduce">
                            <div class="warnDynamicRisk__title">
                                <span>{{  timeCompareHandle(1) | dateFixed}}</span>
                                <span>增加</span>
                                <span>{{relationVo.addThreePerson.length}}人</span>
                                <span class="warnDynamicRisk__yellow iconfont icon-xiangshang"></span>
                            </div>
                            <ul class="scroll">
                                <li v-for="item in relationVo.addThreePerson">{{item}}</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
            <div class="warnDynamicRisk__item" >

                <!--标题-->
                <div class="warnDynamicRisk__itemTitle" @click="stretch">
                    三度法人
                    <div class="itemTitleNum">
                        <span class="reduceNum warnDynamicRisk__blue">{{relationVo.crtThreeCompanyNum}}</span>
                        <span class="addNum warnDynamicRisk__yellow">{{relationVo.cpeThreeCompanyNum}}</span>
                        <span class="symbol iconfont icon-xialajiantou"></span>
                    </div>
                </div>

                <!--内容-->
                <div class="itemContent">

                    <!--内容之左边-->
                    <div class="itemContentLeft">
                        <div class="itemContentLeft-inset">
                            <div class="textWrap">
                                三度法人对比明细
                            </div>
                        </div>
                    </div>

                    <!--内容之右边-->
                    <div class="itemContentRight">
                        <div class="itemContentRightAdd">
                            <div class="warnDynamicRisk__title">
                                <span>{{ timeCompareHandle(1)  | dateFixed}}</span>
                                <span>减少</span>
                                <span>{{relationVo.decreaseThreeCompany.length}}人</span>
                                <span class="warnDynamicRisk__blue iconfont icon-xiangxia"></span>
                            </div>
                            <ul class="scroll">
                                <li v-for="item in relationVo.decreaseThreeCompany">{{item}}</li>
                            </ul>
                        </div>
                        <div class="itemContentRightReduce">
                            <div class="warnDynamicRisk__title">
                                <span>{{  timeCompareHandle(1) | dateFixed}}</span>
                                <span>增加</span>
                                <span>{{relationVo.addThreeCompany.length}}人</span>
                                <span class="warnDynamicRisk__yellow iconfont icon-xiangshang"></span>
                            </div>
                            <ul class="scroll">
                                <li v-for="item in relationVo.addThreeCompany">{{item}}</li>
                            </ul>
                        </div>
                    </div>

                </div>
          </div>
        </div>
    </div>
    </div>
      </div>
    <!-- <div class="warnDynamicRisk__loading" v-else="relationVo">数据加载中</div> -->
</template>

<style lang="scss">
  @import "WarnDynamicRiskCompareBox.scss";
</style>
