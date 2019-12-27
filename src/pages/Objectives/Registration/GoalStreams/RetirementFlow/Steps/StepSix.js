import React from 'react'
import PropTypes from 'prop-types'

import { Container, Row, Col } from 'styled-bootstrap-grid'

import RadioInput from 'components/Inputs/Radio'
import ButtonNext from '../../Components/ButtonNext'

import { Question, Section, Wrapper } from '../../styles'

const StepSix = ({ onChangeScreen }) => {
  const receiveMonthlyOptions = [
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
              Gostaria de ter uma renda mensal determinada na aposentadoria?
            </Question>
          </Col>
        </Row>
        <Row justifyContent="center">
          <Wrapper>
            <RadioInput
              name="wouldLikeToReceiveMonthlyIncome"
              options={receiveMonthlyOptions}
            />
          </Wrapper>
        </Row>
        <ButtonNext
          handleScreen={() => {
            onChangeScreen(7)
          }}
          title="Continuar"
        />
      </Container>
    </Section>
  )
}

StepSix.defaultProps = {
  onChangeScreen: null,
}

StepSix.propTypes = {
  onChangeScreen: PropTypes.func,
}

export default StepSix
