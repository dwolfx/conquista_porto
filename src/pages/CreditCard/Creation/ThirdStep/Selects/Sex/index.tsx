import React from 'react'

import Select from 'components/Inputs/Select'
import { TOptions, TSelected } from 'components/Inputs/Select/types'
import { IOption } from '../../../types'

import * as S from '../../styles'

interface IProps {
  selectedOption: IOption
  setSelectedOption: (sex: IOption) => void
  preSelectedSex?: string
}

const Sex = ({ selectedOption, setSelectedOption, preSelectedSex }: IProps) => {
  const sexOptions: TOptions[] = [
    {
      id: 1,
      text: 'Masculino',
      onClick: () => setSelectedOption({ id: 1, name: 'Masculino' })
    },
    {
      id: 2,
      text: 'Feminino',
      onClick: () => setSelectedOption({ id: 2, name: 'Feminino' })
    },
  ]
  const hasSelectedOption = selectedOption.id !== 0

  const findSexInArray = sexOptions.find((sexOption) => sexOption.text === preSelectedSex)
  const preSelectedOption: TSelected = { id: Number(findSexInArray?.id) || 0, name: findSexInArray?.text || '' }

 return (
   <S.SelectWrapper>
     <Select label="sexo" options={sexOptions} selected={hasSelectedOption ? selectedOption : preSelectedOption} testId="sex"/>
   </S.SelectWrapper>
 )
}

export default Sex
