import React from 'react'
import Text from 'components/Text'
import ButtonLink from 'components/Button/Link'
import * as s from './styles'
import { ECEPStates, ICEPStatesProps } from './types'
import CEPLoading from './Loading'
import CEPFound from './Found'
import CEPPartiallyFound from './PartiallyFound'
import CEPNotFound from './NotFound'
import CEPManualInput from './ManualInput'

const CEPInitialState = () => (
  <s.LinkCEPWrapper>
    <ButtonLink noIcon>
      <Text bold type="button" color="blue4" textTransform="uppercase">
        Não sabe o CEP?
      </Text>
    </ButtonLink>
  </s.LinkCEPWrapper>
)

const CEPStates = ({ CEPState }: ICEPStatesProps) => {
  switch (CEPState) {
    case ECEPStates.loading:
      return <CEPLoading />
    case ECEPStates.found:
      return <CEPFound />
    case ECEPStates.partiallyFound:
      return <CEPPartiallyFound />
    case ECEPStates.notFound:
      return <CEPNotFound />
    case ECEPStates.manualInput:
      return <CEPManualInput />
    case ECEPStates.initialState:
      return <CEPInitialState />
    default:
      return <CEPInitialState />
  }
}

export default CEPStates
