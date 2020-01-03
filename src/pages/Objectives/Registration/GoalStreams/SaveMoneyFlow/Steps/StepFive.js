import React from 'react'
import PropTypes from 'prop-types'

import { Container, Row, Col } from 'styled-bootstrap-grid'

import ButtonNext from 'pages/Objectives/Registration/GoalStreams/Components/ButtonNext'

import {
  Input,
  Question,
  QuestionRule,
  Section,
  Wrapper,
} from 'pages/Objectives/Registration/GoalStreams/styles'

const StepFive = ({ onChangeScreen }) => (
  <Section>
    <Container>
      <Row justifyContent="center">
        <Col lg="6" xs="12">
          <Question>Quanto você pretende investir por mês?</Question>
        </Col>
      </Row>
      <Row justifyContent="center">
        <Col lg="6" xs="12">
          <QuestionRule>
            Para atingir seu objetivo, sugiro pelo menos R$ 00.000,00 por mês.
          </QuestionRule>
        </Col>
      </Row>
      <Row justifyContent="center">
        <Col lg="6" xs="12">
          <Wrapper>
            <Input width="100" label="Digite o valor mensal do investimento" name="monthlyValue" />
          </Wrapper>
        </Col>
      </Row>
      <ButtonNext
        handleScreen={() => {
          onChangeScreen(6)
        }}
        title="Continuar"
      />
    </Container>
  </Section>
)

StepFive.defaultProps = {
  onChangeScreen: () => {},
}

StepFive.propTypes = {
  onChangeScreen: PropTypes.func,
}

export default StepFive
