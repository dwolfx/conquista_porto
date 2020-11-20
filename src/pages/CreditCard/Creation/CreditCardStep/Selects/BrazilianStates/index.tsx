import React from 'react'

import Select from 'components/Inputs/Select'

import { brazilianStates } from './types'
import { IOption } from '../../../types'

interface IProps {
  selectedOption: IOption,
  setSelectedOption: (expirationDate: IOption) => void
  disabled?: boolean
}
const SelectBrazilianStates = ({ selectedOption, setSelectedOption, disabled = false, ...rest }: IProps) => {

  const generateStateOptions = () => {
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
