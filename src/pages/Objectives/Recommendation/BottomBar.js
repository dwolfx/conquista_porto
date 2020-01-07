/* eslint-disable react/no-array-index-key */
import React from 'react'
import { Container, Row, Col } from 'styled-bootstrap-grid'

import { ButtonBar, SectionBar } from './styles'

const BottomBar = () => (
  <SectionBar>
    <Container>
      <Row justifyContent="end">
        <Col lgAuto>
          <ButtonBar color="primary">Resumo</ButtonBar>
          <ButtonBar color="secondary">Continuar</ButtonBar>
        </Col>
      </Row>
    </Container>
  </SectionBar>
)

export default BottomBar