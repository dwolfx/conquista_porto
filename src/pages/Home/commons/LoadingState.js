import React from 'react'

import Loading from 'components/Loading'

import { LoadingStateObjectivesContainer } from '../styles'

export default function LoadingState({ ...rest }) {
  return (
    <LoadingStateObjectivesContainer {...rest}>
      <Loading
        type="bar"
        legend="Aguarde, estamos buscando suas informações..."
      />
    </LoadingStateObjectivesContainer>
  )
}
