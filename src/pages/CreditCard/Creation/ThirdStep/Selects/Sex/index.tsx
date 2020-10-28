import React from 'react'

import Select from 'components/Inputs/Select'
import { TOptions } from 'components/Inputs/Select/types'
import { IOption } from '../../../types'

import * as S from '../../styles'

interface IProps {
  selectedOption: IOption
  setSelectedOption: (sex: IOption) => void
}

const Sex = ({ selectedOption, setSelectedOption }: IProps) => {
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

 return (
   <S.SelectWrapper>
     <Select label="sexo" options={sexOptions} selected={selectedOption} testId="sex"/>
   </S.SelectWrapper>
 )
}

export default Sex
