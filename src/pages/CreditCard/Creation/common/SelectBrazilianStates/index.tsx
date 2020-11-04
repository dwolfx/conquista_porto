import React, { useEffect, useState } from 'react'

import Select from 'components/Inputs/Select'
import { TOptions } from 'components/Inputs/Select/types'

import { SelectWrapper } from '../styles'

const brazilianStates = {
  AC: 'Acre',
  AL: 'Alagoas',
  AP: 'Amapá',
  AM: 'Amazonas',
  BA: 'Bahia',
  CE: 'Ceará',
  DF: 'Distrito Federal',
  ES: 'Espírito Santo',
  GO: 'Goiás',
  MA: 'Maranhão',
  MT: 'Mato Grosso',
  MS: 'Mato Grosso do Sul',
  MG: 'Minas Gerais',
  PA: 'Pará',
  PB: 'Paraíba',
  PR: 'Paraná',
  PE: 'Pernambuco',
  PI: 'Piauí',
  RJ: 'Rio de Janeiro',
  RN: 'Rio Grande do Norte',
  RS: 'Rio Grande do Sul',
  RO: 'Rondônia',
  RR: 'Roraima',
  SC: 'Santa Catarina',
  SP: 'São Paulo',
  SE: 'Sergipe',
  TO: 'Tocantins',
}

interface IProps {
  selectedOption: string
  setSelectedOption: (state: string) => void
}

const SelectBrazilianStates = ({
  selectedOption,
  setSelectedOption,
}: IProps) => {
  const [options, setOptions] = useState<TOptions[]>([])
  const [selected, setSelected] = useState<{
    id: number | string
    name: string
  }>({
    id: 0,
    name: '',
  })

  if (!options.length) {
    setOptions(
      Object.entries(brazilianStates).map(([key, value], index) => ({
        id: index + 1,
        text: value,
        onClick: () => setSelectedOption(key),
      }))
    )
  }

  useEffect(() => {
    if (selectedOption === '') {
      setSelected({
        id: 0,
        name: '',
      })
    }
    const selectedStateObject = Object.entries(brazilianStates).find(
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
        label="estado"
        options={options}
        selected={selected}
        testId="data-test-id-estados"
        optionBoxDirection="top"
      />
    </SelectWrapper>
  )
}

export default SelectBrazilianStates
