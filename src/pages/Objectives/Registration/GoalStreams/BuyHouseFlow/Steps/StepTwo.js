import React from 'react'
import PropTypes from 'prop-types'

import { Container, Row, Col } from 'styled-bootstrap-grid'

import DateInput from 'components/Inputs/DateInput'
import ButtonNext from 'pages/Objectives/Registration/GoalStreams/Components/ButtonNext'

import {
  Question,
  Section,
  Wrapper,
} from 'pages/Objectives/Registration/GoalStreams/styles'

const StepTwo = ({ onChangeScreen }) => (
  <Section>
    <Container>
      <Row justifyContent="center">
        <Col lg="6" xs="12">
          <Question>Quando você quer comprar seu imóvel?</Question>
        </Col>
      </Row>
      <Row justifyContent="center">
        <Col lg="6" xs="12">
          <Wrapper>
            <DateInput width="100" label="Data" name="targetDate" />
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
