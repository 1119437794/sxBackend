<script>
  /*
  * @component 分页组件
  * @author yxc
  * @props { Number } showPages 显示多少个页码
  * @props { Number } pageSize 每页显示多少条记录
  * @props { Number } curPageNum 当前页码
  * @props { Number } rowsTotal 返回的记录总数
  * @props { Function } pageChange 父组件回调 参数为当前页码值
  *
  *  eg：
     <Pagination
        :showPages="5"
        :pageSize="8"
        :curPageNum="1"
        :rowsTotal="200"
        @pageChange="callback"
      ></Pagination>
   * */
  export default {
      props: [
          'pageSize',
          'showPages',
          'rowsTotal',
          'curPageNum'
      ],
      data () {
          return {
              pageInputNum: '', // 页码输入框值
              pageInputDom: null // 页码输入框dom
          }
      },
      computed: {
      // 记录总页数
          pagesTotal () {
              return Math.ceil(this.rowsTotal / this.pageSize)
          }
      },
      methods: {

      /*
       * @method { Function } getPagesList 获取页码列表
       * @param { Number } curPageNum 当前页码
       * @param { Number } showPages 当前组件显示多少页码
       * @param { Number } pagesTotal 总的页码数
       * @return { Array } pagesList 页码列表
       * 注：页码每一项是一个对象，value表示用户点击获取的真实页码值，text表示页码展示给用户的值
       * */
          getPagesList (curPageNum, showPages, pagesTotal) {
        // 没有传入总共页码数 或 总共页码数小于1，就没必要显示页码
              if (pagesTotal < 1 || !pagesTotal) return []

        // 始终保持当前页码位于中间位置
              const pagesList = [] // 页码列表

        /*
         * 针对供用户选择的页码数 大于总的后台返回的页码
         * 那就只显示，1 -- pagesTotal
         * */
              if (showPages > pagesTotal) {
                  for (let i = 1; i <= pagesTotal; i++) {
                      pagesList.push({
                          value: i,
                          text: i
                      })
                  }
              } else {
                  const sidesPageNum = Math.floor(showPages / 2) // 当前页面居中时，左右两边各有多少页码

          // 左边不足的页码数
                  let leftShortPageNum = sidesPageNum - curPageNum + 1
                  leftShortPageNum = leftShortPageNum > 0 ? leftShortPageNum : 0

          // 右边不足的页码数
                  const tmpRightMaxPageNum = curPageNum + sidesPageNum // 临时获取当前页码右边可能的最大页码
                  let rightShortPageNum = pagesTotal - tmpRightMaxPageNum
                  rightShortPageNum = rightShortPageNum < 0 ? -(rightShortPageNum) : 0
          // 获取当前页码的左边页码
                  if (!leftShortPageNum) {
            // 左边有足够的页码，并注意将右边不足的页码在左边补足
                      let leftStartPageNum = curPageNum - sidesPageNum - rightShortPageNum
                      leftStartPageNum = leftStartPageNum > 0 ? leftStartPageNum : 1
                      for (let i = leftStartPageNum; i <= curPageNum; i++) {
                          pagesList.push({
                              value: i,
                              text: i
                          })
                      }
                  } else {
                      // 左边没有足够的页码
                      for (let i = 1; i <= curPageNum; i++) {
                          pagesList.push({
                              value: i,
                              text: i
                          })
                      }
                  }

                  // 获取当前页码的右边页码
                  if (!rightShortPageNum) {
                      // 右边有足够的页码，并注意将左边不足的页码在右边补足
                      for (let i = curPageNum + 1; i <= curPageNum + leftShortPageNum + sidesPageNum; i++) {
                          pagesList.push({
                              value: i,
                              text: i
                          })
                      }
                  } else {
                      // 右边没有足够的页码
                      for (let i = curPageNum + 1; i <= pagesTotal; i++) {
                          pagesList.push({
                              value: i,
                              text: i
                          })
                      }
                  }
              }

              // 当前不为第一页，那就应该有上一页页码， 同理下一页
              if (curPageNum !== 1) {
                  pagesList.unshift({
                      value: curPageNum - 1,
                      text: '上一页'
                  })
              }
              if (curPageNum !== pagesTotal) {
                  pagesList.push({
                      value: curPageNum + 1,
                      text: '下一页'
                  })
              }
        // 如果当前页大于showPages 说明可以有左边可以有...
        // 如果当前页小于pagesTotal-showPages 说明可以有右边可以有...
              if (curPageNum > showPages) {
                  pagesList.splice(1, 0, {
                      value: curPageNum - showPages,
                      text: '...'
                  })
              }
              if (curPageNum < pagesTotal - showPages) {
                  const len = pagesList.length
                  pagesList.splice(len - 1, 0, {
                      value: curPageNum + showPages,
                      text: '...'
                  })
              }
              return pagesList
          },

      /*
       * @method { Function } fixPageInputInRange 输入页码验证，保证必须在1和页码最大值之间
       * @param { Number } inputPageNum 用户输入的页码数
       * @param { Number } pagesTotal 总的页码数
       * @return { Number }tmpInputPageNum 修正过后的用户输入页码
       * */
          fixPageInputInRange (inputPageNum, pagesTotal) {
              let tmpInputPageNum = ''
              if (inputPageNum !== '') {
                  const inputPageNumtoNumber = +inputPageNum
                  if (inputPageNumtoNumber < 1) {
                      tmpInputPageNum = 1
                  } else if (inputPageNumtoNumber > pagesTotal) {
                      tmpInputPageNum = pagesTotal
                  } else {
                      tmpInputPageNum = inputPageNumtoNumber
                  }
              }
              return tmpInputPageNum
          },

      /*
       * @method { Function } pageInputKeyDown 页码输入框keydown事件
       * */
          pageInputKeyDown (e) {
              const keyCode = e.keyCode
              if (!(keyCode >= 48 && keyCode <= 57 || keyCode >= 96 && keyCode <= 105 || keyCode === 8)) {
                  // 此处用return false/true 不得行 操蛋
                  e.preventDefault()
              }
          },

      /*
      * @method selectPage 点击选择页码 并将选择的页码数值传回给父组件
      * @param { Number } val 页码值
      * */
          selectPage (val) {
              this.curPageNum !== val && this.$emit('pageChange', val || 1)
              this.pageInputNum !== '' && (this.pageInputNum = '')
              this.pageInputDom.blur() // 输入框失去焦点
          }
      },
      mounted () {
          this.pageInputDom = this.$refs['page_toInput']
      }
  }
</script>

<template>
  <div class="page_root" v-show="rowsTotal">

    <ul class="page_pageList">

      <!-- 可供点击的页码列表 -->
      <li
          :key="index"
          v-text="item.text"
          @click="selectPage(+item.value)"
          v-for="(item, index) of getPagesList(curPageNum, showPages, pagesTotal)"
          :class="{'page_pagesItem': true, 'page_pagesItem--active': item.value == curPageNum}"
      ></li>
    </ul>

    <!-- 统计有多少页记录 -->
    <div class="page_count">共{{pagesTotal}}页</div>

    <div class="page_to">

      <!-- 输入页码 -->
      第<input
        type="text"
        ref="page_toInput"
        class="page_toInput"
        v-model="pageInputNum"
        @keydown="pageInputKeyDown"
        @keydown.enter="selectPage(pageInputNum)"
        @keyup="pageInputNum=fixPageInputInRange(pageInputNum, pagesTotal)"
    >页

      <!-- 点击页码跳转 -->
      <button
        class="page_toBtn"
        @click="selectPage(pageInputNum)"
      >跳转</button>
    </div>
  </div>
</template>

<style lang="scss">
  @import "Pagination.scss";
</style>
