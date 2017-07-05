<script>
  import Echarts from "./../assets/js/echarts.min.js"
  /*
  * @component 散点图组件
  * @author csy
  * eg:
  * <Scatter :options="echartOption"></Scatter>
  * @props { options }  自定义用户需要的echarts的options参数
  * @option formatter
  {
          color:["#a40000"],
          title:"散点图",
          companyInfo:[
          {
            name:"海东泰金融投资有限公司",//公司名称
            regCapital:'50万元人名币',//注册资本
            corporate:'周全',//法人代表
            companyType:'国有出资',//公司类型
            foundDate:'2014年3月12日'//成立日期
          },
           {
            name:"海东泰金融投资有限公司1",//公司名称
            regCapital:'50万元人名币',//注册资本
            corporate:'周全',//法人代表
            companyType:'国有出资',//公司类型
            foundDate:'2014年3月12日'//成立日期
          },
           {
            name:"海东泰金融投资有限公司2",//公司名称
            regCapital:'50万元人名币',//注册资本
            corporate:'周全',//法人代表
            companyType:'国有出资',//公司类型
            foundDate:'2014年3月12日'//成立日期
          },
           {
            name:"海东泰金融投资有限公司3",//公司名称
            regCapital:'50万元人名币',//注册资本
            corporate:'周全',//法人代表
            companyType:'国有出资',//公司类型
            foundDate:'2014年3月12日'//成立日期
          },
           {
            name:"海东泰金融投资有限公司4",//公司名称
            regCapital:'50万元人名币',//注册资本
            corporate:'周全',//法人代表
            companyType:'国有出资',//公司类型
            foundDate:'2014年3月12日'//成立日期
          }
          ],
          yAxisName:"动态风险指数",
          xAxisName:"静态风险指数",
          series:[
            {
                name:'风险指数',
                type:'scatter',
                symbolSize:30,
                data: [
                    [40.2, 51.6],
                    [20.5, 59.0],
                    [10.5, 49.2],
                    [90.0, 63.0],
                    [155.8, 53.6]
                ]
            }
          ]
  }
  * */

  export default {

    data () {
      return {
        chart:null//图标实例
      }
    },
    props: [
      "options"
    ],

    watch: {
      options(){
        this.drawEcharts();
      }
    },

    methods: {
      drawEcharts(){
       //图标初始化-使用vue自带ref属性获取，只是获取当前模块化里的dom，所以不需要传具体id
       this.chart = Echarts.init(this.$refs.charts);
       let _this = this;
       this.chart.setOption({
            textStyle:{
                color:"#666"
            },
            title: {
                text: this.options.title==undefined?"":this.options.title,
                padding: [10, 0, 0, 15],
                textStyle: {
                    color: "#fff",
                    fontSize: 16,
                    fontWeight: "normal",
                    fontFamily: 'Microsoft Yahei'
                }
            },
            grid: this.options.grid==undefined ?{left: '3%',right: '10%',bottom: '3%',containLabel: true}:this.options.grid,
            visualMap: {
                type: 'continuous',
                right: '2%',
                bottom: this.options.visualMapBottom||'8%',
                type: 'continuous',
                min: 0,
                max: this.options.visualMapMax||90,
                text:['高','低'],
                realtime: false,
                calculable : true,
                inRange:{
                  color:["#70d8f7",'#054456']
                },
                dimension: 0 // 控制横轴变化
                // color: ['#28567d',"#3a8db7"]
            },
            tooltip: {
                  position: 'top',
                  backgroundColor: '#203b50',
                  padding: [10, 10, 10, 10],
                  formatter: function(data){
                         var dataIndex=data.dataIndex;
                         var company = _this.options.companyInfo[dataIndex]
                         var opr='<div class="scatter-bubble-tip">'
                                  +'<h4 class="c-littleBlue">'+company.name+'</h4>'
                                  +'<ul>'
                                  +'<li>注册资本：<span class="c-blue">'+company.regCapital+'万元</span></li>'
                                  +'<li>法人代表：<span class="c-blue">'+company.corporate+'</span></li>'
                                  +'<li>公司类型：<span class="c-blue">'+company.companyType+'</span></li>'
                                  +'<li>成立时间：<span class="c-blue">'+company.foundDate+'</span></li>'
                                  +'<li>静态风险指数：<span class="c-blue">'+data.value[0]+'</span></li>'
                                  +'<li>动态风险指数：<span class="c-blue">'+data.value[1]+'</span></li>'
                                  +'</ul>'
                                  +'</div>'
                          return opr;
                      }
              },
            xAxis : [
                {
                    name:this.options.xAxisName||"",
                    type : 'value',
                    scale:false,
                    axisLabel : {
                        formatter: '{value}',
                         textStyle: {
                            color: "#99a3b7",
                            fontSize: 12,
                            fontFamily: 'Microsoft Yahei'
                        }
                    },
                    max:100,
                    axisLine: {
                        lineStyle: {
                            color: '#565b63'
                        }
                    },
                    axisTick: {
                        show: false
                    },
                   splitLine: {
                      show: this.options.splitLineShow||true,
                      lineStyle: {
                          color: '#e6e6e6',
                          type: 'solid'
                      }
                  },
                }
            ],
            yAxis : [
                {
                    name:this.options.yAxisName||"",
                    type : 'value',
                    scale:false,
                    axisLabel: {
                        formatter: '{value}',
                        textStyle: {
                            color: "#99a3b7",
                            fontSize: 12,
                            fontFamily: 'Microsoft Yahei'
                        }
                    },
                    max:100,
                    axisLine: {
                        lineStyle: {
                            color: '#565b63'
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                      show: this.options.splitLineShow||true,
                      lineStyle: {
                          color: '#e6e6e6',
                          type: 'solid'
                      }
                  },
                }
            ],
           series: this.options.series
        });
      this.chart.on("click",function(v){
        _this.$emit("callback",v.dataIndex);
      })
      }
    },
    mounted(){
     let _this = this;
      //图标自适应
     // window.onresize=function(){
     //   _this.chart.resize()
     // }
    },
    destroyed(){
      //释放内存
      setTimeout(() => {
        this.chart && this.chart.dispose();
      }, 0);
    }
  }
</script>

<template>

  <div class="echarts" ref="charts"></div>

</template>

<style lang="scss">
  .echarts {
    width:100%;
    height:100%;
  }

  .c-blue {
    color:#f0a808
  }

  .c-littleBlue {
    color:#009ae1
  }
</style>
