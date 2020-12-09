import React from 'react'
import 'styled-components/macro'

import Card from 'components/Card'
import Text from 'components/Text'
import Divisor from 'components/Divisor'

import * as S from '../../styles'

const InsuranceSumaryDesktop = () => {
  return (
    <Card data-testid="hire-card-sumary-desktop">
      <S.HeaderWrapper>
        <Text type="heading4" bold color="gray6">Resumo</Text>
      </S.HeaderWrapper>
      <Divisor />
      <S.SumaryTextWrapper>
        <S.TextTitle>plano</S.TextTitle>
        <S.TextValue>Brasil Terra</S.TextValue>
      </S.SumaryTextWrapper>
      <Divisor />
      
      <S.SumaryTextWrapper>
        <S.TextTitle>total com desconto</S.TextTitle>
        <S.TextValue>R$ 1.259,80</S.TextValue>
      </S.SumaryTextWrapper>

      <Divisor />
      
      <S.SumaryTextWrapper>
        <S.TextTitle>período</S.TextTitle>
        <S.TextValue>23/07/2018 à 23/08/2018</S.TextValue>
      </S.SumaryTextWrapper>

      <Divisor />
      
      <S.SumaryTextWrapper>
        <S.TextTitle>protocolo</S.TextTitle>
        <S.TextValue>11463846</S.TextValue>
      </S.SumaryTextWrapper>
    </Card>
  )
}

export default InsuranceSumaryDesktop