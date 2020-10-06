import { takeLatest, call, put } from 'redux-saga/effects'
import { post } from 'services/api'
import { Types, IGetPrivateWelfareRequestData, IPrivateWelfare } from './types'
import {
  GetPrivateWelfareFailure,
  GetPrivateWelfareSuccess,
  GetPrivateWelfareEmpty
} from './action'
import { baseURLNamespaceInvestPrevidencia } from 'services/apiConfig'
import BadRequestException from 'services/exceptions/BadRequestException'

export function* getData({ cpf }: IGetPrivateWelfareRequestData) {
  try {
    const postPayload = {
      filter: {
        companyId: "",
        productId: "",
        cpf,
        cnpj: "",
        sponsorAccountId: "",
        certificateId: "",
        clientName: "",
        certificateStatus: "",
        paymentStatus: "",
        status: "",
        affiliationId: "",
        planId: "",
        benefitId: "",
        clientId: "",
        withdrawalId: ""
      }
    }
    const { data } = yield call(
      post,
      `${baseURLNamespaceInvestPrevidencia}/conquista/arenasimcontratprodutosprevidenciaService/api/consulta/adesao`, postPayload)

    const filteredData: IPrivateWelfare[] = data.filter((pv: IPrivateWelfare) => pv.status !== 'ERR')

    if (filteredData.length) {
      yield put(GetPrivateWelfareSuccess(filteredData))
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

export default takeLatest(Types.PRIVATE_WELFARE_REQUEST, getData)
