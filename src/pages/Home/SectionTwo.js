import React from 'react'
import { Row, Col } from 'styled-bootstrap-grid'

import TipBannerImg from 'assets/images/pages/Home/banner_objectives.jpg'
import Text from 'components/Text'

import {
  GridRow,
  GridCol,
  BannerTips,
  FullHeightCard,
  FullHeightCardObjectives,
} from './styles'

const SectionTwo = () => (
  <>
    <GridCol lg="6">
      <FullHeightCard headerIcon="target" headerTitle="Objetivos">
        <Row>
          <Col lg="6">
            <Text type="title5">Saldo disponível</Text>
          </Col>
        </Row>
      </FullHeightCard>
    </GridCol>

    <GridCol lg="6">
      <GridRow style={{ height: '50%', paddingBottom: 7 }}>
        <GridCol lg="4">
          <FullHeightCardObjectives
            icon="homewithwindow"
            title="Comprar uma casa"
            link="/"
          />
        </GridCol>
        <GridCol lg="4">
          <FullHeightCardObjectives
            icon="car2"
            title="Comprar um carro"
            link="/"
          />
        </GridCol>
        <GridCol lg="4">
          <FullHeightCardObjectives
            icon="add"
            title="Criar um objetivo"
            link="/"
          />
        </GridCol>
      </GridRow>

      <GridRow style={{ height: '50%', paddingTop: 7 }}>
        <GridCol lg="12">
          <BannerTips label="Dicas para economizar" image={TipBannerImg}>
            <Text type="title3">Registre todas as despesas</Text>
            <Text>
              Como você pretende controlar se não sabe onde ele está? Este é o
              primeiro passo para começar a poupar
            </Text>
          </BannerTips>
        </GridCol>
      </GridRow>
    </GridCol>
  </>
)

export default SectionTwo
