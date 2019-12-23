/* eslint-disable react/no-unescaped-entities */
import React from 'react'

import { Container, Row, Col } from 'styled-bootstrap-grid'
import Icon from 'components/IconExporter'

import { Section, Text } from '../../styles'

const SuccessStep = () => (
  <Section>
    <Container>
      <Row justifyContent="center">
        <Col lg="auto" xs="12">
          <Icon name="awesome" width={50} fill="#777" />
        </Col>
      </Row>
      <Row justifyContent="center">
        <Col lg="5" xs="12">
          <Text fontSize="26" align="center" marginTop="20">
            Tudo certo com seu cadastro
          </Text>
        </Col>
      </Row>
      <Row justifyContent="center">
        <Col lg="3" xs="12">
          <Text fontSize="16" align="center" marginTop="20">
            Logo, enviaremos uma mensagem de confirmação em seu e-mail.
          </Text>
        </Col>
      </Row>
    </Container>
  </Section>
)

export default SuccessStep
