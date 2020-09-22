export const Types = {
  POST_REQUEST: 'MANAGEMENT_POST_REQUEST',
  POST_SUCCESS: 'MANAGEMENT_POST_SUCCESS',
  POST_FAILURE: 'MANAGEMENT_POST_FAILURE',
  POST_SAVE_FUNDS_REQUEST: 'SAVE_FUNDS_POST_REQUEST',
  POST_SAVE_FUNDS_SUCCESS: 'SAVE_FUNDS_POST_SUCCESS',
  POST_SAVE_FUNDS_FAILURE: 'SAVE_FUNDS_POST_FAILURE',
  GET_REQUEST: 'MANAGEMENT_GET_REQUEST',
  GET_SUCCESS: 'MANAGEMENT_GET_SUCCESS',
  GET_FAILURE: 'MANAGEMENT_GET_FAILURE',
  GET_OTHER_GOALS_REQUEST: 'MANAGEMENT_GET_OTHER_GOALS_REQUEST',
  GET_OTHER_GOALS_SUCCESS: 'MANAGEMENT_GET_OTHER_GOALS_SUCCESS',
  GET_OTHER_GOALS_FAILURE: 'MANAGEMENT_GET_OTHER_GOALS_FAILURE',
  DELETE_REQUEST: 'MANAGEMENT_DELETE_REQUEST',
  DELETE_SUCCESS: 'MANAGEMENT_DELETE_SUCCESS',
  DELETE_FAILURE: 'MANAGEMENT_DELETE_FAILURE',
  CLEAN_DATA: 'MANAGEMENT_CLEAN_DATA',
}

type TMonthsInNumbers =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12'

type TYear = {
  year: number
  month_map: {
    [key in TMonthsInNumbers]: {
      projected_balance: number
      deposit: number
      expected_deposit: number
    }
  }
}

type TObjectiveFunds = {
  id: number
  fund_wallet_type: string
  name: string
  nickname: string
  initial_deposit: number
  monthly_deposit: number
  balance: number
  available: number
  invested: number
  fund_active: boolean
  release_to_apply: boolean
  release_to_rescue: boolean
  goals: {
    id: number
    name: string
    value: number
    goal_type: number
  }[]
}

export interface IObjectManagement {
  id: number
  nickname: string
  initial_value: number
  monthly_value: number
  target_value: number
  target_date: string
  goal_type: number
  conquered: boolean
  total_balance: number
  years: TYear[]
  fund_list: TObjectiveFunds[]
  additional: {
    [key in 'travel_security' | 'life_security' | 'credit_card']: boolean
  }
  credit_product: {
    name: string
    values: {
      name: string
      value: string
      checked: boolean
    }[]
  }
}
