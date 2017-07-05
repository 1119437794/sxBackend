/**
 * Created by Administrator on 2017/4/17 0017.
 */
import { ajax } from './utils'

const addPreZero = val => val < 10 ? '0' + val : val
const resolveFunc = (res, resolve) => {
    const content = res.content || {}
    resolve(content)
}

const myMixin = {
    data () {
        return {
            // 风险详情
            WarnRiskDetails: {
                top: 0,
                left: 0,
                show: false,
                title: '',
                details: '',
                isClickOthers: false
            },

            // 权限与页面
            permissionPage: Object.freeze({
                1: {
                    name: '金融风险监测预警平台',
                    url: '/warn',
                    icon: 'icon-BBD-jinrongfengxianjiance'
                },
                2: {
                    name: '全息信息查询平台',
                    url: '/fullinfo',
                    icon: 'icon-BBD-quanxichaxun'
                },
                3: {
                    name: '举报监测平台',
                    url: '/analysis',
                    icon: 'icon-BBD-jubaofenxi'
                }
            })
        }
    },
    methods: {
        getFormattedDate (date = new Date()) {
            const nowY = date.getFullYear()
            const nowM = addPreZero(date.getMonth() + 1)
            const nowD = addPreZero(date.getDate())
            return [nowY, nowM, nowD]
        },

        // 获取预警和警情记录条数总和
        getWarnTotalNum (companyName, callback) {
            const reqParams = {
                method: 'post',
                url: '/jq/getPage.do',
                emulateJSON: false,
                body: JSON.stringify({
                    area: '', // 发生区域
                    dateEndString: '', // 结束日期
                    dateStartString: '', // 开始日期
                    input: companyName, // 输入框
                    isOccurCase: '', // 是否发案("是","否")
                    pageNumber: 0, // 页数
                    pageSize: 100, // 页面大小
                    type: '', //举报类型
                    queryEnd: '',
                    queryStart: ''
                })
            }
            const p1 = new Promise(resolve => {
                ajax(Object.assign(reqParams, { success: res => resolveFunc(res, resolve)}))
            })
            const p2 = new Promise(resolve => {
                ajax(Object.assign(reqParams, { url: '/yj/getPage.do', success: res => resolveFunc(res, resolve)}))
            })
            Promise.all([p1, p2])
                .then((res) => callback({
                    jq: res[0],
                    yj: res[1]
                }))
        },

        // 点击显示风险详情
        showWarnRiskDetails(event, refName, title, text) {
            let warnRiskControlRootDom = this.$refs[refName];
            let warnRiskControlRootDomRect = warnRiskControlRootDom.getBoundingClientRect();
            const top = event.clientY - warnRiskControlRootDomRect.top - event.offsetY
            const left = event.clientX - warnRiskControlRootDomRect.left - event.offsetX
            this.WarnRiskDetails.isClickOthers = false
            this.WarnRiskDetails.title = title;
            this.WarnRiskDetails.details = text;
            this.WarnRiskDetails.show = true
            this.WarnRiskDetails.top = top
            this.WarnRiskDetails.left = left
        },

        // 点击关闭风险详情弹框
        closeWarnRiskDetails () {
            if (this.WarnRiskDetails.isClickOthers) {
                this.WarnRiskDetails.isClickOthers = false
                this.WarnRiskDetails.show = false
            } else {
                this.WarnRiskDetails.isClickOthers = true
            }
        },

        // 获取所有权限id 废弃
        getAllPermissionIds () {
            return Object.keys(this.permissionPage)
        },

        // 有没得相应权限
        isHasPermission (permissionIds) {
            const userPermissionIds = JSON.parse(sessionStorage.permissionIds)
            return permissionIds.some(item => userPermissionIds.includes(item))
        },

        // 根据权限 获取导航
        getNavByPermission () {
            const navArr = []
            const permissionIds = JSON.parse(sessionStorage.permissionIds)
            permissionIds.map(item => {
                const tmp = this.permissionPage[item]
                tmp && navArr.push(tmp)
            })
            return navArr
        }
    }
}

export default myMixin