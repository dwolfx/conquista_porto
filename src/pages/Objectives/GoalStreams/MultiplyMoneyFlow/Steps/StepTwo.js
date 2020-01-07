import React from 'react'
import PropTypes from 'prop-types'

import { Container, Row, Col } from 'styled-bootstrap-grid'

import ButtonNext from 'pages/Objectives/GoalStreams/Components/ButtonNext'

import {
  Date,
  Question,
  Section,
  Wrapper,
} from 'pages/Objectives/GoalStreams/styles'

const StepTwo = ({ onChangeScreen }) => (
  <Section>
    <Container>
      <Row justifyContent="center">
        <Col lg="6" xs="12">
          <Question>Até quando você quer chegar a esse valor?</Question>
        </Col>
      </Row>
      <Row justifyContent="center">
        <Col lg="6" xs="12">
          <Wrapper>
            <Date
              width="100"
              label="Digite a data para chegar a esse valor"
              name="targetDate"
            />
          </Wrapper>
        </Col>
      </Row>
      <ButtonNext
        handleScreen={() => {
          onChangeScreen(3)
        }}
        title="Continuar"
      />
    </Container>
  </Section>
)

StepTwo.defaultProps = {
  onChangeScreen: () => {},
}

StepTwo.propTypes = {
  onChangeScreen: PropTypes.func,
}

export default StepTwo
