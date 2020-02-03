// eslint-disable-next-line import/no-cycle
import store from 'store'
import { AuthRequestLogout } from 'store/modules/Auth/action'
/* eslint-disable import/no-mutable-exports */
const baseURL = process.env.REACT_APP_BASE_URL

const responseInterceptor = response => {
  if (response.data.TipoCritica) {
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
  request.headers.Authorization = `Bearer ${store.getState().auth.accessToken}`
  return request
}

export {
  baseURL,
  responseInterceptor,
  responseErrorInterceptor,
  requestInterceptor,
}
