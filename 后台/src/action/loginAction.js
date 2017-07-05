/*
 * 登录模块
 * */
import ajax from '../assets/js/ajax'
import { mySessionStorage } from '../assets/js/webStorage'

export default {
    methods: {
        // 登录方法
        login (username, password) {
            return ajax({
                method: 'get',
                url: '/admin/login.do',
                params: {
                    username,
                    password,
                }
            })
        },

        // 退出登录
        logout (username) {
            return ajax({
                method: 'get',
                url: '/admin/logout.do',
                params: {
                    username,
                    token: mySessionStorage.accessToken
                }
            })
        },

        // 更改电话 与 邮箱
        updatePhoneEmail (phone, email) {
            return ajax({
                method: 'get',
                url: '/admin/updateUser.do',
                params: {
                    accountId: mySessionStorage.accountId,
                    phone,
                    email
                }
            })
        },

        // 修改密码
        updatePwd (oldPassWord, passWord) {
            return ajax({
                method: 'get',
                url: '/admin/updatePassword.do',
                params: {
                    id: mySessionStorage.accountId,
                    oldPassWord,
                    passWord
                }
            })
        }
    }
}