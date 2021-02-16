import InformationConfirmation from '../Hire/InformationConfirmation'
import ChooseState from './ChooseState'
import ContemplatedValue from './ContemplatedValue'

export const Steps = {
  chooseState: ChooseState,
  contemplatedStep: ContemplatedValue,
  informationConfirmationStep: InformationConfirmation,
}

export interface IFormConsortiumBuilding {
  tipoPessoa: 1
  tipoBusca: 3
  codigoProduto: 1
  valorCredito?: number
  uf: string
  codigoCanal: 7
}

export interface IMaxMinProductResponse {
  codigoProduto: 1
  valorMinimoParcela: number
  valorMaximoParcela: number
  valorMinimoCredito: number
  valorMaximoCredito: number
}
