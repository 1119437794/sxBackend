<script>
     /*
    * @component 组件
    * @author yxc
    * */
     import Echarts from "./../assets/js/echarts.min.js"

     export default {
         props: ['barData'],
         data () {
             return {}
         },
         methods: {
             draw () {
                 const barData = this.barData
                 const dateArr = barData.date
                 const content = barData.content
                 const legend = []
                 const seriesData = []
                 const selected = {}

                 content.map((item, index) => {
                     legend.unshift({
                         name: item.key
                     })
                     let tmpObj = null
                     if (item.total !== undefined) {
                         selected[item.key] = index === content.length - 2 || index === content.length - 3
                         tmpObj = {
                             name: item.key,
                             type: 'line',
                             data: item.value
                         }
                     } else {
                         tmpObj = {
                             name: item.key,
                             type: 'bar',
                             data: item.value,
                             itemStyle: {
                                 normal: {
                                     color: '#28A9EB'
                                 }
                             }
                         }
                     }
                     seriesData.push(tmpObj)
                 })

                 const option = {
                     color: [
                         '#EBAC29', '#28EBCB',
                         '#28EB68', '#48EB28', '#ABEB28',
                         '#EBCB28', '#EB6828', '#EB2848',
                         '#EB28AB'
                     ],
                     legend: {
                         top: '2%',
                         data: legend,
                         selected
                     },
                     tooltip: {
                         trigger: 'axis',
                         axisPointer: {
                             type: 'shadow'
                         }
                     },
                     grid: {
                         width: '80%',
                         height: '70%'
                     },
                     xAxis: [
                         {
                             type: 'category',
                             boundaryGap: true,
                             axisTick: {
                                 show: false
                             },
                             data: dateArr
                         }
                     ],
                     yAxis: [
                         {
                             type: 'value',
                             name: '举报次数',
                             min: 0,
                             boundaryGap: [0.2, 0.2]
                         }
                     ],
                     series: seriesData
                 };
                 const myEchart = Echarts.init(this.$refs['bar__root'])
                 myEchart.setOption(option)
             }
         },
         watch: {
             barData () {
                 this.draw()
             }
         }
     }
</script>

<template>
    <div ref="bar__root" class="bar__root"></div>
</template>

<style lang="scss">
    .bar__root {
        height: 100%;
    }
</style>