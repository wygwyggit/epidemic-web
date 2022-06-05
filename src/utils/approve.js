import myAjax from '@/utils/ajax.js'
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
    getApproveAddress() {
        return new Promise((resolve, reject) => {
            myAjax({
                url: 'chain/approve_addr',
                method: 'GET'
            }).then(res => {
                resolve(res.data.approve_addr)
            }).catch(err => {
                reject(err)
            })
        })
    }
}

export default approveUtils