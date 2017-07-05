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
                  <td width="30%">特征指标</td>
                  <td>{{doubleList[0] | dateFixed}}</td>
                  <td>{{doubleList[1] | dateFixed}}</td>
              </tr>
            </thead>
            <tbody>
                    <tr>
                        <td  rowSpan="3">非法集资违规风险</td>
                        <td>投资类、咨询类、贸易类、租赁类、保理类公司数量</td>
                        <td>{{dynamicRisk.curTypeSumNum|| "—" }}</td>
                        <td>{{dynamicRisk.cprTypeSumNum|| "—" }}</td>
                    </tr>
                    <tr>
                        <td>投资类、咨询类、贸易类、租赁类、保理类公司占比</td>
                        <td>{{dynamicRisk.curTypeSumProp + '%'|| "—" }}</td>
                        <td>{{dynamicRisk.cprTypeSumProp + '%'|| "—" }}</td>
                    </tr>
                    <tr>
                        <td>公司明细</td>
                        <td>
                          <div class="pWrap">
                            <p v-for="item in dynamicRisk.curCompanyDetail">{{item|| "—" }}</p>
                          </div>
                        </td>
                        <td>
                          <div class="pWrap">
                            <p v-for="item in dynamicRisk.cprCompanyDetail">{{item|| "—" }}</p>
                          </div>
                        </td>
                    </tr>
            </tbody>
        </table>
</template>

<style lang="scss">

</style>
