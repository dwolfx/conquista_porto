import React from 'react'
import PropTypes from 'prop-types'

import { Container, Row, Col } from 'styled-bootstrap-grid'
import {
  Nickname,
  PageBar,
  SectionBar,
  TitleBar,
} from 'pages/Objectives/GoalStreams/Components/styles'

const TopBar = ({ currentStep, nickname, numberSteps }) => (
  <SectionBar>
    <Container>
      <Row justifyContent="between" alignItems="center">
        <Col lgAuto mdAuto smAuto xs={12}>
          <TitleBar>
            Criar <span>Objetivo</span>
          </TitleBar>
        </Col>
        {nickname && (
          <Col lgAuto mdAuto smAuto xs={12}>
            <Nickname>#{nickname}</Nickname>
          </Col>
        )}
        <Col lgAuto mdAuto smAuto xs={12}>
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
  nickname: '',
  numberSteps: null,
}

TopBar.propTypes = {
  currentStep: PropTypes.number,
  nickname: PropTypes.string,
  numberSteps: PropTypes.number,
}

export default TopBar
