import React from 'react'
import PropTypes from 'prop-types'

import { Container, Row, Col } from 'styled-bootstrap-grid'

import TextInput from 'components/Inputs/Text'
import ButtonNext from '../../Components/ButtonNext'

import { Question, Section, Wrapper } from '../../styles'

const StepEight = ({ onChangeScreen }) => (
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
        <Col lg="6" xs="12">
          <Wrapper>
            <TextInput width="100" label="RADIO" name="easeOfSavingMoney" />
          </Wrapper>
        </Col>
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

StepEight.defaultProps = {
  onChangeScreen: () => {},
}

StepEight.propTypes = {
  onChangeScreen: PropTypes.func,
}

export default StepEight
