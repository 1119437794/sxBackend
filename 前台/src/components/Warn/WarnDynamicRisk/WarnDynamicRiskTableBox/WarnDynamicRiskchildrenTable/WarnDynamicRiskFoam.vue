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
                        <td  rowSpan="2">泡沫风险化</td>
                        <td>一度、二度关联法人数量</td>
                        <td>{{dynamicRisk.curOneTwoComapnyNum|| "—" }}</td>
                        <td>{{dynamicRisk.cprOneTwoComapnyNum|| "—" }}</td>
                    </tr>
                    <tr>
                        <td>一度、二度关联法人占比</td>
                        <td>{{dynamicRisk.curOneTwoCompanyProp + '%'|| "—" }} </td>
                        <td>{{dynamicRisk.cprOneTwoCompanyProp + '%'|| "—" }} </td>
                    </tr>
            </tbody>
        </table>
</template>

<style lang="scss">

</style>
