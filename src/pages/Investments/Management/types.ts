export type TFundsLayout = 'CARDS' | 'LIST'

export const FUNDS_FILTER_TYPES = {
  1: 'renda fixa',
  2: 'multimercado',
  3: 'renda variável',
  4: 'investimento no exterior',
  5: 'cambial',
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
