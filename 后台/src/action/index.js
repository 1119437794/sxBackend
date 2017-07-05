// 数据请求
import loginAction from './loginAction'
import userAction from './userAction'
import roleAction from './roleAction'
import logAction from './logAction'

export default {
    mixins: [
        loginAction,
        userAction,
        roleAction,
        logAction
    ]
}
