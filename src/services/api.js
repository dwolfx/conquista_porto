// eslint-disable-next-line
import axios from 'axios'
// eslint-disable-next-line import/no-cycle
import {
  baseURL,
  responseInterceptor,
  responseErrorInterceptor,
  requestInterceptor,
} from './apiConfig'

export const axiosInstance = axios.create({
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

export const get = (path, params) => axiosInstance(path, params)

export const post = (path, data) =>
  axiosInstance(path, { method: 'POST', data })

export const put = (path, data) => axiosInstance(path, { method: 'PUT', data })

export const patch = (path, data) =>
  axiosInstance(path, { method: 'PATCH', data })

export const remove = path => axiosInstance(path, { method: 'DELETE' })
