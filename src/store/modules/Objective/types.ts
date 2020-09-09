export const Types = {
  GET_REQUEST: 'OBJECTIVE_GET_REQUEST',
  GET_SUCCESS: 'OBJECTIVE_GET_SUCCESS',
  GET_FAILURE: 'OBJECTIVE_GET_FAILURE',
  POST_REQUEST: 'OBJECTIVE_POST_REQUEST',
  POST_REQUEST_BY_SIMULATE: 'OBJECTIVE_POST_REQUEST_BY_SIMULATE',
  POST_SUCCESS: 'OBJECTIVE_POST_SUCCESS',
  POST_FAILURE: 'OBJECTIVE_POST_FAILURE',
  PUT_RECOMMENDATION_REQUEST: 'RECOMMENDATIONS_REQUEST_PUT',
  PUT_RECOMMENDATION_SUCCESS: 'RECOMMENDATIONS_SUCCESS_PUT',
  PUT_RECOMMENDATION_FAILURE: 'RECOMMENDATIONS_FAILURE_PUT',
  POST_RECALCULATE_FUNDS_REQUEST: 'RECALCULATE_FUNDS_POST_REQUEST',
  POST_RECALCULATE_FUNDS_SUCCESS: 'RECALCULATE_FUNDS_POST_SUCCESS',
  POST_RECALCULATE_FUNDS_FAILURE: 'RECALCULATE_FUNDS_POST_FAILURE',
  CLEAN_DATA: 'OBJECTIVE_CLEAN_DATA',
  RECALCULATE_FUNDS_REQUEST: 'RECALCULATE_FUNDS_REQUEST',
  RECALCULATE_FUNDS_SUCCESS: 'RECALCULATE_FUNDS_SUCCESS',
  RECALCULATE_FUNDS_FAILURE: 'RECALCULATE_FUNDS_FAILURE',
  UPDATE_RECOMMENDATION_FUNDS: 'UPDATE_RECOMMENDATION_FUNDS',
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

export type TProfitability = {
  name: string
  value: {
    [key: string]: number | undefined
  }
}

export interface IFunds {
  fund_id: number
  name: string
  nickname: string
  company_name: string
  profile_risk: string
  share_holder_profile_risk: 1 | 2 | 3 | 4 | 5
  initial_date: string
  manager: string
  min_initial_value: number
  min_value_to_apply: number
  release_to_apply: boolean
  min_rescue_value: number
  release_to_rescue: boolean
  min_balance_value: number
  time_limit_to_apply: string
  time_limit_to_rescue: string
  quotation_apply_days: string
  financial_apply_days: string
  quotation_rescue_days: string
  financial_rescue_days: string
  count_rescue_days: string
  arena_category: string
  anbima_category: string
  adm_tax: number
  performance_rate: number
  classification: string
  iof: string
  benchmark: string
  url_performance_info_pdf: string
  url_lamina_pdf: string
  url_fund_rules_pdf: string
  url_fund_adhesion_pdf: string
  url_manager_logo: string
  quota_type: string
  cnpj: string
  pl: number
  pl_last_year: number
  initial_value: number
  monthly_value: number
  annual_rate: number
  fundActive?: boolean
  profitability: TProfitability[]
  tribute_ir: {
    [key: string]: number
  }
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
    value: number
    checked: boolean
  }
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
