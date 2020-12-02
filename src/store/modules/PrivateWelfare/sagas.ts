import { all, call, put, takeLatest } from 'redux-saga/effects'
import { get } from 'services/api'
import { Types, IPrivateWelfare } from './types'
import {
  GetPrivateWelfareEmpty,
  GetPrivateWelfareFailure,
  GetPrivateWelfareSuccess,
  GetPrivateWelfareWithStatusPREFailure,
  GetPrivateWelfareWithStatusPRESuccess,
} from './action'
import { baseURLNamespaceInvestPrevidencia } from 'services/apiConfig'
import BadRequestException from 'services/exceptions/BadRequestException'

export function* getPrivateWelfareData() {
  try {
    const { data } = yield call(
      get,
      `${baseURLNamespaceInvestPrevidencia}/adesoes/titular/cpf`
    )

    //garante que o retorno será um array
    const newData = [data].flatMap(item => item)

    //pega todas as previdências que não possuem status 'CAN' ou 'RCH' ou 'ERR
    const filteredData: IPrivateWelfare[] = [...newData].filter(
      (pv: IPrivateWelfare) =>
        pv.status !== 'CAN' && pv.status !== 'RCH' && pv.status !== 'ERR'
    )

    //garante que o retorno do campo 'benefits' será um array
    const filteredDataWithNewBenefitsArray = [...filteredData].map(pv => {
      return { ...pv, benefits: [pv.benefits].flatMap(item => item) }
    })

    if (filteredDataWithNewBenefitsArray.length) {
      yield put(GetPrivateWelfareSuccess(filteredDataWithNewBenefitsArray))
    } else {
      yield put(GetPrivateWelfareEmpty())
    }
  } catch (e) {
    if (e instanceof BadRequestException) {
      yield put(GetPrivateWelfareEmpty())
    } else {
      yield put(GetPrivateWelfareFailure())
    }
  }
}

export function* getPrivateWelfareWithStatusPRE() {
  try {
    const { data } = yield call(
      get,
      `${baseURLNamespaceInvestPrevidencia}/adesoes/aprovada/titular/cpf`
    )

    if (data) {
      yield put(GetPrivateWelfareWithStatusPRESuccess(data))
    }
  } catch (e) {
    yield put(GetPrivateWelfareWithStatusPREFailure())
  }
}

export default all([
  takeLatest(Types.PRIVATE_WELFARE_REQUEST, getPrivateWelfareData),
  takeLatest(
    Types.PRIVATE_WELFARE_WITH_STATUS_PRE_REQUEST,
    getPrivateWelfareWithStatusPRE
  ),
])
