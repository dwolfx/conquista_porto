interface IState {
  suitabilityInfo: { data: Object }
  auth: Object
}

export const getSuitabilityInfo = (state: IState) => state.suitabilityInfo.data
export const getAuth = (state: IState) => state.auth
