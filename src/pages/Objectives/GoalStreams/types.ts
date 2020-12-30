import { dict } from 'components/IconExporter'

export const TRAVEL = '1'
export const RETIREMENT = '2'
export const CAR = '3'
export const COURSE = '4'
export const EVENT = '5'
export const HOME = '6'
export const SAVE_MONEY = '7'

export type TDuration = 'month' | 'months' | 'year' | 'years'

export interface ISuggestionValues {
  label: string
  value:
    | {
        amount: number
        duration: TDuration
      }
    | string
}

export interface IData {
  maxLength?: number | string
  name: string
  options?: {
    name: string
    value: string | number
  }[]
  placeholder?: string
  question: string
  ruleText?: string
  sideTip?: React.ReactNode
  tooltip?: React.ReactNode
  type: string
  validate?: (value: string | number) => undefined | string | number
  description?: string
  suggestionValues?: ISuggestionValues[]
  minValue?: number
}

export interface IDataObject {
  goal_type: string
  enable: boolean
  icon: keyof typeof dict
  label: string
  route: string
  image: string
  flow: IData[]
}
