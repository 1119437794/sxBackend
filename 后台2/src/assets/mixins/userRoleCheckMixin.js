/*
* 针对用户 以及 角色 模块 的角色以及权限模块
* */
export default {
    props: {
        // 是否只读 显隐 checkbox
        readOnly: {
            default: false
        },
        // 是否必须
        isRequired: {
            default: true
        },
        // 默认勾选的角色
        userRoleChecked: {
            default: () => []
        },
        // 角色列表
        userRole: {
            default: () => ['角色1', '角色2']
        },
        // 后台权限列表
        userAuthority0: {
            default: () => ['角色1', '角色2']
        },
        // 前台权限列表
        userAuthority1: {
            default: () => ['角色1', '角色2']
        }
    },
    data () {
        return {
            // 勾选的角色
            selectedRole: []
        }
    },
    watch: {
        // TODO 这里不太符合单向数据流
        userRoleChecked () {
            this.selectedRole = this.userRoleChecked
        },
        selectedRole () {
            this.$emit('selectedRoleChange', this.selectedRole)
        }
    }
}