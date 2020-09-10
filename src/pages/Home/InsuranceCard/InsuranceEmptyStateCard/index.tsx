import React, { memo } from 'react'
import { useHistory } from 'react-router-dom'
import 'styled-components/macro'

import Text from 'components/Text'
import * as s from './styles'
import * as t from '../types'

const LifeInsuranceEmptyStateCard: React.FC<t.IInsuranceEmptyStateCard> = memo(
  () => {
    const history = useHistory()

    return (
      <s.Container>
        <Text type="headline" color="gray6">
          Seguro de Vida
        </Text>
        <Text type="body" color="gray5" bold>
          Você seguro a vida toda
        </Text>
        <s.Button
          data-gtm-subname="card seguros de vida"
          data-gtm-name="botao conhecer mais"
          data-gtm-type="click"
          data-gtm-clicktype="button"
          color="secondary"
          onClick={() => history.push('/seguro-vida')}
        >
          conhecer
        </s.Button>
      </s.Container>
    )
  }
)

const TripInsuranceEmptyStateCard: React.FC<t.IInsuranceEmptyStateCard> = memo(
  () => {
    const history = useHistory()

    return (
      <s.Container>
        <Text type="headline" color="gray6">
          Seguro Viagem
        </Text>
        <Text type="body" color="gray5" bold>
          Cobertura para todas as viagens
        </Text>
        <s.Button
          data-gtm-subname="card seguros de viagem"
          data-gtm-name="botao conhecer mais"
          data-gtm-type="click"
          data-gtm-clicktype="button"
          color="secondary"
          onClick={() => history.push('/seguro-viagem')}
        >
          conhecer
        </s.Button>
      </s.Container>
    )
  }
)

export { LifeInsuranceEmptyStateCard, TripInsuranceEmptyStateCard }
