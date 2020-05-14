interface IState {
  suitabilityInfo: { data: Object }
  bankData: { data: Object }
}

export const getSuitabilityInfo = (state: IState) => state.suitabilityInfo.data
export const getBankData = (state: IState) => state.bankData.data
