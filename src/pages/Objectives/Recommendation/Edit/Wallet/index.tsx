import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo,
} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Row, Col } from 'styled-bootstrap-grid'
import { ThemeContext } from 'styled-components'
import 'styled-components/macro'

import Button from 'components/Button'
import ButtonLink from 'components/Button/Link'
import ButtonIcon from 'components/Button/Icon'
import Card from 'components/Card'
import Divisor from 'components/Divisor'
import HorizontalList from 'components/HorizontalList'
import Popover from 'components/Popover'
import Text from 'components/Text'

import { useToast } from 'hooks/toast'
import useMedia from 'hooks/useMedia'

import InformativeHeader from 'pages/Objectives/Recommendation/InformativeHeader'
import TableLabel from 'pages/Objectives/Recommendation/WalletSection/TableView/TableLabel'

import {
  UpdateRecommendationRequest,
  PostRecalculateFundsRequest,
} from 'store/modules/Objective/action'
import {
  GetOtherGoalsDataRequest,
  PostObjectiveManagementDataRequest,
} from 'store/modules/ObjectiveManagement/action'

import ResultPredictionCard from './ResultPrediction/Card'
import ResultPredictionModal from './ResultPrediction/Modal'
import {
  IFunds,
  IIncome,
  IRecommendations,
} from 'store/modules/Objective/types'
import { TPrediction } from './ResultPrediction/types'

import DistribuitedValues from './DistribuitedValue'
import FundsList from './FundsList'
import RemovedFunds from './RemovedFunds'
import MobileFundCards from './Mobile'
import { columns } from './constants'
import { IState, IHandleInputsBlur } from './types'
import * as s from './styles'

interface IProps {
  onClose: () => void
}

export default function WalletComposition({ onClose }: IProps) {
  const dispatch = useDispatch()
  const history = useHistory()
  const theme = useContext(ThemeContext)
  const { addToast } = useToast()
  const isMobile = useMedia('xs')
  const isTabletVertical = useMedia('sm')

  const [funds, setFunds] = useState<IFunds[] | []>([])
  const [recommendedFundIds, setRecommendedFundIds] = useState<number[] | []>(
    []
  )
  const [removedFunds, setRemovedFunds] = useState<IFunds[] | []>([])
  const [isRemovedFundsOpen, setIsRemovedFundsOpen] = useState(false)
  const [isFundsListOpen, setIsFundsListOpen] = useState(false)
  const [isReachedGoal, setIsReachedGoal] = useState(false)
  const [saveButtonIsLoading, setSaveButtonIsLoading] = useState(false)
  const [
    isLoadingObjectiveManagement,
    setIsLoadingObjectiveManagement,
  ] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [initialDistributedValue, setInitialDistributedValue] = useState(0)
  const [monthlyDistributedValue, setMonthlyDistributedValue] = useState(0)
  const [isFundsEdited, setIsFundsEdited] = useState(false)
  const [invalidFundsIds, setInvalidFundsIds] = useState<number[] | []>([])

  const [prediction, setPrediction] = useState<TPrediction>({
    pessimistic: 0,
    median: 0,
    optimistic: 0,
  })

  const {
    recommendationData,
    isLoadingRelculateFundsData,
    isLoadingPutRecommendation,
  } = useSelector((state: IState) => ({
    recommendationData: state.objective.data,
    isLoadingRelculateFundsData: state.objective.isLoadingRelculateFundsData,
    isLoadingPutRecommendation: state.objective.isLoadingPutRecommendation,
  }))

  const isDistributedAmountValid: boolean = useMemo(
    () =>
      recommendationData.answer.initial_value - initialDistributedValue === 0 &&
      recommendationData.answer.monthly_value - monthlyDistributedValue === 0,
    [initialDistributedValue, monthlyDistributedValue, recommendationData]
  )

  useEffect(() => {
    if (recommendationData) {
      setPrediction(recommendationData?.income)
    }
  }, [recommendationData])

  useEffect(() => {
    const calculateInitialDistribution: number = [...funds].reduce(
      (acc: number, cur: IFunds) => acc + +cur.initial_value,
      0
    )

    const calculateMonthlyDistribution: number = [...funds].reduce(
      (acc: number, cur: IFunds) => acc + +cur.monthly_value,
      0
    )

    setInitialDistributedValue(calculateInitialDistribution)
    setMonthlyDistributedValue(calculateMonthlyDistribution)
  }, [funds])

  useEffect(() => {
    setFunds(recommendationData.funds)

    const recommendedIds: number[] = [...recommendationData.funds].reduce(
      (acc: number[], cur: IFunds) => [...acc, cur.fund_id],
      []
    )
    setRecommendedFundIds(recommendedIds)
  }, [recommendationData])

  useEffect(() => {
    setIsReachedGoal(
      recommendationData?.income.median >=
        recommendationData?.answer.target_value
    )
  }, [recommendationData])

  useEffect(() => {
    if (isLoadingRelculateFundsData || isLoadingPutRecommendation) {
      setSaveButtonIsLoading(true)
    }
    if (
      !isLoadingRelculateFundsData &&
      !isLoadingPutRecommendation &&
      !isLoadingObjectiveManagement
    ) {
      setSaveButtonIsLoading(false)
    }
  }, [
    isLoadingRelculateFundsData,
    isLoadingPutRecommendation,
    isLoadingObjectiveManagement,
  ])

  const checkFundsChanges = useCallback(
    fundsToCheck => {
      if (fundsToCheck.length > 0) {
        const initialValues = [...recommendationData.funds].map(fund => ({
          initial_value: fund.initial_value,
          monthly_value: fund.monthly_value,
        }))
        const editedValues = [...fundsToCheck].map(fund => ({
          initial_value: fund.initial_value,
          monthly_value: fund.monthly_value,
        }))

        setIsFundsEdited(
          JSON.stringify(initialValues) !== JSON.stringify(editedValues)
        )
      }
    },
    [recommendationData]
  )

  useEffect(() => {
    checkFundsChanges(funds)

    if (isFundsEdited) {
      // this it'll be executed on sucess of dispatch to the /recalculate-funds endpoint
      const onSuccess = (recalculateFundsData: IIncome) => {
        setIsReachedGoal(
          recalculateFundsData.median >= recommendationData?.answer.target_value
        )
        setPrediction(recalculateFundsData)
      }

      dispatch(
        PostRecalculateFundsRequest({
          data: {
            target_date: recommendationData.answer.target_date,
            fund_list: [...funds].map(fund => ({
              category: fund.arena_category,
              fund_id: fund.fund_id,
              initial_amount: fund.initial_value,
              monthly_amount: fund.monthly_value,
            })),
          },
          onSuccess,
          onErrorToast: addToast,
        })
      )
    }
  }, [
    addToast,
    dispatch,
    funds,
    isFundsEdited,
    recommendationData,
    checkFundsChanges,
  ])

  // function that is triggered on blur of the input, updating 'fund' state value with values inputed
  const handleInputsBlur = useCallback(
    ({ event, value: inputValue, row, hasError }: IHandleInputsBlur) => {
      const inputName = event.target.name

      // update 'initial_value' or 'monthly_value' on funds state
      const newValues = [...funds].reduce((acc: IFunds[], cur: IFunds) => {
        if (cur.fund_id === row.fund_id) {
          return [
            ...acc,
            {
              ...cur,
              [inputName]: +inputValue,
            },
          ]
        }

        return [...acc, cur]
      }, [])

      // update funds state with new values
      setFunds(newValues)

      // verify if input has validation errors
      if (hasError) {
        setInvalidFundsIds(currentInvalids => [...currentInvalids, row.fund_id])
      } else {
        setInvalidFundsIds(currentInvalids =>
          [...currentInvalids].filter(id => id !== row.fund_id)
        )
      }

      // calculate distribuition based on initial value
      const calculateInitialDistribution: number = [...newValues].reduce(
        (acc: number, cur: IFunds) => acc + +cur.initial_value,
        0
      )

      // calculate distribuition based on monthly value
      const calculateMonthlyDistribution: number = [...newValues].reduce(
        (acc: number, cur: IFunds) => acc + +cur.monthly_value,
        0
      )

      setInitialDistributedValue(calculateInitialDistribution)
      setMonthlyDistributedValue(calculateMonthlyDistribution)
    },
    [funds]
  )

  const removeAction = (fundId: number) => {
    const fundRemoved = funds.filter(
      fund =>
        fund.fund_id === fundId &&
        recommendedFundIds.includes(fund.fund_id as never)
    )

    setFunds(currentFunds =>
      currentFunds.filter(fund => fund.fund_id !== fundId)
    )
    setRemovedFunds(currentRemoved => [...currentRemoved, ...fundRemoved])

    addToast({
      type: 'error',
      title: 'Fundo removido com sucesso!',
    })
  }

  const columnsToRender = columns(handleInputsBlur, removeAction)

  if (isFundsListOpen) {
    return (
      <FundsList
        walletFunds={funds}
        setWalletFunds={setFunds}
        onClose={() => setIsFundsListOpen(false)}
      />
    )
  }

  const requiredFundsInfo = (requiredFunds: IFunds[]) =>
    [...requiredFunds].map(fund => ({
      fund_id: fund.fund_id,
      initial_amount: fund.initial_value,
      monthly_amount: fund.monthly_value,
    }))

  const goToObjectiveManagement = () => {
    const onSuccess = (updatedRecommendationData: IRecommendations) => {
      const pushHistory = (path: string) => {
        history.push({
          pathname: path,
          state: { pageRecommendation: true },
        })
      }

      const dataToDispatch: any = {
        id: updatedRecommendationData.id,
        answer: updatedRecommendationData.answer,
        fund_total_income: updatedRecommendationData.fund_total_income,
        funds: updatedRecommendationData.funds,
        additional: updatedRecommendationData.additional,
      }

      if (updatedRecommendationData.credit_product) {
        dataToDispatch['credit_product'] =
          updatedRecommendationData.credit_product
      }

      dispatch(
        PostObjectiveManagementDataRequest({
          data: dataToDispatch,
          pushHistory,
          addToast,
          onSuccess: () => {
            setIsLoadingObjectiveManagement(false)
            dispatch(
              GetOtherGoalsDataRequest({ id: recommendationData.id, addToast })
            )
          },
          onError: () => setIsLoadingObjectiveManagement(false),
        })
      )
    }

    dispatch(
      UpdateRecommendationRequest({
        data: {
          answer: recommendationData.answer,
          additional: recommendationData.additional,
          fund_list: requiredFundsInfo(funds),
        },
        onSuccess,
        onErrorToast: addToast,
      })
    )
  }

  const saveButton = () => {
    const creditProducts = recommendationData?.credit_product

    const handleSaveButtonClick = () => {
      const onSuccess = (recalculateFundsData: IIncome) => {
        setPrediction(recalculateFundsData)

        const recalculateReachedGoal =
          recalculateFundsData.median >= recommendationData?.answer.target_value

        if (creditProducts) {
          // save button action = 'GO_TO_RECOMMENDATION'
          const goToRecommendation = () => {
            dispatch(
              UpdateRecommendationRequest({
                data: {
                  answer: recommendationData.answer,
                  additional: recommendationData.additional,
                  credit_product: recommendationData?.credit_product,
                  fund_list: requiredFundsInfo(funds),
                },
                onSuccess: () => {
                  setIsReachedGoal(
                    recalculateFundsData.median >=
                      recommendationData?.answer.target_value
                  )
                  onClose()
                },
                onErrorToast: addToast,
              })
            )
          }
          return goToRecommendation()
        } else if (recalculateReachedGoal && !creditProducts) {
          // save button action = 'GO_TO_OBJECTIVE_MANAGEMENT'
          setIsLoadingObjectiveManagement(true)
          return goToObjectiveManagement()
        } else if (!recalculateReachedGoal && !creditProducts) {
          // save button action = 'SHOW_CONFIRMATION_MODAL'
          const openModal = () => {
            setIsModalOpen(true)
            setSaveButtonIsLoading(false)
          }
          return openModal()
        } else {
          setSaveButtonIsLoading(false)
          return addToast({
            type: 'error',
            description: 'Por favor, tente novamente.',
            title: 'Erro ao processar solicitação.',
          })
        }
      }
      dispatch(
        PostRecalculateFundsRequest({
          data: {
            target_date: recommendationData.answer.target_date,
            fund_list: [...funds].map(fund => ({
              category: fund.arena_category,
              fund_id: fund.fund_id,
              initial_amount: fund.initial_value,
              monthly_amount: fund.monthly_value,
            })),
          },
          onSuccess,
          onErrorToast: addToast,
        })
      )
    }

    let tooltipText

    if (!isFundsEdited) {
      tooltipText = 'Não houve edição da carteira'
    } else if (!isDistributedAmountValid) {
      tooltipText =
        'O valor total distribuído em seus fundos precisa corresponder aos valores planejados de Inv. Mensal e Inv. Inicial'
    } else if (!!invalidFundsIds.length) {
      tooltipText =
        'Existem erros de validação na distribuição dos fundos da sua carteira'
    }

    return (
      <Popover
        tooltip
        placement="left"
        turnOff={
          isFundsEdited && isDistributedAmountValid && !invalidFundsIds.length
        }
        content={
          <s.SaveButtonTooltipContent>
            <Text color="white" bold>
              {tooltipText}
            </Text>
          </s.SaveButtonTooltipContent>
        }
      >
        <s.Button
          disabled={
            !isFundsEdited ||
            !isDistributedAmountValid ||
            !!invalidFundsIds.length
          }
          loading={!isModalOpen && saveButtonIsLoading}
          color="secondary"
          onClick={() => handleSaveButtonClick()}
        >
          Salvar
        </s.Button>
      </Popover>
    )
  }

  return (
    <>
      <ResultPredictionModal
        prediction={prediction}
        warning={!isReachedGoal}
        isOpen={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        handleButtonAction={() => goToObjectiveManagement()}
      />
      <s.Container isFirst>
        <s.InformativeRow>
          <Col>
            <InformativeHeader answer={recommendationData.answer} />
          </Col>
        </s.InformativeRow>

        <s.CompositionRow>
          <Col lg={3}>
            <ResultPredictionCard
              prediction={prediction}
              warning={!isReachedGoal}
            />
          </Col>

          {!isMobile && !isTabletVertical ? (
            <Col lg={9}>
              <s.CardTable headerTitle="Minha carteira" headerIcon="financial">
                <s.TextCompositionWrapper>
                  <Text type="headline" color="gray6">
                    Você pode adicionar, remover e substituir fundos sugeridos,
                    além de remanejar os investimentos em cada categoria.
                  </Text>
                </s.TextCompositionWrapper>

                <s.TableInfosWrapper>
                  <s.PercentualInfos funds={funds} />
                  <TableLabel />
                </s.TableInfosWrapper>

                <s.Table
                  columns={columnsToRender}
                  data={funds}
                  isLoading={false}
                />

                <DistribuitedValues
                  initialDistribuition={initialDistributedValue}
                  monthlyDistribuition={monthlyDistributedValue}
                />

                <Row
                  alignItems="center"
                  justifyContent="between"
                  css={`
                    margin-top: 14px;
                  `}
                >
                  <Col auto>
                    <ButtonLink
                      noIconPadding
                      onClick={() => setIsRemovedFundsOpen(true)}
                    >
                      Fundos recomendados removidos
                    </ButtonLink>
                  </Col>

                  <Col auto>
                    <Button outline onClick={() => setIsFundsListOpen(true)}>
                      Lista de fundos
                    </Button>
                  </Col>
                </Row>
              </s.CardTable>
            </Col>
          ) : (
            <Col>
              <MobileFundCards
                funds={funds}
                onBlurAction={handleInputsBlur}
                removeAction={removeAction}
              />
            </Col>
          )}
        </s.CompositionRow>

        {isMobile || isTabletVertical ? (
          <>
            <Row
              css={`
                margin-top: ${theme.spacing(2)}px;
              `}
            >
              <Col>
                <DistribuitedValues
                  initialDistribuition={initialDistributedValue}
                  monthlyDistribuition={monthlyDistributedValue}
                  isMobile
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Card>
                  <HorizontalList
                    startItems={[
                      <Text type="captionUppercase" bold>
                        Fundos recomendados removidos
                      </Text>,
                    ]}
                    endItems={[
                      <ButtonIcon
                        icon="arrowright"
                        onClick={() => setIsRemovedFundsOpen(true)}
                      />,
                    ]}
                  />

                  <Divisor
                    css={`
                      margin: ${theme.spacing(1)}px 0;
                    `}
                  />

                  <HorizontalList
                    startItems={[
                      <Text type="captionUppercase" bold>
                        Lista de fundos
                      </Text>,
                    ]}
                    endItems={[
                      <ButtonIcon
                        icon="arrowright"
                        onClick={() => setIsFundsListOpen(true)}
                      />,
                    ]}
                  />
                </Card>
              </Col>
            </Row>
          </>
        ) : null}
      </s.Container>
      <s.Footer>
        <s.Container>
          <Row justifyContent="end">
            <Col
              auto
              css={`
                display: flex;
                align-items: center;
              `}
            >
              <Button outline onClick={onClose}>
                Cancelar edição
              </Button>
              {saveButton()}
            </Col>
          </Row>
        </s.Container>
      </s.Footer>

      <RemovedFunds
        removedFunds={removedFunds}
        restoreFunds={restoredIds => {
          setFunds(currentFunds => {
            const restoredFunds = removedFunds.filter(fund =>
              restoredIds.includes(fund.fund_id)
            )

            return [...currentFunds, ...restoredFunds]
          })
          setRemovedFunds(currentRemoved =>
            currentRemoved.filter(fund => !restoredIds.includes(fund.fund_id))
          )

          setIsRemovedFundsOpen(false)
          addToast({
            type: 'success',
            title: 'Fundos adicionados com sucesso!',
          })
        }}
        isOpen={isRemovedFundsOpen}
        setIsOpen={setIsRemovedFundsOpen}
      />
    </>
  )
}
