import React from 'react'
import { useHistory } from 'react-router-dom'

import Button from 'components/Button'

import { Container } from './styles'

const Objectives = () => {
  const history = useHistory()
  const handleRedirect = () => {
    history.push('/objetivos/criar')
  }

  return (
    <Container>
      <Button color="primary" onClick={handleRedirect}>
        criar objetivos
      </Button>
    </Container>
  )
}

export default Objectives
