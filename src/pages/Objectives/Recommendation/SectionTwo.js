/* eslint-disable react/no-array-index-key */
import React from 'react'
import { Col } from 'styled-bootstrap-grid'

import { GridRow, FullHeightCard } from './styles'

const SectionTwo = () => (
  <GridRow>
    <Col lg="9">
      <FullHeightCard headerIcon="financial" headerTitle="Investmentos">
        Investimentos
      </FullHeightCard>
    </Col>

    <Col lg="3">
      <FullHeightCard headerIcon="carnew" headerTitle="Financiamento">
        Financiamento
      </FullHeightCard>
    </Col>
  </GridRow>
)

export default SectionTwo
