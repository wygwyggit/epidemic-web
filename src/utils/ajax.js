import store from '@/store/index'
import axios from 'axios'
import Cookie from "@/utils/cookie.js";
import {
    apiBasePath,
} from '@/config/config'
import {
    Message
} from 'element-ui'
let isOffLine = false
const myAjax = (options) => {
    return new Promise((res, rej) => {
        if (isOffLine) return res()
        let url = apiBasePath + options.url
        const data = Object.assign((!options.notHeaderParams ? {
            header: {
                'token': Cookie.getCookie('ad_token') || '',
                'addr': Cookie.getCookie("__account__") || '',
            }
        } : {}), options.data || {})
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
                    message: data.reason || '服务器开小差啦~'
                })
            }
            res(data)
        }).catch(err => {
            isOffLine = true
            const response = err.response
            switch (response.status) {
                case 500:
                    Message.closeAll();
                    Message({
                        type: 'error',
                        message: '服务器开小差啦~'
                    })
                    break;
                case 403:
                    store.dispatch('showOffLineDialog')
                    break;
                default:
                    break;
            }
            rej(err)
        })
    })
}
export default myAjax