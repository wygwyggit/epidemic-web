import web3Tool from '@/utils/web3'
import Cookie from "@/utils/cookie.js";
import myAjax from "@/utils/ajax.js";
export default {
    created() {
        this.account = Cookie.getCookie("__account__") || ''
    },
    methods: {
        async sign() {
            const data = await this.getNonce()
            web3Tool.sign({
                dataToSign: `You are signing a onetime nonce: ${data.nonce}`,
                addr: this.account,
                pwd: ''
            }).then(signature => {
                this.isLoading = true
                Cookie.delCookie("ad_token")
                this.getToken(signature)
            })
        },
        getNonce() {
            return new Promise((resolve, reject) => { 
                myAjax({
                    url: `auth/nonce?addr=${this.account}`,
                    method: 'GET'
                }).then(res => {
                    if (res.ok && res.data) {
                        resolve(res.data)
                    } else {
                        reject('error')
                    }
                }).catch(err => {
                    reject(err)
                })
            })

        },
        getToken(signature) {
            myAjax({
                url: 'auth/auth',
                notHeaderParams: true,
                data: {
                    body: {
                        addr: this.account,
                        signature
                    }
                }
            }).then(res => {
                if (res.ok) {
                    const token = (res.data || {}).token
                    token && (Cookie.setCookie('ad_token', token))
                    location.reload()
                }
            }).finally(res => {
                this.isLoading = false
            })
        }
    }
}