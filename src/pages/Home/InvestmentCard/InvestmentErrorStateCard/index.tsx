import React from 'react'

import Button from 'components/Button'

import { IInvestmentErrorStateCard } from '../types'
import * as s from './styles'

const InvestmentErrorStateCard: React.FC<IInvestmentErrorStateCard> = ({
  onRetry,
  ...rest
}) => {
  return (
    <s.Card headerIcon="financial" headerTitle="Investimentos" {...rest}>
      <s.ContentWrapper>
        <s.ErrorText type="headline" color="magenta2">
          Desculpe, não foi possível carregar suas informações. Aguarde alguns
          instantes e tente novamente.
        </s.ErrorText>
        <Button onClick={onRetry}>Tentar novamente</Button>
      </s.ContentWrapper>
    </s.Card>
  )
}

export default InvestmentErrorStateCard
