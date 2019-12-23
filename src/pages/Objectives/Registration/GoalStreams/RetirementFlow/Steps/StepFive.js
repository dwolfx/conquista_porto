import React from 'react'
import PropTypes from 'prop-types'

import { Container, Row, Col } from 'styled-bootstrap-grid'

import TextInput from 'components/Inputs/Text'
import ButtonNext from '../../Components/ButtonNext'

import { Section, Text, Wrapper } from '../../styles'

const StepFive = ({ changeScreen }) => (
  <Section>
    <Container>
      <Row justifyContent="center">
        <Col lg="5" xs="12">
          <Text fontSize="26" align="center">
            Quanto você pretende investir por mês?
          </Text>
        </Col>
      </Row>
      <Row justifyContent="center">
        <Col lg="5" xs="12">
          <Text fontSize="14" fontWeight="400" align="center" marginTop="20">
            Para atingir seu objetivo, sugiro pelo menos R$ 00.000,00 por mês.
          </Text>
        </Col>
      </Row>
      <Row justifyContent="center">
        <Col lg="5" xs="12">
          <Wrapper>
            <TextInput
              width="100"
              paddingLeft="15"
              label="R$"
              name="monthlyValue"
            />
          </Wrapper>
        </Col>
      </Row>
      <ButtonNext changeScreen={changeScreen} title="Continuar" />
    </Container>
  </Section>
)

StepFive.defaultProps = {
  changeScreen: null,
}

StepFive.propTypes = {
  changeScreen: PropTypes.func,
}

export default StepFive
