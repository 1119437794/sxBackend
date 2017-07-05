// 弹框操作
export default {
    data () {
        return {
            modalType: 0,
            modalShow: false,
            modalText: '', // 弹框提示内容
            modalRoleUser: {}, // 弹框 角色用户
        }
    },
    methods: {
        // 显示弹框
        showModal (type, text) {
            this.modalShow = true
            this.modalType = type
            this.modalText = text
        },

        // 显示弹框 然后自动关闭
        showModalAutoClose (type, text) {
            this.showModal(type, text)
            const timer = setTimeout(() => {
                this.closeModal()
                clearTimeout(timer)
                this.$emit('closeModalOk') // 3s执行完毕 通知监听对象
            }, 3000)
        },

        // 隐藏弹框
        closeModal () {
            this.modalShow = false
        },

        // 赋值角色用户
        setModalRoleUser (roleUser) {
            this.modalRoleUser = roleUser
        },

        // 增减用户角色
        actModalRoleUser (o) {
            const { id, type } = o
            let { distributed, unDistributed } = this.modalRoleUser
            let actedRoleUserInfo = null
            if (type === 1) {
                unDistributed = unDistributed.filter(item => {
                    if (id === item.id) actedRoleUserInfo = item
                    return id !== item.id
                })
                distributed.unshift(actedRoleUserInfo)
            } else {
                distributed = distributed.filter(item => {
                    if (id === item.id) actedRoleUserInfo = item
                    return id !== item.id
                })
                unDistributed.unshift(actedRoleUserInfo)
            }
            this.setModalRoleUser({
                distributed,
                unDistributed
            })
        }
    }
}