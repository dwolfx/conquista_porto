import React, { useState, useEffect } from 'react'
import { useHistory, useRouteMatch, Switch, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Header from 'components/Wizard/Header'

import {
  CleanObjectiveData,
  PostObjectiveDataRequest,
} from 'store/modules/Objective/action'

import Board from './Board'
import GoalStreams from './GoalStreams'
import Recommendation from './Recommendation'

import { Container, RegistrationWrapper, BoartTitle } from './styles'

const Objectives = () => {
  const dispatch = useDispatch()
  const [totalSteps, setTotalSteps] = useState(0)
  const match = useRouteMatch()
  const history = useHistory()
  const { data: objectiveData, isLoading } = useSelector(
    state => state.objective
  )

  // Use only for tests with recomendation
  // const dispatch = useDispatch()
  useEffect(() => {
    dispatch(PostObjectiveDataRequest({}))
  }, [dispatch])

  const handleSteps = data => {
    setTotalSteps(data.length)
  }

  return (
    <Switch>
      <Route path={`${match.path}/:objectiveId`}>
        <GoalStreams handleSteps={handleSteps} />
      </Route>
      <Route path={match.path}>
        <Container>
          <Header
            onClose={() => {
              dispatch(CleanObjectiveData())
              history.push('/')
              document.documentElement.scrollTop = 0
              document.body.scrollTop = 0
            }}
            showBackButton={!objectiveData}
          />
          {!objectiveData || !Object.keys(objectiveData).length ? (
            <RegistrationWrapper>
              <BoartTitle>Criar objetivo</BoartTitle>
              <Board />
            </RegistrationWrapper>
          ) : (
            <Recommendation
              data={objectiveData}
              isLoading={isLoading}
              totalSteps={totalSteps + 1}
            />
          )}
        </Container>
      </Route>
    </Switch>
  )
}

export default Objectives
