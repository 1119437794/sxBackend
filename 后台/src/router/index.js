import Vue from 'vue'
import Router from 'vue-router'

import { mySessionStorage } from '../assets/js/webStorage'

import Login from '../container/Login/Login.vue'
import UserInfo from '../container/UserInfo/UserInfo.vue'
import UpdatePwd from '../container/UpdatePwd/UpdatePwd.vue'
import UserList from '../container/UserList/UserList.vue'
import UserInfoScan from '../container/UserInfoScan/UserInfoScan.vue'
import UserInfoEdit from '../container/UserInfoEdit/UserInfoEdit.vue'
import UserInfoAdd from '../container/UserInfoAdd/UserInfoAdd.vue'
import RoleList from '../container/RoleList/RoleList.vue'
import RoleAdd from '../container/RoleAdd/RoleAdd.vue'
import RoleEdit from '../container/RoleEdit/RoleEdit.vue'
import RoleScan from '../container/RoleScan/RoleScan.vue'
import Log from '../container/LogList/LogList.vue'

Vue.use(Router)

// 如下这些url 需要权限访问
const urlPermission = [
    {
        permissionId: 4,
        urls: [
            '/userList',
            '/userInfoAdd',
        ]
    },
    {
        permissionId: 6,
        urls: [
            '/roleList',
            '/roleAdd',
        ]
    },
    {
        permissionId: 5,
        urls: [
            '/logList'
        ]
    }
]

const router = new Router({
    routes: [

        {
            path: '/login',
            component: Login
        },
        {
            path: '/userInfo',
            component: UserInfo
        },
        {
            path: '/updatePwd',
            component: UpdatePwd
        },
        {
            path: '/userList',
            component: UserList
        },
        {
            path: '/userInfoScan',
            component: UserInfoScan
        },
        {
            path: '/userInfoEdit',
            component: UserInfoEdit
        },
        {
            path: '/userInfoAdd',
            component: UserInfoAdd
        },
        {
            path: '/roleList',
            component: RoleList
        },
        {
            path: '/roleAdd',
            component: RoleAdd
        },
        {
            path: '/roleScan',
            component: RoleScan
        },
        {
            path: '/roleEdit',
            component: RoleEdit
        },
        {
            path: '/logList',
            component: Log
        },
        {
            path: '/*',
            redirect: '/userList'
        }
    ]
})

// 注册全局导航钩子 除开进入登录以外的页面 均需token验证
router.beforeEach((to, from, next) => {

    // store.setLastUrl(from.path) 废弃

    // 针对 需要传入参数 页面 检测
    const toPath = to.path
    const fromPath = from.path
    const permissionIds = mySessionStorage.permissionIds

    if (toPath === '/login') {
        next()
    } else {
        if (mySessionStorage.accessToken) {
            let urlIsAllowed = true // 该url是否可访问

            for (let i = 0; i < urlPermission.length; i++) {
                const item = urlPermission[i]
                if (item.urls.includes(toPath)) {
                    urlIsAllowed = permissionIds.includes(item.permissionId)
                    break
                }
            }
            urlIsAllowed ? next() : next(fromPath)
        } else {
            next("/login")
        }
    }
})

export default router
