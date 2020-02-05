import React from 'react'
import Header from 'components/Wizard/Header'
import { useParams, Redirect, useHistory } from 'react-router'
import { Container } from './Components/styles'
import { WizardFlow } from './Components/Wizard'
import dataObjective from './dataObjective'

export default function() {
  const { objectiveId } = useParams()
  const history = useHistory()
  const data = dataObjective.find(
    objective => objective.route === `/${objectiveId}`
  )

  return data ? (
    <Container>
      <Header
        onClose={() => {
          history.push('/objetivos')
        }}
      />
      <WizardFlow data={data.flow} objective={data.goalType} />
    </Container>
  ) : (
    <Redirect to="/objetivos" />
  )
}
