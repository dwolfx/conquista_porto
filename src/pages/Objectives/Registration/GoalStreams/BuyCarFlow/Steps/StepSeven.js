import React from 'react'
import PropTypes from 'prop-types'

import { Container, Row, Col } from 'styled-bootstrap-grid'

import RadioInput from 'components/Inputs/Radio'
import ButtonNext from 'pages/Objectives/Registration/GoalStreams/Components/ButtonNext'

import {
  Question,
  Section,
  Wrapper,
} from 'pages/Objectives/Registration/GoalStreams/styles'

const StepSeven = ({ onChangeScreen }) => {
  const easeOfSavingMoney = [
    {
      name: 'Consigo guardar',
      value: 'Consigo guardar',
    },
    {
      name: 'Tenho dificuldade',
      value: 'Tenho dificuldade',
    },
  ]
  return (
    <Section>
      <Container>
        <Row justifyContent="center">
          <Col lg="6" xs="12">
            <Question>
              Qual destes comportamentos você tem quando tenta guardar dinheiro?
            </Question>
          </Col>
        </Row>
        <Row justifyContent="center">
          <Wrapper>
            <RadioInput name="easeOfSavingMoney" options={easeOfSavingMoney} />
          </Wrapper>
        </Row>
        <ButtonNext
          handleScreen={() => {
            onChangeScreen(8)
          }}
          title="Continuar"
        />
      </Container>
    </Section>
  )
}

StepSeven.defaultProps = {
  onChangeScreen: () => {},
}

StepSeven.propTypes = {
  onChangeScreen: PropTypes.func,
}

export default StepSeven
