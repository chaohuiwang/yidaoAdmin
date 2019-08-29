import axios from 'axios'
// import { Message, MessageBox } from 'element-ui'
import { Message, Modal } from 'iview'
import store from '../store'
import { getToken, getRefreshToken, removeRefreshToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(async config => {
  if (getToken()) {
    config.headers['Authorization'] = 'Bearer ' + getToken()
  } else if (getRefreshToken()) {
    const refreshToken = getRefreshToken()
    removeRefreshToken()
    console.log('refreshToken: ', refreshToken)
    await store.dispatch('RefreshToken', refreshToken)
    config.headers['Authorization'] = 'Bearer ' + getToken()
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// response 拦截器
service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    console.log('err' + error)// for debug
    Message.error(error.response.data.message || error.message)
    if (error.response.status === 401) {
      Modal.warning({
        title: '确定登出',
        content: '你已被登出，可以取消继续留在该页面，或者重新登录',
        okText: '重新登录',
        cancelText: '取消',
        onOk: () => {
          store.dispatch('FedLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        }
      })
    }
    return Promise.reject(error)
  }
)

export default service
