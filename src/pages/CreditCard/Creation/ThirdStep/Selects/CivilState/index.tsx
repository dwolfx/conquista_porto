import React from 'react'

import Select from 'components/Inputs/Select'
import { TOptions } from 'components/Inputs/Select/types'
import { IOption } from '../../../types'

import * as S from '../../styles'

interface IProps {
  selectedOption: IOption
  setSelectedOption: (civilState: IOption) => void
}

const CivilState = ({ selectedOption, setSelectedOption }: IProps) => {
  const options: TOptions[] = [
    {
      id: 1,
      text: 'Solteiro',
      onClick: () => setSelectedOption({ id: 1, name: 'Solteiro' })
    },
    {
      id: 2,
      text: 'Casado',
      onClick: () => setSelectedOption({ id: 2, name: 'Casado' })
    },
    {
      id: 3,
      text: 'Divorciado',
      onClick: () => setSelectedOption({ id: 3, name: 'Divorciado' })
    },
    {
      id: 4,
      text: 'Viúvo',
      onClick: () => setSelectedOption({ id: 4, name: 'Viúvo' })
    },
  ]

 return (
   <S.SelectWrapper>
     <Select label="estado civil" options={options} selected={selectedOption} testId="civil-state"/>
   </S.SelectWrapper>
 )
}

export default CivilState
