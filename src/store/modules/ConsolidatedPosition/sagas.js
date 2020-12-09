import { all, takeLatest, call, put } from 'redux-saga/effects'

import {
  get,
  // baseURLNamespaceAtlas,
  baseURLNamespaceInvest,
} from 'services/api'

import { loggerSucess, loggerError } from 'logger'
import { Types } from './types'
import {
  GetConsolidatedPositionDataSuccess,
  GetConsolidatedPositionDataFailure,
} from './action'

export function* getData() {
  const getConsolidatedPositionURL = `${baseURLNamespaceInvest}/cotistas/posicao-consolidada`
  try {
    const response = yield call(get, getConsolidatedPositionURL)
    /*
      Esta alteração "remendo" que estamos fazendo na release 3.1.1, é para ajustar
      um problema que ocorreu no dia 23/09/2020. Ao subir a release 3.1.1 em
      produção a equipe de TI da Porto Seguro, (Anselmo) pediram que fosse alterado
      o end-point abaixo para a versão anterior acima. Em homologação "Porto",
      o novo serviço abaixo retorna os dados como deveria:
        {
          "categorias": [
            {
              "nome": "Multimercado",
              "valor": 16488884.2
            },
            {
              "nome": "Investimento no exterior",
              "valor": 88298.71
            },
            {
              "nome": "Cambial",
              "valor": 47424.17
            },
            {
              "nome": "Renda Fixa",
              "valor": 712125.40
            },
            {
              "nome": "Renda Variável",
              "valor": 3654814.94
            }
          ],
          "saldo_total": 20991547.42
        }
      Porém este serviço em ambiente de produção "Porto" retorna os dados de posição cotista.
      Ao invés de resolver o problema na sua origem, resolveram pedir para a equipe evolução
      da Sciensa resolver aqui no frontend, porque segundo eles não seria possível subir backend
      do conquista antes da "RDM" de sexta-feira 25/09/2020.

      Com o serviço acima o retorno passa a ser o seguinte:
        {
        "categorias": [
          {
            "nome": "Multimercado",
            "valor": 16488884.2
          },
          {
            "nome": "Investimento no exterior",
            "valor": 88298.71
          },
          {
            "nome": "Cambial",
            "valor": 47424.17
          },
          {
            "nome": "Renda Fixa",
            "valor": 712125.40
          },
          {
            "nome": "Renda Variável",
            "valor": 3654814.94
          }
        ],
        "saldototal": 20991547.42
      }
      Esta alteração de um serviço para outro mudaram o nome da propriedade de
      "saldototal" para "saldo_total". Esta mudança nos obriga a trocar
      este campo em todos os lugares que o utilizam, causando assim várias
      alterações que seriam desnecessárias se padrões e boas práticas fosse
      seguidos pelas API's que o conquista consome.
    */

    /*
      const response = yield call(
      get,
      `${baseURLNamespaceAtlas}/cotista/posicao/consolidado`
      )
    */

    yield put(GetConsolidatedPositionDataSuccess(response.data))
    loggerSucess(getConsolidatedPositionURL, 'GET', response?.status)
  } catch (err) {
    yield put(GetConsolidatedPositionDataFailure())
    loggerError(getConsolidatedPositionURL, 'GET', err)
  }
}

export default all([takeLatest(Types.GET_REQUEST, getData)])
