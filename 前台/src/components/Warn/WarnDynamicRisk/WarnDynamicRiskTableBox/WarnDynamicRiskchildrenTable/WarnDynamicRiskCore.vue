 <script>
     /*
   * @component 组件
   * @author csy
   * @date 2016/11/12 0012
   * */
    export default {
     props:[
        "dynamicRisk",
        "doubleList"
      ],

       filters:{
        dateFixed(value){
             if (!!value) {
               return value.toString().substr(0,7);
             } else {
               return value;
             }
            
        }
       }
    }
</script>

<template>
        <table class="warnDynamicRisk__table">
            <thead>
              <tr>
                  <td>风险类型</td>
                  <td>特征指标</td>
                  <td colSpan='3'>{{doubleList[0] | dateFixed}}</td>
                  <td colSpan='3'>{{doubleList[1] | dateFixed}}</td>
              </tr>
            </thead>
            <tbody>
                    <tr>
                        <td  rowSpan="2">核心资本运作风险</td>
                        <td>核心自然人</td>
                        <td v-for="item in dynamicRisk.curCorePersonList">{{item|| "—" }}</td>
                        <td v-for="item in dynamicRisk.cprCorePersonList">{{item|| "—" }}</td>
                    </tr>
                    <tr>
                        <td>控制节点数</td>
                        <td v-for="item in dynamicRisk.curControlNum">{{item|| "—" }}</td>
                        <td v-for="item in dynamicRisk.cprControlNum">{{item|| "—" }}</td>
                    </tr>
            </tbody>
        </table>
</template>

<style lang="scss">
</style>
