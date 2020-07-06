import React from 'react'
import { Col } from 'styled-bootstrap-grid'
import 'styled-components/macro'

import Text from 'components/Text'

import { FullHeightCard } from 'pages/Objectives/Recommendation/styles'
import { IFunds } from 'store/modules/Objective/types'

import { formatMoney } from 'helpers'
import useMedia from 'hooks/useMedia'

import { columns, columnsSticky } from './tableData'
import * as s from './styles'

interface IProps {
  cardHeader: React.JSXElementConstructor<object>
  cardInfos: React.JSXElementConstructor<object>
  funds: IFunds[]
  handleOpenDetails: (fund: IFunds) => void
  totalInitialInvestment: number
  totalMontlyInvestment: number
  setEditingWallet: (state: boolean) => void
}

const TableView = ({
  cardHeader: CardHeader,
  cardInfos: CardInfos,
  funds,
  handleOpenDetails,
  totalInitialInvestment,
  totalMontlyInvestment,
  setEditingWallet,
}: IProps) => {
  const isTabletVertical = useMedia('md')
  const columnsToRender = isTabletVertical ? columnsSticky : columns

  return (
    <FullHeightCard headerIcon="financial" headerTitle={<CardHeader />}>
      <CardInfos />

      <s.ContainerFunds>
        <s.Table
          columns={columnsToRender}
          onRowClick={(rowDetails: IFunds) => {
            handleOpenDetails(rowDetails)
          }}
          data={funds}
          isSticky={isTabletVertical}
        />

        {isTabletVertical ? (
          <>
            <s.TotalValuesRow>
              <Col sm={3}>
                <s.TotalLine alignItems="center">
                  <Text type="captionUppercase" color="gray5">
                    Total Inv. Inicial
                  </Text>
                </s.TotalLine>
                <s.TotalLine alignItems="center">
                  <Text type="captionUppercase" color="gray5">
                    Total Inv. Mensal
                  </Text>
                </s.TotalLine>
              </Col>
              <Col smAuto>
                <s.TotalLine alignItems="center">
                  <Text color="gray6" bold textAlign="center">
                    {formatMoney(totalInitialInvestment)}
                  </Text>
                </s.TotalLine>
                <s.TotalLine alignItems="center">
                  <Text color="gray6" bold textAlign="center">
                    {formatMoney(totalMontlyInvestment)}
                  </Text>
                </s.TotalLine>
              </Col>
            </s.TotalValuesRow>
          </>
        ) : (
          <s.TotalValuesRow alignItems="center">
            <Col md={6}>
              <Text type="captionUppercase" color="gray5">
                Total
              </Text>
            </Col>
            <Col md={3}>
              <Text color="gray6" bold textAlign="center">
                {formatMoney(totalInitialInvestment)}
              </Text>
            </Col>
            <Col md={3}>
              <Text color="gray6" bold textAlign="center">
                {formatMoney(totalMontlyInvestment)}
              </Text>
            </Col>
          </s.TotalValuesRow>
        )}

        <s.EditButton outline onClick={() => setEditingWallet(true)}>
          Editar composição
        </s.EditButton>
      </s.ContainerFunds>
    </FullHeightCard>
  )
}

export default TableView
