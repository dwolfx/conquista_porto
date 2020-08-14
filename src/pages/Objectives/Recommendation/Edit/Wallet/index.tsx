import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Row, Col } from 'styled-bootstrap-grid'
import 'styled-components/macro'

import Button from 'components/Button'
import ButtonLink from 'components/Button/Link'
import Card from 'components/Card'
import Text from 'components/Text'

import { useToast } from 'hooks/toast'

import InformativeHeader from 'pages/Objectives/Recommendation/InformativeHeader'
import PercentualInfos from 'pages/Objectives/Recommendation/components/PercentualInfo'
import ResultPredictionCard from 'pages/Objectives/Recommendation/Edit/Wallet/ResultPredictionCard'
import { IFunds } from 'store/modules/Objective/types'

import RemovedFundsDrawer from './RemovedFundsDrawer'
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
  const { addToast } = useToast()

  const [funds, setFunds] = useState<IFunds[] | []>([])
  const [removedFunds, setRemovedFunds] = useState<IFunds[] | []>([])
  const [isRemovedFundsDrawerOpen, setIsRemovedFundsDrawerOpen] = useState(
    false
  )

  const { data: recommendationData } = useSelector<any, any>(
    state => state.objective
  )

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

  return (
    <>
      <s.Container>
        <Row>
          <Col>
            <InformativeHeader answer={recommendationData.answer} />
          </Col>
        </Row>

        <Row>
          <Col lg={3} md={4}>
            <ResultPredictionCard />
          </Col>
          <Col lg={9}>
            <Card headerTitle="Minha carteira" headerIcon="financial">
              <Text type="headline" color="gray6">
                Você pode adicionar, remover e substituir fundos sugeridos, além
                de remanejar os investimentos em cada categoria.
              </Text>

              <PercentualInfos funds={funds} />
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
                    onClick={() => setIsRemovedFundsDrawerOpen(true)}
                  >
                    Fundos recomendados removidos
                  </ButtonLink>
                </Col>

                <Col auto>
                  <Button outline>Lista de fundos</Button>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
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

      <RemovedFundsDrawer
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

          setIsRemovedFundsDrawerOpen(false)
          addToast({
            type: 'success',
            title: 'Fundos adicionados com sucesso!',
          })
        }}
        isOpen={isRemovedFundsDrawerOpen}
        setIsOpen={setIsRemovedFundsDrawerOpen}
      />
    </>
  )
}
