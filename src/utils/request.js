// 封装  axios  请求模块
import axios from 'axios'
import jsonBig from 'json-bigint' // 解决js
import store from '@/store'
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/' // 基础地址
})

// 解决大数据超出安全范围
request.defaults.transformResponse = [function (data) {
  try {
    return jsonBig.parse(data)
  } catch {
    return {}
  }
}]
// 请求拦截器
request.interceptors.request.use(function (config) {
  // 统一设置 token
  const { user } = store.state
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
},
function (error) {
  return Promise.reject(error)
}
)

// 响应拦截
request.interceptors.response.use(function (response) {
  return response
},
function (error) {
  return Promise.reject(error)
}
)

export default request
