import React from 'react'
import 'styled-components/macro'

import useStackFluxManagement from 'hooks/FluxManagement/useStackFluxManagement'
import { StepComponentProps } from 'hooks/FluxManagement/types'

import { ParnerSteps } from '../../types'

const TripInsurenceParnerPRO = () => {
  const { getLast, getLength, instantiate } = useStackFluxManagement<
    StepComponentProps
  >()

  React.useEffect(() => {
    if (getLength() === 0) instantiate(ParnerSteps.TravelDetailsForm)
  }, [instantiate, getLength])

  return <>{getLast()}</>
}

export default TripInsurenceParnerPRO
