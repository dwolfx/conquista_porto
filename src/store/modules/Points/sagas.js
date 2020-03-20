import { all, takeLatest, call, put, select } from 'redux-saga/effects'
import axios from 'axios'
import { buildToast, ToastTypes } from 'store/modules/toastActions'

import { get, baseURLNamespaceInvest } from 'services/api'
import { Types } from './types'
import { GetPointsDataSuccess, GetPointsDataFailure } from './action'

function* getData({ cpf }) {
  try {
    const response = yield call(
      get,
      `${baseURLNamespaceInvest}/programa-pontos/extrato?cpf=${cpf}`
    )

    if (
      response.data.Message &&
      (!response.data.cadastroPessoaProgramaType ||
        !response.data.detalheExtratoOptemaisTypes)
    ) {
      throw Error(response.data.Message.Mensagem)
    }

    yield put(GetPointsDataSuccess(response.data))
  } catch (err) {
    yield put(GetPointsDataFailure())
  }
}

function* postRescuePoints({ payload }) {
  const { onSuccess } = payload
  const RESCUE_POINTS_URL_TOKEN =
    process.env.REACT_APP_BASE_URL_RESCUE_POINTS_TOKEN
  const RESCUE_POINTS_URL_SYSTEM =
    process.env.REACT_APP_BASE_URL_RESCUE_POINTS_SYSTEM
  try {
    const cpf = yield select(state => state.auth.cpf)
    const { data } = yield call(axios.post, `${RESCUE_POINTS_URL_TOKEN}`, {
      cod_chave: cpf,
      cpf,
      cod_org: '040',
      cod_prog: '001',
    })
    onSuccess({
      url: `${RESCUE_POINTS_URL_SYSTEM}?token=${data.token}&CodOrg=040`,
    })
  } catch (err) {
    yield put({
      toast: buildToast(
        'Não foi possível realizar o resgate dos pontos neste momento.',
        ToastTypes.error
      ),
    })
  }
}

export default all([
  takeLatest(Types.GET_REQUEST, getData),
  takeLatest(Types.POST_RESCUE_POINTS_REQUEST, postRescuePoints),
])
