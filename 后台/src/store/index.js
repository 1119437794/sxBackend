/**
 * 事件总线机制
 */
import Vue from 'vue'
import actionMixin from '../action'
import modalMixin from '../assets/mixins/modalMixin'

export default new Vue({
    mixins: [modalMixin, actionMixin],
    data () {
        return {
            // 行政区
            allArea: ['姑苏','虎丘','吴中','相城','吴江','常熟','张家港','昆山','太仓', '工业园'],

            // 角色权限对应名称
            permissionName: {
                1: { name: '金融风险监测预警平台', platform: 1 },
                2: { name: '全息信息查询平台', platform: 1 },
                3: { name: '举报监测平台', platform: 1 },
                4: { name: '用户管理', platform: 0 },
                5: { name: '日志管理', platform: 0 },
                6: { name: '角色及权限管理', platform: 0, admin: true } // 该权限只有admin用户才有
            }
    }
    },
    methods: {
        // 获取所有的后台权限id
        getPermissionId (type = 0) {
            const permissionId = []
            const permissionName = this.permissionName

            for (let i in permissionName) {
                if (permissionName[i].platform === type) {
                    permissionId.push(+i)
                }
            }
            return permissionId
        },

        // 获取传入的角色 下的所有权限
        getPermissionByRole (role) {
            const scanAuthority = []
            const adminAuthority = []

            role.adminMidPermissionsRoles.map(item => {
                const permissionsId = item.adminPermissionsId
                const permissionName = this.permissionName[permissionsId].name
                if (this.getPermissionId().includes(permissionsId)) {
                    adminAuthority.push(permissionName)
                } else {
                    scanAuthority.push(permissionName)
                }
            })

            return {
                0: adminAuthority,
                1: scanAuthority
            }
        },

        // 格式化日期
        getFormedDate (dateTime) {
            return dateTime.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1-$2-$3<br>$4:$5:$6')
        },

        getFormedDate2 (dateTime) {
            return dateTime.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1-$2-$3')
        }
    }
})

