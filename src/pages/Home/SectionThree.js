import React from 'react'
import { Row, Col } from 'styled-bootstrap-grid'

import OfferCarImg from 'assets/images/pages/Home/car_offer.jpg'
import OfferHomeImg from 'assets/images/pages/Home/home_offer.jpg'
import Button from 'components/Button'
import ButtonLink from 'components/Button/Link'
import Text from 'components/Text'

import {
  GridCol,
  FullHeightCard,
  CardPontosFooter,
  OfferBox,
  OfferImageBox,
  OfferTextBox,
} from './styles'

export default function SectionThree() {
  const renderPontosFooter = () => (
    <CardPontosFooter>
      <ButtonLink>Regras e condições</ButtonLink>
      <ButtonLink>Ver extrato</ButtonLink>
    </CardPontosFooter>
  )

  return (
    <>
      <GridCol lg="6">
        <FullHeightCard
          headerIcon="diamond"
          headerTitle="Pontos"
          footer={renderPontosFooter()}
        >
          <Row>
            <Col>
              <Text>Saldo atual</Text>
              <Text bold> 116.500 pontos</Text>
              <Button color="secondary">Resgatar</Button>
            </Col>
          </Row>
          <Row>
            <Col></Col>
          </Row>
        </FullHeightCard>
      </GridCol>
      <GridCol lg="3">
        <FullHeightCard headerIcon="diamond" headerTitle="#OfertaCarro">
          <OfferBox>
            <OfferImageBox>
              <img src={OfferCarImg} alt="car offer pic" />
            </OfferImageBox>
            <OfferTextBox>
              <Text type="title5" bold>
                Título
              </Text>
              <Text>
                6.000 pontos equivalem a R$ 300,00 de desconto no seguro do seu
                automóvel
              </Text>
            </OfferTextBox>
          </OfferBox>
        </FullHeightCard>
      </GridCol>
      <GridCol lg="3">
        <FullHeightCard headerIcon="diamond" headerTitle="#OfertaCasa">
          <OfferBox>
            <OfferImageBox>
              <img src={OfferHomeImg} alt="home offer pic" />
            </OfferImageBox>
            <OfferTextBox>
              <Text type="title5" bold>
                Título
              </Text>
              <Text>
                4.000 pontos equivalem a R$ 360,00 na lavagem do seu sofá
              </Text>
            </OfferTextBox>
          </OfferBox>
        </FullHeightCard>
      </GridCol>
    </>
  )
}
