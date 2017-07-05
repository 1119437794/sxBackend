<script>
  import Echarts from "./../assets/js/echarts.min.js"
  import { ajax } from '../assets/js/utils'
  /*
  * @component 首页地图组件
  * @author csy
  * eg:
  * <MapSZ :options="echartOption"></MapSZ>
  * @props { options }  自定义用户需要的echarts的options参数
  * @option formatter
  {
        //地图上点的数据
        scatterData:[
                  {
                      name:"测试点1",
                      value: [120.72,31.32,1000] //经纬度和值
                  },
                  {
                      name:"测试点2",
                      value: [120.32,31.34,500] //经纬度和值
                  }
                ],
       //自定义点用鼠标摸上去的显示参
      formatter:function(v){
          return v.name+"："+v.value[2]
        }
  }
  * */

  export default {

      props: [
          "options"
      ],

    data () {
      return {
          coordinates: null, // 地图坐标
        chart:null//图标实例
      }
    },

      created () {
        ajax({
            url: '/static/suzhou.json',
            method: 'get',
            success: res => {
                this.coordinates = res
            }
        })
      },

      methods: {
          drawEcharts(){
              Echarts.registerMap('suzhou', this.coordinates);
              let _this = this;
              this.chart = Echarts.init(this.$refs.charts);
              this.chart.setOption({
                  // backgroundColor: '#404a59',
                  tooltip: {
                      show:false,
                      trigger: 'item',
                      formatter:this.options.formatter || function(v) {
                          return v.name+"："+v.value[2]
                      }
                  },
                  //定义地图轮廓的参数
                  geo: {
                      map: 'suzhou',
                      selectedMode : 'single',
                      label: {
                          normal:{
                              show:true,
                              textStyle:{
                                  fontFamily:"microsoft yahei",
                                  color:"#fff"
                              }
                          },
                          emphasis: {
                              show: true,
                              textStyle:{
                                  fontFamily:"microsoft yahei",
                                  color:"#fff"
                              }
                          }
                      },
                      // roam:true,
                      zoom:1.2,
                      // left:"20%",top:"10%",right:"20%",bottom:"10%",
                      itemStyle: {
                          normal: {
                              areaColor: '#0393dc',
                              borderColor: '#fff',
                              borderWidth:1
                          },
                          emphasis: {
                              areaColor: '#67beeb'
                          }
                      }
                  },
                  series: [
                      {
                          name: '公司分布',
                          type: 'scatter',
                          coordinateSystem: 'geo',
                          symbolSize: function(data,params){
//                          if (data[2] < 10) {
//                            return 12
//                          } else {
//                            return data[2]/5 +12
//                          }

                              return (data[2] / 80) * (window.innerWidth / 1440 * 10);
                          },
                          label: {
                              normal: {
                                  formatter: '{b}',
                                  show: false//是否默认显示原点的数值
                              },
                              emphasis: {
                                  show: false
                              }
                          },
                          itemStyle: {
                              normal:{
                                  color:"#ecec93",
                                  shadowColor: 'rgba(242, 255, 133, 1)',
                                  shadowBlur: 10
                              },
                              emphasis: {
                                  borderColor: '#fff',//原点的样式相关
                                  borderWidth: 1
                              }
                          },
                          data: this.options.scatterData || [
                              {
                                  name:"测试点2222",
                                  value: [120.72,31.32,1000] //经纬度和值
                              }
                          ]

                      },
                  ]
              });
              this.chart.on("click",function(v){
                  _this.$emit("callback", v.name,v.componentType);
              });
              _this.chart.resize()
          }
      },

//      mounted() {
//          this.drawEcharts();
//      },

    watch: {
      options(){
          this.coordinates && this.drawEcharts();
        //解决刷新页面后，图标无法自适应的bug
        window.onload = () => {
          this.chart.resize()
        };
      },
        coordinates() {
            this.options && this.drawEcharts();
            window.onload = () => {
                this.chart.resize()
            };
        }
    },



    beforeDestroy(){
      // //释放内存
      // this.chart.resize()
      // this.chart && this.chart.dispose()
    }
  }
</script>

<template>

  <div class="echartsMap" ref="charts">
  </div>

</template>

<style lang="scss">
  .echartsMap {
    width:100%;
    height:100%;
  }
</style>
