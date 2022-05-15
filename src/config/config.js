
const projectDomain = process.env.NODE_ENV == 'development' ? '/api/' : 'https://adoge-api-test.ctstatus.com/'
const mainDomain = process.env.NODE_ENV == 'development' ? 'http://localhost:8880/' : 'https://adoge-api-test.ctstatus.com/' //主域名
const apiBasePath = projectDomain + 'api/'; //项目接口请求前缀
const netImgBaseUrl = mainDomain + 'nftimgs/'
const payAddress = '0xe49dDB012D6d7e6dFd9cEa5972c9a73daB3D223e'
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
