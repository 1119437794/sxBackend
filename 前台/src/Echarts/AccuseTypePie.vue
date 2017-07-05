<script>
     /*
    * @component 组件
    * @author yxc
    * */
     import Echarts from "./../assets/js/echarts.min.js"
     export default {
         props: [
                 'title',
                 'pieData'
         ],
         data () {
             return {
             }
         },
         methods: {
             draw () {
                 const pieData = this.pieData
                 const seriesData = []
                 if (pieData.fb) {
                     seriesData.push({
                         value: pieData.fb['已发案'],
                         name: '已发案',
                         itemStyle: {
                             normal: {
                                 color: '#f8a900'
                             }
                         }
                     })
                     seriesData.push({
                         value: pieData.fb['未发案'],
                         name: '未发案',
                         itemStyle: {
                             normal: {
                                 color: '#7699f2'
                             }
                         }
                     })
                 } else {
                     const content = pieData.content
                     if (content.length > 1) {
                         content.map(item => {
                             item.total && seriesData.push({
                                 name: item.key,
                                 value: item.total
                             })
                         })
                     } else {
                         seriesData.push({
                             name: '总计',
                             value: 0,
                             itemStyle: {
                                 normal: {
                                     color: '#28A9EB'
                                 }
                             }
                         })
                     }
                 }

                 const option = {
                     color: [
                         '#f8a900', '#7497f1',
                         '#0068b7', '#ffc89c', '#9153d0',
                         '#62b3b6', '#f7004e', '#2d00f7',
                         '#6db562', '#f700ca'
                     ],
                     title: {
                         text: this.title,
                         textStyle: {
                             fontSize: 14,
                             fontWeight: 'normal',
                             color: '#4c4c4c'
                         },
                         top: '4%',
                         left: '2%'
                     },
                     series: [
                         {
                             name:'访问来源',
                             type:'pie',
                             radius: ['20%', '50%'],
                             avoidLabelOverlap: false,
                             label: {
                                 normal: {
                                     show: true,
                                     formatter: "{b}",
                                     textStyle: {
                                         color: '#000'
                                     }
                                 },
                                 emphasis: {
                                     show: true,
                                     formatter: "{b}\r\n{c}次\r\n{d}%",
                                     textStyle: {
                                         color: '#000'
                                     }
                                 }
                             },
                             labelLine: {
                                 normal: {
                                     show: true
                                 }
                             },
                             data: seriesData
                         }
                     ]
                 }
                 const myEchart = Echarts.init(this.$refs['accuseTypePie__root'])
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
    <div ref="accuseTypePie__root" class="accuseTypePie__root"></div>
</template>

<style lang="scss">
    .accuseTypePie__root {
        height: 100%;
    }
</style>