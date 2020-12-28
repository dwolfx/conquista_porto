export interface IOption {
  text: string
  id: number
  value: string
}

export interface IProps {
  error?: boolean
  options: Array<IOption>
  disabled?: boolean
  loading?: boolean
  inputLabel: string
  onChange: (selectedOptions: Array<IOption>) => void
  onFocusFunction?: () => void
  selectedOptions: IOption[]
  setSelectedOptions: React.Dispatch<React.SetStateAction<IOption[]>>
}

//styled

export interface IOptionsContainer {
  $hasOptions: boolean
  optionBoxDirection?: string
}

export interface ISelectedListContainer {
  $selectedOptionsLength: number
}
