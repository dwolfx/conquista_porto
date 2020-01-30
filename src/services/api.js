import axios from 'axios'
import { baseURL, responseInterceptor } from './apiConfig'

export const axiosInstance = (url = baseURL) =>
  axios.create({
    baseURL: url,
    headers: {
      'content-type': 'application/json',
    },
  })

axiosInstance().interceptors.response.use(responseInterceptor)

export const get = (path, params, url) => axiosInstance(url)(path, params)

export const post = (path, data, url) =>
  axiosInstance(url)(path, { method: 'POST', data })

export const put = (path, data, url) =>
  axiosInstance(url)(path, { method: 'PUT', data })

export const patch = (path, data, url) =>
  axiosInstance(url)(path, { method: 'PATCH', data })

export const remove = (path, url) =>
  axiosInstance(url)(path, { method: 'DELETE' })
