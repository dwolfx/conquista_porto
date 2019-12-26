import React from 'react'
import PropTypes from 'prop-types'

import { Container, Row, Col } from 'styled-bootstrap-grid'

import TextInput from 'components/Inputs/Text'
import ButtonNext from '../../Components/ButtonNext'

import { Question, Section, Wrapper } from '../../styles'

const StepSix = ({ onChangeScreen }) => (
  <Section>
    <Container>
      <Row justifyContent="center">
        <Col lg="6" xs="12">
          <Question fontSize="26" align="center">
            Gostaria de ter uma renda mensal determinada na aposentadoria?
          </Question>
        </Col>
      </Row>
      <Row justifyContent="center">
        <Col lg="6" xs="12">
          <Wrapper>
            <TextInput
              width="100"
              label="R$"
              name="wouldLikeToReceiveMonthlyIncome"
            />
          </Wrapper>
        </Col>
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

StepSix.defaultProps = {
  onChangeScreen: null,
}

StepSix.propTypes = {
  onChangeScreen: PropTypes.func,
}

export default StepSix
