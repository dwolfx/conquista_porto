export const Types = {
  GET_REQUEST: 'OBJECTIVE_GET_REQUEST',
  GET_SUCCESS: 'OBJECTIVE_GET_SUCCESS',
  GET_FAILURE: 'OBJECTIVE_GET_FAILURE',
  POST_REQUEST: 'OBJECTIVE_POST_REQUEST',
  POST_REQUEST_BY_SIMULATE: 'OBJECTIVE_POST_REQUEST_BY_SIMULATE',
  POST_SUCCESS: 'OBJECTIVE_POST_SUCCESS',
  POST_FAILURE: 'OBJECTIVE_POST_FAILURE',
  CLEAN_DATA: 'OBJECTIVE_CLEAN_DATA',
}

export interface IAnswer {
  nickname: string
  uf: string
  profile: number
  target_date: string
  target_value: number
  initial_value: number
  monthly_value: number
  goal_type: number
  is_easy_to_save_planned_amount?: boolean
  is_target_date_flexible?: boolean
  would_like_to_receive_before_final_date?: boolean
  would_like_to_receive_monthly_income?: boolean
}

export interface IFunds {
  name: string
  profitability: {
    name: string
    value: {
      [key: string]: number
    }
  }[]
  manager: string
  benchmark: string
  classification: string
  iof: string
  fund_id: number
  arena_category: string
  min_initial_value: number
  min_value_to_apply: number
  share_holder_profile_risk: 1 | 2 | 3 | 4 | 5
  min_movement: number
  min_balance: number
  time_limit: string
  quotation_apply_days: string
  financial_apply_days: string
  quotation_rescue_days: string
  financial_rescue_days: string
  initial_date: string
  adm_tax: number
  performance_rate: number
  tribute_ir: {
    [key: string]: number
  }
  url_performance_info_pdf: string
  url_fund_rules_pdf: string
  initial_value: number
  monthly_value: number
  annual_rate: number
  profile_risk: string
  is_fund_active: boolean
}

export interface IIncome {
  pessimistic: number
  median: number
  optimistic: number
}

export interface IAdditional {
  travel_security: boolean
  life_security: boolean
  credit_card: boolean
}

export interface ICreditProduct {
  name: string
  values: {
    name: string
    value: string
    checked: boolean
  }[]
}

export interface ISuggestion {
  suggestion_target_date: string
  suggestion_monthly_value: number
}

export interface IRecommendations {
  id: string
  answer: IAnswer
  funds: IFunds[]
  income: IIncome
  additional: IAdditional
  fund_total_income: {
    [key: string]: number
  }
  credit_product?: ICreditProduct
  suggestion_goal?: ISuggestion
}
