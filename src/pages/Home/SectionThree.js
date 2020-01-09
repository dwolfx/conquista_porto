/* eslint-disable react/no-array-index-key */
import React from 'react'
import PropTypes from 'prop-types'
import { Row } from 'styled-bootstrap-grid'

import OfferCarImg from 'assets/images/pages/Home/car_offer.jpg'
import OfferHomeImg from 'assets/images/pages/Home/home_offer.jpg'
import Button from 'components/Button'
import ButtonLink from 'components/Button/Link'
import Text from 'components/Text'
import HorizontalList from 'components/HorizontalList'

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

  const renderPointsHorizontalList = () =>
    points.detalheExtratoOptemaisTypes &&
    points.detalheExtratoOptemaisTypes.map((item, index) => (
      <HorizontalList
        key={`point-${index}`}
        startItems={[
          <PointDate>{item.dataCompra}</PointDate>,
          <PointName>{item.nomeTransacao}</PointName>,
        ]}
        endItems={[<PointNumber bold>{item.pontoGanho}</PointNumber>]}
      />
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

  const renderPointsAmountBalance = extrato =>
    extrato.reduce((acc, curr) => acc + +curr.pontoGanho, 0)

  return (
    <>
      <SectionCol lg="5">
        <FullHeightCard
          headerIcon="diamond"
          headerTitle="Pontos"
          footer={renderPointsFooter()}
        >
          <PointsInfo>
            <Text type="headline">Saldo atual</Text>
            <Text type="headline" bold>
              {points
                ? renderPointsAmountBalance(points.detalheExtratoOptemaisTypes)
                : 0}{' '}
              pontos
            </Text>
            {points && <Button color="secondary">Resgatar</Button>}
          </PointsInfo>
          {points && points.detalheExtratoOptemaisTypes.length > 0 ? (
            <>
              <PointsList>{renderPointsHorizontalList()}</PointsList>
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
                  <Text type="headline" bold>
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
                  <Text type="headline" bold>
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
    detalheExtratoOptemaisTypes: PropTypes.arrayOf(
      PropTypes.shape({
        dataCompra: PropTypes.string,
        nomeTransacao: PropTypes.string,
        pontoGanho: PropTypes.string,
      })
    ),
  }),
}
