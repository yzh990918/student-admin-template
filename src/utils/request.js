import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
// 创建拦截器
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json;charset=utf8'
  }
})
// 请求拦截器
service.interceptors.request.use(
  config => {
    // 判断vuex是否存在token 有就携带token
    if (store.getters.token) {
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// 响应拦截器
service.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response.data)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    // 处理非200

    // 可以封装 获取错误状态码 error.response 相当于 res
    const errorStatus = error.response.status
    switch (errorStatus) {
      case 401:
        console.log('token异常处理')
        break
      case 500:
        Message({
          type: 'error',
          message: error.response.data.msg,
          duration: 4000
        })
        break
      case 404:
        Message({
          type: 'error',
          message: '网络异常',
          duration: 4000
        })
        break
      default:
        break
    }
    return Promise.reject(error)
  }
)

export default service
