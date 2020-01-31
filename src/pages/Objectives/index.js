import React from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Header from 'components/Wizard/Header'
import Board from './Board'
import Recommendation from './Recommendation'

import { Container, RegistrationWrapper, BoartTitle } from './styles'

const Objectives = () => {
  const history = useHistory()
  const objectiveData = useSelector(state => state.objective.data)
  return (
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
        <Recommendation goalData={objectiveData} />
      )}
    </Container>
  )
}

export default Objectives
