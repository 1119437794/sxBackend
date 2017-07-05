<script>
     /*
    * @component 组件
    * @author yxc
    * */
     import Echarts from "./../assets/js/echarts.min.js"
     export default {
         props: ['pieData'],
         methods: {
             draw () {
                 let pieData = this.pieData
                 pieData = pieData.length ?
                         pieData.map(item => {
                             return {
                                 value: item.amount,
                                 name: item.area
                             }
                         }) :
                         [{value: 0, name: '全市'}]

                 const option = {
                     color: [
                             '#f8a900', '#ffc89c', '#feef8d',
                             '#62b3b6', '#0293dc', '#0068b7',
                             '#1935b4', '#5369d0', '#00cbe3',
                             '#33b570'
                     ],
                     calculable : true,
                     series : [
                         {
                             name:'面积模式',
                             type:'pie',
                             radius : [30, 110],
                             roseType : 'area',
                             label: {
                                 normal: {
                                     show: true,
                                     formatter: "{b} {d}%",
                                     textStyle: {
                                         color: '#000'
                                     }
                                 }
                             },
                             data: pieData
                         }
                     ]
                 }
                 const myEchart = Echarts.init(this.$refs['areaPie__root'])
                 myEchart.setOption(option)
             }
         },
         watch: {
             pieData () {
                 this.draw()
             }
         }
     }
</script>

<template>
    <div ref="areaPie__root" class="areaPie__root"></div>
</template>

<style lang="scss">
    .areaPie__root {
        height: 100%;
    }
</style>