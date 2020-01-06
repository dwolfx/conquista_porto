import React from 'react'
import PropTypes from 'prop-types'

import { Container, Row, Col } from 'styled-bootstrap-grid'

import RadioInput from 'components/Inputs/Radio'
import ButtonNext from 'pages/Objectives/Registration/GoalStreams/Components/ButtonNext'

import {
  Question,
  Section,
  WrapperDefault,
} from 'pages/Objectives/Registration/GoalStreams/styles'

const StepThree = ({ onChangeScreen }) => {
  const dateOptions = [
    {
      name: 'Flexível',
      value: 'Flexível',
    },
    {
      name: 'Definitiva',
      value: 'Definitiva',
    },
  ]
  return (
    <Section>
      <Container>
        <Row justifyContent="center">
          <Col lg="6" xs="12">
            <Question>Essa data para você é:</Question>
          </Col>
        </Row>
        <Row justifyContent="center">
          <WrapperDefault>
            <RadioInput name="flexibeOrDefiniteDate" options={dateOptions} />
          </WrapperDefault>
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
}

StepThree.defaultProps = {
  onChangeScreen: () => {},
}

StepThree.propTypes = {
  onChangeScreen: PropTypes.func,
}

export default StepThree
