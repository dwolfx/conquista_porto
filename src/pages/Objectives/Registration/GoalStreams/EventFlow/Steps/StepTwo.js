import React from 'react'
import PropTypes from 'prop-types'

import { Container, Row, Col } from 'styled-bootstrap-grid'

import ButtonNext from 'pages/Objectives/Registration/GoalStreams/Components/ButtonNext'

import {
  Date,
  Question,
  Section,
  Wrapper,
} from 'pages/Objectives/Registration/GoalStreams/styles'

const StepTwo = ({ onChangeScreen }) => (
  <Section>
    <Container>
      <Row justifyContent="center">
        <Col lg="6" xs="12">
          <Question>Quando vai acontecer o evento?</Question>
        </Col>
      </Row>
      <Row justifyContent="center">
        <Col lg="6" xs="12">
          <Wrapper>
            <Date width="100" label="Digite a data do seu evento" name="targetDate" />
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
