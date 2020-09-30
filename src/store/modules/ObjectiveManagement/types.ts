import { TProfitability } from 'store/modules/Objective/types'

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

export type TObjectiveFunds = {
  name: string
  nickname: string
  arena_category: string
  classification: string
  benchmark: string
  balance: number
  available: number
  invested: number
  fund_id: number
  order_profile_risk: 1 | 2 | 3 | 4 | 5
  initial_date: string
  min_initial_value: number
  min_value_to_apply: number
  release_to_apply: boolean
  release_to_rescue: boolean
  min_balance_value: number
  time_limit_to_apply: string
  quotation_apply_days: string
  financial_apply_days: string
  quotation_rescue_days: string
  financial_rescue_days: string
  anbima_category: string
  adm_tax: number
  performance_rate: number
  url_performance_info_pdf: string
  url_fund_rules_pdf: string
  is_fund_active: boolean
  initial_value: number
  monthly_value: number
  fund_wallet_type: string
  goals: {
    id: number
    name: string
    value: number
    goal_type: number
  }[]
  profitability: TProfitability[]
  pendency?: 'INITIAL_VALUE_PENDING'
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
