import React from 'react'

import Loading from 'components/Loading'

import * as s from './styles'

const InvestmentLoadingStateCard: React.FC = ({ ...rest }) => {
  return (
    <s.Card headerIcon="financial" headerTitle="Investimentos" {...rest}>
      <s.ContentWrapper>
        <Loading
          type="bar"
          legend="Aguarde, estamos buscando suas informações..."
        />
      </s.ContentWrapper>
    </s.Card>
  )
}

export default InvestmentLoadingStateCard
