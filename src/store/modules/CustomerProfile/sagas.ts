import { get, baseURLNamespaceInvest } from 'services/api'
import { GetDataSuccess, GetDataFailure } from './action'
import { all, takeLatest, call, put } from 'redux-saga/effects'
import { Types } from './types'

interface IPayload {
  type: string
  payload: {
    cpfCnpj: string
  }
}

function* getData({ payload }: IPayload) {
  /*
    - Criar atividade no Jira;
    - Verificar onde deve ter alteração com o Bruno;
    - Documentar este comentário na estória no Jira;
    novo serviço para trazer os dados do cliente
    request: `https://apihml.portoseguro.brasil:8443/investimento/v1/perfil/dados-cliente?cpfCnpj=${cpf}`
    response success:
    {
      "emailCliente": "ricardo.eufrasio@portoseguro.com.br",
      "estado": "SP",
      "Message": {
          "TipoCritica": "SUCESSO",
          "Mensagem": "SUCESSO"
      },
      "numeroEnderecoResidencial": "11",
      "numeroTelefone": "996229303",
      "cpfCnpj": "36275312807",
      "dddNumeroTelefone": "11",
      "nomeCliente": "Rubao",
      "dataNascimento": "1981-11-11T00:00:00-03:00",
      "cep": "01010010"
    }
    response !== OK:
    {
      "Message": {
          "TipoCritica": "SUCESSO",
          "Mensagem": "SUCESSO"
      },
      "is_cadastrado": false
    }
  */
  const { cpfCnpj } = payload
  try {
    const response = yield call(
      get,
      `${baseURLNamespaceInvest}/perfil/dados-cliente?cpfCnpj=${cpfCnpj}`
    )
    yield put(GetDataSuccess(response.data))
  } catch (err) {
    yield put({
      ...GetDataFailure(),
    })
  }
}

export default all([
  takeLatest(Types.CUSTOMER_PROFILE_GET_DATA_REQUEST, getData),
])
