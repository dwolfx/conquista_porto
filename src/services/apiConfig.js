import store from 'store'
import { TOKEN_NAME } from 'store/modules/Auth/types'
import { AuthRequestLogout } from 'store/modules/Auth/action'
import { dataLayerErrorInfo } from 'GoogleTagManager'
import { getCookieValue } from 'helpers'

const baseURL = process.env.REACT_APP_BASE_URL
const baseURLNamespaceInvest = process.env.REACT_APP_BASE_URL_INVEST || ''
const baseURLNamespaceInvestAws =
  process.env.REACT_APP_BASE_URL_INVEST_AWS || ''
const baseURLNamespaceInvestPortovida =
  process.env.REACT_APP_BASE_URL_INVEST_PORTOVIDA || ''
const baseURLNamespaceGoal = process.env.REACT_APP_BASE_URL_GOAL || ''
const baseURLNamespaceGoalFunds =
  process.env.REACT_APP_BASE_URL_GOAL_FUNDS || ''
const baseURLNamespacePortopar = process.env.REACT_APP_BASE_URL_PORTOPAR || ''
const baseURLNamespaceRecommendation =
  process.env.REACT_APP_BASE_URL_RECOMMENDATION || ''
const baseURLNamespaceRewards = process.env.REACT_APP_BASE_URL_REWARDS || ''
const baseURLNamespaceAuth2 = process.env.REACT_APP_BASE_URL_AUTH2 || ''
const baseURLNamespaceAtlas = process.env.REACT_APP_BASE_URL_ATLAS || ''

const responseInterceptor = response => response

const errorMessages = {
  400: 'Algo deu errado. Tente novamente mais tarde.',
  404: 'Recurso não encontrado.',
  500: 'Erro de comunicação interna. Tente novamente mais tarde.',
}

const responseErrorInterceptor = error => {
  if (error.response.status === 401) {
    store.dispatch(AuthRequestLogout())
  } else if (error.response.status >= 500) {
    dataLayerErrorInfo(errorMessages[500])
    throw Error(errorMessages[500])
  } else if (error.response.status === 404) {
    dataLayerErrorInfo(errorMessages[404])
    throw Error(errorMessages[404])
  } else if (error.response.status === 400) {
    dataLayerErrorInfo(errorMessages[400])
    throw Error(
      error.response.data
        ? JSON.stringify(error.response.data)
        : errorMessages[400]
    )
  }

  return Promise.reject(error.response)
}

const requestInterceptor = request => {
  request.headers.Authorization = `Bearer ${getCookieValue(TOKEN_NAME)}`
  return request
}

export {
  baseURL,
  baseURLNamespaceInvest,
  baseURLNamespaceInvestAws,
  baseURLNamespaceInvestPortovida,
  baseURLNamespaceGoal,
  baseURLNamespaceGoalFunds,
  baseURLNamespacePortopar,
  baseURLNamespaceRecommendation,
  baseURLNamespaceRewards,
  baseURLNamespaceAtlas,
  responseInterceptor,
  responseErrorInterceptor,
  requestInterceptor,
  baseURLNamespaceAuth2,
}
