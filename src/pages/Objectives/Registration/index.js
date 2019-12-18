import React from 'react'
import { useHistory } from 'react-router-dom'

import Header from 'components/Wizard/Header'
import Board from './Board'

import { Container } from './styles'

const Objectives = () => {
  const history = useHistory()
  return (
    <Container>
      <Header
        onClose={() => {
          history.push('/objetivos')
        }}
      />
      <Board />
    </Container>
  )
}

export default Objectives
