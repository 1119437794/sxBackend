/*
 * 用户模块
 * */
import ajax from '../assets/js/ajax'

export default {
    methods: {
        // 用户列表 查询
        getUserList (body) {
            return ajax({
                method: 'post',
                url: '/user/findPage.do',
                body
            })
        },

        // 根据用户id删除用户
        delUserById (id) {
            return ajax({
                method: 'get',
                url: '/user/delete.do',
                params: {
                    accountId: id
                }
            })
        },

        // 用户信息浏览
        scanUserInfoById (id) {
            return ajax({
                method: 'get',
                url: '/user/getUserMessage.do',
                params: {
                    id
                }
            })
        },

        // 新增用户时 初始化接口 用户 获取角色 以及 权限
        initUserAdd () {
            return ajax({
                method: 'get',
                url: '/user/initSave.do'
            })
        },

        // 验证用户名是否重复
        checkUsernameIsRepeat (userName) {
            return ajax({
                method: 'get',
                url: '/user/checkUserRepeat.do',
                params: {
                    userName
                }
            })
        },

        // 新加用户
        addUser (body) {
            return ajax({
                method: 'post',
                url: '/user/saveUser.do',
                body
            })
        },

        // 编辑用户时 初始化接口
        initUserEdit (id) {
            return ajax({
                method: 'get',
                url: '/user/initUpdate.do',
                params: {
                    id
                }
            })
        },

        // 检查密码是否重复
        checkPasswordIsRepeat (id, password) {
            return ajax({
                method: 'get',
                url: '/user/checkPassword.do',
                params: {
                    id,
                    password
                }
            })
        },

        // 提交编辑用户
        editUser (body) {
            return ajax({
                method: 'post',
                url: '/user/updateUser.do',
                body
            })
        }
    }
}
