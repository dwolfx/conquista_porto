import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams, Redirect, useHistory, useLocation } from 'react-router'

import Loading from 'components/Loading'
import Header from 'components/Header/TransactionsHeader'

import useFetchCustomerProfile from 'hooks/CustomerProfile/useFetchCustomerProfile'
import useSuitability from 'hooks/Suitability/useSuitability'

import { WizardFlow } from './Components/Wizard'

import dataObjective from './dataObjective'
import { IData, IDataObject } from './types'

import { Container } from './Components/styles'

interface IProps {
  location?: boolean
  handleSteps: (data: IData[] | undefined) => void
}

interface IRouteParams {
  objectiveId?: string
}

export default function GoalStreams({ handleSteps }: IProps) {
  const [currentStep, setStepIndex] = useState(0)
  const { objectiveId } = useParams<IRouteParams>()
  const history = useHistory()
  const location = useLocation()
  const data: IDataObject | undefined = dataObjective.find(
    objective => objective.route === `/${objectiveId}`
  )

  handleSteps(data?.flow)

  useFetchCustomerProfile()
  const { suitability: suitabilityHook, isLoading } = useSuitability({
    errorPath: '/objetivos',
    goalType: data?.goal_type,
  })

  const customerProfileIsLoading = useSelector<any, any>(
    state => state.customerProfile.isLoading
  )

  if ((!suitabilityHook && isLoading) || customerProfileIsLoading) {
    return <Loading />
  }

  const handleClick = (step: any) => {
    if (step === 'increment') {
      setStepIndex(currentStep + 1)
    }
  }

  const showBack = Boolean(currentStep > 0) || location?.state?.pageBoard

  return data ? (
    <Container>
      <Header
        showBackButton={showBack}
        onClose={() => {
          history.push('/')
        }}
        onBack={() => {
          if (currentStep > 0) {
            return setStepIndex(currentStep - 1)
          }
          history.goBack()
        }}
      />
      <WizardFlow
        currentStep={currentStep}
        data={data.flow}
        objective={data.goal_type}
        category={data.label}
        handleChildClick={handleClick}
      />
    </Container>
  ) : (
    <Redirect to="/objetivos" />
  )
}
