import React from 'react'
import PropTypes from 'prop-types'

import { Container, Row, Col } from 'styled-bootstrap-grid'

import TextInput from 'components/Inputs/Text'
import ButtonNext from '../../Components/ButtonNext'

import { Section, Text, Wrapper } from '../../styles'

const StepTwo = ({ changeScreen }) => (
  <Section>
    <Container>
      <Row justifyContent="center">
        <Col lg="5" xs="12">
          <Text fontSize="26" align="center">
            Quando você quer se aposentar?
          </Text>
        </Col>
      </Row>
      <Row justifyContent="center">
        <Col lg="5" xs="12">
          <Wrapper>
            <TextInput
              width="100"
              paddingLeft="15"
              label="Anos"
              name="targetDate"
            />
          </Wrapper>
        </Col>
      </Row>
      <ButtonNext changeScreen={changeScreen} title="Continuar" />
    </Container>
  </Section>
)

StepTwo.defaultProps = {
  changeScreen: null,
}

StepTwo.propTypes = {
  changeScreen: PropTypes.func,
}

export default StepTwo
