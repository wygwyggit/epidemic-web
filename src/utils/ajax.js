import axios from 'axios'
import {
    apiBasePath,
    napiBasePath
} from '@/config/config'
import {
    Message
} from 'element-ui'

// 防止请求 104或415 后继续发出请求或执行响应
let isLogout = false
const myAjax = (options) => {
    return new Promise((res, rej) => {
        if (isLogout) return res()
        const url = (options.isN ? napiBasePath : apiBasePath) + options.url
        const data = options.data || {}
        axios({
            url: url,
            method: options.method || 'post',
            data,
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                ...(options.headers || {})
            },
        }).then(json => {
            const data = json.data || {};
            // 如果后端返回错误消息
            if (data.code != 10000 && !options.isPassFalse) {
                Message.closeAll();
                Message({
                    type: 'error',
                    message: data.message || '网络不稳定，请您稍后再试~'
                })
                if (data.statusCode === 104) {
                    isLogout = true
                    Message.closeAll();
                    Message({
                        type: 'error',
                        message: '系统登录状态超时，即将退出登录'
                    });
                    setTimeout(() => {
                        throw new Error('系统错误')
                    }, 3300)
                    return
                }
            }
            res(data)
        }).catch(err => {
            Message.closeAll();
            Message({
                type: 'error',
                message: '网络不稳定，请您稍后再试~'
            })
            rej(err)
        })
    })
}
export default myAjax
