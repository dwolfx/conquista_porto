import React from 'react'
import 'styled-components/macro'

import useStackFluxManagement from 'hooks/FluxManagement/useStackFluxManagement'
import { StepComponentProps } from 'hooks/FluxManagement/types'

import { CustomerSteps } from '../../types'

const TripInsurenceCustomerPRO = () => {
  const { getLast, getLength, instantiate } = useStackFluxManagement<
    StepComponentProps
  >()

  React.useEffect(() => {
    if (getLength() === 0) instantiate(CustomerSteps.InsuranceSummary)
  }, [instantiate, getLength])

  return <>{getLast()}</>
}

export default TripInsurenceCustomerPRO
