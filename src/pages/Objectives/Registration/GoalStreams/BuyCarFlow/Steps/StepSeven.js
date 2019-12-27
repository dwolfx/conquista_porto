import React from 'react'
import PropTypes from 'prop-types'

import { Container, Row, Col } from 'styled-bootstrap-grid'

import TextInput from 'components/Inputs/Text'
import ButtonNext from '../../Components/ButtonNext'

import { Question, Section, Wrapper } from '../../styles'

const StepSeven = ({ onChangeScreen }) => (
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
        <Col lg="6" xs="12">
          <Wrapper>
            <TextInput width="100" label="RADIO" name="easeOfSavingMoney" />
          </Wrapper>
        </Col>
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

StepSeven.defaultProps = {
  onChangeScreen: () => {},
}

StepSeven.propTypes = {
  onChangeScreen: PropTypes.func,
}

export default StepSeven
