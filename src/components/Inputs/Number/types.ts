export enum Actions {
  ADD,
  SUBTRACT
}

export interface IPerformArguments {
  action: Actions
}

export interface IGetFillColorArguments {
  checkingIfIsDisabled: boolean
}

export interface IProps {
  label?: string
  minValue?: number
  maxValue?: number
  testId?: string
  disabledCase?: boolean
  initialValue?: number
  afterOnChange: (actualValue: number) => void
}
