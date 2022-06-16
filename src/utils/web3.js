import Web3 from 'web3'

class Web3Tool {
    constructor() {
        this.web3 = new Web3(window.ethereum)
    }
    init(callback) {
        if (typeof window.ethereum === "undefined") {
            this.$showError("there is no web3 provider.");
        } else {
            ethereum.enable().catch(function (reason) {
                if (reason === "User rejected provider access") {
                    this.$showError("you rejected provider access.");
                } else {
                    console.error("There was a problem signing you in");
                }
            }).then(function (accounts) {
                //这里返回用户钱包地址
                callback(accounts[0]);
            });
        }
    }
    contract(options = {}) {
        return new Promise((resolve, reject) => {
            let abiContract = new this.web3.eth.Contract(options.abi, options.contractAddress)
            abiContract.methods.approve(options.authAddr, options.amount).send({
                from: options.account || ''
            }, function (err, res) {
                if (err) {
                    reject(err)
                }
                resolve(res)
            })
        })
    }
    sign(options, callback) {
        return new Promise((resolve, reject) => {
            this.web3.eth.personal.sign(options.dataToSign, options.addr, options.pwd, callback).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }

}

export default new Web3Tool()