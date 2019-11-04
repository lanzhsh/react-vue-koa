

const proxyTargetMap = {
    prod: '/',
    randy: '/randy',
    peter: '/peter'
}
const API_TYPE = process.env.API_TYPE?process.env.API_TYPE:'randy'
const baseUrl = process.env.NODE_ENV === 'production' ? '/' : proxyTargetMap[API_TYPE]
export default baseUrl