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
  is_fund_active: true
  'wsdls/profile': 1 | 2 | 3 | 4 | 5
}
