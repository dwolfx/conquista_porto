import store from 'store'
import { TOKEN_NAME } from 'store/modules/Auth/types'
import { AuthRequestLogout } from 'store/modules/Auth/action'
import { dataLayerErrorInfo } from 'GoogleTagManager'
import { getCookieValue } from 'helpers'

import NotFoundException from './exceptions/NotFoundException'
import BadRequestException from './exceptions/BadRequestException'
import InternalServerErrorException from './exceptions/InternalServerErrorException'

const baseURL = process.env.REACT_APP_BASE_URL
const baseURLNamespaceInvest = process.env.REACT_APP_BASE_URL_INVEST || ''
const baseURLNamespaceInvestAws =
  process.env.REACT_APP_BASE_URL_INVEST_AWS || ''
const baseURLNamespaceInvestPortovida =
  process.env.REACT_APP_BASE_URL_INVEST_PORTOVIDA || ''
const baseURLNamespaceInvestPrevidencia =
  process.env.REACT_APP_BASE_URL_PREVIDENCIA || ''
const baseURLNamespaceGoal = process.env.REACT_APP_BASE_URL_GOAL || ''
const baseURLNamespacePortopar = process.env.REACT_APP_BASE_URL_PORTOPAR || ''
const baseURLNamespaceRecommendation =
  process.env.REACT_APP_BASE_URL_RECOMMENDATION || ''
const baseURLNamespaceRewards = process.env.REACT_APP_BASE_URL_REWARDS || ''
const baseURLNamespaceAuth2 = process.env.REACT_APP_BASE_URL_AUTH2 || ''
const baseURLNamespaceAtlas = process.env.REACT_APP_BASE_URL_ATLAS || ''
const baseURLNamespacePROCartao =
  process.env.REACT_APP_BASE_URL_PRO_CARTAO || ''

const responseInterceptor = response => response

const errorMessages = {
  400: 'Algo deu errado. Tente novamente mais tarde.',
  404: 'Recurso não encontrado.',
  500: 'Erro de comunicação interna. Tente novamente mais tarde.',
  0: 'Erro genérico, exception não tratada.',
}

const generateErrorDataWithMessage = (statusCode, errorData) => {
  if (errorData) {
    if (Object.entries(errorData).length > 0 && errorData !== '{}') {
      if (Object.prototype.hasOwnProperty.call(errorData, 'msg')) {
        return JSON.stringify(errorData)
      }
      return JSON.stringify({
        ...errorData,
        msg: errorMessages[statusCode],
      })
    }
    return JSON.stringify({ msg: errorMessages[statusCode] })
  }
  return JSON.stringify({ msg: errorMessages[statusCode] })
}

const responseErrorInterceptor = error => {
  const HTTPStatusCode = error?.response?.status ? error.response.status : 0
  const errorData = error?.response?.data
    ? error.response.data
    : errorMessages[0]

  switch (true) {
    case HTTPStatusCode === 400:
      dataLayerErrorInfo(generateErrorDataWithMessage(400, errorData))
      throw new BadRequestException(
        generateErrorDataWithMessage(400, errorData)
      )
    case HTTPStatusCode === 401:
      store.dispatch(AuthRequestLogout())
      break
    case HTTPStatusCode === 404:
      dataLayerErrorInfo(generateErrorDataWithMessage(404, errorData))
      throw new NotFoundException(generateErrorDataWithMessage(404, errorData))
    case HTTPStatusCode >= 500:
      dataLayerErrorInfo(generateErrorDataWithMessage(500, errorData))
      throw new InternalServerErrorException(
        generateErrorDataWithMessage(500, errorData)
      )
    default:
      throw new Error(
        JSON.stringify({
          msg: `HTTP status code: ${HTTPStatusCode} - ${errorMessages[0]}`,
        })
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
  baseURLNamespacePortopar,
  baseURLNamespaceInvestPrevidencia,
  baseURLNamespaceRecommendation,
  baseURLNamespaceRewards,
  baseURLNamespaceAtlas,
  responseInterceptor,
  responseErrorInterceptor,
  requestInterceptor,
  baseURLNamespaceAuth2,
  baseURLNamespacePROCartao,
}
