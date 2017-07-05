<script>
  import Echarts from "./../assets/js/echarts.min.js"
  /*
  * @component 雷达图组件
  * @author csy
  * eg:
  * <Radar :options="echartOption"></Radar>
  * @props { options }  自定义用户需要的echarts的options参数
  * @option formatter
  {
          color:["#a40000"],//线条的颜色
          title:"基础雷达图",
          splitAreaColor:[],//每一层的颜色，length为5
          data:[
            ["a","b","c","d","e","f","g","h"],//对应每一个角的标题字段
            [4300, 10000, 28000, 35000, 50000, 19000,10000,14000]//每个标题对应的数据
          ]
  }
  * */

  export default {

    data () {
      return {
        chart: null//图标实例
      }
    },
    props: [
      "options"
    ],
    methods: {

      drawEcharts(){
        // 图标初始化-使用vue自带ref属性获取，只是获取当前模块化里的dom，所以不需要传具体id
        this.chart = Echarts.init(this.$refs.charts);
        let _this = this;

        // 以前的逻辑，是splitArea里面的算法，因为需要max值大于初始值，max值加三分之一的“平均数”
        let arr = [];
        let data = this.options.data;
        let averageSub = 0,average = 0;

        for(let i=0;i<data[1].length;i++){
          var add = (data[1][i] == 0?20:data[1][i]);
          averageSub +=add;
        };
        average = averageSub / data[1].length / 4;

        data[0].map( (item, index) => {
          let o = {};
          o.name = item;
          o.max = Math.floor(data[1][index]+average);
          arr.push(o);
        });


        var fixData = [];
        this.options.data[1].map(function(item){
          fixData.push(item.toFixed(1))
        })

        this.chart.setOption({
          title: {
            text: this.options.title||'',
            padding: [10, 0, 0, 15],
            textStyle: {
              color: "#fff",
              fontSize: 16,
              fontWeight: "normal",
              fontFamily: 'Microsoft Yahei'
            }
          },
          tooltip: {
            // formatter:function(v){
            //   console.log(v)
            // }
          },
          legend: {
            show:false,
            data: ['雷达数据']
          },
          radar: {
            shape: this.options.shape || 'polygon', //polygon circle
            radius:this.options.radius||"70%",
            center: this.options.center||['50%', '50%'],
            axisTick:{
              show:this.options.axisTickShow||false
            },
            axisLabel:{
              show:this.options.axisLabelShow||false,
              formatter:function(value,index){
              }
            },
            splitLine:{
              show:true,
              lineStyle:{
              }
            },
            name: {
              formatter:'{value}',
              textStyle: {
                color:this.options.nameColor||'#666'
              }
            },
            indicator: arr,
            splitArea: {
              areaStyle: {
                color: this.options.splitAreaColor||
                [
                  'rgba(114, 172, 209, 0.2)',
                  'rgba(114, 172, 209, 0.4)',
                  'rgba(114, 172, 209, 0.6)',
                  'rgba(114, 172, 209, 0.7)',
                  'rgba(114, 172, 209, 1)'
                ],
                shadowColor: 'rgba(0, 0, 0, 0.3)',
                shadowBlur: 10
              }
            }
          },
          series: [{
            name: this.options.SeriesName||"",
            type: 'radar',
            // areaStyle: {normal: {}},
            data : [
              {
                value : fixData,
                name : '雷达数据',
                lineStyle: {
                  normal: {
                    color:"#ecf915"
                  }
                },
                itemStyle:{
                  normal:{
                    color:"#ff9d0c",
                    borderColor:"ecf915",
                    borderWidth:2
                  }
                },
                symbol:"circle",
                symbolSize:5,
                areaStyle: {
                  normal: {
                    opacity: 0.3,
                    color: this.options.areaColor||new Echarts.graphic.RadialGradient(0.5, 0.5, 1, [{color: 'blue',offset: 1},{color: '#fff',offset: 0}
                    ])
                  }
                }
              }
            ]
          }]
        });
//        window.onresize=function(){
//           _this.chart.resize();
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
      this.chart && this.chart.dispose();
    }
  }
</script>

<template>

  <div class="echarts" ref="charts">
  </div>

</template>

<style lang="scss">
  .echarts {
    width:100%;
    height:100%;
  }
</style>
