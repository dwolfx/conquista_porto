/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import 'styled-components/macro'

import Button from 'components/Button'
import ButtonLink from 'components/Button/Link'
import Text from 'components/Text'
import Tag from 'components/Tag'
import Modal from 'components/Modal/ModalNew'
import useDataLayerProducts from 'GoogleTagManager/dataLayerProductsHook'
import Popover from 'components/Popover/index'
import { dict } from 'components/IconExporter'
import { useToast } from 'hooks/toast'

import { GetRewardTypesRequest } from 'store/modules/Rewards/Types/action'
import {
  GetPointsExtractRequest,
  GetPointsBalanceRequest,
  PostRedeemPointsRequest,
} from 'store/modules/Points/action'

import CardHeaderState from 'pages/Home/commons/CardHeaderState'
import LoadingState from 'pages/Home/commons/LoadingState'
import ErrorState from 'pages/Home/commons/ErrorState'
import useMedia from 'hooks/useMedia'

import {
  pointsRewardsDataWithCreditCard,
  pointsRewardsDataWithoutCreditCard,
} from './pointsCardsData'

import { pointsRulesConditions } from './modalPointsData'
import PointsOfferCard from './RecommendationCard'

import { ICardsInfo } from './types'
import { PointsCol } from './styles'
import {
  EmptyBody,
  CardPontosFooter,
  ContainerBox,
  PointsHorizontal,
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
  HomePointsCard,
  HomePointsOffersCard,
  HorizontalListTruncateStartBlock,
} from '../styles'

export default function PointsSection({ points }: any) {
  const { addToast } = useToast()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [belowOffer, setBelowOffer] = useState<ICardsInfo | null>(null)
  const [aboveOffer, setAboveOffer] = useState<ICardsInfo | null>(null)
  const [pointsAmountBalance, setPointsAmountBalance] = useState(0)
  const [
    firstRecommendationCardIcon,
    setFirstRecommendationCardIcon,
  ] = useState<keyof typeof dict>('star')
  const [lastRecommendationCardIcon, setLastRecommendationCardIcon] = useState<
    keyof typeof dict
  >('idea')
  const [cardsRecommendationData, setCardsRecommendationData] = useState(
    pointsRewardsDataWithoutCreditCard
  )

  const dispatch = useDispatch()
  const isTabletHorizontal = useMedia('lg')
  const isTabletVertical = useMedia('md')

  const {
    isLoadingRedeem,
    isLoadingExtract,
    hasErrorExtract,
    isLoadingBalance,
    hasErrorBalance,
    balanceData,
    auth,
    creditCard,
    rewardsTypes,
  } = useSelector((state: any) => ({
    ...state.points,
    auth: state.auth,
    creditCard: state.creditCard.data,
    rewardsTypes: state.rewardsTypes.data,
  }))

  const handleFirstAndLastRecommendationCardIcon = useCallback(() => {
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

    setFirstRecommendationCardIcon(firstIcon || 'star')
    setLastRecommendationCardIcon(lastIcon || 'idea')
  }, [
    aboveOffer,
    belowOffer,
    cardsRecommendationData,
    creditCard,
    pointsAmountBalance,
  ])

  useEffect(() => {
    dispatch(GetRewardTypesRequest())
  }, [dispatch])

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
    if (pointsAmountBalance) {
      const maxPoints = [...cardsRecommendationData].slice(-1)[0].points
      let newBelowOffer: ICardsInfo
      let newAboveOffer: ICardsInfo

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
          .filter(item => item.points !== newBelowOffer.points)
          .reduce(
            (acc, cur) => (cur.points > newBelowOffer.points ? cur : acc),
            newBelowOffer
          )
      } else {
        // if current points are below the maximum offer, get the offer below the current points and one above the current
        newBelowOffer =
          [...cardsRecommendationData].reduce(
            (acc, cur) => (cur.points <= pointsAmountBalance ? cur : acc),
            belowOffer
          ) || cardsRecommendationData[0]
        newAboveOffer =
          [...cardsRecommendationData]
            .reverse()
            .filter(item => item.points !== newBelowOffer.points)
            .reduce(
              (acc, cur) =>
                cur.points > pointsAmountBalance &&
                belowOffer?.points !== cur.points
                  ? cur
                  : acc,
              aboveOffer
            ) || cardsRecommendationData[1]
      }
      setBelowOffer(newBelowOffer)
      setAboveOffer(newAboveOffer)
    }
    handleFirstAndLastRecommendationCardIcon()
  }, [
    pointsAmountBalance,
    aboveOffer,
    belowOffer,
    cardsRecommendationData,
    handleFirstAndLastRecommendationCardIcon,
  ])

  useDataLayerProducts(belowOffer, aboveOffer)
  function redirectToRescuePointsSystem(url: string) {
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
    points.detalheExtratoOptemaisTypes.map((item: any, index: number) => (
      <HorizontalListTruncateStartBlock
        key={`point-${index}-${Math.random() * 100}`}
        startItems={[
          <PointDate>{item.dataCompra}</PointDate>,
          <PointName truncate type="headline">
            {item.nomeTransacao}
          </PointName>,
        ]}
        endItems={[
          <PointNumber type="headline" bold>
            {Intl.NumberFormat().format(item.pontoGanho)}
          </PointNumber>,
        ]}
      />
    ))

  const renderModalContent = () => {
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
            {rewardsTypes.map((itemPoints: any) => (
              <PointsHorizontal
                noPadding
                startItems={[
                  <Text type="headline" color="gray6" bold>
                    {itemPoints.name}
                  </Text>,
                ]}
                endItems={[
                  <Tag color="gray" text={`${itemPoints.quantity} PONTOS`} />,
                ]}
                key={itemPoints.id}
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
                loading={isLoadingRedeem}
                loadingColor="white"
                onClick={() =>
                  dispatch(
                    PostRedeemPointsRequest({
                      onSuccess: redirectToRescuePointsSystem,
                      onErrorToast: addToast,
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
      <PointsCol 
        md={6} 
        mdOffset={0}
        lg={5}
        lgOffset={1}
        >
        <PointsExtractListWrapper>
          <HomePointsCard
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
          </HomePointsCard>
        </PointsExtractListWrapper>
      </PointsCol>
      

      {isTabletHorizontal && !isTabletVertical ? (
        <PointsCol sm={6} md={6}>
          <HomePointsOffersCard
            headerIcon="target"
            headerTitle="Troque seus pontos"
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
            <span>Content</span>
          </HomePointsOffersCard>

        </PointsCol>
        ) : (
      <>
        <PointsCol md={3} sm={6}>
          <PointsOfferCard
            offer={belowOffer || cardsRecommendationData[0]}
            cardIcon={firstRecommendationCardIcon}
            hasCreditCard={!creditCard || !creditCard.length}
            cardTitle={
              pointsAmountBalance >
              (belowOffer || cardsRecommendationData[0]).points
                ? 'Você já pode trocar'
                : 'Acumule mais pontos'
            }
          />
          </PointsCol>

          <PointsCol md={3} sm={6}>
          <PointsOfferCard
              offer={aboveOffer || cardsRecommendationData[1]}
              cardIcon={lastRecommendationCardIcon}
              hasCreditCard={!creditCard || !creditCard.length}
              cardTitle={
                pointsAmountBalance >
                (aboveOffer || cardsRecommendationData[1]).points
                  ? 'Mais alguns pontos'
                  : 'Acumule mais pontos'
              }
            />
        </PointsCol>
        </>
      )}
    </>
  )
}
