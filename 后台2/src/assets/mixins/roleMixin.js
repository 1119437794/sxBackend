/*
* 角色模块 通用方法 和 属性
* */

import validate from '../js/validate'

export default {
    data () {
        return {
            roleCode: '', // 角色代码

            roleName: '', // 角色名称
            roleNameMsg: '', // 角色名称

            roleDescription: '', // 角色描述

            roleList: [], // 角色列表
            permissionIds1: [], // 勾选的角色下的前台权限id
            permissionIds0: [], // 勾选的角色下的后台权限id

            btnIsAble: false // 按钮是否可用
        }
    },
    computed: {
        // 角色id
        roleId () {
            return this.$route.query.roleId
        }
    },
    methods: {
        // 链接到角色列表
        linkToRoleList () {
            this.$router.push('/roleList')
        },

        // 验证按钮是否可用
        checkBtnIsAble () {
            const roleNameFlag = this.roleName && !this.roleNameMsg
            const permissionFlag = this.permissionIds1.length || this.permissionIds0.length

            this.btnIsAble = roleNameFlag && permissionFlag
        },

        // 勾选的权限变化回调
        permissionIdsChange (o) {
            this.permissionIds0 = o[0]
            this.permissionIds1 = o[1]
        },

        // 初始化角色信息
        initRoleInfo () {
            this.store.initRoleEdit(this.roleId)
                .then(res => {
                    const data = res.data
                    const content = data.content || {}
                    const roleInfo = content.roleMessage || {}
                    const roleList = roleInfo.roleAccountList || []
                    const rolePermission = roleInfo.adminMidPermissionsRoles || []
                    const permission0 = []
                    const permission1 = []
                    const allPermission0 = this.getRolePermission().map(item => item.id)

                    rolePermission.map(item => {
                        const permissionId = item.adminPermissionsId
                        if (allPermission0.includes(permissionId)) {
                            permission0.push(permissionId)
                        } else {
                            permission1.push(permissionId)
                        }
                    })

                    this.roleCode = roleInfo.code
                    this.roleName = roleInfo.roleName
                    this.roleDescription = roleInfo.description
                    this.roleList = roleList.map(item => {
                        return {
                            id: 0,
                            name: item.accountDO.username
                        }
                    })
                    this.permissionIds0 = permission0
                    this.permissionIds1 = permission1
                })
        },

        // 角色页面 获取所有的后台权限id 以及 权限名称
        getRolePermission (type = 0) {
            const permission = []
            const permissionName = this.store.permissionName

            for (let i in permissionName) {
                const item = permissionName[i]

                if (item.admin) continue

                if (item.platform === type) {
                    permission.push({
                        id: +i,
                        name: item.name
                    })
                }
            }
            return permission
        }
    },
    watch: {
        // 验证角色名称
        roleName (text) {
            const flag = validate.roleName.test(text)
            if (flag) {
                this.store.checkRoleNameIsRepeat({
                    id: this.roleId,
                    roleName: text
                })
                    .then(res => {
                        this.roleNameMsg = res.data.code ? '' : '角色名称重复，请重试'
                        this.checkBtnIsAble()
                    })
            } else {
                this.roleNameMsg = '格式不正确'
                this.checkBtnIsAble()
            }
        },

        // 验证角色描述
        roleDescription (text) {
            if (text.length > 200) {
                this.roleDescription = text.substr(0, 200)
            }
        },

        permissionIds1: 'checkBtnIsAble',
        permissionIds0: 'checkBtnIsAble'
    }
}