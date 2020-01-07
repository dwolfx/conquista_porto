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

const StepFour = ({ onChangeScreen }) => (
  <Section>
    <Container>
      <Row justifyContent="center">
        <Col lg="6" xs="12">
          <Question>Quanto você quer investir inicialmente?</Question>
        </Col>
      </Row>
      <Row justifyContent="center">
        <Col lg="6" xs="12">
          <Wrapper>
            <Input
              width="100"
              label="Digite o valor inicial do seu investimento"
              name="initialValue"
            />
          </Wrapper>
        </Col>
      </Row>
      <ButtonNext
        handleScreen={() => {
          onChangeScreen(5)
        }}
        title="Continuar"
      />
    </Container>
  </Section>
)

StepFour.defaultProps = {
  onChangeScreen: () => {},
}

StepFour.propTypes = {
  onChangeScreen: PropTypes.func,
}

export default StepFour
