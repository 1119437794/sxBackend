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
                  <td>{{doubleList[0] | dateFixed}}</td>
                  <td>{{doubleList[1] | dateFixed}}</td>
              </tr>
            </thead>
            <tbody>
                    <tr>
                        <td  rowSpan="3">稳态运营风险</td>
                        <td>自然人节点数</td>
                        <td>{{dynamicRisk.curPersonNum|| "—" }}</td>
                        <td>{{dynamicRisk.cprPersonNum|| "—" }}</td>
                    </tr>
                    <tr>
                        <td>企业法人节点数</td>
                        <td>{{dynamicRisk.curCompanyNum|| "—" }}</td>
                        <td>{{dynamicRisk.cprCompanyNum|| "—" }}</td>
                    </tr>
                    <tr>
                        <td>总节点数</td>
                        <td>{{dynamicRisk.curSumNum|| "—" }}</td>
                        <td>{{dynamicRisk.cprSumNum|| "—" }}</td>
                    </tr>
            </tbody>
        </table>
</template>

<style lang="scss">
</style>
