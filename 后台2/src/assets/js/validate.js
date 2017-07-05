// 本项目所有验证规则
export default {
    // 角色名称
    roleName: /^[0-9A-Za-z\u4e00-\u9fa5]{4,20}$/,

    // 真实姓名
    realName: /^.{2,15}$/,

    // 部门
    department: /^.{2,100}$/,

    // 固话
    // tel: /^(\(\d{3,4}\)|\d{3,4})+\-\d{7,14}$/,

    // 移动号码
    phone: /(^1[34578]\d{9}$)|(^(\(\d{3,4}\)|\d{3,4})+\-\d{7,14}$)/,

    // 邮箱
    email: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,

    // 密码
    // pwd: /^[0-9A-Za-z]{6,12}$/
    pwd: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/
}