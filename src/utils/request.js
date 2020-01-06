// 封装  axios  请求模块
import axios from 'axios'
import jsonBig from 'json-bigint' // 解决js
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/' // 基础地址
})

// 请求拦截器
request.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// 响应拦截
request.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    return Promise.reject(error)
  }
)

// 解决大数据超出安全范围
request.defaults.transformResponse = [function (data) {
  try {
    return jsonBig.parse(data)
  } catch {
    return {}
  }
}]
export default request
