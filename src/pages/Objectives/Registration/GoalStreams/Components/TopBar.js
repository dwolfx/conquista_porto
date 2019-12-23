import React from 'react'
import PropTypes from 'prop-types'

import { Container, Row, Col } from 'styled-bootstrap-grid'
import { SectionBar, TitleBar } from '../styles'

const TopBar = ({ currentStep, numberSteps }) => (
  <SectionBar>
    <Container>
      <Row justifyContent="between">
        <Col lgAuto xs={12}>
          <TitleBar fontSize={14} uppercase>
            Criar Objetivo
          </TitleBar>
        </Col>
        <Col lgAuto xs={12}>
          <TitleBar fontSize={14} uppercase>
            Etapa {currentStep} de {numberSteps}
          </TitleBar>
        </Col>
      </Row>
    </Container>
  </SectionBar>
)

TopBar.defaultProps = {
  currentStep: null,
  numberSteps: null,
}

TopBar.propTypes = {
  currentStep: PropTypes.number,
  numberSteps: PropTypes.number,
}

export default TopBar
