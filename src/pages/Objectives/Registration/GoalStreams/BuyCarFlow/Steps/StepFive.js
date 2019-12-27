import React from 'react'
import PropTypes from 'prop-types'

import { Container, Row, Col } from 'styled-bootstrap-grid'

import TextInput from 'components/Inputs/Text'
import ButtonNext from 'pages/Objectives/Registration/GoalStreams/Components/ButtonNext'

import { Question, Section, Wrapper } from '../../styles'

const StepFive = ({ onChangeScreen }) => (
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
            <TextInput width="100" label="R$" name="initialValue" />
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
