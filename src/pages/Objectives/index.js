import React from 'react'
import { useHistory, useRouteMatch, Switch, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Header from 'components/Wizard/Header'
import LineChart from 'components/Charts/LineChart'
import Board from './Board'
import Recommendation from './Recommendation'

import { Container, RegistrationWrapper, BoartTitle } from './styles'
import GoalStreams from './GoalStreams'

const Objectives = () => {
  const match = useRouteMatch()
  const history = useHistory()
  const objectiveData = useSelector(state => state.objective.data)

  const dataLine = {
    financialGoal: 1600,
    data: [
      {
        id: 'otimista',
        color: '#E72176',
        data: [
          {
            x: 'Jan/01',
            y: 1000,
          },
          {
            x: 'Jan/02',
            y: 1200,
          },
          {
            x: 'Jan/03',
            y: 1300,
          },
          {
            x: 'Jan/04',
            y: 1400,
          },
          {
            x: 'Jan/05',
            y: 1500,
          },
          {
            x: 'Jan/06',
            y: 1600,
          },
          {
            x: 'Jan/07',
            y: 1700,
          },
          {
            x: 'Jan/09',
            y: 2000,
          },
        ],
      },
      {
        id: 'bom',
        color: '#00ADEF',
        data: [
          {
            x: 'Jan/01',
            y: 1000,
          },
          {
            x: 'Jan/02',
            y: 1150,
          },
          {
            x: 'Jan/03',
            y: 1200,
          },
          {
            x: 'Jan/04',
            y: 1280,
          },
          {
            x: 'Jan/05',
            y: 1360,
          },
          {
            x: 'Jan/06',
            y: 1420,
          },
          {
            x: 'Jan/07',
            y: 1590,
          },
          {
            x: 'Jan/09',
            y: 1700,
          },
        ],
      },
      {
        id: 'fraco',
        color: 'hsl(2, 70%, 50%)',
        data: [
          {
            x: 'Jan/01',
            y: 1000,
          },
          {
            x: 'Jan/02',
            y: 1100,
          },
          {
            x: 'Jan/03',
            y: 1150,
          },
          {
            x: 'Jan/04',
            y: 1220,
          },
          {
            x: 'Jan/05',
            y: 1280,
          },
          {
            x: 'Jan/06',
            y: 1350,
          },
          {
            x: 'Jan/07',
            y: 1420,
          },
          {
            x: 'Jan/09',
            y: 1500,
          },
        ],
      },
    ],
  }

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

              <LineChart data={dataLine} width="1200px" height="600px" />

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
