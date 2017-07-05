/*
* webStorage 本地存储 针对 localStorage sessionStorage 封装
* */
const proxy = target => {
    return new Proxy(target, {
        set: (target, key, value) => {
            return target[key] = JSON.stringify(value)
        },
        get: (target, key) => {
            try {
                return JSON.parse(target[key])
            } catch (e) {
                return null
            }
        }
    })
}

export const myLocalStorage = proxy(localStorage)
export const mySessionStorage = proxy(sessionStorage)
