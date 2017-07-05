<script>
     /*
    * @component 组件
    * @author yxc
    * */
     import Echarts from "./../assets/js/echarts.min.js"

     export default {
         props: ['barData'],
         data () {
             return {
             }
         },
         methods: {
             draw () {
                 const dateArr = []
                 const barData = this.barData
                 const af = barData.af || []
                 const af2 = []
                 const yj = barData.yj || []
                 const yj2 = []

                 af.map((item, index) => {
                     const key = Object.keys(item)[0]
                     dateArr.push(key)
                     af2.push(af[index][key])
                     yj2.push(yj[index][key])
                 })

                 const option = {
                     legend: {
                         top: '2%',
                         data:['预警次数', '发案次数']
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
                             data: dateArr,
                             axisTick: {
                                 show: false
                             }
                         }
                     ],
                     yAxis: [
                         {
                             type: 'value',
                             name: '预警次数',
                             min: 0,
                             boundaryGap: [0.2, 0.2]
                         }
                     ],
                     series: [
                         {
                             name: '预警次数',
                             type: 'bar',
                             itemStyle: {
                                 normal: {
                                     color: '#0293dc'
                                 }
                             },
                             data: yj2
                         },
                         {
                             name: '发案次数',
                             type: 'bar',
                             itemStyle: {
                                 normal: {
                                     color: '#f8a900'
                                 }
                             },
                             data: af2
                         }
                     ]
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