import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Container, Row, Col } from 'styled-bootstrap-grid'

import Card from 'components/Card'
import Text from 'components/Text'

import InformativeHeader from 'pages/Objectives/Recommendation/InformativeHeader'
import { IFunds } from 'store/modules/Objective/types'

import { columns } from './constants'
import * as s from './styles'

interface IInputChange {
  event: React.ChangeEvent<HTMLInputElement>
  row: IFunds
  value: number
}

export default function WalletComposition() {
  const [funds, setFunds] = useState<IFunds[] | []>([])

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

  const columnsToRender = columns(handleInputsChange)

  return (
    <Container>
      <Row>
        <Col>
          <InformativeHeader answer={recommendationData.answer} />
        </Col>
      </Row>

      <Row>
        <Col lg={3}>
          <Card headerTitle="Resultados estimados"></Card>
        </Col>
        <Col lg={9}>
          <Card headerTitle="Minha carteira" headerIcon="financial">
            <Text type="headline" color="gray6">
              Você pode adicionar, remover e substituir fundos sugeridos, além
              de remanejar os investimentos em cada categoria.
            </Text>
            <s.Table
              columns={columnsToRender}
              data={funds}
              isLoading={!funds.length}
            />
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
