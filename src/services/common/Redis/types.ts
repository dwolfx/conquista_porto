export interface IRedisRequest<T> {
  chave: string
  valor: T
}