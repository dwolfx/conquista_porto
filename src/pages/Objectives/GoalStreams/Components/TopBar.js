import React from 'react'
import PropTypes from 'prop-types'

import { Container, Row, Col } from 'styled-bootstrap-grid'
import { PageBar, SectionBar, TitleBar } from '../styles'

const TopBar = ({ currentStep, numberSteps }) => (
  <SectionBar>
    <Container>
      <Row justifyContent="between" alignItems="center">
        <Col lgAuto xs={12}>
          <TitleBar>
            Criar <span>Objetivo</span>
          </TitleBar>
        </Col>
        <Col lgAuto xs={12}>
          <PageBar>
            Etapa {currentStep} de {numberSteps}
          </PageBar>
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
