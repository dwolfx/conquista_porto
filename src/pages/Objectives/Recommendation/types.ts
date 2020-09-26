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
  min_rescue: number
  release_to_rescue: boolean
  min_balance: boolean
  time_limit_to_apply: string
  time_limit_to_rescue: string
  quotation_apply_days: string
  financial_apply_days: string
  quotation_rescue_days: string
  financial_rescue_days: string
  count_rescue_days: string
  arena_category: string
  ambima_category: string
  adm_tax: number
  performance_rate: number
  classification: string
  tribute_ir: {
    [key: string]: number
  }
  iof: string
  benchmark: string
  profitability: [
    {
      name: string
      value: {
        [key in '1' | '2' | '3' | '4' | '5']: number
      }
    },
    {
      name: string
      value: {
        [key in '1' | '2' | '3' | '4' | '5']: number
      }
    },
    {
      name: string
      value: {
        [key in '1' | '2' | '3' | '4' | '5']: number
      }
    }
  ]
  url_performance_info_pdf: string
  url_lamina_pdf: string
  url_fund_rules_pdf: string
  url_fund_adhesion_pdf: string
  url_manager_logo: string
  is_fund_active: boolean
  quota_type: string
  initial_value: number
  monthly_value: number
  annual_rate: number
}

export interface IFormData {
  nickname?: string
  uf?: string
  profile?: number
  target_date?: string
  target_value?: number
  initial_value?: number
  monthly_value?: number
  is_easy_to_save_planned_amount?: boolean
  is_target_date_flexible?: boolean
  would_like_to_receive_before_final_date?: boolean
  would_like_to_receive_monthly_income?: boolean
  goal_type?: number
}
