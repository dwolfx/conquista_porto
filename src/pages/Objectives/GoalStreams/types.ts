import { dict } from 'components/IconExporter'

export const TRIP = '1'
export const RETIREMENT = '2'
export const CAR = '3'
export const COURSE = '4'
export const EVENT = '5'
export const HOME = '6'
export const SAVE_MONEY = '7'

export interface IData {
  name: string
  options?: {
    name: string
    value: string | number
  }[]
  question: string | any
  type: string
  ruleText?: string
  validate?:
    | ((value: string | number) => undefined | string | number)
    | undefined
  maxLength?: number | string
  placeholder?: string
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
