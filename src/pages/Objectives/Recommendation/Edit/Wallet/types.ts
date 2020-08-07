export interface IColumns {
  onChange: ({ row, event, ref }: any) => void
}

export interface IRemoveAction {}

export interface IHandleInputsChange {
  event: any
  value: any
  row: any
}

export type THandleInputChangeFunction = ({
  event,
  value,
  row,
}: IHandleInputsChange) => void
