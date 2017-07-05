<script>
  import Echarts from "./../assets/js/echarts.min.js"
  /*
  * @component 扇形图组件
  * @author csy
  * eg:
  * <Pie :options="echartOption"></Pie>
  * @props { options }  自定义用户需要的echarts的options参数
  * @props formatter
  * {
          title:"标题",
          titleX:"",
          legendX:"right",
          legendY:"center",
          data:[
                  {value:335, name:'a'},
                  {value:310, name:'b'},
                  {value:234, name:'c'},
                  {value:135, name:'d'},
                  {value:1548, name:'e'}
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
       let legendData = this.options.data.map((item,index)=>{
            return item.name
       })
       this.chart.setOption({
              title : {
                  text: this.options.title,
                  subtext: '',
                  x:this.options.titleX||'center'
              },
              tooltip : {
                  trigger: 'item',
                  formatter: this.options.formattre||"{a} <br/>{b} : {c} ({d}%)"
              },
              legend: {
                  show:true,
                  orient: this.options.legendOrient||'vertical',
                  left:this.options.legendX||'left',
                  top:this.options.legendY||'top',
                  data:legendData
              },
              series : [
                  {
                      name: this.options.dataName||'数据名称',
                      type: 'pie',
                      roseType:this.options.roseType||false,
                      radius : this.options.radius||'55%',
                      center: this.options.center||['50%', '50%'],
                      data:this.options.data||[],
                      itemStyle: {
                          emphasis: {
                              shadowBlur: 10,
                              shadowOffsetX: 0,
                              shadowColor: 'rgba(0, 0, 0, 0.5)'
                          }
                      }
                  }
              ]
        });
      }
    },

    mounted(){
     let _this = this;
      //图标自适应
//     window.onresize=()=>{
//       _this.chart.resize()
//     }
    },

    beforeDestroy(){
      //释放内存
      this.chart && this.chart.dispose()
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
