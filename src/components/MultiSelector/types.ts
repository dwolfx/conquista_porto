export interface IOption {
  text: string
  id: number
  value: string
}

export interface IProps {
  options: Array<IOption>
  disabled?: boolean
  loading?: boolean
  inputLabel: string
  onChange: (selectedOptions: Array<IOption>) => void
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
