import axios from 'axios'
import { baseURL, responseInterceptor } from './apiConfig'

export const axiosInstance = (token = '') =>
  axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json',
    },
  })

axiosInstance().interceptors.response.use(responseInterceptor)

export const get = (path, params, token) => axiosInstance(token)(path, params)

export const post = (path, data, token) =>
  axiosInstance(token)(path, { method: 'POST', data })

export const put = (path, data, token) =>
  axiosInstance(token)(path, { method: 'PUT', data })

export const patch = (path, data, token) =>
  axiosInstance(token)(path, { method: 'PATCH', data })

export const remove = (path, token) =>
  axiosInstance(token)(path, { method: 'DELETE' })
