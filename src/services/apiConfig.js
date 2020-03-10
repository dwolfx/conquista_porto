import store from 'store'
import { TOKEN_NAME } from 'store/modules/Auth/types'
import { AuthRequestLogout } from 'store/modules/Auth/action'
import { dataLayerErrorInfo } from 'GoogleTagManager'
import { getCookieValue } from 'helpers'

const baseURL = process.env.REACT_APP_BASE_URL
const baseURLNamespaceInvest = process.env.REACT_APP_BASE_URL_INVEST || ''
const baseURLNamespaceGoal = process.env.REACT_APP_BASE_URL_GOAL || ''
const baseURLNamespacePortopar = process.env.REACT_APP_BASE_URL_PORTOPAR || ''
const baseURLNamespaceRecommendation =
  process.env.REACT_APP_BASE_URL_RECOMMENDATION || ''

const responseInterceptor = response => {
  let stepChangeTitle = ''
  let stepChangePath = ''

  if (response.data.TipoCritica) {
    window.dataLayer.forEach(dataLayerItem => {
      if (dataLayerItem.event === 'step_change') {
        stepChangeTitle = dataLayerItem.pg_title
        stepChangePath = dataLayerItem.pg_path
      }
    })

    dataLayerErrorInfo(
      response.data.TipoCritica,
      stepChangePath,
      stepChangeTitle
    )
    throw Error(response.data.Mensagem)
  }
  return response
}

const responseErrorInterceptor = error => {
  if (error.response.status === 401) {
    store.dispatch(AuthRequestLogout())
  } else if (error.response.status >= 500) {
    throw Error('Erro de comunicação interna. Tente novamente mais tarde.')
  } else if (error.response.status === 404) {
    throw Error('Recurso não encontrado.')
  } else if (error.response.status === 400) {
    throw Error('Algo deu errado. Tente novamente mais tarde.')
  }

  return error
}

const requestInterceptor = request => {
  request.headers.Authorization = `Bearer ${getCookieValue(TOKEN_NAME)}`
  return request
}

export {
  baseURL,
  baseURLNamespaceInvest,
  baseURLNamespaceGoal,
  baseURLNamespacePortopar,
  baseURLNamespaceRecommendation,
  responseInterceptor,
  responseErrorInterceptor,
  requestInterceptor,
}
