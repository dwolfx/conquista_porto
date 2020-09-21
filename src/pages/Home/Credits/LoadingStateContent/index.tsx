import React from 'react'

import Loading from 'components/Loading'

import { Container } from './styles'

const LoadingStateContent = () => {
  return (
    <Container>
      <Loading 
        type="bar"
        legend="Aguarde, estamos buscando suas informações..."
      />
    </Container>
  )
}

export default LoadingStateContent