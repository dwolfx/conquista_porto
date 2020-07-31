interface IState {
  redeemSummaryData: { data: Object }
}

export const getSummaryRedeem = (state: IState) => state.redeemSummaryData.data
