import { axiosInstance } from 'services/api'
import { IRedisRequest } from './types'

export default async function saveRedis<T>(payload: IRedisRequest<T>, baseUrlRedis: string){
  await axiosInstance.post(`${baseUrlRedis}/proposta`, payload)
} 
