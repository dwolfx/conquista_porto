import { all, takeLatest, call, put, select } from 'redux-saga/effects'

import { get, post, baseURLNamespaceInvest } from 'services/api'
import {
  Types,
  IGetFinantialApplicationPayload,
  IPostFinantialApplicationPayload,
} from './types'
import { getAuth, getSuitabilityInfo } from './selectors'
import {
  GetFinantialApplicationDataSuccess,
  GetFinantialApplicationDataFailure,
  PostFinantialApplicationDataSuccess,
  PostFinantialApplicationDataFailure,
} from './action'

// Fluxo de aplicação financeira
// Ordem das chamadas:
//  - 1ª: GetFinantialApplicationDataRequest (FinantialApplication>sagas) - (Informações do fundo, saldo e cotista)
//  - 2ª: GetFinantialApplicationDataRequest (FinantialApplication>sagas) - (Informações do fundo, saldo e cotista)
//    - VERIFICAR "fechado_aplicacao" (primeira chamada) e se ele estiver "true", adicione mais 1 dia na
//      data e (segunda chamada do mesmo serviço) verifique o campo "data_operação", que trará o próximo
//      dia útil em que será efetuada a aplicação de fato.
//  - 3ª: GetIsAwareOfTermsDataRequest (FinantialApplication>IsAwareOfTerms>sagas) - (Informações sobre o Termo de Desenquadramento)
//  - 4ª: GetAlignmentTermsDataRequest (FinantialApplication>AlignmentTerms>sagas) - (Evia a resposta do Termo de Adesão por queryParam e retorna informações da conta)
//  - 5ª: PostFinantialApplicationDataRequest (FinantialApplication>sagas) - (Efetua a aplicação no fundo e retorna a situação da operação)

//  1ª e 2ª Chamada - Efetuar ao entrar no fluxo de investimento.
//  Significado de atributos segundo o Vitor Vannuchi:
//    - VALIDAR se o fundo está disponível de acordo com a hora do dia  =>
//      - "fechado_aplicacao: true" = significa que o fundo está fechado para aplicação de acordo com a hora limite e o dia.
//      - "hora_aplicacao: 23:59" = campo visual, utilizar apenas para exibir a hora limite de aplicação do fundo (13h, 15h).
//    - VALIDAR se o fundo está disponível de acordo com a data =>
//      - "fechado_aplicacao: true" = significa que o fundo está fechado para aplicação de acordo com a hora limite e o dia.
//        - se o valor do "fechado_aplicacao" for "true" então será jogado para o próximo dia útil.
// ** ATENÇÃO ** Durante a reunião de sexta-feira a noite, Vitor Vannuchi afirmou que este campo está observando apenas a hora e que iria abrir um TICKET sobre a pendência de validação.**
//    - VALIDAR se o checkbox de termo de adesão deve aparecer ou não =>
//      - "aderente_fundo: true" = significa que o cotista já aceitou o termo em outro momento, então o valor retornado na 4ª
//      chamada deve ser "aceite_termo_adesao=N".
//      - "aderente_fundo: false" = significa que o cotista não aceitou o termo em outro momento, então o valor retornado na 4ª
//      chamada deve ser "aceite_termo_adesao=S".
//  3ª Chamada - Efetuar ao clicar no botão "PRÓXIMO" no primeiro step do fluxo.
//    - VALIDAR se deve ou não exibir o modal e o Termo de Desenquadramento =>
//      -  "status_enquadramento: Desenquadrado" = exibir o modal e o Termo de Desenquadramento.
//        - se o valor do campo "status_enquadramento" for "Enquadrado", seguir para o segundo step do fluxo e deixar o valor default do campo ("N").
//        - caso o cotista não aceite o termo, permanecer no primeiro step.
//  4ª e 5ª chamada - Devem ser efetuadas ao clicar no botão "CONFIRMAR" do segundo step do fluxo.

function* getFinantialApplicationData({
  payload: { data, onErrorToast, onSuccess },
}: IGetFinantialApplicationPayload) {
  // data_operacao = YYYY-MM-DD
  const { id_fundo, data_operacao } = data
  const { id_cotista } = yield select(getSuitabilityInfo)
  const { cpf } = yield select(getAuth)

  try {
    const response = yield call(
      get,
      `${baseURLNamespaceInvest}/aws/cotista/aplicacoes?id_fundo=${id_fundo}&id_cotista=${id_cotista}&cpf_cnpj=${cpf}&data_operacao=${data_operacao}`
    )

    yield put(GetFinantialApplicationDataSuccess(response.data))

    if (onSuccess) {
      onSuccess(response.data)
    }
  } catch (err) {
    yield put(GetFinantialApplicationDataFailure(err))
    onErrorToast({
      type: 'error',
      description: 'Por favor, tente novamente',
      title: 'Erro ao enviar solicitação.',
    })
  }
}

function* postFinantialApplicationData({
  payload: { data, onErrorToast },
}: IPostFinantialApplicationPayload) {
  // date = YYYY-MM-DD
  const { id_cotista } = yield select(getSuitabilityInfo)
  const { cpf } = yield select(getAuth)

  try {
    const response = yield call(
      post,
      `${baseURLNamespaceInvest}/aws/cotista/aplicacoes`,
      { ...data, cpf_cnpj: cpf, id_cotista: id_cotista }
    )

    yield put(PostFinantialApplicationDataSuccess(response.data))
  } catch (err) {
    yield put(PostFinantialApplicationDataFailure(err))
    onErrorToast({
      type: 'error',
      description: 'Por favor, tente novamente',
      title: 'Erro ao enviar solicitação.',
    })
  }
}

export const finantialApplicationGetData = all([
  takeLatest(Types.DATA_GET_REQUEST, getFinantialApplicationData),
])
export const finantialApplicationPostData = all([
  takeLatest(Types.DATA_POST_REQUEST, postFinantialApplicationData),
])
