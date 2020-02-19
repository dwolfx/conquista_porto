import store from 'store'
import { TOKEN_NAME } from 'store/modules/Auth/types'
import { AuthRequestLogout } from 'store/modules/Auth/action'
import { dataLayerErrorInfo } from 'GoogleTagManager'
const baseURL = process.env.REACT_APP_BASE_URL

const responseInterceptor = response => {
  if (response.data.TipoCritica) {
    dataLayerErrorInfo(response.data.TipoCritica)
    throw Error(response.data.Mensagem)
  }
  return response
}

const responseErrorInterceptor = error => {
  if (error.response.status === 401) {
    store.dispatch(AuthRequestLogout())
  }
  return error
}

const requestInterceptor = request => {
  request.headers.Authorization = `Bearer ${localStorage.getItem(TOKEN_NAME)}`
  return request
}

export {
  baseURL,
  responseInterceptor,
  responseErrorInterceptor,
  requestInterceptor,
}
