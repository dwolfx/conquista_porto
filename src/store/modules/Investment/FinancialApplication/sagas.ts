import { all, takeLatest, call, put, select } from 'redux-saga/effects'

import { get, post, baseURLNamespaceInvestAws } from 'services/api'
import {
  Types,
  IGetFinancialApplicationPayload,
  IPostFinancialApplicationPayload,
} from './types'
import { getAuth, getSuitabilityInfo } from './selectors'
import {
  GetFinancialApplicationDataSuccess,
  GetFinancialApplicationDataFailure,
  PostFinancialApplicationDataSuccess,
  PostFinancialApplicationDataFailure,
} from './action'

// Fluxo de aplicação financeira
// Ordem das chamadas:
//  - 1ª: GetFinantialApplicationDataRequest (FinantialApplication>sagas) - (Informações do fundo, saldo e cotista)
//  - 2ª: GetFinantialApplicationDataRequest (FinantialApplication>sagas) - (Informações do fundo, saldo e cotista)
//  - 3ª: GetFinantialApplicationDataRequest (FinantialApplication>sagas) - (Informações do fundo, saldo e cotista)
//  - 4ª: GetAlignmentTermsDataRequest (FinantialApplication>AlignmentTerms>sagas) - (Retorna o "status_enquadramento"
// utilizado para saber se a tela de termo de desenquadramento será chamada)
//  - 5ª: PostFinantialApplicationDataRequest (FinantialApplication>sagas) - (Efetua o envio das informações de
// aplicação no fundo e retorna a situação da operação)
//
//  1ª e 2ª Chamada - Efetuar ao entrar no fluxo de investimento.
//    - VERIFICAR "fechado_aplicacao" (primeira chamada) e se ele estiver "true", adicione mais 1 dia na
//      data e (segunda chamada do mesmo serviço) verifique o campo "data_operação", que trará o próximo
//      dia útil em que será efetuada a aplicação de fato.
//    - VERIFICAR "aderente_fundo", caso seja verdadeiro o checkbox de termo adesão não deve aparecer.
//  Validação dos atributos segundo o Vitor Vannuchi:
//    - VALIDAR se o fundo está disponível de acordo com a hora do dia  =>
//      - "fechado_aplicacao: true" = significa que o fundo está fechado para aplicação de acordo com a hora limite e o dia.
//      - "hora_aplicacao: 23:59" = campo visual, utilizar apenas para exibir a hora limite de aplicação do fundo (13h, 15h).
//    - VALIDAR se o fundo está disponível de acordo com a data =>
//      - "fechado_aplicacao: true" = significa que o fundo está fechado para aplicação de acordo com a hora limite e o dia.
//        - se o valor do "fechado_aplicacao" for "true" então será jogado para o próximo dia útil.
// ** ATENÇÃO ** Durante a reunião de sexta-feira a noite, Vitor Vannuchi afirmou que este campo está observando apenas a hora e que iria abrir um TICKET sobre a pendência de validação.**
//    - VALIDAR se o checkbox de termo de adesão deve aparecer ou não =>
//      - "aderente_fundo: true" = significa que o cotista já aceitou o termo em outro momento, então o valor retornado na 5ª
//      chamada deve ser "aceite_termo_adesao=N".
//      - "aderente_fundo: false" = significa que o cotista não aceitou o termo em outro momento, então o valor retornado na 5ª
//      chamada deve ser "aceite_termo_adesao=S".
//  3ª Chamada - Efetuar ao clicar no botão "PRÓXIMO" do primeiro step do fluxo APENAS se o usuário alterou a data do input.
//    - VALIDAR se a data foi alterada pelo usuário, se foi alterada o serviço deve ser chamado novamente e efetuar a
//      mesma validação da primeira chamada em relação ao "fechado_aplicacao" e o "data_operacao"
//  4ª Chamada - Efetuar ao clicar no botão "PRÓXIMO" do primeiro step do fluxo.
//    - VALIDAR se deve ou não exibir o modal e o Termo de Desenquadramento =>
//      - "status_enquadramento: Desenquadrado" = exibir o modal e o Termo de Desenquadramento.
//      - se o valor do campo "status_enquadramento" for "Enquadrado", seguir para o segundo step do fluxo e deixar o valor default do campo ("N").
//      - caso o cotista não aceite o termo, permanecer no primeiro step.
//  5ª Chamada - Deve ser efetuada ao clicar no botão "CONFIRMAR" ou "TENTAR NOVAMENTE" do segundo step do fluxo enviando os dados
//  "aceite_termo_adesao", "id_fundo", "id_cotista", "cpf_cnpj", "valor", "data", "ciencia_desenquadramento"

export function* getFinancialApplicationData({
  payload: { data, onErrorToast, onSuccess },
}: IGetFinancialApplicationPayload) {
  // data_operacao = YYYY-MM-DD
  const { id_fundo, data_operacao } = data
  const { id_cotista } = yield select(getSuitabilityInfo)
  const { cpf } = yield select(getAuth)

  try {
    const response = yield call(
      get,
      `${baseURLNamespaceInvestAws}/cotista/aplicacoes?id_fundo=${id_fundo}&id_cotista=${id_cotista}&cpf_cnpj=${cpf}&data_operacao=${data_operacao}`
    )

    yield put(GetFinancialApplicationDataSuccess(response.data))

    if (onSuccess) {
      onSuccess(response.data)
    }
  } catch (err) {
    yield put(GetFinancialApplicationDataFailure(err))
    onErrorToast({
      type: 'error',
      description: 'Por favor, tente novamente',
      title: 'Erro ao enviar solicitação.',
    })
  }
}

export function* postFinancialApplicationData({
  payload: { data, onError, onSuccess },
}: IPostFinancialApplicationPayload) {
  const { id_cotista } = yield select(getSuitabilityInfo)
  const { cpf } = yield select(getAuth)

  try {
    const response = yield call(
      post,
      `${baseURLNamespaceInvestAws}/cotista/aplicacoes`,
      {
        ...data,
        cpf_cnpj: cpf,
        id_cotista: id_cotista,
        ciencia_desenquadramento: 'S',
      }
    )

    yield put(PostFinancialApplicationDataSuccess(response.data))

    if (onSuccess) {
      onSuccess()
    }
  } catch (err) {
    yield put(PostFinancialApplicationDataFailure(err))
    if (onError) {
      onError()
    }
  }
}

export const financialApplicationGetData = all([
  takeLatest(Types.DATA_GET_REQUEST, getFinancialApplicationData),
])
export const financialApplicationPostData = all([
  takeLatest(Types.DATA_POST_REQUEST, postFinancialApplicationData),
])
