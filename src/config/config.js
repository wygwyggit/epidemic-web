const projectDomain = process.env.NODE_ENV == 'development' ? '/mapi' : ''
const mainDomain = process.env.NODE_ENV == 'development' ? 'http://localhost:8880/' : 'https://c.m.163.com/' //主域名
const apiBasePath = projectDomain; //项目接口请求前缀
const uploadUrl = `${apiBasePath}utils/upload`
export {
    apiBasePath,
    mainDomain,
    uploadUrl
}
