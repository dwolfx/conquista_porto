import {
  ICreditCardProposalResponse,
  ICreditCardProposalRequest,
} from 'pages/CreditCard/Creation/types'
import { axiosInstance } from 'services/api'

export const getParams = (encodedQueryParams: string) => {
  return JSON.parse(
    `{"${decodeURIComponent(encodedQueryParams)
      .replace(/\+/g, ' ')
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')}"}`
  )
}

export const isFormValid = (
  proposalData: ICreditCardProposalResponse,
  isChecked: boolean
) =>
  Object.keys(proposalData).every((key: string) => {
    if (key === 'complemento') {
      return true
    }
    return proposalData[key as keyof ICreditCardProposalResponse] !== ''
  }) && isChecked

export const populateData = (
  lockerProposalData: ICreditCardProposalRequest,
  setProposalData: React.Dispatch<
    React.SetStateAction<ICreditCardProposalResponse>
  >
) => {
  setProposalData({
    bairro: lockerProposalData.bairroResidencial,
    cep: lockerProposalData.cepResidencial?.replace('-', ''),
    cidade: lockerProposalData.cidadeResidencial,
    codigoBandeira: lockerProposalData.bandeira,
    codigoCanal: '14',
    susep: 'CONQ1J', //Nao sei onde pega
    codigoEstadoCivil: lockerProposalData.estadoCivil,
    codigoProfissao: lockerProposalData.ocupacao,
    complemento: lockerProposalData.complementoResidencial,
    dataEmissaoDocumento: lockerProposalData.dataExpedicao,
    dataNascimento: lockerProposalData.nascimento,
    dddTelefone: lockerProposalData?.celular?.slice(0, 2),
    diaVencimento: lockerProposalData.diaVencimento,
    email: lockerProposalData.email,
    idSimulacao: lockerProposalData.idSimulacao,
    logradouro: lockerProposalData.enderecoResidencial,
    nome: 'Huhu', //Nao sei onde pega
    nomeMae: lockerProposalData.nomeMae,
    numeroDocumentoIdentificacao: lockerProposalData.numeroDocumento,
    numeroLogradouro: lockerProposalData.numeroResidencial,
    numeroTelefone: lockerProposalData?.celular?.slice(2, 11),
    orgaoExpedidor: lockerProposalData.orgaoEmissor,
    sexo: lockerProposalData.sexo,
    tipoDocumento: lockerProposalData.tipoDocumento,
    uf: lockerProposalData.uf,
  })
}

export const getSummaryProposal = async (
  token: string,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setHasError: React.Dispatch<React.SetStateAction<boolean>>,
  setLockerProposalData: React.Dispatch<
    React.SetStateAction<ICreditCardProposalRequest | undefined>
  >
) => {
  setIsLoading(true)
  setHasError(false)
  await axiosInstance
    .get(`/investimento/seguranca/v1/conquista/locker`, {
      params: {
        token: token,
      },
    })
    .then(response => {
      setLockerProposalData(getParams(response.data.data.params))
      return response
    })
    .catch(e => {
      setHasError(true)
    })
    .finally(() => setIsLoading(false))
}
