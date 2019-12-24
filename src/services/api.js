import axios from 'axios'
import { baseURL } from './apiConfig'

export const axiosInstance = axios.create({
  baseURL,
  headers: {
    'content-type': 'application/json',
  },
})

export const get = (path, params) => axiosInstance(path, params)

export const post = (path, data) =>
  axiosInstance(path, { method: 'POST', data })

export const put = (path, data) => axiosInstance(path, { method: 'PUT', data })

export const patch = (path, data) =>
  axiosInstance(path, { method: 'PATCH', data })

export const remove = path => axiosInstance(path, { method: 'DELETE' })
