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

const StepOne = ({ onChangeScreen }) => (
  <Section>
    <Container>
      <Row justifyContent="center">
        <Col lg="6" xs="12">
          <Question>
            Oi, qual é o apelido que você quer dar para o seu novo objetivo?
          </Question>
        </Col>
      </Row>
      <Row justifyContent="center">
        <Col lg="6" xs="12">
          <Wrapper>
            <Input
              width="100"
              label="Digite o apelido do seu objetivo"
              name="nickname"
            />
          </Wrapper>
        </Col>
      </Row>
      <ButtonNext
        isDisabled
        handleScreen={() => {
          onChangeScreen(2)
        }}
        title="Continuar"
      />
    </Container>
  </Section>
)

StepOne.defaultProps = {
  onChangeScreen: null,
}

StepOne.propTypes = {
  onChangeScreen: PropTypes.func,
}

export default StepOne
