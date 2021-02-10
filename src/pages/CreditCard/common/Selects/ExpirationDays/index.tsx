import React, { useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'

import Select from 'components/Inputs/Select'
import { TOptions, TSelected } from 'components/Inputs/Select/types'

import { FLAGS } from '../../../Creation/types'

interface IProps {
  type: FLAGS | ''
  selectedOption: TSelected
  setSelectedOption: (expirationDate: TSelected) => void
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

  const generateMasterCardOptions = useCallback(() => {
    setOptions(
      expirationDays.mastercard.map((dia: any) => ({
        id: +dia.descricao,
        text: dia.descricao,
        onClick: () =>
          setSelectedOption({ id: +dia.descricao, name: dia.descricao }),
      }))
    )
  }, [expirationDays, setSelectedOption])

  const generateVisaOptions = useCallback(() => {
    setOptions(
      expirationDays.visa.map((dia: any) => ({
        id: +dia.descricao,
        text: dia.descricao,
        onClick: () =>
          setSelectedOption({ id: +dia.descricao, name: dia.descricao }),
      }))
    )
  }, [expirationDays, setSelectedOption])

  useEffect(() => {
    if (
      !isLoading &&
      expirationDays && 
      expirationDays.mastercard &&
      expirationDays.visa
      ) {
        if (type === FLAGS.MASTERCARD) {
          generateMasterCardOptions()
        } else {
          generateVisaOptions()
        }
    }
  }, [
    type,
    expirationDays,
    selectedOption,
    isLoading,
    generateVisaOptions,
    generateMasterCardOptions,
  ])

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
