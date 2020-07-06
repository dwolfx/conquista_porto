import React, { useState } from 'react'
import { Container, Row, Col } from 'styled-bootstrap-grid'

import Text from 'components/Text'
import Button from 'components/Button'
import Input from 'components/Inputs/Text'
import CPFInput from 'components/Inputs/CPFInput'
import { AuthRequestLogin } from 'store/modules/Auth/action'
import { useDispatch, useSelector } from 'react-redux'
import { FormWrapper } from './styles'

export default function Login() {
  const error = useSelector(state => state.auth.error)
  const dispatch = useDispatch()

  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  })

  const handleInputOnChange = key => event => {
    setCredentials({ ...credentials, [key]: event.target.value })
  }

  const handleSubmit = event => {
    dispatch(AuthRequestLogin(credentials))
    event.preventDefault()
  }

  if (
    process.env.REACT_APP_ENV !== 'development' &&
    process.env.REACT_APP_ENV !== 'local'
  ) {
    window.location.href = process.env.REACT_APP_BASE_URL_LOGOUT
    return null
  }

  return (
    <Container>
      <Row>
        <Col offset="4">
          <FormWrapper as="form" onSubmit={handleSubmit}>
            <Col>
              <Text type="headline" color="blue4">
                Login Conquista - Dev/HML
              </Text>
            </Col>
            <Col>
              <Text type="subheading" color="gray5">
                Você pode acessar com a senha do Portal do Cliente
              </Text>
            </Col>
            <Col>
              <CPFInput
                label="Username"
                name="username"
                value={credentials.username}
                onChange={handleInputOnChange('username')}
                data-testId='cpf-input'
              />
            </Col>
            <Col>
              <Input
                label="Password"
                name="password"
                type="password"
                value={credentials.password}
                dataTestId="password-input"
                onChange={handleInputOnChange('password')}
              />
            </Col>
            {error && (
              <Col>
                <Text type="body" color="magenta2">
                  {error}
                </Text>
              </Col>
            )}
            <Col>
              <Button onClick={handleSubmit} data-testId="login-button">
                Login
              </Button>
            </Col>
          </FormWrapper>
        </Col>
      </Row>
      <Row>Versão Teste</Row>
    </Container>
  )
}
