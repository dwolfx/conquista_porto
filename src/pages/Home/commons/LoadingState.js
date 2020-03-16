import React from 'react'

import Loading from 'components/Loading'

import { LoadingStateObjectivesContainer } from '../styles'

export default function LoadingState() {
  return (
    <LoadingStateObjectivesContainer>
      <Loading
        type="bar"
        legend="Aguarde, estamos buscando suas informações..."
        widthBar="100%"
      />
    </LoadingStateObjectivesContainer>
  )
}
