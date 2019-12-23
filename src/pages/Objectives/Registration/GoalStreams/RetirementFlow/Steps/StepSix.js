import React from 'react'
import PropTypes from 'prop-types'

import { Container, Row, Col } from 'styled-bootstrap-grid'

import TextInput from 'components/Inputs/Text'
import ButtonNext from '../../Components/ButtonNext'

import { Section, Text, Wrapper } from '../../styles'

const StepSix = ({ changeScreen }) => (
  <Section>
    <Container>
      <Row justifyContent="center">
        <Col lg="5" xs="12">
          <Text fontSize="26" align="center">
            Gostaria de ter uma renda mensal deerminada na aposentadoria?
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
              name="wouldLikeToReceiveMonthlyIncome"
            />
          </Wrapper>
        </Col>
      </Row>
      <ButtonNext changeScreen={changeScreen} title="Continuar" />
    </Container>
  </Section>
)

StepSix.defaultProps = {
  changeScreen: null,
}

StepSix.propTypes = {
  changeScreen: PropTypes.func,
}

export default StepSix
