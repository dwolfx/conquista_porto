import React from 'react'

import Select from 'components/Inputs/Select'
import { TOptions, TSelected } from 'components/Inputs/Select/types'
import { IOption } from '../../../types'
import * as S from '../../styles'
import {
  IResponse,
  Occupation,
} from 'store/modules/CreditCard/Occupation/types'

interface IProps {
  selectedOption: IOption
  setSelectedOption: (ocupation: IOption) => void
  creditCardOccupation: {
    data: IResponse
    hasError: boolean
    isLoading: boolean
  }
  preSelectedOccupation?: number
}

const Ocupation = ({
  selectedOption,
  setSelectedOption,
  creditCardOccupation,
  preSelectedOccupation,
}: IProps) => {
  const { data, hasError, isLoading } = creditCardOccupation
  const options: TOptions[] =
    data?.profissoesVO?.map((occupation: Occupation) => ({
      id: occupation.codProfissaoProduto,
      text: occupation.nome.toLowerCase(),
      onClick: () =>
        setSelectedOption({
          id: Number(occupation.codProfissaoProduto),
          name: occupation.nome.toLowerCase(),
        }),
    })) || []

  const hasSelectedOption = selectedOption.id !== 0
  const findOcupationInArray = options.find(
    option => Number(option.id) === preSelectedOccupation
  )
  const preSelectedOption: TSelected = {
    id: Number(findOcupationInArray?.id) || 0,
    name: findOcupationInArray?.text || '',
  }

  return (
    <S.SelectWrapper>
      <Select
        label="ocupação"
        options={options}
        selected={hasSelectedOption ? selectedOption : preSelectedOption}
        testId="ocupation"
        isLoading={isLoading}
        disabled={hasError}
      />
    </S.SelectWrapper>
  )
}

export default Ocupation
