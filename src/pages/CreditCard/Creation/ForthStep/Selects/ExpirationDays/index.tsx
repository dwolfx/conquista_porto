import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import Select from 'components/Inputs/Select'
import { TOptions } from 'components/Inputs/Select/types'

import { IOption } from '../../../types'

interface IProps {
  type: 'visa' | 'mastercard' | ''
  selectedOption: IOption
  setSelectedOption: (expirationDate: IOption) => void
}
const SelectExpirationDays = ({
  type,
  selectedOption,
  setSelectedOption,
}: IProps) => {
  const [options, setOptions] = useState<TOptions[]>([])
  const { expirationDays, isLoading } = useSelector((state: any) => ({
    expirationDays: state.creditCardExpirationDays.data,
    isLoading: state.creditCardExpirationDays.isLoading,
  }))

  useEffect(() => {
    if (type) {
      setSelectedOption(selectedOption ?? { id: 0, name: '' })
      if (!isLoading && expirationDays && expirationDays[type]) {
        setOptions(
          expirationDays[type].map((dia: any) => ({
            id: +dia.descricao,
            text: dia.descricao,
            onClick: () =>
              setSelectedOption({ id: +dia.descricao, name: dia.descricao }),
          }))
        )
      }
    }
  }, [type, setSelectedOption, expirationDays, selectedOption, isLoading])

  return (
    <Select
      label="data de vencimento"
      emptyText="Por favor, selecione uma bandeira."
      options={options}
      isLoading={isLoading}
      selected={selectedOption}
      testId="data-vencimento-fatura"
    />
  )
}

export default SelectExpirationDays
