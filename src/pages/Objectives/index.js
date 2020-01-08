import React from 'react'
import { useHistory } from 'react-router-dom'

import Header from 'components/Wizard/Header'
import Board from './Board'

import { Container, RegistrationWrapper, BoartTitle } from './styles'

const Objectives = () => {
  const history = useHistory()
  return (
    <Container>
      <Header
        onClose={() => {
          history.push('/')
          document.documentElement.scrollTop = 0
          document.body.scrollTop = 0
        }}
      />
      <RegistrationWrapper>
        <BoartTitle>Criar objetivo</BoartTitle>
        <Board />
      </RegistrationWrapper>
    </Container>
  )
}

export default Objectives
