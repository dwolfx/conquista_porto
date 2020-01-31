/* eslint-disable import/no-mutable-exports */
const baseURL = process.env.REACT_APP_BASE_URL

const responseInterceptor = response => {
  if (response.data.TipoCritica) {
    throw Error(response.data.Mensagem)
  }
  return response
}

export { baseURL, responseInterceptor }
