import React from 'react'
import PropTypes from 'prop-types'
import { useParams, Redirect, useHistory } from 'react-router'

import Loading from 'components/Loading'
import Header from 'components/Wizard/Header'

import useSuitability from 'hooks/useSuitability/useSuitability'

import { Container } from './Components/styles'
import { WizardFlow } from './Components/Wizard'
import dataObjective from './dataObjective'

export default function GoalStreams({ handleSteps }) {
  const { objectiveId } = useParams()
  const history = useHistory()
  const data = dataObjective.find(
    objective => objective.route === `/${objectiveId}`
  )
  handleSteps(data.flow)
  const { suitability: suitabilityHook, isLoading } = useSuitability({
    errorLink: '/objetivos',
  })

  if (!suitabilityHook && isLoading) {
    return <Loading />
  }

  return data ? (
    <Container>
      <Header
        onClose={() => {
          history.push('/objetivos')
        }}
      />
      <WizardFlow data={data.flow} objective={data.goal_type} />
    </Container>
  ) : (
    <Redirect to="/objetivos" />
  )
}

GoalStreams.propTypes = {
  handleSteps: PropTypes.func.isRequired,
}
