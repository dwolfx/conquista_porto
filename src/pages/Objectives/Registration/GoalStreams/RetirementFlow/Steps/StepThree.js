import React from 'react'
import PropTypes from 'prop-types'

import { Container, Row, Col } from 'styled-bootstrap-grid'

import TextInput from 'components/Inputs/Text'
import ButtonNext from '../../Components/ButtonNext'

import { Section, Text, Wrapper } from '../../styles'

const StepThree = ({ changeScreen }) => (
  <Section>
    <Container>
      <Row justifyContent="center">
        <Col lg="5" xs="12">
          <Text fontSize="26" align="center">
            Quanto você quer atingir ao final desse objetivo?
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
              name="targetValue"
            />
          </Wrapper>
        </Col>
      </Row>
      <ButtonNext changeScreen={changeScreen} title="Continuar" />
    </Container>
  </Section>
)

StepThree.defaultProps = {
  changeScreen: null,
}

StepThree.propTypes = {
  changeScreen: PropTypes.func,
}

export default StepThree
