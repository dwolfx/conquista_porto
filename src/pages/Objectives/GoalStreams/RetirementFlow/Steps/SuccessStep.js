/* eslint-disable react/no-unescaped-entities */
import React, { useContext } from 'react'

import { Container, Row, Col } from 'styled-bootstrap-grid'
import Icon from 'components/IconExporter'
import Text from 'components/Text'
import { ThemeContext } from 'styled-components'

import { Section } from 'pages/Objectives/GoalStreams/styles'

const SuccessStep = () => {
  const themeContext = useContext(ThemeContext)
  return (
    <Section>
      <Container>
        <Row justifyContent="center">
          <Col lg="auto" xs="12">
            <Icon name="awesome" width={50} fill={themeContext.colors.gray5} />
          </Col>
        </Row>
        <Row justifyContent="center">
          <Col lg="auto" xs="12">
            <Text type="headline">Tudo certo com seu cadastro</Text>
          </Col>
        </Row>
        <Row justifyContent="center">
          <Col lg="auto" xs="12">
            <Text type="headline">
              Logo, enviaremos uma mensagem de confirmação em seu e-mail.
            </Text>
          </Col>
        </Row>
      </Container>
    </Section>
  )
}

export default SuccessStep
