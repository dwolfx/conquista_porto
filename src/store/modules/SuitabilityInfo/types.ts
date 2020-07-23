export const Types = {
  SUITABILITY_INFO_GET_DATA_REQUEST: 'SUITABILITY_INFO_GET_DATA_REQUEST',
  SUITABILITY_INFO_GET_DATA_SUCCESS: 'SUITABILITY_INFO_GET_DATA_SUCCESS',
  SUITABILITY_INFO_GET_DATA_REQUEST_VALIDATE:
    'SUITABILITY_INFO_GET_DATA_REQUEST_VALIDATE',
  SUITABILITY_INFO_GET_DATA_FAILURE: 'SUITABILITY_INFO_GET_DATA_FAILURE',
}

export interface ISuitabilityInfo {
  CotistaContaOrdemPortoPar: string
  codigo_status_cotista: string
  id_cotista?: string
  investidor_profissional: string
  investidor_qualificado: string
  status_cotista: boolean
  status_data_vencimento_cadastro: boolean
  status_data_vigencia_suitability: boolean
  status_possui_suitability: boolean
  isValid?: boolean
}
