import React from 'react'
import PropTypes from 'prop-types'

import { Container, Row, Col } from 'styled-bootstrap-grid'

import RadioInput from 'components/Inputs/Radio'
import ButtonNext from 'pages/Objectives/GoalStreams/Components/ButtonNext'

import {
  Question,
  Section,
  WrapperDefault,
} from 'pages/Objectives/GoalStreams/styles'

const StepEight = ({ onChangeScreen }) => {
  const earlyReceipt = [
    {
      name: 'Sim',
      value: 'Sim',
    },
    {
      name: 'Não',
      value: 'Não',
    },
  ]
  return (
    <Section>
      <Container>
        <Row justifyContent="center">
          <Col lg="6" xs="12">
            <Question>
              Gostaria de tentar receber antes do prazo final (ex: por sorteio)?
            </Question>
          </Col>
        </Row>
        <Row justifyContent="center">
          <WrapperDefault>
            <RadioInput name="wouldLikeToReceiptEarly" options={earlyReceipt} />
          </WrapperDefault>
        </Row>
        <ButtonNext
          handleScreen={() => {
            onChangeScreen(9)
          }}
          title="Continuar"
        />
      </Container>
    </Section>
  )
}

StepEight.defaultProps = {
  onChangeScreen: () => {},
}

StepEight.propTypes = {
  onChangeScreen: PropTypes.func,
}

export default StepEight
