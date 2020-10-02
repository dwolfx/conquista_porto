import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams, useLocation } from 'react-router-dom'
import { Container, Col } from 'styled-bootstrap-grid'
import 'styled-components/macro'

import Button from 'components/Button'
import ButtonIcon from 'components/Button/Icon'
// import ButtonLink from 'components/Button/Link'
import Card from 'components/Card'
import CardCarousel from 'components/Carousel/CardCarousel'
import { ICardCarouselSlide } from 'components/Carousel/CardCarousel/types'
import Divisor from 'components/Divisor'
import HorizontalList from 'components/HorizontalList'
import Icon from 'components/IconExporter'
import Loading from 'components/Loading'
import Modal from 'components/Modal/ModalNew'
import InformativeHeader from 'components/Objective/InformativeHeader'
import Text from 'components/Text'
import TransactionHeader from 'components/Header/TransactionsHeader'

import { ObjectiveType } from 'helpers/objetive'

import { useToast } from 'hooks/toast'
import useMedia from 'hooks/useMedia'
import { Currency } from 'helpers/money'

import CardCombine from 'pages/Objectives/Manager/CardCombine'
import GoalChart from 'pages/Objectives/Manager/GoalChart'
import FundsTable from 'pages/Objectives/Manager/FundsTable'
import ObjectiveTracking from 'pages/Objectives/Manager/ObjectiveTracking'

import { get, baseURLNamespaceGoal } from 'services/api'
import { TObjectiveFunds } from 'store/modules/ObjectiveManagement/types'
import {
  GetObjectiveManagementDataRequest,
  DeleteObjectiveRequest,
  GetOtherGoalsDataRequest,
} from 'store/modules/ObjectiveManagement/action'

import theme from 'styles/theme'

import * as t from './types'
import * as s from './styles'

export default function ObjectiveManager() {
  const { objectiveId } = useParams<t.ILocationParams>()
  const [summaryObjectives, setSummaryObjectives] = useState<
    ICardCarouselSlide[]
  >([])
  const { addToast } = useToast()
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()
  const isMobile = useMedia('sm')
  const isTablet = useMedia('lg')

  const [pendingFunds, setPendingFunds] = useState<TObjectiveFunds[] | []>([])
  const [objectiveFunds, setObjectiveFunds] = useState<TObjectiveFunds[] | []>(
    []
  )
  const [bannerImage, setBannerImage] = useState('')
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)
  const [addFundsLayer, setAddFundsLayer] = useState(false)
  const [pendingFundsLayer, setPendingFundsLayer] = useState(false)
  const [objectiveFundsLayer, setObjectiveFundsLayer] = useState(false)

  const { pageRecommendation } = location.state || { pageRecommendation: false }

  const { data: objectiveData, isLoading, isLoadingDelete } = useSelector(
    (state: t.IState) => state.objectiveManagement
  )

  const getObjectiveTypeImageById = useCallback(
    async (id: number) => {
      try {
        const image = await ObjectiveType.getImageById(id)
        setBannerImage(image)
      } catch (error) {
        addToast({
          type: 'error',
          title: 'Algo inesperado ocorreu.',
          description: 'A imagem do seu objetivo não foi carregada',
        })
        console.error(error)
      }
    },
    [addToast]
  )

  const getSummaryObjectives = useCallback(async () => {
    try {
      const { data } = await get(
        `${baseURLNamespaceGoal}/goals/summary?selected=${objectiveId}`
      )
      setSummaryObjectives(parseSummaryToCardCarousel(data))
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Algo inesperado ocorreu.',
        description: 'A lista com outros objetivos não carregou',
      })
      console.error(error)
    }
  }, [addToast, objectiveId])

  useEffect(() => {
    getSummaryObjectives()
  }, [getSummaryObjectives])

  useEffect(() => {
    getObjectiveTypeImageById(Number(objectiveId))
  }, [objectiveId, getObjectiveTypeImageById])

  useEffect(() => {
    if (
      (!objectiveData && objectiveId) || // check if objectiveId exists and if objectiveData dont
      (objectiveData &&
        objectiveData.id &&
        objectiveId &&
        +objectiveData.id !== +objectiveId) // check if objectiveData exists and its id is equal to objectiveID
    ) {
      dispatch(
        GetObjectiveManagementDataRequest({
          id: objectiveId,
          history,
          addToast,
        })
      )

      dispatch(GetOtherGoalsDataRequest({ id: objectiveId, addToast }))
    }
  }, [dispatch, history, objectiveData, objectiveId, addToast])

  useEffect(() => {
    const pending = objectiveData?.fund_list.filter(
      item => item.pendency === 'INITIAL_VALUE_PENDING'
    )
    const notPending = objectiveData?.fund_list.filter(
      item => item.pendency !== 'INITIAL_VALUE_PENDING'
    )

    setPendingFunds(pending || [])
    setObjectiveFunds(notPending || [])
  }, [objectiveData])

  if (!objectiveId || (!isLoading && !objectiveData)) {
    // if objectiveId dont exists, redirect to "objetivos" page
    history.push('/')

    addToast({
      type: 'error',
      title: 'Algo inesperado ocorreu.',
      description:
        'Certifique-se de que o objetivo realmente existe e tente novamente.',
    })

    return null
  }

  function handleRedirectToProduct(product: any) {
    history.push({
      pathname: product.productPath,
      state: {
        idGoal: objectiveId,
      },
    })
  }

  function handleDeleteGoal(id: number) {
    dispatch(DeleteObjectiveRequest(id, () => history.push('/'), addToast))
  }

  if (isLoading) {
    return <Loading />
  }

  const renderCardFooterTotalInitalInvested = (
    currentFunds: TObjectiveFunds[]
  ) => {
    const totalPendingInitialValues: number = [...currentFunds].reduce(
      (acc: number, cur: TObjectiveFunds) => acc + cur.initial_value,
      0
    )

    return isMobile ? (
      <Card
        css={`
          margin-top: ${theme.spacing(1)}px;
        `}
      >
        <HorizontalList
          startItems={[
            <Text type="captionUppercase" color="gray5" bold>
              Total inv. inicial
            </Text>,
          ]}
          endItems={[
            <Text color="gray6" bold>
              {Currency.parse(totalPendingInitialValues, true)}
            </Text>,
          ]}
        />
      </Card>
    ) : (
      <s.TotalInitialInvestedFooterContainer>
        <Text type="captionUppercase" color="gray5" bold>
          Total
        </Text>
        <Text color="gray6" bold>
          {Currency.parse(totalPendingInitialValues, true)}
        </Text>
      </s.TotalInitialInvestedFooterContainer>
    )
  }

  // component that build the pending funds table/cards
  // component created to prevent duplicated code and to center the content of this component here
  const PendingFundsTable = ({
    showInfoCardOnMobile = true,
  }: t.IFundsCardsMobile) => {
    return (
      <FundsTable
        funds={pendingFunds}
        icon="financial"
        title="Fundos com investimento inicial pendente"
        type="monthly"
        showInfoCardOnMobile={showInfoCardOnMobile}
        isAccordion
        footer={renderCardFooterTotalInitalInvested(pendingFunds)}
        css={`
          margin-bottom: ${theme.spacing(2)}px;
        `}
      />
    )
  }

  // component that build the all funds table/cards that are already linked to the objective
  // component created to prevent duplicated code and to center the content of this component here
  const ObjectiveFundsTable = ({
    showInfoCardOnMobile = true,
  }: t.IFundsCardsMobile) => (
    <FundsTable
      funds={objectiveFunds}
      icon="financial"
      title="Fundos do objetivo"
      type="monthly"
      showInfoCardOnMobile={showInfoCardOnMobile}
      isAccordion
      footer={
        <s.FundsTableCardFooter align="flex-end">
          <Button
            outline
            onClick={() => {
              setAddFundsLayer(true)

              if (isMobile) {
                setObjectiveFundsLayer(false)
              }
            }}
            data-gtm-name="adicionar meus fundos"
            data-gtm-type="click"
            data-gtm-clicktype="button"
          >
            Adicionar meus fundos
          </Button>
        </s.FundsTableCardFooter>
      }
    />
  )

  //  function that render the pending funds and the objective funds table/card, with the logic to the mobile (mobile only render the components inside a layer)
  const renderObjectiveFundsTable = () =>
    !isMobile ? (
      <>
        {pendingFunds.length ? PendingFundsTable({}) : null}
        {ObjectiveFundsTable({})}
      </>
    ) : (
      <>
        <Card>
          {pendingFunds.length ? (
            <>
              <HorizontalList
                startItems={[
                  <Text type="captionUppercase" color="gray5" bold>
                    Fundos com inv. inicial pendente
                  </Text>,
                ]}
                endItems={[
                  <ButtonIcon
                    icon="arrowright"
                    data-gtm-name="abrir layer fundos do objetivo pendentes"
                    data-gtm-type="click"
                    data-gtm-clicktype="button"
                    onClick={() => setPendingFundsLayer(true)}
                  />,
                ]}
              />

              <Divisor
                css={`
                  margin: ${theme.spacing(1)}px 0;
                `}
              />
            </>
          ) : null}

          <HorizontalList
            startItems={[
              <Text type="captionUppercase" color="gray5" bold>
                Fundo do objetivo
              </Text>,
            ]}
            endItems={[
              <ButtonIcon
                icon="arrowright"
                data-gtm-name="abrir layer fundos do objetivo"
                data-gtm-type="click"
                data-gtm-clicktype="button"
                onClick={() => setObjectiveFundsLayer(true)}
              />,
            ]}
          />
        </Card>

        <s.Layer
          isOpen={pendingFundsLayer}
          handleClose={() => setPendingFundsLayer(false)}
          headerContent={
            <TransactionHeader onClose={() => setPendingFundsLayer(false)} />
          }
        >
          <Container>
            {PendingFundsTable({ showInfoCardOnMobile: false })}
          </Container>
        </s.Layer>
        <s.Layer
          isOpen={objectiveFundsLayer}
          handleClose={() => setObjectiveFundsLayer(false)}
          headerContent={
            <TransactionHeader onClose={() => setObjectiveFundsLayer(false)} />
          }
        >
          <Container>
            {ObjectiveFundsTable({ showInfoCardOnMobile: false })}
          </Container>
        </s.Layer>
      </>
    )
  function parseSummaryToCardCarousel(
    objectives: t.ISummaryObjectives[]
  ): ICardCarouselSlide[] {
    return objectives.map(
      ({ goal_type, nickname, id, target_value }, index) => ({
        id,
        title: ObjectiveType.translate(goal_type),
        describe: nickname,
        value: Currency.parse(target_value, true),
        selected: index === 0,
      })
    )
  }

  return (
    <>
      <Container>
        {summaryObjectives.length > 0 && (
          <s.Row>
            <Col>
              <CardCarousel
                isLoading={false}
                hasError={false}
                list={summaryObjectives}
                customOnClickSlideHandler={(clickedSlideId: number) =>
                  history.push(`/objetivos/gerenciar/${clickedSlideId}`)
                }
                addItemHandler={() => history.push('/objetivos')}
              />
            </Col>
          </s.Row>
        )}
        {bannerImage && (
          <s.Row>
            <Col>
              <s.CardBackgroundImage background={bannerImage} />
            </Col>
          </s.Row>
        )}
        <s.Row>
          <Col lg={9} md={12} sm={12}>
            <InformativeHeader
              nickname={objectiveData.nickname}
              targetDate={objectiveData.target_date}
              targetValue={objectiveData.target_value}
              initialInvestment={objectiveData.initial_value}
              monthlyInvestment={objectiveData.monthly_value}
              openEdit={() => null}
            />
          </Col>
          <s.ColProgress
            isTablet={isTablet}
            isMobile={isMobile}
            lg={3}
            md={12}
            sm={12}
          >
            <ObjectiveTracking
              targetValue={objectiveData.target_value}
              totalBalance={objectiveData.total_balance}
            />
          </s.ColProgress>
        </s.Row>

        <s.Row>
          <Col>
            {pageRecommendation ? (
              <FundsTable
                funds={objectiveData.fund_list}
                icon="money"
                title="Fundos para investimento inicial"
                textInfo={
                  <s.TextInfoContainer>
                    <Text type="headline" color="gray6">
                      Agora, você deve fazer o investimento inicial em cada um
                      dos fundos da sua carteira <Icon name="information" />.
                    </Text>
                  </s.TextInfoContainer>
                }
                footer={renderCardFooterTotalInitalInvested(
                  objectiveData.fund_list
                )}
                type="initial"
              />
            ) : (
              renderObjectiveFundsTable()
            )}
          </Col>
        </s.Row>

        {!pageRecommendation ? (
          <s.Row>
            <Col>
              <GoalChart data={objectiveData} isLoading={isLoading} />
            </Col>
          </s.Row>
        ) : null}

        <s.Row>
          <Col>
            {objectiveData?.additional &&
              Object.entries(objectiveData.additional).find(
                ([, value]) => value === true
              ) && (
                <>
                  <Text type="heading3" color="gray6">
                    Combine com o seu objetivo
                  </Text>
                  <CardCombine
                    css={`
                      padding-top: 21px;
                    `}
                    additional={objectiveData.additional}
                    onClick={handleRedirectToProduct}
                  />
                </>
              )}
          </Col>
        </s.Row>
      </Container>

      <s.Layer
        isOpen={addFundsLayer}
        handleClose={() => setAddFundsLayer(false)}
        headerContent={
          <TransactionHeader onClose={() => setAddFundsLayer(false)} />
        }
      >
        <Text>Add funds layer</Text>
      </s.Layer>

      <Modal
        isOpen={isModalDeleteOpen}
        handleClose={() => {
          setIsModalDeleteOpen(false)
        }}
        modalTitle="Excluir"
      >
        <Text type="headline" color="gray6">
          Seu objetivo será excluído e os valores em fundo associados à ele irão
          para a categoria &quot;Sem objetivo&quot;. Tem certeza que deseja
          continuar?
        </Text>
        <s.ButtonContainerModal>
          <Button
            outline
            onClick={() => {
              setIsModalDeleteOpen(false)
            }}
          >
            CANCELAR
          </Button>
          <Button
            loading={isLoadingDelete}
            loadingColor="white"
            onClick={() => {
              handleDeleteGoal(objectiveData.id)
            }}
          >
            excluir
          </Button>
        </s.ButtonContainerModal>
      </Modal>
    </>
  )
}
