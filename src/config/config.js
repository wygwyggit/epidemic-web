
const projectDomain = process.env.NODE_ENV == 'development' ? '/api/' : 'https://adogenft.com/'
const mainDomain = process.env.NODE_ENV == 'development' ? 'https://adogenft.com/' : 'https://adoge-api-test.ctstatus.com/' //主域名
const apiBasePath = projectDomain + 'api/'; //项目接口请求前缀
const netImgBaseUrl = 'https://nftimgs.adogenft.com/'
const payAddress = '0x0b8d9b83da438aD37a35C2078620780dc8692A5A'
const payAmount = '10000000000000000'
// 合约地址配置
const contractAddress = {
    // 代币
    token: {
        adoge: '0x0EBc30459551858e81306d583025d12C7d795FA2',
        amazingTeam: '0x44Ece1031e5b5e2D9169546cC10EA5C95BA96237',
    },
    // NFT
    nft: {
        adogeNft: '0x1aAC0C12Be72d8E1fE13Db7a59E0262BD0FB789c',
        gamePropsNft: '0x6A4200c5b519b05488dFbE2831BB3dC722E73d2d',
        jointlyNft: 'x8bc8967527AAd050e8bdCc4cB8Ec7Af58D5C7e86'
    }
}
export {
    apiBasePath,
    mainDomain,
    netImgBaseUrl,
    payAddress,
    payAmount,
    contractAddress
}
