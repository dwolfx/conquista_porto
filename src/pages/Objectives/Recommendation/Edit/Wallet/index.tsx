import React, { useState, useEffect, useContext } from 'react'
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
import Text from 'components/Text'

import { useToast } from 'hooks/toast'
import useMedia from 'hooks/useMedia'
import {
  UpdateRecommendationRequest,
  PostRecalculateFundsRequest,
} from 'store/modules/Objective/action'
import {
  GetOtherGoalsDataRequest,
  PostObjectiveManagementDataRequest,
} from 'store/modules/ObjectiveManagement/action'

import InformativeHeader from 'pages/Objectives/Recommendation/InformativeHeader'
import ResultPredictionCard from './ResultPrediction/Card'
import ResultPredictionModal from './ResultPrediction/Modal'
import {
  IFunds,
  IIncome,
  IRecommendations,
} from 'store/modules/Objective/types'
import { TPrediction } from './ResultPrediction/types'

import FundsList from './FundsList'
import RemovedFunds from './RemovedFunds'
import MobileFundCards from './Mobile'
import { columns } from './constants'

import { Currency } from 'helpers/money'

import * as s from './styles'

interface IInputChange {
  event: React.ChangeEvent<HTMLInputElement>
  row: IFunds
  value: number
}

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
  const [removedFunds, setRemovedFunds] = useState<IFunds[] | []>([])
  const [isRemovedFundsOpen, setIsRemovedFundsOpen] = useState(false)
  const [isFundsListOpen, setIsFundsListOpen] = useState(false)
  const [isReachedGoal, setIsReachedGoal] = useState(false)
  const [saveButtonIsLoading, setSaveButtonIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  // atribuir 'true' de acordo com os valores distribuídos nos fundos. (se ultrapassar ou não utilizar todo valor inicial e mensal nos fundos)
  // const [isDistributedAmountValid, setIsDistributedAmountValid] = useState(
  //   false
  // )
  // atribuir 'true' assim que o usuário editar algum valor dos fundos na tabela
  // const [isFundsEdited, setIsFundsEdited] = useState(false)

  const [prediction, setPrediction] = useState<TPrediction>({
    pessimistic: 0,
    median: 0,
    optimistic: 0,
  })

  const {
    recommendationData,
    isLoadingRelculateFundsData,
    isLoadingPutRecommendation,
    isLoadingObjectiveManagement,
  } = useSelector((state: any) => ({
    recommendationData: state.objective.data,
    isLoadingRelculateFundsData: state.objective.isLoadingRelculateFundsData,
    isLoadingPutRecommendation: state.objective.isLoadingPutRecommendation,
    isLoadingObjectiveManagement: state.objectiveManagement.isLoading,
  }))

  useEffect(() => {
    if (recommendationData) {
      setPrediction(recommendationData?.income)
    }
  }, [recommendationData])

  useEffect(() => {
    setFunds(recommendationData.funds)
    setIsReachedGoal(
      recommendationData?.income.median >=
        recommendationData?.answer.target_value
    )

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
    recommendationData,
    isLoadingRelculateFundsData,
    isLoadingPutRecommendation,
    isLoadingObjectiveManagement,
  ])

  // despite the name, it's triggered on blur
  const handleInputsChange = ({
    event,
    value: inputValue,
    row,
  }: IInputChange) => {
    const inputName = event.target.name

    const newValues = [...funds].reduce((acc: IFunds[], cur: IFunds) => {
      if (cur.fund_id === row.fund_id) {
        return [
          ...acc,
          {
            ...cur,
            [inputName]: inputValue,
          },
        ]
      }

      return [...acc, cur]
    }, [])

    setFunds(newValues)
  }

  const removeAction = (fundId: number) => {
    const fundRemoved = funds.filter(fund => fund.fund_id === fundId)

    setFunds(currentFunds =>
      currentFunds.filter(fund => fund.fund_id !== fundId)
    )
    setRemovedFunds(currentRemoved => [...currentRemoved, ...fundRemoved])

    addToast({
      type: 'error',
      title: 'Fundo removido com sucesso!',
    })
  }

  const columnsToRender = columns(handleInputsChange, removeAction)

  if (isFundsListOpen) {
    return (
      <FundsList
        walletFunds={funds}
        setWalletFunds={setFunds}
        onClose={() => setIsFundsListOpen(false)}
      />
    )
  }

  const requiredFundsInfo = (funds: IFunds[]) => {
    return [...funds].map(fund => ({
      fund_id: fund.fund_id,
      initial_amount: fund.initial_value,
      monthly_amount: fund.monthly_value,
    }))
  }

  const goToObjectiveManagement = () => {
    const onSuccess = (updatedRecommendationData: IRecommendations) => {
      const pushHistory = (path: string) => {
        history.push({
          pathname: path,
          state: { pageRecommendation: true },
        })
      }

      dispatch(
        PostObjectiveManagementDataRequest({
          data: {
            id: updatedRecommendationData.id,
            answer: updatedRecommendationData.answer,
            fund_total_income: updatedRecommendationData.fund_total_income,
            funds: updatedRecommendationData.funds,
            additional: updatedRecommendationData.additional,
            credit_product: updatedRecommendationData.credit_product,
          },
          pushHistory,
          onSuccess: () =>
            dispatch(GetOtherGoalsDataRequest({ id: recommendationData.id })),
        })
      )
    }

    dispatch(
      UpdateRecommendationRequest({
        data: {
          answer: recommendationData.answer,
          additional: recommendationData.additional,
          credit_product: recommendationData.credit_product,
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
                  credit_product: recommendationData.credit_product,
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
          return goToObjectiveManagement()
        } else if (!recalculateReachedGoal && !creditProducts) {
          // saveButtonAction = 'SHOW_CONFIRMATION_MODAL'
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
            fund_list: funds,
          },
          onSuccess,
          onErrorToast: addToast,
        })
      )
    }

    return (
      <Button
        // disabled={!isDistributedAmountValid || !isFundsEdited}
        loading={!isModalOpen && saveButtonIsLoading}
        color="secondary"
        onClick={() => handleSaveButtonClick()}
      >
        Salvar
      </Button>
    )
  }

  // substituir de acordo com a lógica do componente de 'total distribuído'
  const textColor = false ? 'gray6' : 'magenta2'

  const seiLa = undefined

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
                  {seiLa && <p>Test</p>}
                </s.TextCompositionWrapper>

                <s.PercentualInfos funds={funds} />
                <s.Table
                  columns={columnsToRender}
                  data={funds}
                  isLoading={false}
                />

                <s.TotalAmountDistributed>
                  <s.LabelWrapper>
                    <Text type="captionUppercase" color="gray5" bold>
                      Total Distribuído
                    </Text>
                    <Text type="captionUppercase" color="gray5" bold>
                      Planejado
                    </Text>
                    <Text type="captionUppercase" color="gray5" bold>
                      A Distribuir
                    </Text>
                  </s.LabelWrapper>
                  <s.InitialAmountWrapper>
                    <Text type="caption" color="gray6" bold>
                      {Currency.parse(5000.0, true)}
                    </Text>
                    <Text type="caption" color="gray6" bold>
                      {Currency.parse(5000.0, true)}
                    </Text>
                    <s.ToDistributeWrapper>
                      <Text
                        type="caption"
                        color={textColor}
                        bold
                        css={`
                          width: 7px;
                        `}
                      >
                        +
                      </Text>
                      <Text type="caption" color={textColor} bold>
                        {Currency.parse(500.0, true)}
                      </Text>
                    </s.ToDistributeWrapper>
                  </s.InitialAmountWrapper>
                  <s.MonthlyAmountWrapper>
                    <Text type="caption" color="gray6" bold>
                      {Currency.parse(5000.0, true)}
                    </Text>
                    <Text type="caption" color="gray6" bold>
                      {Currency.parse(5000.0, true)}
                    </Text>
                    <s.ToDistributeWrapper>
                      <Text
                        type="caption"
                        color={textColor}
                        bold
                        css={`
                          width: 7px;
                        `}
                      >
                        -
                      </Text>
                      <Text type="caption" color={textColor} bold>
                        {Currency.parse(500.0, true)}
                      </Text>
                    </s.ToDistributeWrapper>
                  </s.MonthlyAmountWrapper>
                </s.TotalAmountDistributed>

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
                onChangeAction={handleInputsChange}
                removeAction={removeAction}
              />
            </Col>
          )}
        </s.CompositionRow>

        {isMobile || isTabletVertical ? (
          <Row
            css={`
              margin-top: ${theme.spacing(1)}px;
            `}
          >
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
        ) : null}
      </s.Container>
      <s.Footer>
        <s.Container>
          <Row justifyContent="end">
            <Col auto>
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
