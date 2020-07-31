export type TFundsLayout = 'CARDS' | 'LIST'

export const RISK_FILTER_TYPES = {
  baixo: 'Baixo',
  'medio-baixo': 'Médio Baixo',
  medio: 'Médio',
  'medio-alto': 'Médio Alto',
  alto: 'Alto',
}

export const GTM_DATA_FUNDS_FILTROS = {
  'data-gtm-subname': 'fundos filtros',
  'data-gtm-type': 'click',
  'data-gtm-clicktype': 'button',
}

export const GTM_DATA_FUNDS_FILTROS_DRAWER = {
  'data-gtm-subname': 'fundos filtros drawer',
  'data-gtm-type': 'click',
  'data-gtm-clicktype': 'button',
}
export interface IModalProps {
  isOpen: boolean
  title: string
  description: string
  button: IButton
}

interface IButton {
  dataGtmName: string
  dataGtmType: string
  dataGtmClicktype: string
  handleClick: any
  buttonName: string
}

export interface IValidProps {
  isValid: boolean
}

export enum InvestorAccountInfoEnum {
  INFO_TOTAL_BALANCE = 'info-total-ballance',
  INFO_SETTLE_BALANCE = 'info-settle-ballance',
}
