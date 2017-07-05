<script>
     /*
    * @component 组件
    * @author yxc
    * */
     import DetailsLitigationsTab from '../DetailsLitigations/DetailsLitigationsTab/DetailsLitigationsTab.vue'
     import { ajax } from '../../../../assets/js/utils'

     export default {
        props: ['companyName'],
        data () {
            return {
                renderData: [],

                titleTabs: [],
                curTitleTab: 0,

                subTabs: [],
                curSubTab: 0,

                listTitle: [],
                listData: [],

                notice: '',
                // 每个选项卡的数值
                litigationTabNum: []
             }
        },
        computed: {
             subTabWidth () {
                 const tabLen = this.subTabs.length
                 return `calc((100% - ${tabLen}px) / ${tabLen})`
             },
             notice () {
                 const curTitleTab = this.curTitleTab
                 const curSubTab = this.curSubTab
                 switch (true) {
                     case curTitleTab === 0 && curSubTab === 0 :
                     case curTitleTab === 0 && curSubTab === 1 :
                     case curTitleTab === 1 && curSubTab === 1 :
                     case curTitleTab === 2 && curSubTab === 0 :
                     case curTitleTab === 2 && curSubTab === 1 :
                         return '注：本表数据需要企业授权'
                     case curTitleTab === 0 && curSubTab === 2 :
                         return '注：公积金覆盖苏州大市（园区企业需授权）；社保方面，吴江、太仓全覆盖，姑苏、园区、新区、吴中、相城5区需授权，张家港、昆山、常熟暂未接通'
                     case curTitleTab === 1 && curSubTab === 0 :
                         return '贷款五级分类：正常、关注、次级、可疑、损失'
                     case curTitleTab === 5 && curSubTab === 0 :
                         return '注：欠缴/逾期类型主要包括国地税、社保、公积金<br>&emsp;&emsp;本表数据需要企业授权'
                     case curTitleTab === 5 && curSubTab === 1 :
                         return '注：处罚信息主要包括税务、环保、安监等部门'
                 }
             },
             // 过滤掉选项卡上的数字
             fixedSubTabs () {
                 const tmpSubTabs = []
                 const tmpSubTabsNum = []
                 this.subTabs.map(item => {
                     const tmpArr = item.split('(')
                     tmpSubTabs.push(tmpArr[0])
                     tmpSubTabsNum.push(tmpArr[1].slice(0, -1))
                 })
                 this.litigationTabNum = tmpSubTabsNum
                 return tmpSubTabs
             }
         },
        methods: {
            // 获取渲染数据
            getListData () {
                ajax({
                    method: 'get',
                    url: '/basedata/getOtherData.do',
                    params: {
                        companyName: this.companyName
                    },
                    success: res => {
                        const titleTabs = []
                        const subTabs = []
                        this.renderData = res.content || []
                        this.renderData.map((item, index) => {
                            for(let key in item) {
                                titleTabs.push(key)
                                if (index === 0) {
                                    this.curTitleTab = 0
                                    let subItem = item[key] || []
                                    subItem.map((item2, index) => {
                                        for (let key2 in item2) {
                                            subTabs.push(key2)
                                            if (index === 0) {
                                                let listData = item2[key2]
                                                this.listTitle = listData[0]
                                                this.listData = listData.slice(1)
                                            }
                                        }
                                    })
                                }
                            }
                        })
                        this.titleTabs = titleTabs
                        this.subTabs = subTabs
                    }
                })
            },
            // 顶部tab切换
            titleTabChange (index) {
                const subTabs = []
                const tmpData = this.renderData[index]
                this.curTitleTab = index
                this.curSubTab = 0
                for(let key in tmpData) {
                    let tmpData2 = tmpData[key]
                    tmpData2.map((item, index) => {
                        if (Array.isArray(item)) {
                            this.listTitle = tmpData2[0]
                            this.listData = tmpData2.slice(1)
                        } else {
                            for(let key2 in item) {
                                subTabs.push(key2)
                                if (index === this.curSubTab) {
                                    let listData = item[key2]
                                    if (this.curTitleTab !== 2) {
                                        this.listTitle = listData[0]
                                        this.listData = listData.slice(1)
                                    } else {
                                        this.listData = listData
                                    }
                                }
                            }
                        }
                    })
                }
                this.subTabs = subTabs
            },
            // 子tab切换
            subTabChange (tabIndex) {
                const tmpData = this.renderData[this.curTitleTab]
                for(let key in tmpData) {
                    let tmpData2 = tmpData[key]
                    tmpData2.map((item, index) => {
                        if (index === tabIndex) {
                            for(let key2 in item) {
                                let listData = item[key2]
                                if (this.curTitleTab !== 2) {
                                    this.listTitle = listData[0]
                                    this.listData = listData.slice(1)
                                } else {
                                    this.listData = listData
                                }
                            }
                        }
                    })
                }
                this.curSubTab = tabIndex
            },
            // 设置列表项宽度
            listItemW (arr) {
                return {
                    width: 1 / arr.length * 100 + '%'
                }
            },
            // 处理显示值
            setDefaultVal (item, val, index) {
               let tmpVal = val
               if (val === '' || val === null) {
                   tmpVal = '—'
               } else if (val === 'merge') {
                   tmpVal = ''
                   item[index + 1] = `&emsp;${item[index + 1]}`
               }
               return tmpVal
            },
            // 针对抵押与查封信息处理
            getDataToArr (arr) {
                const tmpArr = []
                for(let i = 0;i < arr.length; i+=4) {
                    tmpArr.push(arr.slice(i, i + 4))
                }
                return tmpArr
            }
        },
        mounted () {
            this.getListData()
        },
        components: {
            DetailsLitigationsTab
        }
    }
</script>

<template>
    <div class="detailsOthers__root">
        <ul class="detailsOthers__titleTab">
            <li
                    :class="{
                        'detailsOthers__titleItem': true,
                        'detailsOthers__titleItem--active': index === curTitleTab
                    }"
                    v-for="(item, index) of titleTabs"
                    v-text="item"
                    @click="titleTabChange(index)"
            ></li>
        </ul>
        <div class="detailsOthers__subTab" v-show="subTabs.length">
            <DetailsLitigationsTab
                    :tabs="fixedSubTabs"
                    :tabIndex="curSubTab"
                    :itemWidth="subTabWidth"
                    :litigationTabNum="litigationTabNum"
                    @tabChange="subTabChange"
            ></DetailsLitigationsTab>
        </div>
        <div class="detailsOthers__list">
            <template v-if="curTitleTab !== 2">
                <ul class="detailsOthers__listTitle">
                    <li
                            v-text="item"
                            v-for="item of listTitle"
                            :style="listItemW(listTitle)"
                    ></li>
                </ul>
                <ul class="detailsOthers__listWrap">
                    <li
                            class="detailsOthers__item"
                            v-for="item of listData"
                    >
                        <span
                                v-html="setDefaultVal(item, item2, index)"
                                v-for="(item2, index) of item"
                                :style="listItemW(item)"
                        ></span>
                    </li>
                </ul>
            </template>
            <template v-else>
                <div
                        class="detailsOthers__wrap"
                        v-for="item of getDataToArr(listData)"
                >
                    <ul class="detailsOthers__listTitle">
                        <li
                                v-text="item2"
                                v-for="item2 of item[0]"
                                :style="listItemW(item[0])"
                        ></li>
                    </ul>
                    <ul class="detailsOthers__listWrap">
                        <li class="detailsOthers__item">
                            <span
                                v-html="setDefaultVal(item, item2, index)"
                                v-for="(item2, index) of item[1]"
                                :style="listItemW(item[1])"
                        ></span>
                        </li>
                    </ul>
                    <ul class="detailsOthers__listTitle">
                        <li
                                v-text="item2"
                                v-for="item2 of item[2]"
                                :style="listItemW(item[2])"
                        ></li>
                    </ul>
                    <ul class="detailsOthers__listWrap">
                        <li class="detailsOthers__item">
                            <span
                                v-html="setDefaultVal(item, item2, index)"
                                v-for="(item2, index) of item[3]"
                                :style="listItemW(item[3])"
                            ></span>
                        </li>
                    </ul>
                </div>
            </template>
            <p class="detailsOthers__notice" v-html="notice"></p>
        </div>
    </div>
</template>

<style lang="scss">
    @import "DetailsOthers.scss";
</style>