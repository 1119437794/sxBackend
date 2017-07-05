<script>
  /*
  * @component 企业详情的导航组件
  * @author yxc
  * */

  export default {
    props: {
        disableGlfNav: {
            default: -1
        },
        defaultIndex: {
            default: 0
        },
        navs: {
            default: () => [
                "基本资料",
                "关联方信息",
                "诉讼信息",
                "招聘信息",
                "舆情看板",
                "其他对接数据"
            ]
        }
    },
    computed: {
      // 导航下标
      navIndex(){
        return this.defaultIndex || 0;
      }
    },

    methods: {
      /*
      * @method setTop 遍历生成li节点时 根据当前li的下标设置top值
      * @param {Number} index 当前下标
      * */
      setTop(index){
        let baseHeight = 130;
        let baseOverlappingHeight = 6;

        return baseHeight * index- index * baseOverlappingHeight + 'px';
      },

      /*
      * @method 点击详情导航切换下边
      * @param {Number} index 当前点击的导航下标
      * */
      detailsNavIndexChange(index){
        if (index === this.disableGlfNav) return
        if (this.navIndex !== index) {
          this.navIndex = index;
          this.$emit("detailsNavIndexChange", index);
        }
      },

      // 设置类名
      setClassName (index) {
          if (index === this.disableGlfNav) {
              return 'detailNav__item--disable'
          } else if (index === this.navIndex) {
              return 'detailNav__item--active'
          }
          return 'detailNav__item'
      }
    }
  }
</script>

<template>
  <ul class="detailNav__root">

    <li
      v-for="(item, index) in navs"
      @click="detailsNavIndexChange(index)"
      :style="{top: setTop(index), zIndex: navs.length - index}"
      :class="setClassName(index)"
    >
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" >
        <polygon points="0,0 25,10 25,120 0,130" />
      </svg>
      <span class="detailNav__itemText" v-text="item"></span>
    </li>
  </ul>
</template>

<style lang="scss">
  @import "DetailsNav.scss";
</style>
