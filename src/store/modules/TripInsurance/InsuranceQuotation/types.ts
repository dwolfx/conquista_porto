import { IToast } from 'hooks/toast'

export const Types = {
  POST_INSURANCE_QUOTATION_REQUEST: 'POST_INSURANCE_QUOTATION_REQUEST',
  POST_INSURANCE_QUOTATION_SUCCESS: 'POST_INSURANCE_QUOTATION_SUCCESS',
  POST_INSURANCE_QUOTATION_FAILURE: 'POST_INSURANCE_QUOTATION_FAILURE',
}

export interface IAction {
  type: keyof typeof Types
  payload: IInsuranceQuotationResponse
}

export interface IAdditionalCountries {
  codigo: string
  descricao?: string
}

export interface IMainPassenger {
  numeroCpf?: string
  digitoCpf?: string
}

export interface IInsuranceQuotationRequest {
  dataIda?: string
  dataVolta?: string
  motivoViagem?: 1
  isPraticaAventura?: boolean
  isMotocicleta?: boolean
  qtdPassagMenorSetentaAnos?: number
  qtdPassagMaiorSetentaAnos?: number
  codigoUfOrigem?: string
  codigoPaisDestino?: string | string[]
  paisesAdicionais?: IAdditionalCountries[]
  passageiroPrincipal?: IMainPassenger
  codigoCanal?: 1
}

export interface ICoverage {
  valor: string
  descricao: string
}

export interface ICreditCardInstallment {
  valor: string
  id: string
  descricao: string
}

export interface IPlan {
  valorCartaoPortoSeguro: string
  ViagemCobertura: {
    coberturas: ICoverage[]
  }
  valorAssistencia: string
  formasPagamento: {
    listaParcelamentoCartao: ICreditCardInstallment[]
    listaParcelamentoCartaoPorto: ICreditCardInstallment[]
  }
  valorTotal: string
  codigoPlano: string
  nomePlano: string
  urlManualPlano: string
  valorSeguroBruto: string
}

export interface IInsuranceQuotationResponse {
  ViagemPacote: {
    pacotes: IPlan[]
  }
  urlManuais: string
  urlCondicoesGerais: string
  Message: {
    TipoCritica: string
    Mensagem: string
  }
  idSimulacao: string
}

export interface ITripInsuranceQuotation {
  data: IInsuranceQuotationResponse | null
  isLoading: boolean
  hasError: boolean
}

export interface IPayload {
  type: keyof typeof Types
  payload: IInsuranceQuotationRequest
  onErrorToast: (toast: Omit<IToast, 'id'>) => void
  onSuccess?: () => void
}
