import InformationConfirmation from '../Hire/InformationConfirmation'
import ChooseState from './ChooseState'
import ContemplatedValue from './ContemplatedValue'

export const Steps = {
  chooseState: ChooseState,
  contemplatedStep: ContemplatedValue,
  informationConfirmationStep: InformationConfirmation,
}

export interface IFormConsortiumBuilding {
  tipoPessoa: number
  tipoBusca: number
  codigoTipoGrupo: number
  codigoProduto: 1
  valorCredito?: number
  uf: string
  codigoCanal: number
}

export interface IMaxMinProductResponse {
  codigoProduto: 1
  valorMinimoParcela: number
  valorMaximoParcela: number
  valorMinimoCredito: number
  valorMaximoCredito: number
}
