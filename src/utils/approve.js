import myAjax from '@/utils/ajax.js'
import Cookie from "@/utils/cookie.js";
const approveUtils = {
    getChainInfo(belong_type) {
        return new Promise((resolve, reject) => {
            myAjax({
                url: `chain/chain_info?belong_type=${belong_type}`,
                method: 'GET',

            }).then(res => {
                const contract_addr_abi = {
                    contract_addr: res.data.contract_addr,
                    abi: res.data.abi
                }
                resolve(contract_addr_abi)
            }).catch(err => {
                reject(err)
            })
        })

    },
    getApproveAddress(type) {
        return new Promise((resolve, reject) => {
            myAjax({
                url: type === 'token' ? `chain/token_approve_addr?addr=${Cookie.getCookie('__account__')}` : 'chain/nft_approve_addr',
                method: 'GET'
            }).then(res => {
                if (type === 'token') {
                    resolve(res.data.token_approve_addr)
                } else {
                    resolve(res.data.nft_approve_addr)
                }
                
            }).catch(err => {
                reject(err)
            })
        })
    }
}

export default approveUtils