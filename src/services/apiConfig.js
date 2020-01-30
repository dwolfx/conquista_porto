/* eslint-disable import/no-mutable-exports */
let baseURL = 'https://tst.portoseguro.com.br/conquistaapi/investimento/v1'
const baseUrlObjectives = 'http://192.168.11.4:5000/v1/recommendation'

if (process.env.REACT_APP_ENV === 'local') {
  baseURL = 'http://localhost:5000/conquistaapi/investimento/v1'
}

const responseInterceptor = response => {
  if (response.data.TipoCritica) {
    throw Error(response.data.Mensagem)
  }
  return response
}

export { baseURL, responseInterceptor, baseUrlObjectives }
