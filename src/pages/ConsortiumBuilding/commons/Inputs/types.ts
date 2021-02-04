import { TOptions, TSelected } from 'components/Inputs/Select/types'

export interface ISelect {
  selectedState: [TSelected, React.Dispatch<React.SetStateAction<TSelected>>]
}

export interface ISelectHook {
  selectedState: [TSelected, React.Dispatch<React.SetStateAction<TSelected>>]
}

export interface IFormatOption {
  (
    id: number,
    name: string,
    setSelected: React.Dispatch<React.SetStateAction<TSelected>>
  ): TOptions
}

export interface ITextInput {
  inputState: [string, React.Dispatch<React.SetStateAction<string>>]
}

export interface IInputHandleChange {
  (
    event: React.ChangeEvent<HTMLInputElement>,
    inputSetState: React.Dispatch<React.SetStateAction<string>>
  ): void
}
