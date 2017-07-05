// 用户模块 通用属性 以及 方法
import getPwdByRandom from '../js/getPwdByRandom'
import validate from '../js/validate'

export default {
    props: ['store'],
    data () {
        return {
            initData: {}, // 初始化数据

            username: '',

            realName: '',
            realNameMsg: '',

            department: '',
            departmentMsg: '',

            area: '',
            areaList: Object.freeze(this.store.allArea),

            phone: '',
            phoneMsg: '',

            email: '',
            emailMsg: '',

            roleIds: [], // 点击勾选的角色
            userRole: [], // 用户所有角色
            userAuthority0: [], // 后台管理权限
            userAuthority1: [], // 前台浏览权限

            password: '',
            passwordMsg: '',

            btnIsAble: false
        }
    },
    methods: {
        blurRealName (text) {
            this.realNameMsg = validate.realName.test(text) ? '' : '格式错误'
            this.checkBtnIsAble()
        },

        blurDepartment (text) {
            this.departmentMsg = validate.department.test(text) ? '' : '格式错误'
            this.checkBtnIsAble()
        },

        areaSelect (index) {
            this.area = this.areaList[index]
        },

        blurPhone (text) {
            if (text) {
                this.phoneMsg = validate.phone.test(text) ? '' : '格式错误'
            } else {
                this.phoneMsg = ''
            }
            this.checkBtnIsAble()
        },

        blurEmail (text) {
            if (text) {
                this.emailMsg = validate.email.test(text) ? '' : '格式错误'
            } else {
                this.emailMsg = ''
            }
            this.checkBtnIsAble()
        },

        selectedRoleChange (roleIds) {
            const scanAuthority = []
            const adminAuthority = []

            this.initData.map(item => {
                if(roleIds.includes(item.id)) {
                    const tmp = this.store.getPermissionByRole(item);
                    [].push.apply(scanAuthority, tmp[1]);
                    [].push.apply(adminAuthority, tmp[0]);
                }
            })

            this.roleIds = roleIds
            // 针对角色下的权限去重
            this.userAuthority0 = [...new Set(adminAuthority)]
            this.userAuthority1 = [...new Set(scanAuthority)]
            this.checkBtnIsAble()
        },

        // 点击设置随机密码
        getPwdByRandom () {
            this.password = getPwdByRandom(6, 12)
            this.passwordMsg = ''
            this.checkBtnIsAble()
        },

        // 链接到用户列表
        linkToUserList () {
            this.$router.push('/userList')
        }
    },
    watch: {
        realName: 'blurRealName',
        department: 'blurDepartment',
        phone: 'blurPhone',
        email: 'blurEmail',
        password: 'blurPassword'
    }
}
