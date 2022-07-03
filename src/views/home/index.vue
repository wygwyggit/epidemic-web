<template>
    <div :class="prefixCls">
        <div class="w one-floor">
            <div class="left">
                <div class="amazing-doge-txt">
                    <div class="tit">
                        {{ $t("home.amazing-doge") }}
                    </div>
                    <div class="sub-tit">
                        {{ $t("home.amazing-tip") }}
                    </div>
                </div>
                <div class="white-paper">
                    <a href="https://github.com/AmazingDogebsc/WhitePaper/blob/main/ADOGE%20NFT_EN.pdf"
                        target="_blank">{{ $t("home.white-paper") }}
                        <img src="../../assets/images/arrow-right.png" alt="">
                    </a>
                </div>
                <div class="adog-amazing">
                    <div class="adog item">
                        <div class="img">
                            <img src="../../assets/images/adoge-token.png" alt="">
                        </div>
                        <div class="right-info">
                            <p class="name">Adoge
                                <!-- <span class="add-num">
                                    + 20%
                                </span> -->
                            </p>
                            <p class="value">$
                                <span>{{ priceData.adoge_token }}</span> </p>
                        </div>
                    </div>
                    <div class="line"></div>
                    <div class="amazing-team item">
                        <div class="img">
                            <img src="../../assets/images/amazing-team-token.png" alt="">
                        </div>
                        <div class="right-info">
                            <p class="name">AmazingTeam
                                <!-- <span class="add-num">
                                    + 20%
                                </span> -->
                            </p>
                            <p class="value">$
                                <span>{{ priceData.amazing_token }}</span> </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right">
            </div>

        </div>
        <div class="second-floor">
            <div class="w">
                <div class="tit-txt">
                    <p>{{ $t("home.everything-is-public") }}</p>
                    <p>{{ $t("home.here-we-are") }}</p>
                </div>
                <ul class="equal-safe-list">
                    <li class="list-item">
                        <a href="https://www.certik.com/projects/amazing-doge" target="_blank">
                            <div class="img-wrap">
                                <img src="../../assets/images/home/second-floor-img1.png" alt="">
                            </div>
                            <p class="intro">{{ $t("home.one-of-the-most") }}</p>
                        </a>
                    </li>
                    <li class="list-item">
                        <a href="https://github.com/AmazingDogebsc/WhitePaper/blob/main/Legal%20Opinion%20ADOGE%20Token.pdf"
                            target="_blank">
                            <div class="img-wrap">
                                <img src="../../assets/images/home/second-floor-img2.png" alt="">
                            </div>
                            <p class="intro">{{ $t("home.providing-legal") }}</p>
                        </a>
                    </li>
                    <li class="list-item">
                        <a href="https://github.com/AmazingDogebsc/WhitePaper/blob/main/ADOGE%20MSB.pdf"
                            target="_blank">
                            <div class="img-wrap">
                                <img src="../../assets/images/home/second-floor-img3.png" alt="">
                            </div>
                            <p class="intro">{{ $t("home.has-obtained") }}</p>
                        </a>
                    </li>
                    <li class="list-item">
                        <a href="https://github.com/solidproof/projects/blob/main/AmazingDoge/SmartContract_Audit_Solidproof_AmazingDoge.pdf"
                            target="_blank">
                            <div class="img-wrap">
                                <img src="../../assets/images/home/second-floor-img4.png" alt="">
                            </div>
                            <p class="intro">{{ $t("home.professional-blockchain") }}</p>
                        </a>
                    </li>
                    <li class="list-item">
                        <a href="https://app.unicrypt.network/amm/pancake-v2/ilo/0x87521e7799DeFC1654dF5c726354b13363276f48"
                            target="_blank">
                            <div class="img-wrap">
                                <img src="../../assets/images/home/second-floor-img5.png" alt="">
                            </div>
                            <p class="intro">{{ $t("home.public-offering") }}</p>
                        </a>
                    </li>
                    <li class="list-item">
                        <a href="https://coinmarketcap.com/zh/currencies/amazingdoge/" target="_blank">
                            <div class="img-wrap">
                                <img src="../../assets/images/home/second-floor-img6.png" alt="">
                            </div>
                            <p class="intro">{{ $t("home.most-valuable") }}</p>
                        </a>
                    </li>
                    <li class="list-item">
                        <a href="https://www.coingecko.com/en/coins/amazingdoge" target="_blank">
                            <div class="img-wrap">
                                <img src="../../assets/images/home/second-floor-img7.png" alt="">
                            </div>
                            <p class="intro">{{ $t("home.largest-cryptocurrency") }}</p>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="w third-floor">
            <div class="tit-txt">
                <p>{{ $t("home.we-designed") }}</p>
                <p>{{ $t("home.strive-to-be") }}</p>
            </div>
            <div class="img-list">
                <div class="left">
                    <img src="https://nftimgs.adogenft.com/im6.png" alt="">
                    <img src="https://nftimgs.adogenft.com/im3.png" alt="">
                    <img src="https://nftimgs.adogenft.com/im4.png" alt="">
                    <img src="https://nftimgs.adogenft.com/im2.png" alt="">
                </div>
                <div class="center">
                    <img src="https://nftimgs.adogenft.com/VIP7-CZ.png" alt="">
                </div>
                <div class="right">
                    <img src="https://nftimgs.adogenft.com/blue_elonmusk.jpg" alt="">
                    <img src="https://nftimgs.adogenft.com/im1.png" alt="">
                    <img src="https://nftimgs.adogenft.com/im5.png" alt="">
                    <img src="https://nftimgs.adogenft.com/blue-stevejobs.jpg" alt="">
                </div>
            </div>
            <router-link :to="{path: 'marketplace'}">
                <div class="go-marketplace">
                    {{ $t("home.nfts-marketplace")}}
                    <img src="../../assets/images/arrow-right.png" alt="">
                </div>
            </router-link>
        </div>
        <div class="w fourth-floor">
            <div class="tit-txt">
                <p>{{ $t("home.influencers-and") }}</p>
                <p>{{ $t("home.your-support") }}</p>
            </div>
            <ul class="support-list">
                <li class="list-item">
                    <a href="https://www.canadavoices.com/abc-voto-news-elon-musk-mentions-meme-token-in-abc-voto-news-interview/" target="_blank">
                        <div class="img-wrap">
                            <img src="../../assets/images/home/third-floor-img2.png" alt="">
                        </div>
                        <p class="intro">Elon Musk</p>
                    </a>

                </li>
                <li class="list-item">
                    <a href="https://twitter.com/amazingdogecoin/status/1516857489412685824" target="_blank">
                        <div class="img-wrap">
                            <img src="../../assets/images/home/third-floor-img3.png" alt="">
                        </div>
                        <p class="intro">Amber Rose</p>
                    </a>

                </li>
                <li class="list-item">
                    <a href="https://twitter.com/katemillercz/status/1507709406171078659?s=21&t=_HjweO4mUL9TV8JL8A6Y_w"
                        target="_blank">
                        <div class="img-wrap">
                            <img src="../../assets/images/home/third-floor-img4.png" alt="">
                        </div>
                        <p class="intro">Kate Miller</p>
                    </a>

                </li>
                <li class="list-item">
                    <a href="https://twitter.com/tulioorocha_/status/1507704369109688326?s=21&t=_HjweO4mUL9TV8JL8A6Y_w"
                        target="_blank">
                        <div class="img-wrap">
                            <img src="../../assets/images/home/third-floor-img5.png" alt="">
                        </div>
                        <p class="intro">Túlio</p>
                    </a>

                </li>
                <li class="list-item">
                    <a href="https://twitter.com/clarissayorke/status/1507702006894444554?s=21&t=_HjweO4mUL9TV8JL8A6Y_w"
                        target="_blank">
                        <div class="img-wrap">
                            <img src="../../assets/images/home/third-floor-img6.png" alt="">
                        </div>
                        <p class="intro">Clarissa Yorke</p>
                    </a>

                </li>
                <li class="list-item">
                    <a href="https://twitter.com/cryptofied1/status/1507701460401803273?s=21&t=_HjweO4mUL9TV8JL8A6Y_w"
                        target="_blank">
                        <div class="img-wrap">
                            <img src="../../assets/images/home/third-floor-img7.png" alt="">
                        </div>
                        <p class="intro">₵RYPTOFIED</p>
                    </a>

                </li>
                <li class="list-item">
                    <a href="https://twitter.com/bricepromos/status/1507678285039288322?s=21&t=_HjweO4mUL9TV8JL8A6Y_w"
                        target="_blank">
                        <div class="img-wrap">
                            <img src="../../assets/images/home/third-floor-img8.png" alt="">
                        </div>
                        <p class="intro">CryptoBrice</p>
                    </a>

                </li>
                <li class="list-item">
                    <a href="https://twitter.com/psyjaycrypto/status/1507672414980751360?s=21&t=_HjweO4mUL9TV8JL8A6Y_w"
                        target="_blank">
                        <div class="img-wrap">
                            <img src="../../assets/images/home/third-floor-img9.png" alt="">
                        </div>
                        <p class="intro">Jay Crypto</p>
                    </a>

                </li>
            </ul>
        </div>
        <div class="w fifth-floor">
            <div class="tit-txt">
                <p>{{ $t("home.development-route") }}</p>
            </div>
            <div class="stage-list">
                <img :src="stageImg" alt="">
            </div>
            <div class="tip-btn">
                {{ $t("home.we-will-continue")}}
            </div>
        </div>
        <div class="w sixth-floor">
            <div class="tit-txt">
                <p>{{ $t("home.ecological-cooperation") }}</p>
            </div>
            <div class="cooperation-media-item">
                <div class="item-title">
                    {{ $t("home.media-cooperation") }}
                </div>
                <div class="item-content">
                    <a href="https://www.bloomberg.com/press-releases/2022-04-05/affordable-nft-blind-box-on-binance-chain-is-born"
                        target="_blank">
                        <img src="../../assets/images/home/sixth-floor-img1.png" alt="">
                    </a>
                    <a href="https://www.nasdaq.com/press-release/affordable-nft-blind-box-on-binance-chain-is-born-2022-04-05"
                        target="_blank">
                        <img src="../../assets/images/home/sixth-floor-img2.png" alt="">
                    </a>
                    <a href="https://apnews.com/press-release/kisspr/91a00617f597fa8f159f8211982e976f" target="_blank">
                        <img src="../../assets/images/home/sixth-floor-img3.png" alt="">
                    </a>
                    <a href="https://www.marketwatch.com/press-release/affordable-nft-blind-box-on-binance-chain-is-born-2022-04-05?mod=mw_quote_news_seemore"
                        target="_blank">
                        <img src="../../assets/images/home/sixth-floor-img4.png" alt="">
                    </a>
                    <a href="https://finance.yahoo.com/news/affordable-nft-blind-box-binance-150900383.html"
                        target="_blank">
                        <img src="../../assets/images/home/sixth-floor-img5.png" alt="">
                    </a>
                    <a href="https://www.yahoo.com/news/affordable-nft-blind-box-binance-150900383.html"
                        target="_blank">
                        <img src="../../assets/images/home/sixth-floor-img6.png" alt="">
                    </a>
                </div>
            </div>
            <div class="cooperation-media-item">
                <div class="item-title">
                    {{ $t("home.trends-and") }}
                </div>
                <div class="item-content">
                    <a href="https://coinmarketcap.com/zh/currencies/amazingdoge/" target="_blank">
                        <img src="../../assets/images/home/second-floor-img6.png" alt="">
                    </a>
                    <a href="https://www.coingecko.com/en/coins/amazingdoge" target="_blank">
                        <img src="../../assets/images/home/second-floor-img7.png" alt="">
                    </a>
                    <a href="https://ave.ai/token/0x0ebc30459551858e81306d583025d12c7d795fa2-bsc" target="_blank">
                        <img src="../../assets/images/home/sixth-floor-img7.png" alt="">
                    </a>
                    <a href="https://www.dextools.io/app/bsc/pair-explorer/0xc30211899ccb12a7af52bf231b91e5de085a9d17"
                        target="_blank">
                        <img src="../../assets/images/home/sixth-floor-img8.png" alt="">
                    </a>
                    <a href="https://www.feixiaohao.co/currencies/amazingdoge/" target="_blank">
                        <img src="../../assets/images/home/sixth-floor-img9.png" alt="">
                    </a>
                    <a href="https://twitter.com/bitkeepdaily/status/1536959984663076865?s=21&t=KYjJrrQqQDD4Zy2Vcei4pg"
                        target="_blank">
                        <img src="../../assets/images/home/sixth-floor-img10.png" alt="">
                    </a>
                    <a href="https://twitter.com/TokenPocket_TP" target="_blank">
                        <img src="../../assets/images/home/sixth-floor-img11.png" alt="">
                    </a>
                    <a href="https://twitter.com/Coinhub_Wallet/status/1518167734529392640" target="_blank">
                        <img src="../../assets/images/home/sixth-floor-img12.png" alt="">
                    </a>
                    <a href="https://www.mytokencap.com/currency/adoge/821823330" target="_blank">
                        <img src="../../assets/images/home/sixth-floor-img13.png" alt="">
                    </a>

                </div>
            </div>
            <div class="cooperation-media-item">
                <div class="item-title">
                    {{ $t("home.platform-certification") }}
                </div>
                <div class="item-content">
                    <a href="https://www.certik.com/projects/amazing-doge" target="_blank">
                        <img src="../../assets/images/home/second-floor-img1.png" alt="">
                    </a>
                    <a href="https://app.unicrypt.network/amm/pancake-v2/ilo/0x87521e7799DeFC1654dF5c726354b13363276f48"
                        target="_blank">
                        <img src="../../assets/images/home/second-floor-img5.png" alt="">
                    </a>
                    <a href="https://github.com/solidproof/projects/blob/main/AmazingDoge/SmartContract_Audit_Solidproof_AmazingDoge.pdf"
                        target="_blank">
                        <img src="../../assets/images/home/second-floor-img4.png" alt="">
                    </a>
                    <a href="https://es.wikipedia.org/wiki/AmazingDogeCoin" target="_blank">
                        <img src="../../assets/images/home/sixth-floor-img14.png" alt="">
                    </a>
                </div>
            </div>
            <div class="cooperation-media-item">
                <div class="item-title">
                    {{ $t("home.institutional-concern") }}
                </div>
                <div class="item-content">
                    <a href="https://twitter.com/hc_capital/status/1531570393928302592?s=20&t=7Q33Dj4nibTJ3skzo4MjOA"
                        target="_blank">
                        <img src="../../assets/images/home/sixth-floor-img15.png" alt="">
                    </a>
                    <a href="https://twitter.com/WhaleStatsBSC/status/1530958333288529920?s=20&t=7Q33Dj4nibTJ3skzo4MjOA"
                        target="_blank">
                        <img src="../../assets/images/home/sixth-floor-img16.png" alt="">
                    </a>
                    <a href="https://twitter.com/BSC_FA/status/1526412103346552832?s=20&t=lkhXreTIaBZdiWaT3g4eSQ"
                        target="_blank">
                        <img src="../../assets/images/home/sixth-floor-img17.png" alt="">
                    </a>
                </div>
            </div>
            <div class="cooperation-media-item">
                <div class="item-title">
                    {{ $t("home.listed-exchanges") }}
                </div>
                <div class="item-content">
                    <a href="https://www.mexc.com/exchange/ADOGE_USDT" target="_blank">
                        <img src="../../assets/images/home/sixth-floor-img19.png" alt="">
                    </a>
                    <a href="https://pancakeswap.finance/swap?inputCurrency=BNB&outputCurrency=0x0ebc30459551858e81306d583025d12c7d795fa2" target="_blank">
                        <img src="../../assets/images/home/sixth-floor-img18.png" alt="">
                    </a>

                    <a href="https://www.coinw.com/front/fastTrading?symbol=900" target="_blank">
                        <img src="../../assets/images/home/sixth-floor-img20.png" alt="">
                    </a>
                    <a href="https://www.ztb.im/exchange?coin=ADOGE_USDT" target="_blank">
                        <img src="../../assets/images/home/sixth-floor-img21.png" alt="">
                    </a>
                    <a href="https://exchange.babyswap.finance/#/swap?inputCurrency=BNB&outputCurrency=0x0ebc30459551858e81306d583025d12c7d795fa2"
                        target="_blank">
                        <img src="../../assets/images/home/sixth-floor-img22.png" alt="">
                    </a>

                </div>
            </div>
            <div class="cooperation-media-item">
                <div class="item-title">
                    {{ $t("home.has-been-recorded") }}
                </div>
                <div class="item-content">
                    <a href="https://www.coinbase.com/price/amazingdoge" target="_blank">
                        <img src="../../assets/images/home/sixth-floor-img24.png" alt="">
                    </a>
                    <a href="https://crypto.com/price/amazingdoge" target="_blank">
                        <img src="../../assets/images/home/sixth-floor-img25.png" alt="">
                    </a>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import myAjax from '@/utils/ajax.js'
    import stageEn from '../../assets/images/home/stage.png'
    import stageZh from '../../assets/images/home/stage-zh.png'
    export default {
        name: "",
        components: {},
        props: {},
        data() {
            return {
                prefixCls: "views-home",
                isLoading: true,
                stageImg: '',
                priceData: {}
            };
        },
        computed: {},
        watch: {},
        created() {
            const lang = localStorage.getItem("lang") ? localStorage.getItem("lang") : 'EN'
            lang === 'EN' ? (this.stageImg = stageEn) : (this.stageImg = stageZh)

        },
        mounted() {
            this.getPrice()
        },
        beforeDestroy() {},
        methods: {
            getPrice() {
                return new Promise((resolve, reject) => {
                    myAjax({
                        url: 'price/query_tool',
                    }).then(res => {
                        this.priceData = res.data
                        resolve()
                    }).catch(err => {
                        reject(err)
                    }).finally(() => {
                        this.isLoading = false
                    })
                })
            },
        },
    };
</script>

<style lang="scss" scoped>
    $prefixCls: "views-home";

    .#{$prefixCls} {
        padding: .866666666666667rem 0 0 0;
        background: #000;

        .one-floor {
            display: flex;
            justify-content: space-between;
            background: #000 url('../../assets/images/home-one-floor-bg.png');
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center center;

            .left {
                max-width: 10.146666666666667rem;
                padding-bottom: .933333333333333rem;

            }

            .amazing-doge-txt {
                padding: .586666666666667rem 0 0 0;


                .tit {
                    position: relative;
                    width: 9.613333333333333rem;
                    line-height: .7rem;
                    font-size: .533333333333333rem;
                    color: #fff;
                    font-weight: 600;
                    z-index: 999;
                }

                .sub-tit {
                    width: 7.693333333333333rem;
                    margin: .4rem 0;
                    line-height: .4rem;
                    font-weight: 400;
                    font-size: .266666666666667rem;
                    color: #fff;

                }
            }

            .white-paper {
                >a {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 2.466666666666667rem;
                    height: .746666666666667rem;
                    line-height: .746666666666667rem;
                    color: #fff;
                    font-size: .24rem;
                    border-radius: .133333333333333rem;
                    background: linear-gradient(31deg, #2563EB 2%, #BD00FF 100%);

                    img {
                        width: .4rem;
                    }
                }
            }

            .adog-amazing {
                position: relative;
                display: flex;
                align-items: center;
                margin-top: .8rem;
                width: 6.933333333333334rem;
                height: 1.066666666666667rem;
                padding: .066666666666667rem .133333333333333rem;
                border-radius: .133333333333333rem;
                border: 2px solid rgba(255, 255, 255, 0.2);
                background: rgba(255, 255, 255, 0.2);

                .line {
                    position: absolute;
                    left: 46%;
                    top: 50%;
                    width: .026666666666667rem;
                    height: .4rem;
                    background: rgba(255, 255, 255, 0.2);
                    transform: translate(-40%, -50%);
                }

                .item {
                    display: flex;
                    align-items: center;
                    flex: 1;
                    height: 100%;
                    position: relative;
                    padding-left: .933333333333333rem;

                    .img {
                        position: absolute;
                        left: 0;
                        top: 50%;
                        width: .8rem;
                        height: .8rem;
                        transform: translateY(-50%);

                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }

                    &.adog {
                        .add-num {
                            background: #777777;
                        }
                    }

                    &.amazing-team {
                        .add-num {
                            background: #13AF7B;
                        }
                    }

                    .right-info {
                        color: #fff;

                        .add-num {
                            margin-left: .133333333333333rem;
                            padding: .03rem;
                            color: #fff;
                            border-radius: .04rem;
                            font-size: 12px;
                            text-align: center;
                        }

                        .name {
                            margin-bottom: .066666666666667rem;
                            font-size: .24rem;
                        }

                        .value {
                            font-size: .266666666666667rem;
                            font-weight: bold;
                        }
                    }
                }
            }

            .right {
                position: relative;
                width: 6.746666666666667rem;
                background: url("../../assets/images/home-big-adoge.png");
                background-size: 100% auto;
                background-position: right top;
                background-repeat: no-repeat;
                z-index: 999;

                &::before {
                    content: "";
                    position: absolute;
                    bottom: .853333333333333rem;
                    left: -0.933333333333333rem;
                    width: .933333333333333rem;
                    height: .933333333333333rem;
                    background: url('../../assets/images/dot-left.png');
                    background-size: cover;
                }

                &::after {
                    content: "";
                    position: absolute;
                    bottom: -0.333333333333333rem;
                    right: 0;
                    width: .746666666666667rem;
                    height: .746666666666667rem;
                    background: url('../../assets/images/dot-right.png');
                    background-size: 100% auto;
                    background-repeat: no-repeat;
                }

            }
        }

        .tit-txt {
            font-size: .48rem;
            color: #fff;
            font-weight: 600;
            text-align: center;
        }

        .second-floor {
            padding: 1.333333333333333rem 0;
            text-align: center;
            background: #0D0D0D;



            .equal-safe-list {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-around;
                line-height: .3rem;
                font-size: .213333333333333rem;

                .list-item {
                    margin-top: 1.066666666666667rem;

                    a {
                        color: #aaa;
                    }

                    img {
                        display: block;
                        width: 100%;
                        height: .8rem;
                        margin-bottom: .133333333333333rem;
                    }

                    p {
                        width: 3.2rem;
                        margin: 0 auto;
                    }
                }
            }
        }

        .third-floor {
            padding-top: 1.333333333333333rem;
            text-align: center;
            background: url('../../assets/images/home/third-floor-bg.png');
            background-size: cover;
            background-position: center center;

            a {
                color: #fff;
            }

            .img-list {
                display: flex;
                align-items: center;
                margin-top: .8rem;
                padding: .13rem .13rem 0 .13rem;
                background: rgba(255, 255, 255, 0.1);
                border: 2px solid rgba(255, 255, 255, 0.2);
                border-radius: .133333333333333rem;

                img {
                    display: block;
                    margin-bottom: .133333333333333rem;
                    border-radius: .09rem;

                }

                .left,
                .right {
                    display: flex;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    width: 4.8rem;

                    img {
                        width: 48%;
                    }
                }

                .center {
                    flex: 1;
                    padding: 0 .13rem;

                    img {
                        width: 100%;
                        height: 4.8rem;
                    }
                }
            }

            .go-marketplace {
                display: inline-block;
                margin: 1rem 0 1.253333333333333rem 0;
                padding: .133333333333333rem .266666666666667rem;
                font-size: .24rem;
                background: rgba(255, 255, 255, 0.1);
                border: 2px solid rgba(255, 255, 255, 0.2);
                border-radius: .133333333333333rem;
                cursor: pointer;

                img {
                    width: .4rem;
                    vertical-align: middle;
                }
            }
        }

        .fourth-floor {
            padding: 1.066666666666667rem 0 1.333333333333333rem;
            font-size: .213333333333333rem;
            background: url('../../assets/images/home/fourth-floor-bg.png');
            background-size: 100% 100%;
            background-position: center center;

            a {
                color: #fff;
            }

            .support-list {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-around;
                margin-top: .2rem;
                padding: 0 1rem;

                .list-item {
                    width: 1.6rem;
                    margin-top: .533333333333333rem;
                    margin-right: 1.6rem;
                    text-align: center;

                    &:nth-child(4n) {
                        margin-right: 0;
                    }
                }

                .intro {
                    line-height: .733333333333333rem;
                }

                .img-wrap {
                    img {
                        width: 100%;
                    }

                }
            }
        }

        .fifth-floor {
            padding: 1.066666666666667rem 0 .933333333333333rem;
            text-align: center;
            background: url('../../assets/images/home/fifth-floor-bg.png');
            background-position: center center;
            background-size: 100% 100%;

            .stage-list {
                width: 90%;
                margin: 0 auto;
                margin-top: .866666666666667rem;

                img {
                    width: 100%;
                }
            }

            .tip-btn {
                display: inline-block;
                padding: .266666666666667rem;
                color: #fff;
                border: 2px solid rgba(255, 255, 255, 0.2);
                border-radius: .133333333333333rem;
                background: rgba(179, 96, 243, 0.1);
            }
        }

        .sixth-floor {
            padding: 1.066666666666667rem 0 0;
            background: url('../../assets/images/home/fifth-floor-bg.png');
            background-position: center center;
            background-size: 100% 100%;

            .tit-txt {
                margin-bottom: .8rem;
            }

            .cooperation-media-item {
                padding: 0 0 1.466666666666667rem 0;
                color: #fff;
                text-align: center;

                .item-title {
                    padding-bottom: .8rem;
                }

                .item-content {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;

                    img {
                        margin-bottom: .533333333333333rem;
                    }
                }
            }
        }




    }

    @media (max-width: 768px) {
        .#{$prefixCls} {
            padding-bottom: 0;

            .tit-txt {
                font-size: .64rem;
                color: #fff;
                font-weight: 600;
                text-align: center;
            }

            .one-floor {
                position: relative;
                flex-direction: column;
                padding: 0 .533333333333333rem;
                background-image: url('../../assets/images/home-one-floor-h5-bg.png');
                background-size: contain;

                &::after {
                    content: "";
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 11rem;
                    background-image: url('../../assets/images/home-one-floor-right-bg.png');
                    background-size: cover;
                    z-index: 999;
                }

                .right {
                    margin: 0 auto .5rem;
                    height: 9.5rem;

                    &::before {
                        background-image: url('../../assets/images/dot-left-h5.png');
                        bottom: 2rem;
                    }

                    &::after {
                        display: none;
                    }
                }

                .amazing-doge-txt {
                    .tit {
                        font-size: .746666666666667rem;
                        line-height: .9rem;
                    }

                    .sub-tit {
                        font-size: .426666666666667rem;
                        line-height: .6rem;
                        margin: .533333333333333rem 0;
                    }
                }

                .white-paper {
                    >p {
                        width: 3.466666666666667rem;
                        height: 1.066666666666667rem;

                        img {
                            margin-left: .266666666666667rem;
                            width: .533333333333333rem;
                        }
                    }
                }

                .adog-amazing {
                    position: absolute;
                    left: .533333333333333rem;
                    bottom: .426666666666667rem;
                    width: 90%;
                    height: 1.546666666666667rem;
                    z-index: 9990;
                }
            }

            .second-floor {
                .tit-txt {
                    padding: 0 .453333333333333rem;
                    font-size: .64rem;
                }

                .equal-safe-list {
                    line-height: .5rem;

                    .list-item {
                        width: 6.4rem;

                        .img-wrap {
                            img {
                                height: auto;
                            }
                        }

                        p {
                            width: 100%;
                            margin: .133333333333333rem auto 0;

                            text-align: center;
                        }
                    }
                }
            }

            .third-floor {
                padding: 0 .426666666666667rem;

                .img-list {
                    flex-direction: column;

                    .left,
                    .right,
                    .center {
                        width: 100%;
                    }

                    .center {
                        padding: 0;

                        img {
                            height: auto;
                        }
                    }
                }
            }

            .fourth-floor {
                padding: 1.333333333333333rem .533333333333333rem;

                .support-list {
                    padding: 0;

                    .list-item {
                        width: 2.133333333333333rem;
                        margin-right: 1.066666666666667rem;

                        &:nth-child(3n) {
                            margin-right: 0;
                        }

                        &:nth-child(4n) {
                            margin-right: 1.066666666666667rem;
                        }

                    }
                }

            }

            .fifth-floor {
                padding: 1.333333333333333rem .4rem 1.866666666666667rem;
            }

            .sixth-floor {
                .tit-txt {
                    margin-bottom: 1.333333333333333rem;
                }

                .cooperation-media-item {
                    .item-content {
                        img {
                            width: 3.866666666666667rem;
                        }
                    }
                }
            }
        }
    }
</style>