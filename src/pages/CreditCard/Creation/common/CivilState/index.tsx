import React from 'react'

import Select from 'components/Inputs/Select'
import { TOptions, TSelected } from 'components/Inputs/Select/types'

import * as S from '../styles'
interface IProps {
  selectedOption: TSelected
  setSelectedOption: (civilState: TSelected) => void
  preSelectedCivilState?: number
}

const CivilState = ({
  selectedOption,
  setSelectedOption,
  preSelectedCivilState,
}: IProps) => {
  const options: TOptions[] = [
    {
      id: 1,
      text: 'Casado',
      onClick: () => setSelectedOption({ id: 1, name: 'Casado' }),
    },
    {
      id: 2,
      text: 'Solteiro',
      onClick: () => setSelectedOption({ id: 2, name: 'Solteiro' }),
    },
    {
      id: 3,
      text: 'Viúvo',
      onClick: () => setSelectedOption({ id: 3, name: 'Viúvo' }),
    },
    {
      id: 4,
      text: 'Outros',
      onClick: () => setSelectedOption({ id: 4, name: 'Outros' }),
    },
  ]

  const hasSelectedOption = selectedOption.id !== 0

  const findCivilStateInArray = options.find(
    option => option.id === preSelectedCivilState
  )
  const preSelectedOption: TSelected = {
    id: Number(findCivilStateInArray?.id) || 0,
    name: findCivilStateInArray?.text || '',
  }

  return (
    <S.SelectWrapper>
      <Select
        label="estado civil"
        options={options}
        selected={hasSelectedOption ? selectedOption : preSelectedOption}
        testId="civil-state"
      />
    </S.SelectWrapper>
  )
}

export default CivilState
