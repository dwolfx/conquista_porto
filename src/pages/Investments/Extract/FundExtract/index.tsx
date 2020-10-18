import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import 'styled-components/macro'
import { Row, Col } from 'styled-bootstrap-grid'

import Card from 'components/Card'
import FundDetailCard from './FundDetail'
import FundDetailDrawer from 'components/FundDetail/Drawer'
import FundDetailModal from 'components/FundDetail/Modal'
import useMedia from 'hooks/useMedia'

import BaseLayer from '../BaseLayer'
import TableFilter from './TableFilter'
import ExtractTable from './ExtractTable'

import { FundDetailContainer, ColFundDetail, ColStyled, ContentCard, TableWrapper } from './styles'
import { ISelectInterval, IInterval } from '../AccountExtract/types'
import { INTERVAL_SELECT_OPTIONS } from '../constants'
import { IFundExtractFilter } from './types'

const extractsMock = [
  {
    "tipo": "Retirada",
    "data": "2019-09-03T00:00:00-03:00",
    "valor": "100"
  },
  {
    "tipo": "Retirada",
    "data": "2019-07-03T00:00:00-03:00",
    "valor": "500"
  },
  {
    "tipo": "Retirada",
    "data": "2019-08-27T00:00:00-03:00",
    "valor": "100"
  },
  {
    "tipo": "Retirada",
    "data": "2019-09-03T00:00:00-03:00",
    "valor": "100"
  },
  {
    "tipo": "Retirada",
    "data": "2019-07-03T00:00:00-03:00",
    "valor": "500"
  }
]

interface IProps {
  isOpen: boolean
  handleClose: () => void
}
const FundExtract = ({ isOpen, handleClose }: IProps) => {
  const [filters, setFilters] = useState<IFundExtractFilter>({ 
    apply: false,
    redeem: false,
    quotaEater: false
   })
  const [isFundDetailOpen, setFundDetailOpen] = useState(false)
  const [selectedInterval, setSelectedInterval] = useState<ISelectInterval>(
    INTERVAL_SELECT_OPTIONS.WEEK_INTERVAL_SELECT_OPTION
  )
  const [interval, setInterval] = useState<IInterval>({
    startDate: '',
    endDate: '',
  })
  const { idFund, auth } = useSelector((state: any) => ({
    auth: state.auth,
    idFund: state.investmentPosition.idFund,
  }))

  const isMobile = useMedia('sm')

  const cleanFilters = () => {
    setFilters({
      apply: false,
      redeem: false,
      quotaEater: false
    })
  }

  return (
    <BaseLayer
      id="layer-fund-extract"
      handleClose={handleClose}
      isOpen={isOpen}
      title="Movimentações do fundo"
    >
      <Row>
        <ColFundDetail lg={3} md={12} sm={12} data-testid="card-fund-info">
          <FundDetailContainer>
            <FundDetailCard
              handleFundDetailOpen={() => setFundDetailOpen(true)}
              selectedFundId={idFund}
            />
          </FundDetailContainer>
        </ColFundDetail>
        <ColStyled lg={9} md={12} data-testid="table-fund-extract">
          <ContentCard>
            <TableWrapper hasError={false}>
              <TableFilter
                filters={filters}
                handleFilters={setFilters}
                selectedInterval={selectedInterval}
                handleSelectInterval={setSelectedInterval}
                handleInterval={setInterval}
                handleClearFilters={cleanFilters}
              />
              <ExtractTable 
                isLoading={false}
                hasError={false}
                extracts={extractsMock}
                request={false}
              />
            </TableWrapper>
          </ContentCard>
        </ColStyled>
      </Row>
      {isMobile ? (
        <FundDetailModal
          isOpen={isFundDetailOpen}
          handleClose={() => setFundDetailOpen(false)}
          isLayerOpen
          title="Detalhes do fundo"
        />
      ) : (
        <FundDetailDrawer
          isOpen={isFundDetailOpen}
          isLayerOpen
          handleClose={() => setFundDetailOpen(false)}
        />
      )}
    </BaseLayer>
  )
}
export default FundExtract
