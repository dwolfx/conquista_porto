import { all, call, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'
import { AuthRequestLoginSuccess, AuthRequestLoginFailure } from './action'
import { Types } from './types'

const axiosInstance = axios.create({
  headers: {
    'content-type': 'application/json',
  },
})

function* postLogin({ credentials }) {
  try {
    const {
      data: { access_token: accessToken, erro },
    } = yield call(
      axiosInstance.post,
      'http://localhost:8080/localAPI-auth/login',
      {
        username: credentials.username,
        password: credentials.password,
      }
    )

    if (erro) throw erro.mensagemErro

    const response = {
      accessToken,
      cpf: credentials.username,
    }

    yield put(AuthRequestLoginSuccess(response))
    saveAuthLocalStorage(response)
  } catch (error) {
    yield put(AuthRequestLoginFailure(error))
  }
}

function* postLogout({ accessToken }) {
  const logoutUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:8080/localAPI-auth/logout'
      : '/client-ext-templating/portalcliente/views/commons/ajaxKillSessionParam.jsp'
  yield call(axiosInstance.post, logoutUrl, {
    token: accessToken,
  })
  removeAuthLocalStorage()
}

function saveAuthLocalStorage({ cpf, accessToken }) {
  localStorage.setItem('cpf', cpf)
  localStorage.setItem('accessToken', accessToken)
}

function removeAuthLocalStorage() {
  localStorage.removeItem('cpf')
  localStorage.removeItem('accessToken')
}

export default all([
  takeLatest(Types.AUTH_REQUEST_LOGIN, postLogin),
  takeLatest(Types.AUTH_REQUEST_LOGOUT, postLogout),
])
