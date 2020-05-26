interface IState {
  suitabilityInfo: { data: Object }
  bankData: { data: Object }
  customerProfile: { data: Object }
  auth: Object
}

export const getSuitabilityInfo = (state: IState) => state.suitabilityInfo.data
export const getCustomerProfile = (state: IState) => state.customerProfile.data
export const getAuth = (state: IState) => state.auth
