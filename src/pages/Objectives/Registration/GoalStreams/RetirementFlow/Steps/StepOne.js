import React from 'react'
import PropTypes from 'prop-types'

import { Container, Row, Col } from 'styled-bootstrap-grid'

import TextInput from 'components/Inputs/Text'
import ButtonNext from '../../Components/ButtonNext'

import { Section, Text, Wrapper } from '../../styles'

const StepOne = ({ changeScreen }) => (
  <Section>
    <Container>
      <Row justifyContent="center">
        <Col lg="5" xs="12">
          <Text fontSize="26" align="center">
            Oi, qual é o apelido que você quer dar para o seu novo objetivo?
          </Text>
        </Col>
      </Row>
      <Row justifyContent="center">
        <Col lg="5" xs="12">
          <Wrapper>
            <TextInput
              width="100"
              paddingLeft="15"
              label="Apelido para o seu objetivo"
              name="nickname"
            />
          </Wrapper>
        </Col>
      </Row>
      <ButtonNext changeScreen={changeScreen} title="Continuar" />
    </Container>
  </Section>
)

StepOne.defaultProps = {
  changeScreen: null,
}

StepOne.propTypes = {
  changeScreen: PropTypes.func,
}

export default StepOne
