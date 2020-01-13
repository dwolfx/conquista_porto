import React from 'react'
import PropTypes from 'prop-types'

import { Container, Row, Col } from 'styled-bootstrap-grid'

import ButtonNext from 'pages/Objectives/GoalStreams/Components/ButtonNext'

import {
  Input,
  Question,
  Section,
  Wrapper,
} from 'pages/Objectives/GoalStreams/styles'

const StepSix = ({ onChangeScreen }) => (
  <Section>
    <Container>
      <Row justifyContent="center">
        <Col lg="6" xs="12">
          <Question>Quanto você pretende investir por mês?</Question>
        </Col>
      </Row>
      <Row justifyContent="center">
        <Col lg="6" xs="12">
          <Wrapper>
            <Input
              width="100"
              label="Digite o valor mensal do investimento"
              name="monthlyValue"
            />
          </Wrapper>
        </Col>
      </Row>
      <ButtonNext
        handleScreen={() => {
          onChangeScreen(7)
        }}
        title="Continuar"
      />
    </Container>
  </Section>
)

StepSix.defaultProps = {
  onChangeScreen: () => {},
}

StepSix.propTypes = {
  onChangeScreen: PropTypes.func,
}

export default StepSix
