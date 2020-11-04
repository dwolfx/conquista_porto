export interface IProps {
  options: Array<IOption>
  disabled?: boolean
  loading?: boolean
  inputLabel: string
  onChange: (selectedOptions: Array<IOption>) => void
}

export interface IOption {
  text: string
  id: number
  value: string
}

//styled

export interface IStOptionsContainer {
  $hasOptions: boolean
}

export interface ISelectedListContainer {
  $selectedOptionsLength: number
}
