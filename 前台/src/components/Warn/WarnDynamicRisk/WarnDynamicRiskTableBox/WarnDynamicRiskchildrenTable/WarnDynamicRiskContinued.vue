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
                        <td  rowSpan="3">可持续性风险</td>
                        <td>利益一致行动法人数量</td>
                        <td colSpan='3'>{{dynamicRisk.curAgreeActNum|| "—" }}</td>
                        <td colSpan='3'>{{dynamicRisk.cprAgreeActNum|| "—" }}</td>
                    </tr>
                    <tr>
                        <td>利益一致行动法人占比</td>
                        <td colSpan='3'>{{dynamicRisk.curAgreeActProp + '%'|| "—" }}</td>
                        <td colSpan='3'>{{dynamicRisk.cprAgreeActProp + '%'|| "—" }}</td>
                    </tr>
                    <tr>
                        <td>利益一致行动法人明细</td>
                        <td colSpan='3'>
                          <div class="pWrap">
                              <p v-for="item in dynamicRisk.curAgreeComDet">{{item|| "—" }}</p>
                          </div>
                        </td>
                        <td  colSpan='3'>
                          <div class="pWrap">
                              <p v-for="item in dynamicRisk.cprAgreeComDet">{{item|| "—" }}</p>
                          </div>
                        </td>
                    </tr>
            </tbody>
        </table>
</template>

<style lang="scss">
</style>
