/* eslint-disable react/no-array-index-key */
import React from 'react'

import OfferCarImg from 'assets/images/pages/Home/car_offer.jpg'
import OfferHomeImg from 'assets/images/pages/Home/home_offer.jpg'
import Button from 'components/Button'
import ButtonLink from 'components/Button/Link'
import Text from 'components/Text'

import { PointsListArr } from './mock'
import {
  SectionCol,
  FullHeightCard,
  CardPontosFooter,
  OfferBox,
  OfferImageBox,
  OfferTextBox,
  PointsItem,
  PointsInfo,
  PointDate,
  PointName,
  PointNumber,
  PointsList,
} from './styles'

export default function SectionThree() {
  const renderPointsFooter = () => (
    <CardPontosFooter>
      <ButtonLink>Regras e condições</ButtonLink>
      <ButtonLink>Ver extrato</ButtonLink>
    </CardPontosFooter>
  )

  const renderPointsList = () =>
    PointsListArr.map((item, index) => (
      <PointsItem key={`point-${index}`}>
        <PointDate>{item.date}</PointDate>
        <PointName>{item.name}</PointName>
        <PointNumber bold>{item.points}</PointNumber>
      </PointsItem>
    ))

  return (
    <>
      <SectionCol lg="6">
        <FullHeightCard
          headerIcon="diamond"
          headerTitle="Pontos"
          footer={renderPointsFooter()}
        >
          <PointsInfo>
            <Text type="title5">Saldo atual</Text>
            <Text type="title5" bold>
              116.500 pontos
            </Text>
            <Button color="secondary">Resgatar</Button>
          </PointsInfo>
          <PointsList>{renderPointsList()}</PointsList>
        </FullHeightCard>
      </SectionCol>
      <SectionCol lg="3">
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
      </SectionCol>
      <SectionCol lg="3">
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
      </SectionCol>
    </>
  )
}
