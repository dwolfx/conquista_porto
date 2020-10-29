import React, { useEffect, useState } from 'react'

import Select from 'components/Inputs/Select'
import { TOptions } from 'components/Inputs/Select/types'

import { SelectWrapper } from '../styles'
import { FLAGS } from '../../types'

interface IProps {
  selectedOption: FLAGS | ''
  setSelectedOption: (state: FLAGS | '') => void
}

const SelectCardFlag = ({ selectedOption, setSelectedOption }: IProps) => {
  const [options, setOptions] = useState<TOptions[]>([])
  const [selected, setSelected] = useState<{
    id: number | string
    name: string
  }>({
    id: 0,
    name: '',
  })

  if (!options.length) {
    setOptions([{
      id: FLAGS.VISA,
      text: 'VISA',
      onClick: () => setSelectedOption(FLAGS.VISA),
    }, {
      id: FLAGS.MASTERCARD,
      text: 'MASTERCARD',
      onClick: () => setSelectedOption(FLAGS.MASTERCARD),
    }])
  }

  useEffect(() => {
    const selectedStateObject = options.find(option => option.id === selectedOption)
    if (selectedStateObject) {
      const option = { id: selectedStateObject.id, name: selectedStateObject.text }
      setSelected(option)
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
