// 日志模块
import ajax from '../assets/js/ajax'
export default {
    methods: {
        // 获取操作类型 废弃
        getTypeList () {
            return ajax({
                method: 'get',
                url: '/log/getType.do'
            })
        },

        // 获取日志列表
        getLogList (body) {
            return ajax({
                method: 'post',
                url: '/log/findPage.do',
                body
            })
        }
    }
}
