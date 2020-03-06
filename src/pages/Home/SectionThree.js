/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Row } from 'styled-bootstrap-grid'
import 'styled-components/macro'

import Button from 'components/Button'
import ButtonLink from 'components/Button/Link'
import Text from 'components/Text'
import Tag from 'components/Tag'
import HorizontalList from 'components/HorizontalList'
import Modal from 'components/Modal/ModalNew'
import useDataLayerProducts from 'GoogleTagManager/dataLayerProductsHook'

import { formatMoney } from 'helpers'

import Popover from 'components/Popover/index'
import pointsCardsData from './pointsCardsData'
import {
  EmptyBody,
  SectionCol,
  FullHeightCard,
  CardPontosFooter,
  OfferBox,
  OfferImageBox,
  OfferTextBox,
  OfferTitle,
  OfferCategoryBox,
  OfferCategoryText,
  OfferText,
  PointsInfo,
  PointDate,
  PointName,
  PointNumber,
  PointsList,
  ContainerBox,
  ModalTextWrapper,
  PointsExtractListWrapper,
  PointsButtonWrapper,
  Icon,
} from './styles'

export default function SectionThree({ points }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [belowOffer, setBelowOffer] = useState(null)
  const [aboveOffer, setAboveOffer] = useState(null)

  useEffect(() => {
    if (points) {
      const pointsAmount = calculatePointsAmountBalance(
        points.detalheExtratoOptemaisTypes
      )

      if (pointsAmount) {
        const maxPoints = pointsCardsData.slice(-1)[0].points
        let newBelowOffer
        let newAboveOffer

        if (pointsAmount > maxPoints) {
          // if current points are above the maximum offer, show cards randomly from the group 5 (higher value points)
          // aboveOffer must be higher than belowOffer
          const higherGroupData = pointsCardsData.filter(
            item => item.group === 5
          )

          newBelowOffer = higherGroupData[Math.floor(Math.random() * 3)]
          newAboveOffer = higherGroupData
            .reverse()
            .reduce(
              (acc, cur) => (cur.points > newBelowOffer.points ? cur : acc),
              aboveOffer
            )
        } else {
          // if current points are below the maximum offer, get the offer below the current points and one above the current
          newBelowOffer = pointsCardsData.reduce(
            (acc, cur) => (cur.points <= pointsAmount ? cur : acc),
            belowOffer
          )
          newAboveOffer = pointsCardsData
            .reverse()
            .reduce(
              (acc, cur) =>
                cur.points > pointsAmount && belowOffer.points !== cur.points
                  ? cur
                  : acc,
              aboveOffer
            )
        }

        setBelowOffer(newBelowOffer)
        setAboveOffer(newAboveOffer)
      }
    } else {
      setBelowOffer(pointsCardsData[0])
      setAboveOffer(pointsCardsData[1])
    }
  }, [points])

  useDataLayerProducts(belowOffer, aboveOffer)

  const PointsOfferCard = ({ offer }) => (
    <FullHeightCard
      headerIcon={offer.icon || 'tag'}
      headerTitle="Troque seus pontos"
    >
      <OfferBox>
        <OfferImageBox>
          <img src={offer.image} alt={`${offer.exchangeProduct} pic`} />
          {offer.type && (
            <OfferCategoryBox>
              <OfferCategoryText type="subheading">
                {offer.type}
              </OfferCategoryText>
            </OfferCategoryBox>
          )}
        </OfferImageBox>
        <OfferTextBox>
          <OfferTitle bold>{offer.exchangeProduct}</OfferTitle>
          <OfferText>
            {Intl.NumberFormat().format(offer.points)} pontos você troca por{' '}
            {formatMoney(offer.exchangeValue)} no {offer.exchangeProduct}
          </OfferText>
        </OfferTextBox>
      </OfferBox>
    </FullHeightCard>
  )

  PointsOfferCard.propTypes = {
    offer: PropTypes.shape({
      points: PropTypes.number,
      exchangeValue: PropTypes.number,
      exchangeProduct: PropTypes.string,
      icon: PropTypes.string,
      type: PropTypes.string,
      image: PropTypes.string,
    }).isRequired,
  }

  const renderPointsFooter = () => (
    <CardPontosFooter>
      <ButtonLink
        data-gtm-subname="card pontos"
        data-gtm-name="regras e condicoes"
        data-gtm-type="click"
        data-gtm-clicktype="link"
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        Regras e condições
      </ButtonLink>
    </CardPontosFooter>
  )

  const renderPointsHorizontalList = () =>
    points.detalheExtratoOptemaisTypes &&
    points.detalheExtratoOptemaisTypes.map((item, index) => (
      <HorizontalList
        key={`point-${index}`}
        startItems={[
          <PointDate>{item.dataCompra}</PointDate>,
          <PointName type="headline">{item.nomeTransacao}</PointName>,
        ]}
        endItems={[
          <PointNumber type="headline" bold>
            {Intl.NumberFormat().format(item.pontoGanho)}
          </PointNumber>,
        ]}
      />
    ))

  const renderModalContent = () => {
    const customText = (type, color, text) => (
      <Text type={type} color={color} bold>
        {text}
      </Text>
    )
    const tag = (color, text) => <Tag color={color} text={text} />

    return (
      <>
        <ModalTextWrapper>
          <Text type="headline" color="gray6" bold>
            Como acumular pontos?
          </Text>
          <Text type="headline" color="gray5">
            Confira as condições exclusivas para os colaboradores da Porto
            Seguro. Essas condições são válidas até 01/02/2019.
          </Text>
        </ModalTextWrapper>
        <ContainerBox>
          <HorizontalList
            noPadding
            startItems={[
              customText('headline', 'gray6', 'Cadastro no Conquista'),
            ]}
            endItems={[tag('gray', '250 pontos')]}
          />
          <HorizontalList
            noPadding
            startItems={[
              customText('headline', 'gray6', 'Cadastro de investidor'),
            ]}
            endItems={[tag('gray', '200 pontos')]}
          />
          <HorizontalList
            noPadding
            startItems={[
              customText('headline', 'gray6', 'Primeiro objetivo salvo'),
            ]}
            endItems={[tag('gray', '100 pontos')]}
          />
          <HorizontalList
            noPadding
            startItems={[
              customText(
                'headline',
                'gray6',
                'Primeiro investimento realizado'
              ),
            ]}
            endItems={[tag('gray', '200 pontos')]}
          />
        </ContainerBox>
        <ModalTextWrapper>
          <Text type="headline" color="gray6" bold>
            Quem pode pontuar?
          </Text>
          <Text type="headline" color="gray5">
            Todos as pessoas que acessam o Conquista têm acesso ao programa e
            podem pontuar. Aqueles que já forem investidores na Portopar, têm os
            pontos de cadastro e cadastro de investidor contabilizados ao
            realizarem o 1° acesso à plataforma.
          </Text>
        </ModalTextWrapper>
        <ModalTextWrapper>
          <Text type="headline" color="gray6" bold>
            Depois de quanto tempo os pontos expiram?
          </Text>
          <Text type="headline" color="gray5">
            O pontos têm duração de 24 meses a partir da emissão.
          </Text>
        </ModalTextWrapper>
        <ModalTextWrapper>
          <Text type="headline" color="gray6" bold>
            Como somar pontos com o Cartão de Crédito Porto Seguro?
          </Text>
          <Text type="headline" color="gray5">
            Os pontos do Programa de Relacionamento do Conquista são
            automaticamente somados aos pontos do titular do Cartão de Crédito
            Porto Seguro.
          </Text>
        </ModalTextWrapper>
      </>
    )
  }

  const calculatePointsAmountBalance = extrato =>
    extrato ? extrato.reduce((acc, curr) => acc + +curr.pontoGanho, 0) : 0

  return (
    <>
      <Modal
        modalTitle="Regras de condições"
        alignItems="flex-start"
        isOpen={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
      >
        {renderModalContent()}
      </Modal>
      <SectionCol md="5">
        <PointsExtractListWrapper>
          <FullHeightCard
            headerIcon="diamond"
            headerTitle="Pontos"
            footer={renderPointsFooter()}
          >
            <PointsInfo>
              <Text type="headline">
                {points ? 'Saldo atual' : 'Você possui 0 pontos'}
              </Text>
              <Text type="headline" bold>
                {!!points &&
                  Intl.NumberFormat().format(
                    calculatePointsAmountBalance(
                      points.detalheExtratoOptemaisTypes
                    )
                  )}
              </Text>
              <Popover
                content={() => (
                  <Text
                    type="body"
                    color="gray5"
                    css={`
                      width: 140px;
                    `}
                  >
                    Pontos acumulados no Conquista e no Cartão Porto Seguro
                  </Text>
                )}
              >
                <Icon name="information" color="blue4" />
              </Popover>
              {points && (
                <PointsButtonWrapper>
                  <Button
                    data-gtm-subname="card pontos"
                    data-gtm-name="resgatar"
                    data-gtm-type="click"
                    data-gtm-clicktype="button"
                    color="secondary"
                  >
                    Resgatar
                  </Button>
                </PointsButtonWrapper>
              )}
            </PointsInfo>
            <>
              {points ? (
                <PointsList>{renderPointsHorizontalList()}</PointsList>
              ) : (
                <EmptyBody>
                  <Text type="headline" color="gray5">
                    Você não possui movimentações referente a pontos no momento.
                  </Text>
                </EmptyBody>
              )}
            </>
          </FullHeightCard>
        </PointsExtractListWrapper>
      </SectionCol>

      <SectionCol md="7">
        <Row
          css={`
            height: 100%;
          `}
        >
          <SectionCol md="6">
            <PointsOfferCard offer={belowOffer || pointsCardsData[0]} />
          </SectionCol>
          <SectionCol md="6">
            <PointsOfferCard offer={aboveOffer || pointsCardsData[1]} />
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
