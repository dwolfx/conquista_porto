import React from 'react'
import { useHistory, useRouteMatch, Switch, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Header from 'components/Wizard/Header'
import Board from './Board'
import Recommendation from './Recommendation'

import { Container, RegistrationWrapper, BoartTitle } from './styles'
import GoalStreams from './GoalStreams'

const Objectives = () => {
  const match = useRouteMatch()
  const history = useHistory()
  const objectiveData = useSelector(state => state.objective.data)

  // Use only for tests with recomendation
  // const dispatch = useDispatch()
  // useEffect(() => {
  //   dispatch(PostObjectiveDataRequest({}))
  // }, [dispatch])

  return (
    <Switch>
      <Route path={`${match.path}/:objectiveId`}>
        <GoalStreams />
      </Route>
      <Route path={match.path}>
        <Container>
          <Header
            onClose={() => {
              history.push('/')
              document.documentElement.scrollTop = 0
              document.body.scrollTop = 0
            }}
          />
          {!objectiveData ? (
            <RegistrationWrapper>
              <BoartTitle>Criar objetivo</BoartTitle>
              <Board />
            </RegistrationWrapper>
          ) : (
            <Recommendation {...objectiveData} />
          )}
        </Container>
      </Route>
    </Switch>
  )
}

export default Objectives
