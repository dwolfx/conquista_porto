import React from 'react'
import PropTypes from 'prop-types'

import { Container, Row, Col } from 'styled-bootstrap-grid'

import TextInput from 'components/Inputs/Text'
import ButtonNext from 'pages/Objectives/Registration/GoalStreams/Components/ButtonNext'

import {
  Question,
  Section,
  Wrapper,
} from 'pages/Objectives/Registration/GoalStreams/styles'

const StepThree = ({ onChangeScreen }) => (
  <Section>
    <Container>
      <Row justifyContent="center">
        <Col lg="6" xs="12">
          <Question>Quanto você quer atingir ao final desse objetivo?</Question>
        </Col>
      </Row>
      <Row justifyContent="center">
        <Col lg="6" xs="12">
          <Wrapper>
            <TextInput width="100" label="R$" name="targetValue" />
          </Wrapper>
        </Col>
      </Row>
      <ButtonNext
        handleScreen={() => {
          onChangeScreen(4)
        }}
        title="Continuar"
      />
    </Container>
  </Section>
)

StepThree.defaultProps = {
  onChangeScreen: null,
}

StepThree.propTypes = {
  onChangeScreen: PropTypes.func,
}

export default StepThree
