import React from 'react'
import { Row, Col } from 'styled-bootstrap-grid'

import Text from 'components/Text'

import { GridCol, FullHeightCard } from './styles'

const SectionOne = () => (
  <>
    <GridCol lg="6">
      <FullHeightCard headerIcon="financial" headerTitle="Investimentos">
        <Row>
          <Col lg="6">
            <Text type="title5">Saldo disponível</Text>
          </Col>
        </Row>
      </FullHeightCard>
    </GridCol>
    <GridCol lg="3">
      <FullHeightCard headerIcon="creditcard" headerTitle="Crédito">
        <Row>
          <Col lg="6">
            <Text type="title5">Saldo disponível</Text>
          </Col>
        </Row>
      </FullHeightCard>
    </GridCol>
    <GridCol lg="3">
      <FullHeightCard headerIcon="targetmarket" headerTitle="Seguros">
        <Row>
          <Col lg="6">
            <Text type="title5">Saldo disponível</Text>
          </Col>
        </Row>
      </FullHeightCard>
    </GridCol>
  </>
)

export default SectionOne
