import React, { memo } from 'react'

import Loading from 'components/Loading'

import * as s from './styles'
import * as t from '../types'

const LifeInsuranceLoadingStateCard: React.FC<t.IInsuranceLoadingStateCard> = memo(
  () => {
    return (
      <s.Container>
        <Loading
          type="bar"
          legend="Aguarde, estamos buscando suas informações..."
        />
      </s.Container>
    )
  }
)

const TripInsuranceLoadingStateCard: React.FC<t.IInsuranceLoadingStateCard> = memo(
  () => {
    return (
      <s.Container>
        <Loading
          type="bar"
          legend="Aguarde, estamos buscando suas informações..."
        />
      </s.Container>
    )
  }
)

export { LifeInsuranceLoadingStateCard, TripInsuranceLoadingStateCard }
