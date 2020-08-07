import React from 'react'
import { uuid } from 'uuidv4'
import { IFunds } from 'store/modules/Objective/types'
import { IFundCategories } from '../../types'
import * as s from './styles'

interface IPercentual {
  funds: IFunds[]
}

const PercentualInfos = ({ funds }: IPercentual) => {
  const fundsCategories: IFundCategories = {}

  funds.forEach((fund: IFunds) => {
    if (fund.arena_category in fundsCategories) {
      fundsCategories[fund.arena_category] +=
        fund.initial_value + fund.monthly_value
    } else {
      fundsCategories[fund.arena_category] =
        fund.initial_value + fund.monthly_value
    }
  })

  const fundsTotalValues = Object.entries(fundsCategories).reduce(
    (acc, [, value]) => acc + value,
    0
  )

  const fundsCategoriesSort = Object.entries(
    fundsCategories
  ).sort(([keyA], [keyB]) =>
    fundsCategories[keyA] < fundsCategories[keyB] ? 1 : -1
  )

  return (
    <s.PercentualInfosContainer>
      {fundsCategoriesSort.map(([key, value]) => (
        <s.PercentualText type="headline" color="gray6" bold key={uuid()}>
          {`${((value * 100) / fundsTotalValues).toFixed(1)}% em ${key}`}
        </s.PercentualText>
      ))}
    </s.PercentualInfosContainer>
  )
}

export default PercentualInfos
