import React from 'react'
import PropTypes from 'prop-types'

import { Container, Row, Col } from 'styled-bootstrap-grid'

import TextInput from 'components/Inputs/Text'
import ButtonNext from '../../Components/ButtonNext'

import { Question, Section, Wrapper } from '../../styles'

const StepTwo = ({ onChangeScreen }) => (
  <Section>
    <Container>
      <Row justifyContent="center">
        <Col lg="6" xs="12">
          <Question>
            Quando você quer se aposentar?
          </Question>
        </Col>
      </Row>
      <Row justifyContent="center">
        <Col lg="6" xs="12">
          <Wrapper>
            <TextInput width="100" label="Anos" name="targetDate" />
          </Wrapper>
        </Col>
      </Row>
      <ButtonNext
        handleScreen={() => {
          onChangeScreen(3)
        }}
        title="Continuar"
      />
    </Container>
  </Section>
)

StepTwo.defaultProps = {
  onChangeScreen: null,
}

StepTwo.propTypes = {
  onChangeScreen: PropTypes.func,
}

export default StepTwo
