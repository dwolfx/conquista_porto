export interface IAdditional {
  credit_card: boolean
  life_security: boolean
  travel_security: boolean
}

export interface ISuggestion {
  suggestion_monthly_value: number
  suggestion_target_date: string
}

export interface IAnswer {
  goal_type: string
  initial_value: number
  is_easy_to_save_planned_amount: boolean
  is_target_date_flexible: boolean
  monthly_value: number
  nickname: string
  target_date: string
  target_value: number
  would_like_to_receive_before_final_date: boolean
  would_like_to_receive_monthly_income: boolean
}

export interface ICombo {
  title: string
  total_value: number
  value: {
    'Investimento Inicial': string
    'Investimento Mensal': string
  }
}

export interface ICreditProducts {
  name: string
  values: {
    name: string
    value: string
  }[]
}

export interface IFundTotalIncome {
  [key: number]: number
}

export interface IFund {
  adm_tax: number
  benchmark: string
  category_name: string
  classification: string
  cnpj: string
  financial_apply_days: string
  financial_rescue_days: string
  fund_id: number
  initial_date: string
  initial_value: number
  iof: string
  manager: string
  min_balance: number
  min_initial_value: number
  min_movement: number
  min_value_to_apply: number
  monthly_value: number
  name: string
  performance_rate: number
  pl: number
  pl_last_year: number
  profitability: any
  quotation_apply_days: string
  quotation_rescue_days: string
  time_limit: string
  tribute_ir: any
  url_fund_rules_pdf: string
  url_performance_info_pdf: string
  'wsdls/profile': 1 | 2 | 3 | 4 | 5
}
