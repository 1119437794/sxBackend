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
                  <td>风险类型~</td>
                  <td>特征指标</td>
                  <td colSpan='2'>{{doubleList[0] | dateFixed}}</td>
                  <td colSpan='2'>{{doubleList[1] | dateFixed}}</td>
              </tr>
            </thead>
            <tbody>
                   <tr>
                        <td  rowSpan="5">跨区域舞弊风险</td>
                        <td>地域积聚化排名</td>
                        <td>地域</td>
                        <td>法人数量</td>
                        <td>地域</td>
                        <td>法人数量</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>{{dynamicRisk.curAreaList[0]|| "—" }}</td>
                        <td>{{dynamicRisk.curAreaCompanyNum[0]|| "—" }}</td>
                        <td>{{dynamicRisk.cprAreaList[0]|| "—" }}</td>
                        <td>{{dynamicRisk.cprAreaCompanyNum[0]|| "—" }}</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>{{dynamicRisk.curAreaList[1]|| "—" }}</td>
                        <td>{{dynamicRisk.curAreaCompanyNum[1]|| "—" }}</td>
                        <td>{{dynamicRisk.cprAreaList[1]|| "—" }}</td>
                        <td>{{dynamicRisk.cprAreaCompanyNum[1]|| "—" }}</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>{{dynamicRisk.curAreaList[2]|| "—" }}</td>
                        <td>{{dynamicRisk.curAreaCompanyNum[2]|| "—" }}</td>
                        <td>{{dynamicRisk.cprAreaList[2]|| "—" }}</td>
                        <td>{{dynamicRisk.cprAreaCompanyNum[2]|| "—" }}</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>{{dynamicRisk.curAreaList[3]|| "—" }}</td>
                        <td>{{dynamicRisk.curAreaCompanyNum[3]|| "—" }}</td>
                        <td>{{dynamicRisk.cprAreaList[3]|| "—" }}</td>
                        <td>{{dynamicRisk.cprAreaCompanyNum[3]|| "—" }}</td>
                    </tr>
            </tbody>
        </table>
</template>

<style lang="scss">

</style>
