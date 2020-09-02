import React, { useState, useEffect, useContext } from 'react'
import { useSelector } from 'react-redux'
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

import InformativeHeader from 'pages/Objectives/Recommendation/InformativeHeader'
import ResultPredictionCard from './ResultPrediction/Card'
import ResultPredictionModal from './ResultPrediction/Modal'
import { IFunds } from 'store/modules/Objective/types'
import { TPrediction } from './ResultPrediction/types'

import FundsList from './FundsList'
import RemovedFunds from './RemovedFunds'
import MobileFundCards from './Mobile'
import { columns } from './constants'
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
  const theme = useContext(ThemeContext)
  const { addToast } = useToast()
  const isMobile = useMedia('xs')
  const isTabletVertical = useMedia('sm')

  const [funds, setFunds] = useState<IFunds[] | []>([])
  const [removedFunds, setRemovedFunds] = useState<IFunds[] | []>([])
  const [isRemovedFundsOpen, setIsRemovedFundsOpen] = useState(false)
  const [isFundsListOpen, setIsFundsListOpen] = useState(false)

  const { data: recommendationData } = useSelector<any, any>(
    state => state.objective
  )

  const [predictions, setPredictions] = useState<TPrediction>({
    pessimistic: 0,
    median: 0,
    optimistic: 0,
  })
  const financialGoalNotReached = (): boolean => true

  useEffect(() => {
    setPredictions({
      pessimistic: 25500,
      median: 25500,
      optimistic: 25500,
    })
  }, [])

  useEffect(() => {
    setFunds(recommendationData.funds)
  }, [recommendationData])

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

  const seiLa = undefined

  return (
    <>
      <ResultPredictionModal
        predictions={predictions}
        warning={financialGoalNotReached()}
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
              predictions={predictions}
              warning={financialGoalNotReached()}
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
              <Button color="secondary">Salvar</Button>
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
