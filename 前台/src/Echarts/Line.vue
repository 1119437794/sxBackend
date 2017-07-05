<script>
  import Echarts from "./../assets/js/echarts.min.js"
  /*
  * @component 折线图组件
  * @author csy
  * eg:
  * <Line :options="echartOption"></Line>
  * @props { options }  自定义用户需要的echarts的options参数
  * @PropTypes.string formatter
  * {
            color:["#00b8ee","#f8b551"],
            titleX:"left",
            symbolSize:10,
            legendIsShow:true,
            unit:['万元',"亿元"],
            yAxisName:"万元",
            legendRight:"center",
            yFlag:"",//y轴的单位
            legendTop:'1%',
            legendPadding:[0,0,0,0],
            grid:{top:'10%',left: '5%',right: '5%',bottom: '10%',containLabel: true},
            legend:["邮件营销","邮件营销2"],
            xAxis:["1月", "2月", "3月", "4月", "5月", "6月", "7月"],
            series: [
                  {
                      name:'邮件营销',
                      type:'line',
                      stack: '总量',
                      data:[120, 132, 101, 134, 90, 230, 210]
                  },
                  {
                      name:'邮件营销2',
                      type:'line',
                      stack: '总量',
                      data:[100, 90, 101, 114, 90, 230, 110]
                  }
            ]
  }
  * */

  export default {

    data () {
      return {
        dateArr: [],  // x轴显示的日期
        chart:null//图标实例
      }
    },
    props: [
      "options"
    ],

    methods: {
      drawEcharts(){

        let tmpDateArr = [];
        let tmpXAxisArr = [];

        // 日期处理
        this.options.xAxis.map((item, index) => {
          let tmpDate = item.replace(/\d{2}(\d{2}\-\d{2})/, "$1");
          //let tmpDate = item;
          tmpDateArr.push(tmpDate);
          index % 2 != 0 && (tmpDate = "");
          tmpXAxisArr.push(tmpDate);
        });

        //this.dateArr = tmpDateArr;
        //图标初始化-使用vue自带ref属性获取，只是获取当前模块化里的dom，所以不需要传具体id
        this.chart = Echarts.init(this.$refs.charts);
        let _this = this;
        this.chart.setOption({
          color: this.options.color,
          title: {
            show:this.options.titleShow==undefined?false:true,
            text: this.options.title,
            x: this.options.titleX,
            padding: [10, 0, 0, 15],
            textStyle: {
              color: "#fff",
              fontSize: 16,
              fontWeight: "normal",
              fontFamily: 'Microsoft Yahei'
            }
          },
          tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(0,0,0,0.7)',
            padding: [10, 10, 10, 10],
            formatter: function (v) {
              var info=tmpDateArr[v[0].dataIndex]+"<br/>";
              for(var i=0;i<v.length;i++){
                var _until="";
                if(_this.options.unit==undefined){
                  _until="";
                }else{
                  _until=_this.options.unit[i];
                }
                var _spanCorlor='<span style=color:'+_this.options.color[i]+'>' + (v[i].value || "—") +_until+ '</span><br/>';
                info+=v[i].seriesName+" :&nbsp;"+ _spanCorlor
              }

              return info;
            },
            axisPointer: {
              type: 'none'
            }
          },
          //grid: this.options.grid==undefined ?{top:'15%',left: '5%',right: '5%',bottom: '5%',containLabel: true}:this.options.grid,
          grid: {
            top:'15%',
            left: 10,
            //right: '5%',
            bottom: '5%',
            width: "95%",
            containLabel: true
          },
          legend: {
            data: this.options.legend,
            itemWidth:20,
            itemHeight:5,
            show: this.options.legendIsShow==undefined?false:this.options.legendIsShow,
            right: this.options.legendRight == undefined ? "auto" : this.options.legendRight,
            bottom: this.options.legendBottom == undefined ? "auto" : this.options.legendBottom,
            top:this.options.legendTop == undefined ? "auto" : this.options.legendTop,
            padding: this.options.legendPadding== undefined ? [15,0,0,0] : this.options.legendPadding,
            textStyle: {
              color: "#99a3b7",
              fontSize: 12,
              fontFamily: 'Microsoft Yahei'
            }
          },
          xAxis: {
            type: 'category',
            data: tmpXAxisArr,
            axisLabel: {
              show: true,
              formatter: '{value}',
              textStyle: {
                color: "#99a3b7",
                fontSize: 12,
                fontFamily: 'Microsoft Yahei'
              },
              interval: 0
            },
            axisLine: {
              lineStyle: {
                width: 1,
                color: '#353b45',//'#8f949a'
              }
            },
            axisTick: {
              show: false,
            },
          },
          yAxis: {
            name: this.options.yAxisName,
            // interval:this.options.yInterval==undefined?"":this.options.yInterval,
            // max:this.options.yMax==undefined?"auto":this.options.yMax,
            // min:this.options.yMin==undefined?"auto":this.options.yMin,
            nameTextStyle: {
              color: "#7f868e"
            },
            type: 'value',
            axisTick: {
              show: false
            },
            splitLine: {
              show:this.options.splitLineShow||false,
              lineStyle: {
                width: 1,
                color: '#353b45'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#353b45'
              }
            },
            axisLabel: {
              formatter: '{value}' + this.options.yFlag,
              textStyle: {
                color: "#99a3b7",
                fontSize: 12,
                fontFamily: 'Microsoft Yahei'
              }
            }
          },
          series: this.options.series
        });
//        window.onresize=function(){
//          _this.chart.resize()
//        }
      }
    },

    watch: {
      options(){
        this.drawEcharts();
      }
    },

    mounted(){
      let _this = this;
      //图标自适应
    },

    beforeDestroy(){
      //释放内存
      this.chart && this.chart.dispose()
    }
  }
</script>

<template>
  <div class="lineEchart__root">
    <div class="echarts" ref="charts"></div>
    <ul class="lineEchart__date">
      <!--<li
        class="lineEchart__item"
        v-for="item of dateArr"
        v-text="item"
      ></li>-->
    </ul>
  </div>

</template>

<style lang="scss">
  @import "Line.scss";
</style>
