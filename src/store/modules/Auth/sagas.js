import { all, call, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'
import { AuthRequestLoginSuccess, AuthRequestLoginFailure } from './action'
import { Types } from './types'

const axiosInstance = axios.create({
  headers: {
    Accept: '*/*',
    'content-type': 'application/x-www-form-urlencoded',
    Hint: 'login_cliente',
  },
})

function* postLogin({ credentials: { username, password } }) {
  try {
    const loginUrl = process.env.REACT_APP_BASE_URL_LOGIN
    const clientId = process.env.REACT_APP_CLIENT_ID
    const clientSecret = process.env.REACT_APP_SECRET_ID

    const data = `username=${username
      .toString()
      .replace(
        /\D/g,
        ''
      )}&password=${password}&grant_type=password&client_id=${clientId}&client_secret=${clientSecret}&social=13213`
    const {
      data: { access_token: accessToken, erro },
    } = yield call(axiosInstance.post, loginUrl, data)

    if (erro) throw erro.mensagemErro

    const response = {
      accessToken,
      cpf: username.toString().replace(/\D/g, ''),
    }

    yield put(AuthRequestLoginSuccess(response))
    saveAuthLocalStorage(response)
  } catch (error) {
    yield put(AuthRequestLoginFailure(error.toString()))
  }
}

function* postLogout() {
  removeAuthLocalStorage()
  // const logoutUrl = process.env.REACT_APP_BASE_URL_LOGOUT
  // yield call(axiosInstance.post, logoutUrl, `token=${accessToken}`)
  yield true
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
