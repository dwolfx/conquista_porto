import React from 'react'
import { useSelector } from 'react-redux'
import { useParams, Redirect, useHistory } from 'react-router'

import Loading from 'components/Loading'
import Header from 'components/Wizard/Header'

import useFetchCustomerProfile from 'hooks/CustomerProfile/useFetchCustomerProfile'
import useSuitability from 'hooks/Suitability/useSuitability'

import { WizardFlow } from './Components/Wizard'

import dataObjective from './dataObjective'
import { IData, IDataObject } from './types'

import { Container } from './Components/styles'

interface IProps {
  handleSteps: (data: IData[] | undefined) => void
}

export default function GoalStreams({ handleSteps }: IProps) {
  const { objectiveId } = useParams()
  const history = useHistory()
  const data: IDataObject | undefined = dataObjective.find(
    objective => objective.route === `/${objectiveId}`
  )

  handleSteps(data?.flow)

  useFetchCustomerProfile()
  const { suitability: suitabilityHook, isLoading } = useSuitability({
    errorPath: '/objetivos',
  })

  const customerProfileIsLoading = useSelector<any, any>(
    state => state.customerProfile.isLoading
  )

  if ((!suitabilityHook && isLoading) || customerProfileIsLoading) {
    return <Loading />
  }

  return data ? (
    <Container>
      <Header
        onClose={() => {
          history.push('/objetivos')
        }}
      />
      <WizardFlow
        data={data.flow}
        objective={data.goal_type}
        category={data.label}
      />
    </Container>
  ) : (
    <Redirect to="/objetivos" />
  )
}
