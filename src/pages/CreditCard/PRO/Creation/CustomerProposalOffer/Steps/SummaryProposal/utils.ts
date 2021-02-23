import { IToast } from 'hooks/toast'
import { axiosInstance } from 'services/api'
import { baseURLNamespacePROCartao, baseURLNamespaceInvestAws } from 'services/apiConfig'
import {
  ICreditCardProposalResponse,
  ICreditCardProposalRequest,
  IOrderResponse,
  ICreditCardCreationPayload,
} from 'pages/CreditCard/Creation/types'

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
  >,
  proposalData: ICreditCardProposalResponse
) => {
  setProposalData({
    bairro: lockerProposalData.bairroResidencial,
    cep: lockerProposalData.cepResidencial?.replace('-', ''),
    cidade: lockerProposalData.cidadeResidencial,
    codigoBandeira: lockerProposalData.bandeira,
    codigoCanal: '14',
    complemento: lockerProposalData.complementoResidencial,
    diaVencimento: lockerProposalData.diaVencimento,
    logradouro: lockerProposalData.enderecoResidencial,
    numeroLogradouro: lockerProposalData.numeroResidencial,
    uf: lockerProposalData.estadoResidencial,
    codigoEstadoCivil: '',
    codigoProfissao: '',
    dataEmissaoDocumento: '',
    nomeMae: '',
    numeroDocumentoIdentificacao: '',
    orgaoExpedidor: '',
    sexo: '',
    tipoDocumento: '',
    ...proposalData
  })
}

export const getSummaryProposal = async (
  keyRedis: string,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setHasError: React.Dispatch<React.SetStateAction<boolean>>,
  setLockerProposalData: React.Dispatch<
    React.SetStateAction<ICreditCardProposalRequest | undefined>
  >
) => {
  setIsLoading(true)
  setHasError(false)
  try {
    const { data } = await axiosInstance.get(`${baseURLNamespacePROCartao}/proposta/${keyRedis}`)
    const payload: ICreditCardProposalRequest = {
      bandeira: data.bandeira,
      diaVencimento: data.dataVencimento,
      bairroResidencial: data.enderecoRecebimento.bairro,
      cepResidencial: data.enderecoRecebimento.cep,
      cidadeResidencial: data.enderecoRecebimento.cidade,
      complementoResidencial: data.enderecoRecebimento.complemento,
      enderecoResidencial: data.enderecoRecebimento.endereco,
      estadoResidencial: data.enderecoRecebimento.estado,
      numeroResidencial: data.enderecoRecebimento.numero
    }
    setLockerProposalData(payload)
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
    const { data } = await axiosInstance.post(
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
