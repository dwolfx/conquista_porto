import React from 'react'

import Select from 'components/Inputs/Select'

import { brazilianStates } from './types'
import { TOptions, TSelected } from 'components/Inputs/Select/types'

interface IProps {
  selectedOption: TSelected,
  setSelectedOption: (expirationDate: TSelected) => void
  disabled?: boolean
}
const SelectBrazilianStates = ({ selectedOption, setSelectedOption, disabled = false, ...rest }: IProps) => {

  const generateStateOptions = (): TOptions[] => {
    return brazilianStates.map((state, index) => ({
      id: index,
      text: state,
      onClick: () => setSelectedOption({ id: index, name: state })
    }))
  }

  return (
    <Select
      label="estado"
      testId="estado"
      options={generateStateOptions()}
      disabled={disabled}
      selected={selectedOption}
      optionBoxDirection="top"
      optionBoxSize={200}
      {...rest}
    />
  )
}

export default SelectBrazilianStates
