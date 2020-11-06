import React, { useEffect, useState } from 'react'

import Select from 'components/Inputs/Select'
import { TOptions } from 'components/Inputs/Select/types'

import { SelectWrapper } from '../styles'

const documents = {
  1: 'RG',
  2: 'RNE',
  3: 'Classe',
  4: 'Outros',
}

interface IProps {
  selectedOption: string
  setSelectedOption: (state: string) => void
}

const SelectDocument = ({ selectedOption, setSelectedOption }: IProps) => {
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
      Object.entries(documents).map(([key, value]) => ({
        id: key,
        text: value,
        onClick: () => setSelectedOption(value),
      }))
    )
  }

  useEffect(() => {
    const selectedStateObject = Object.entries(documents).find(
      ([key, value]) => value === selectedOption
    )
    if (!selectedStateObject && selectedOption.length) {
      setSelected({ id: options[3].id, name: options[3].text })
    } else {
      if (options.length > 0 && selectedStateObject) {
        const filteredOption = options.find(
          option => option.text === selectedStateObject[1]
        )

        if (filteredOption) {
          const option = { id: filteredOption?.id, name: filteredOption?.text }

          setSelected(option)
        }
      }
    }
  }, [options, selectedOption])

  return (
    <SelectWrapper>
      <Select
        label="documento"
        options={options}
        selected={selected}
        testId="data-documento"
        optionBoxDirection="bottom"
      />
    </SelectWrapper>
  )
}

export default SelectDocument
