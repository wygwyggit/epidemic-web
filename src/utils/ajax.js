import axios from 'axios'
import Cookie from "@/utils/cookie.js";
import {
    apiBasePath,
    napiBasePath,
    capiBasePath
} from '@/config/config'
import {
    Message
} from 'element-ui'

// 防止请求 104或415 后继续发出请求或执行响应
let isLogout = false
const myAjax = (options) => {
    return new Promise((res, rej) => {
        if (isLogout) return res()
        let url = apiBasePath + options.url
        const data = Object.assign((!options.notHeaderParams ? {
            header: {
                'token': Cookie.getCookie('ad_token') || '',
                'addr': Cookie.getCookie("__account__") || '',
            }
        }: {}), options.data || {})
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
            if (!data.ok && !options.isPassFalse) {
                Message.closeAll();
                Message({
                    type: 'error',
                    message: data.reason || '网络不稳定，请您稍后再试~'
                })
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
