<template>
    <div :class="prefixCls" v-loading.fullscreen.lock="isLoading">
        <div class="content">
            <img src="./no-wallet.png" alt="">
            <p>{{ $t("common.connect-you") }}</p>
            <div class="btn" @click="connectWalletMetaMask">{{ $t("common.connect") }}</div>
        </div>
    </div>
</template>

<script>
    import myAjax from "@/utils/ajax.js";
    import web3Tool from '@/utils/web3'
    import Cookie from "@/utils/cookie.js";
    import {
        mapMutations
    } from 'vuex'
    export default {
        name: 'components-no-connect-wallet',
        components: {},
        props: {},
        data() {
            return {
                prefixCls: 'components-no-connect-wallet',
                isLoading: false
            }
        },
        computed: {},
        watch: {},
        created() {},
        mounted() {},
        beforeDestroy() {},
        methods: {
            connectWalletMetaMask(flag) {
                web3Tool.init.call(this, async account => {
                    this.account = account
                    Cookie.setCookie("__account__", this.account);
                    this.SET_WALLETADDR(account)
                    await this.regUser()
                    const data = await this.getNonce()
                    web3Tool.sign({
                        dataToSign: `You are signing a onetime nonce: ${data.nonce}`,
                        addr: this.account || '',
                        pwd: ''
                    }).then(signature => {
                        this.getToken(signature)
                    })
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
                this.isLoading = true
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
                        this.isLoading = false
                        this.$emit('connectOk', token)
                        // token && (Cookie.setCookie('ad_token', token))
                    }
                    //this.$router.push({ path: '/' })
                })
            },
            regUser() {
                return new Promise((resolve, reject) => {
                    myAjax({
                        url: "user/sign",
                        data: {
                            body: {
                                addr: this.account,
                                inviter: Cookie.getCookie("__rewardRef__"),
                            }
                        },
                    }).then(res => {
                        resolve()
                    }).catch(err => {
                        reject(err)
                    })
                })
            },
            ...mapMutations([
                "SET_WALLETADDR"
            ])
        },
    }
</script>

<style lang="scss" scoped>
    $prefixCls: 'components-no-connect-wallet';

    .#{$prefixCls} {
        .content {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: .506666666666667rem 0 .266666666666667rem;
            width: 3.466666666666667rem;
            height: 3.733333333333333rem;
            margin: .853333333333333rem auto;
            border: 2px solid #223146;
            border-radius: .266666666666667rem;

            img {
                width: .933333333333333rem;
            }

            p {
                margin-top: .16rem;
                color: #777E90;
                font-size: .24rem;
            }

            .btn {
                margin-top: .7rem;
                width: 2.933333333333333rem;
                height: .666666666666667rem;
                line-height: .666666666666667rem;
                text-align: center;
                font-size: .213333333333333rem;
                border: 1px solid #32A3FF;
                color: #32A3FF;
                border-radius: .133333333333333rem;
                cursor: pointer;
            }
        }
    }

    @media (max-width: 768px) {
        .#{$prefixCls} {
            .content {
                padding: 0;
                border: 0;
            }
        }
    }
</style>