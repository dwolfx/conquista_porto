import React, { memo } from 'react'
import { useDispatch } from 'react-redux'
import 'styled-components/macro'
import { GetLifeInsuranceDataRequest } from 'store/modules/LifeInsurance/action'
import { GetTripInsuranceDataRequest } from 'store/modules/TripInsurance/action'

import Text from 'components/Text'
import * as s from './styles'
import * as t from '../types'

const LifeInsuranceErrorStateCard: React.FC<t.IInsuranceErrorStateCard> = memo(
  () => {
    const dispatch = useDispatch()

    const onError = () => {
      dispatch(GetLifeInsuranceDataRequest())
    }

    return (
      <s.Container>
        <Text type="headline" color="gray6">
          Seguro de Vida
        </Text>
        <Text type="captionUppercase" color="magenta2" bold>
          Falha ao carregar
        </Text>
        <s.Button
          data-gtm-subname="card seguros de vida"
          data-gtm-name="botao tentar carregar conteudo novamente"
          data-gtm-type="click"
          data-gtm-clicktype="button"
          color="primary"
          onClick={onError}
        >
          Tentar novamente
        </s.Button>
      </s.Container>
    )
  }
)

const TripInsuranceErrorStateCard: React.FC<t.IInsuranceErrorStateCard> = memo(
  () => {
    const dispatch = useDispatch()

    const onError = () => {
      dispatch(GetTripInsuranceDataRequest())
    }

    return (
      <s.Container>
        <Text type="headline" color="gray6">
          Seguro Viagem
        </Text>
        <Text type="captionUppercase" color="magenta2" bold>
          Falha ao carregar
        </Text>
        <s.Button
          data-gtm-subname="card seguros de viagem"
          data-gtm-name="botao tentar carregar conteudo novamente"
          data-gtm-type="click"
          data-gtm-clicktype="button"
          color="primary"
          onClick={onError}
        >
          Tentar novamente
        </s.Button>
      </s.Container>
    )
  }
)

export { LifeInsuranceErrorStateCard, TripInsuranceErrorStateCard }
