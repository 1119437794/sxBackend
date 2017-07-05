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
                        <td  rowSpan="2">传销风险</td>
                        <td>三度关联自然人数量</td>
                        <td>{{dynamicRisk.curThreePersonNum|| "—" }}</td>
                        <td>{{dynamicRisk.cprThreePersonNum|| "—" }}</td>
                    </tr>
                    <tr>
                        <td>三度关联自然人占比</td>
                        <td>{{dynamicRisk.curThreePersonProp + '%'|| "—" }}</td>
                        <td>{{dynamicRisk.cprThreePersonProp + '%'|| "—" }}</td>
                    </tr>
            </tbody>
        </table>
</template>

<style lang="scss">

</style>
