/*
* ajax
* */
import Vue from 'vue'
import VueHttp from 'vue-resource'
import { mySessionStorage } from './webStorage'

Vue.use(VueHttp)

Vue.http.options.emulateJSON = true
Vue.http.options.emulateHTTP = true
Vue.http.options.headers = {
    'X-Requested-With': 'XMLHttpRequest'
}

Vue.http.interceptors.push((request, next) => {

    // 请求前处理

    // 设置token
    request.headers.set('Token', mySessionStorage.accessToken)

    // 针对POST请求 序列化
    if (request.method === 'POST') {
        request.body = JSON.stringify(request.body)
    }

    // 请求后处理
    next(response => {
        const env = process.env.NODE_ENV === 'development'

        // 网络请求失败
        if (env && !response.ok) return alert(response.status)

        // 接口请求成功 但 success = false
        const data = response.data
        if (!data.success) {
            if(data.msg === 'error.access.session.invalid') {
                env && alert('session out!')
                // session 失效
                location.hash = 'login'
            } else {
                return env && alert('后台接口错误')
            }
        }

        return response
    })
})

export default option => Vue.http(option)

// export default option => {
//     return new Promise((resolve) => {
//         Vue.http(option)
//             .then(res => resolve(res.data))
//     })
//
// }