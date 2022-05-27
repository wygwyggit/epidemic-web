
const projectDomain = process.env.NODE_ENV == 'development' ? '/api/' : 'https://adoge-api-test.ctstatus.com/'
const mainDomain = process.env.NODE_ENV == 'development' ? 'https://adoge-api-test.ctstatus.com/' : 'https://adoge-api-test.ctstatus.com/' //主域名
const apiBasePath = projectDomain + 'api/'; //项目接口请求前缀
const netImgBaseUrl = mainDomain + 'nftimgs/'
const payAddress = '0x0b8d9b83da438aD37a35C2078620780dc8692A5A'
const payAmount = '10000000000000000'
const contractAddress = '0x0EBc30459551858e81306d583025d12C7d795FA2'
export {
    apiBasePath,
    mainDomain,
    netImgBaseUrl,
    payAddress,
    payAmount,
    contractAddress
}
