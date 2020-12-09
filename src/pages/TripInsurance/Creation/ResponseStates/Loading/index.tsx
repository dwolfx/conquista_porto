import React from 'react'
import Loading from 'components/Loading'

import * as s from '../styles'

export const LoadingContent = () => {
  return (
    <s.LoadingContainer>
      <Loading
        type="bar"
        legend="Aguarde, estamos buscando as melhores opções para você...."
        textAlign="center"
      />
    </s.LoadingContainer>
  )
}

export default LoadingContent
