import { IFundsList } from 'store/modules/Investment/types'

export interface IFundCard {
  fund: IFundsList
  onMoreInformationClick: (fund: IFundsList) => void
  onAddToWalletClick: (fund: IFundsList) => void
  fundsIdsAlreadyOnWallet: number[]
}

export interface IMobileProps {
  funds: IFundsList[]
  onMoreInformationClick: (fund: IFundsList) => void
  onAddToWalletClick: (fund: IFundsList) => void
  fundsIdsAlreadyOnWallet: number[]
}
