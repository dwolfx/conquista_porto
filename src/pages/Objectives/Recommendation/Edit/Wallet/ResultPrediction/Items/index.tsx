import React from 'react'

import { Currency } from 'helpers/money'
import VerticalList from 'components/VerticalList'
import HorizontalList from 'components/HorizontalList'
import useMedia from 'hooks/useMedia'

import * as S from './styles'
import { IPredictionProps } from '../types'

export default function ResultPredictionItems({
  prediction,
  warning,
}: IPredictionProps) {
  const isDesktop = useMedia('lgUp')
  const isMobile = useMedia('sm')
  return (
    <S.Items>
      {isDesktop || isMobile ? (
        <>
          <HorizontalList
            startItems={[
              <S.Text type="captionUppercase" bold color="gray4">
                Estimativa Pessimista
              </S.Text>,
            ]}
            endItems={[
              <S.Text bold>
                {Currency.parse(prediction!.pessimistic, true)}
              </S.Text>,
            ]}
          />
          <HorizontalList
            startItems={[
              <S.Text type="captionUppercase" bold color="gray4">
                Estimativa Provável
              </S.Text>,
            ]}
            endItems={[
              <S.Text bold color={warning ? 'magenta2' : 'gray6'}>
                {Currency.parse(prediction!.median, true)}
              </S.Text>,
            ]}
          />
          <HorizontalList
            startItems={[
              <S.Text type="captionUppercase" bold color="gray4">
                Estimativa Otimista
              </S.Text>,
            ]}
            endItems={[
              <S.Text bold>
                {Currency.parse(prediction!.optimistic, true)}
              </S.Text>,
            ]}
          />
        </>
      ) : (
        <>
          <VerticalList
            elements={[
              <S.Text type="captionUppercase" bold color="gray4">
                Estimativa Pessimista
              </S.Text>,
              <S.Text bold type="headline">
                {Currency.parse(prediction!.pessimistic, true)}
              </S.Text>,
            ]}
          />
          <VerticalList
            elements={[
              <S.Text type="captionUppercase" bold color="gray4">
                Estimativa Provável
              </S.Text>,
              <S.Text
                bold
                type="headline"
                color={warning ? 'magenta2' : 'gray6'}
              >
                {Currency.parse(prediction!.median, true)}
              </S.Text>,
            ]}
          />
          <VerticalList
            elements={[
              <S.Text type="captionUppercase" bold color="gray4">
                Estimativa Otimista
              </S.Text>,
              <S.Text bold type="headline">
                {Currency.parse(prediction!.optimistic, true)}
              </S.Text>,
            ]}
          />
        </>
      )}
    </S.Items>
  )
}
