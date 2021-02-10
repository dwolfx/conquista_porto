import React from 'react'

import Select from 'components/Inputs/Select'
import { TOptions, TSelected } from 'components/Inputs/Select/types'

import * as S from '../styles'
interface IProps {
  selectedOption: TSelected
  setSelectedOption: (sex: TSelected) => void
  preSelectedSex?: string
}

const Sex = ({ selectedOption, setSelectedOption, preSelectedSex }: IProps) => {
  const sexOptions: TOptions[] = [
    {
      id: 'M',
      text: 'Masculino',
      onClick: () => setSelectedOption({ id: 'M', name: 'Masculino' }),
    },
    {
      id: 'F',
      text: 'Feminino',
      onClick: () => setSelectedOption({ id: 'F', name: 'Feminino' }),
    },
  ]
  const hasSelectedOption = selectedOption.id !== 0

  const findSexInArray = sexOptions.find(
    sexOption => sexOption.text === preSelectedSex
  )
  const preSelectedOption: TSelected = {
    id: Number(findSexInArray?.id) || 0,
    name: findSexInArray?.text || '',
  }

  return (
    <S.SelectWrapper>
      <Select
        label="sexo"
        options={sexOptions}
        selected={hasSelectedOption ? selectedOption : preSelectedOption}
        testId="sex"
      />
    </S.SelectWrapper>
  )
}

export default Sex
