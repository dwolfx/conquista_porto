import React from 'react'

import Select from 'components/Inputs/Select'
import { TOptions } from 'components/Inputs/Select/types'
import { IOption } from '../../../types'
import * as S from '../../styles'

interface IProps {
  selectedOption: IOption
  setSelectedOption: (ocupation: IOption) => void
}

const Ocupation = ({ selectedOption, setSelectedOption }: IProps) => {
  const options: TOptions[] = [
    {
      id: 1,
      text: 'Projetista',
      onClick: () => setSelectedOption({ id: 1, name: 'Projetista' })
    },
    {
      id: 2,
      text: 'Arquiteto',
      onClick: () => setSelectedOption({ id: 2, name: 'Arquiteto' })
    },
    {
      id: 3,
      text: 'Programador',
      onClick: () => setSelectedOption({ id: 3, name: 'Programador' })
    },
    {
      id: 4,
      text: 'Designer',
      onClick: () => setSelectedOption({ id: 4, name: 'Designer' })
    },
  ]

 return (
   <S.SelectWrapper>
     <Select label="ocupação" options={options} selected={selectedOption} testId="ocupation"/>
   </S.SelectWrapper>
 )
}

export default Ocupation
