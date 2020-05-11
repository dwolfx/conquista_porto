/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
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
import Popover from 'components/Popover/index'

import {
  GetPointsExtractRequest,
  GetPointsBalanceRequest,
  PostRecuePointsRequest,
} from 'store/modules/Points/action'

import CardHeaderState from 'pages/Home/commons/CardHeaderState'
import LoadingState from 'pages/Home/commons/LoadingState'
import ErrorState from 'pages/Home/commons/ErrorState'

import {
  pointsRewardsDataWithCreditCard,
  pointsRewardsDataWithoutCreditCard,
} from './pointsCardsData'
import { pointsRulesConditions } from './modalPointsData'
import PointsOfferCard from './RecommendationCard'

import {
  EmptyBody,
  SectionCol,
  FullHeightCard,
  CardPontosFooter,
  ContainerBox,
  PointsInfo,
  PointDate,
  PointName,
  PointNumber,
  PointsList,
  ModalTextWrapper,
  PointsExtractListWrapper,
  PointsButtonWrapper,
  Icon,
  PointsEmptyContainer,
} from '../styles'

export default function PointsSection({ points }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [belowOffer, setBelowOffer] = useState(null)
  const [aboveOffer, setAboveOffer] = useState(null)
  const [pointsAmountBalance, setPointsAmountBalance] = useState(0)
  const [
    firstRecommendationCardIcon,
    setFirstRecommendationCardIcon,
  ] = useState('star')
  const [lastRecommendationCardIcon, setLastRecommendationCardIcon] = useState(
    'idea'
  )
  const [cardsRecommendationData, setCardsRecommendationData] = useState(
    pointsRewardsDataWithoutCreditCard
  )

  const dispatch = useDispatch()
  const {
    isLoadingExtract,
    hasErrorExtract,
    isLoadingBalance,
    hasErrorBalance,
    balanceData,
    auth,
    creditCard,
  } = useSelector(state => ({
    ...state.points,
    auth: state.auth,
    creditCard: state.creditCard.data,
  }))

  useEffect(() => {
    setCardsRecommendationData(
      creditCard && creditCard.length
        ? pointsRewardsDataWithCreditCard
        : pointsRewardsDataWithoutCreditCard
    )
  }, [creditCard])

  useEffect(() => {
    setPointsAmountBalance(
      balanceData.consultaPontosResponseType
        ? balanceData.consultaPontosResponseType.saldoAtual
        : 0
    )
  }, [balanceData])

  useEffect(() => {
    if (points && aboveOffer && belowOffer) {
      if (pointsAmountBalance) {
        const maxPoints = [...cardsRecommendationData].slice(-1)[0].points
        let newBelowOffer
        let newAboveOffer

        if (pointsAmountBalance > maxPoints) {
          // if current points are above the maximum offer, show cards randomly from the group 5 (higher value points)
          // aboveOffer must be higher than belowOffer
          const lastGroupIndex = [...cardsRecommendationData].reduce(
            (acc, cur) => (cur.group > acc ? cur.group : acc),
            cardsRecommendationData[0].group
          )
          const higherGroupData = [...cardsRecommendationData].filter(
            item => item.group === lastGroupIndex
          )

          newBelowOffer =
            higherGroupData[
              Math.floor(Math.random() * (higherGroupData.length - 1))
            ]
          newAboveOffer = [...higherGroupData]
            .reverse()
            .reduce(
              (acc, cur) => (cur.points > newBelowOffer.points ? cur : acc),
              newBelowOffer
            )
        } else {
          // if current points are below the maximum offer, get the offer below the current points and one above the current
          newBelowOffer = [...cardsRecommendationData].reduce(
            (acc, cur) => (cur.points <= pointsAmountBalance ? cur : acc),
            belowOffer
          )
          newAboveOffer = [...cardsRecommendationData]
            .reverse()
            .reduce(
              (acc, cur) =>
                cur.points > pointsAmountBalance &&
                belowOffer.points !== cur.points
                  ? cur
                  : acc,
              aboveOffer
            )
        }

        setBelowOffer(newBelowOffer)
        setAboveOffer(newAboveOffer)
      }
    } else {
      setBelowOffer(cardsRecommendationData[0])
      setAboveOffer(cardsRecommendationData[1])
    }
  }, [points, pointsAmountBalance])

  useEffect(() => {
    let firstIcon = (belowOffer || cardsRecommendationData[0]).icon
    let lastIcon = (aboveOffer || cardsRecommendationData[1]).icon

    if (!creditCard || !creditCard.length) {
      if (
        pointsAmountBalance > (belowOffer || cardsRecommendationData[0]).points
      ) {
        firstIcon = 'star'
      } else {
        firstIcon = 'idea'
      }

      if (
        pointsAmountBalance > (aboveOffer || cardsRecommendationData[1]).points
      ) {
        lastIcon = 'star'
      } else {
        lastIcon = 'idea'
      }
    }

    setFirstRecommendationCardIcon(firstIcon)
    setLastRecommendationCardIcon(lastIcon)
  }, [pointsAmountBalance, aboveOffer, belowOffer, creditCard])

  useDataLayerProducts(belowOffer, aboveOffer)
  function redirectToRescuePointsSystem({ url }) {
    window.open(`#/redirect?to=${url}`, '_blank')
  }

  const renderPointsFooter = () => {
    if (
      isLoadingExtract ||
      isLoadingBalance ||
      hasErrorExtract ||
      hasErrorBalance
    ) {
      return null
    }

    return (
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
  }

  const renderPointsHorizontalList = () =>
    points.detalheExtratoOptemaisTypes &&
    points.detalheExtratoOptemaisTypes.map((item, index) => (
      <HorizontalList
        key={`point-${index}-${Math.random() * 100}`}
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

    return pointsRulesConditions.map(item => (
      <React.Fragment key={item.id}>
        <ModalTextWrapper>
          <Text type="headline" color="gray6" bold>
            {item.title}
          </Text>
          <Text type="headline" color="gray5">
            {item.text}
          </Text>
        </ModalTextWrapper>
        {item.points && (
          <ContainerBox>
            {item.points.map((itemPoints, keyPoints) => (
              <HorizontalList
                noPadding
                startItems={[customText('headline', 'gray6', itemPoints.name)]}
                endItems={[tag('gray', itemPoints.points)]}
                key={keyPoints}
              />
            ))}
          </ContainerBox>
        )}
      </React.Fragment>
    ))
  }

  const renderPointsCard = () => {
    if (
      (isLoadingExtract || isLoadingBalance) &&
      !(points && Object.entries(points).length)
    ) {
      return <LoadingState />
    }

    if (
      (hasErrorExtract || hasErrorBalance) &&
      !(points && Object.entries(points).length)
    ) {
      return (
        <ErrorState
          onRetry={() => {
            if (hasErrorExtract) {
              dispatch(GetPointsExtractRequest(auth.cpf))
            }
            if (hasErrorBalance) {
              dispatch(GetPointsBalanceRequest(auth.cpf))
            }
          }}
        />
      )
    }

    if (points && Object.entries(points).length === 0) {
      return (
        <PointsEmptyContainer>
          <Text type="headline" color="gray5">
            Você não possui movimentações referente a pontos no momento.
          </Text>
        </PointsEmptyContainer>
      )
    }

    return (
      <>
        <PointsInfo>
          <Text type="headline">
            {balanceData.consultaPontosResponseType
              ? 'Saldo atual'
              : 'Você possui 0 pontos'}
          </Text>
          <Text type="headline" bold>
            {!!balanceData.consultaPontosResponseType &&
              !!pointsAmountBalance &&
              Intl.NumberFormat().format(pointsAmountBalance)}
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
                onClick={() =>
                  dispatch(
                    PostRecuePointsRequest({
                      onSuccess: redirectToRescuePointsSystem,
                    })
                  )
                }
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
      </>
    )
  }

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
            headerEndItem={
              <CardHeaderState
                showHeader={Boolean(points && Object.entries(points).length)}
                isLoading={isLoadingExtract || isLoadingBalance}
                hasError={hasErrorExtract || hasErrorBalance}
                onErrorClick={() => {
                  if (hasErrorExtract) {
                    dispatch(GetPointsExtractRequest(auth.cpf))
                  }
                  if (hasErrorBalance) {
                    dispatch(GetPointsBalanceRequest(auth.cpf))
                  }
                }}
              />
            }
          >
            {renderPointsCard()}
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
            <PointsOfferCard
              offer={belowOffer || cardsRecommendationData[0]}
              cardIcon={firstRecommendationCardIcon}
              hasCreditCard={!creditCard || !creditCard.length}
              cardTitle={
                pointsAmountBalance >
                (belowOffer || cardsRecommendationData[0]).points
                  ? 'Troque seus pontos'
                  : 'Acumule mais pontos'
              }
            />
          </SectionCol>
          <SectionCol md="6">
            <PointsOfferCard
              offer={aboveOffer || cardsRecommendationData[1]}
              cardIcon={lastRecommendationCardIcon}
              hasCreditCard={!creditCard || !creditCard.length}
              cardTitle={
                pointsAmountBalance >
                (aboveOffer || cardsRecommendationData[1]).points
                  ? 'Troque seus pontos'
                  : 'Acumule mais pontos'
              }
            />
          </SectionCol>
        </Row>
      </SectionCol>
    </>
  )
}

PointsSection.defaultProps = {
  points: null,
}

PointsSection.propTypes = {
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
