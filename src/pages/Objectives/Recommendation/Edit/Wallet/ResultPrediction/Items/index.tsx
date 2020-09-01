import React from 'react'
import * as S from './styles'
import { IPredictionProps } from '../types'
import { Currency } from 'helpers/money'

export default function ResultPredictionItems({
  prediction,
  warning,
}: IPredictionProps) {
  return (
    <S.Items>
      <S.Item
        startItems={[<S.Label>Estimativa Pessimista</S.Label>]}
        endItems={[
          <S.Value>{Currency.parse(prediction!.pessimistic, true)}</S.Value>,
        ]}
      />
      <S.Item
        startItems={[<S.Label>Estimativa Provável</S.Label>]}
        endItems={[
          <S.Value hightlight={warning}>
            {Currency.parse(prediction!.median, true)}
          </S.Value>,
        ]}
      />
      <S.Item
        startItems={[<S.Label>Estimativa Otimista</S.Label>]}
        endItems={[
          <S.Value>{Currency.parse(prediction!.optimistic, true)}</S.Value>,
        ]}
      />
    </S.Items>
  )
}
