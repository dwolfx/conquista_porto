/* eslint-disable react/no-array-index-key */
import React from 'react'
import { Container, Row, Col } from 'styled-bootstrap-grid'

import { SectionBar } from './styles'

const BottomBar = () => (
  <SectionBar>
    <Container>
      <Row justifyContent="end">
        <Col lgAuto>Buttons</Col>
      </Row>
    </Container>
  </SectionBar>
)

export default BottomBar
