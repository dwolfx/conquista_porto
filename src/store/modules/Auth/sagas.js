import { all, call, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'
import { AuthRequestLoginSuccess, AuthRequestLoginFailure } from './action'
import { Types } from './types'

const axiosInstance = axios.create({
  headers: {
    Accept: '*/*',
    'content-type': 'application/json',
    Hint: 'login_cliente',
  },
})

function* postLogin({ credentials: { username, password } }) {
  try {
    const loginUrl =
      'http://api-proxy.conquista.sciensa.click:8080/api/auth/login'

    const data = `username=${username}&password=${password}&grant_type=password&client_id=4867ef4e-9f57-4524-ba92-e018daba0de2&client_secret=44b61d86-077e-4ec9-a75e-68b6afe4540a&social=13213`
    const {
      data: { access_token: accessToken, erro },
    } = yield call(axiosInstance.post, loginUrl, data)

    if (erro) throw erro.mensagemErro

    const response = {
      accessToken,
      cpf: username,
    }

    yield put(AuthRequestLoginSuccess(response))
    saveAuthLocalStorage(response)
  } catch (error) {
    yield put(AuthRequestLoginFailure(error.toString()))
  }
}

function* postLogout({ accessToken }) {
  removeAuthLocalStorage()
  const logoutUrl =
    process.env.REACT_APP_ENV === 'development'
      ? '/api/auth/logout'
      : '/client-ext-templating/portalcliente/views/commons/ajaxKillSessionParam.jsp'
  yield call(axiosInstance.post, logoutUrl, {
    token: accessToken,
  })
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
