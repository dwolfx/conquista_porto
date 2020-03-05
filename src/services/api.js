import axios from 'axios'
import {
  baseURL,
  baseURLNamespaceGoal,
  baseURLNamespaceInvest,
  baseURLNamespacePortopar,
  baseURLNamespaceRecommendation,
  responseInterceptor,
  responseErrorInterceptor,
  requestInterceptor,
} from './apiConfig'

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'content-type': 'application/json',
  },
})

axiosInstance.interceptors.request.use(requestInterceptor)
axiosInstance.interceptors.response.use(
  responseInterceptor,
  responseErrorInterceptor
)

const get = (path, params) => axiosInstance(path, params)

const post = (path, data) => axiosInstance(path, { method: 'POST', data })

const put = (path, data) => axiosInstance(path, { method: 'PUT', data })

const patch = (path, data) => axiosInstance(path, { method: 'PATCH', data })

const remove = path => axiosInstance(path, { method: 'DELETE' })

export {
  axiosInstance,
  get,
  put,
  patch,
  remove,
  post,
  baseURLNamespaceGoal,
  baseURLNamespaceRecommendation,
  baseURLNamespaceInvest,
  baseURLNamespacePortopar,
}
