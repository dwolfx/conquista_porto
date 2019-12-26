import React from 'react'
import { Wrapper, Container } from './styles'
import Dashboard from './Dashboard/index'

const Profile = () => {
  const isCompleted = false

  return (
    <Wrapper>
      <Container>
        <Dashboard profileIsCompleted={isCompleted} />
      </Container>
    </Wrapper>
  )
}

export default Profile
