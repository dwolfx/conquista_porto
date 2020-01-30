/* eslint-disable import/no-mutable-exports */
const baseURL = process.env.REACT_APP_BASE_URL
const baseUrlObjectives = 'http://192.168.11.4:5000/v1/recommendation'

const responseInterceptor = response => {
  if (response.data.TipoCritica) {
    throw Error(response.data.Mensagem)
  }
  return response
}

export { baseURL, responseInterceptor, baseUrlObjectives }
