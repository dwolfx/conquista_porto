import { IToast } from 'hooks/toast'
import {
  ICreditCardProposalResponse,
  ICreditCardProposalRequest,
  IOrderResponse,
  ICreditCardCreationPayload,
} from 'pages/CreditCard/Creation/types'
import { axiosInstance, baseURLNamespaceInvestAws, post } from 'services/api'

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
  try {
    const response = await axiosInstance.get(
      `/investimento/seguranca/v1/conquista/locker`,
      {
        params: {
          token: token,
        },
      }
    )
    setLockerProposalData(getParams(response.data.data.params))
  } catch (e) {
    setHasError(true)
  } finally {
    setIsLoading(false)
  }
}

export const handlePostSubmit = async (
  formData: ICreditCardCreationPayload,
  setFormResponse: (value: React.SetStateAction<IOrderResponse>) => void,
  setSubmitErrorCount: (value: React.SetStateAction<number>) => void,
  submitErrorCount: number,
  addToast: (toast: Pick<IToast, 'type' | 'title' | 'description'>) => void,
  setIsButtonLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    setIsButtonLoading(true)
    const { data } = await post(
      `${baseURLNamespaceInvestAws}/cartoes/solicitacao`,
      formData
    )

    if (data) {
      setFormResponse(data)
    }
    setIsButtonLoading(false)
  } catch (error) {
    setIsButtonLoading(false)
    setSubmitErrorCount(submitErrorCount + 1)
    addToast({
      type: 'error',
      title: 'Desculpe, ocorreu uma falha ao enviar a solicitação',
      description: JSON.parse(error.message)?.msg,
    })

    if (submitErrorCount + 1 === 3) {
      setFormResponse({})
    }
  }
}
