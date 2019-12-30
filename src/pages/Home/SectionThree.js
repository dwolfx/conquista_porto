/* eslint-disable react/no-array-index-key */
import React from 'react'
import PropTypes from 'prop-types'
import { Row } from 'styled-bootstrap-grid'

import OfferCarImg from 'assets/images/pages/Home/car_offer.jpg'
import OfferHomeImg from 'assets/images/pages/Home/home_offer.jpg'
import Button from 'components/Button'
import ButtonLink from 'components/Button/Link'
import Text from 'components/Text'

import { PointsListArr } from './mock'
import {
  EmptyBody,
  EmptyText,
  EmptyButton,
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

export default function SectionThree({ points }) {
  const renderPointsFooter = () => {
    if (points) {
      return (
        <CardPontosFooter>
          <ButtonLink>Regras e condições</ButtonLink>
          <ButtonLink>Ver extrato</ButtonLink>
        </CardPontosFooter>
      )
    }

    return null
  }

  const renderPointsList = () =>
    PointsListArr.map((item, index) => (
      <PointsItem key={`point-${index}`}>
        <PointDate>{item.date}</PointDate>
        <PointName>{item.name}</PointName>
        <PointNumber bold>{item.points}</PointNumber>
      </PointsItem>
    ))

  const renderEmptyState = () => (
    <EmptyBody>
      <EmptyText>
        Ao investir na nossa plataforma, fazer compras no cartão de crédito e ao
        contratar produtos Porto Seguro você terá acesso a ofertas e descontos
        exclusivos!
      </EmptyText>
      <EmptyButton color="secondary">Ver regras e condições</EmptyButton>
    </EmptyBody>
  )

  return (
    <>
      <SectionCol lg="5">
        <FullHeightCard
          headerIcon="diamond"
          headerTitle="Pontos"
          footer={renderPointsFooter()}
        >
          <PointsInfo>
            <Text type="title5">Saldo atual</Text>
            <Text type="title5" bold>
              {points ? 1160 : 0} pontos
            </Text>
            {points && <Button color="secondary">Resgatar</Button>}
          </PointsInfo>
          {points ? (
            <>
              <PointsList>{renderPointsList()}</PointsList>
            </>
          ) : (
            renderEmptyState()
          )}
        </FullHeightCard>
      </SectionCol>

      <SectionCol lg="7">
        <Row style={{ height: '100%' }}>
          <SectionCol lg="6">
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
                    6.000 pontos equivalem a R$ 300,00 de desconto no seguro do
                    seu automóvel
                  </Text>
                </OfferTextBox>
              </OfferBox>
            </FullHeightCard>
          </SectionCol>
          <SectionCol lg="6">
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
        </Row>
      </SectionCol>
    </>
  )
}

SectionThree.defaultProps = {
  points: null,
}

SectionThree.propTypes = {
  points: PropTypes.shape({
    date: PropTypes.string,
    name: PropTypes.string,
    points: PropTypes.string,
  }),
}
