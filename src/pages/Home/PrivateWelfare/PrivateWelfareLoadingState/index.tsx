import React from 'react'
import 'styled-components/macro'

import Loading from 'components/Loading'

import { LoadingWrapper } from './styles'

const PrivateWelfareLoadingState = () => {
  
  return (
    <LoadingWrapper>
      <Loading
        type="bar"
        legend="Aguarde, estamos buscando suas informações..."
        textAlign="center"
      />
    </LoadingWrapper>
  )
}

export default PrivateWelfareLoadingState