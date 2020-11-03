import React, { useEffect, useState } from 'react'

import Select from 'components/Inputs/Select'
import { TOptions } from 'components/Inputs/Select/types'

import { SelectWrapper } from '../styles'

const flags = {
  2: 'Mastercard',
  1: 'Visa',
}

interface IProps {
  selectedOption: string
  setSelectedOption: (state: string) => void
}

const SelectCardFlag = ({ selectedOption, setSelectedOption }: IProps) => {
  const [options, setOptions] = useState<TOptions[]>([])
  const [selected, setSelected] = useState<{
    id: number | string
    name: string
  }>({
    id: '0',
    name: '',
  })

  if (!options.length) {
    setOptions(
      Object.entries(flags).map(([key, value]) => ({
        id: key,
        text: value,
        onClick: () => setSelectedOption(key),
      }))
    )
  }

  useEffect(() => {
    const selectedStateObject = Object.entries(flags).find(
      ([key]) => key === selectedOption
    )
    if (options.length > 0 && selectedStateObject) {
      const filteredOption = options.find(
        option => option.text === selectedStateObject[1]
      )

      if (filteredOption) {
        const option = { id: filteredOption?.id, name: filteredOption?.text }

        setSelected(option)
      }
    }
  }, [options, selectedOption])

  return (
    <SelectWrapper>
      <Select
        label="bandeira"
        options={options}
        selected={selected}
        testId="data-bandeira"
        optionBoxDirection="bottom"
      />
    </SelectWrapper>
  )
}

export default SelectCardFlag
