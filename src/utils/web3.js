
class Web3Tool {
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
            let web3 = new this.Web3(window.web3.currentProvider),
                abiContract = new web3.eth.Contract(options.abi, options.contractAddress)
            abiContract.methods.approve(options.authAddr, options.amount).send({
                from: options.account
            }, function (err, res) {
                if (err) {
                    reject(err)
                }
                resolve(res)
            })
        })
    }
}

export default new Web3Tool()
