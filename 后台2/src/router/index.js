import Vue from 'vue'
import Router from 'vue-router'

import Framework from '../components/Framework/Framework.vue'
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

import { mySessionStorage } from '../assets/js/webStorage'

// 使用路由插件
Vue.use(Router)

// 注入store
function injectStore(target) {
    target.props = ['store']
    return target
}

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

// 路由表
const router = new Router({
    routes: [
        {
            path: '/login',
            component: injectStore(Login)
        },
        {
            path: '/',
            component: injectStore(Framework),
            children: [
                {
                    path: '/userInfo',
                    component: injectStore(UserInfo)
                },
                {
                    path: '/updatePwd',
                    component: injectStore(UpdatePwd)
                },
                {
                    path: '/userList',
                    component: injectStore(UserList)
                },
                {
                    path: '/userInfoScan',
                    component: injectStore(UserInfoScan)
                },
                {
                    path: '/userInfoEdit',
                    component: injectStore(UserInfoEdit)
                },
                {
                    path: '/userInfoAdd',
                    component: injectStore(UserInfoAdd)
                },
                {
                    path: '/roleList',
                    component: injectStore(RoleList)
                },
                {
                    path: '/roleAdd',
                    component: injectStore(RoleAdd)
                },
                {
                    path: '/roleScan',
                    component: injectStore(RoleScan)
                },
                {
                    path: '/roleEdit',
                    component: injectStore(RoleEdit)
                },
                {
                    path: '/logList',
                    component: injectStore(Log)
                },
                {
                    path: '/*',
                    redirect: '/userList'
                }
            ]
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
