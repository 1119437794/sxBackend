/*
 * 角色模块
 * */
import ajax from '../assets/js/ajax'

export default {
    methods: {

        // 角色列表
        getRoleList (body) {
            return ajax({
                method: 'post',
                url: '/role/findPage.do',
                body
            })
        },

        // 角色添加初始化数据
        initRoleAdd () {
            return ajax({
                method: 'GET',
                url: '/role/getInitAdd.do'
            })
        },

        // 验证角色名称是否重复
        checkRoleNameIsRepeat (params) {
            return ajax({
                method: 'get',
                url: '/role/checkRoleRepeat.do',
                params: params
            })
        },

        // 新增角色
        addRole (body) {
            return ajax({
                method: 'post',
                url: '/role/saveRole.do',
                body
            })
        },

        // 编辑角色初始化数据
        initRoleEdit (id) {
            return ajax({
                method: 'GET',
                url: '/role/getInitUpdate.do',
                params: {
                    id
                }
            })
        },

        // 提交编辑用户
        editRole (body) {
            return ajax({
                method: 'post',
                url: '/role/updateRole.do',
                body
            })
        },

        // 删除角色
        delRole (id) {
            return ajax({
                method: 'get',
                url: '/role/delete.do',
                params: {
                    id
                }
            })
        },

        // 选择器 角色分配用户
        getRoleUser (id) {
            return ajax({
                method: 'GET',
                url: '/role/select.do',
                params: {
                    id
                }
            })
        },

        // 保存选择的角色用户
        saveRoleUser (id, ids) {
            return ajax({
                method: 'post',
                url: '/role/selectConfirm.do',
                body: {
                    id,
                    ids
                }
            })
        }
    }
}
