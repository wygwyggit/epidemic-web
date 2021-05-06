const projectDomain = process.env.NODE_ENV == 'development' ? '/api' : ''
const mainDomain = process.env.NODE_ENV == 'development' ? 'http://localhost:8881/' : 'http://heiyg.com/' //主域名
const apiBasePath = projectDomain + '/apiBlog/'; //项目接口请求前缀
const uploadUrl = `${apiBasePath}utils/upload`
export {
    apiBasePath,
    mainDomain,
    uploadUrl
}
