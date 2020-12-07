import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import 'styled-components/macro'
import { Row } from 'styled-bootstrap-grid'

import FundDetailCard from './FundDetail'
import FundDetailDrawer from 'components/FundDetail/Drawer'
import FundDetailModal from 'components/FundDetail/Modal'
import useMedia from 'hooks/useMedia'

import ExtractTableMobile from 'pages/Investments/Extract/AccountExtract/ExtractTable/Mobile' // copy components
import { FloatButton } from '../BaseLayer/styles'

import BaseLayer from '../BaseLayer'
import TableFilter from './TableFilter'
import TableFilterDrawer from './TableFilterDrawer'
import ExtractTable from './ExtractTable'

import { FundDetailContainer, ColFundDetail, ColStyled, ContentCard, TableWrapper } from './styles'
import { ISelectInterval, IInterval } from '../AccountExtract/types'
import { INTERVAL_SELECT_OPTIONS } from '../constants'
import { IFundExtractFilter } from './types'
import { GetBankExtractFundRequest } from 'store/modules/BankExtractFund/action'

interface IProps {
  isOpen: boolean
  handleClose: () => void
}
const FundExtract = ({ isOpen, handleClose }: IProps) => {
  const dispatch = useDispatch()
  const isMobile = useMedia('sm')
  const [isOpenFilterDrawer, setOpenFilterDrawer] = useState(false)
  const [isFundDetailOpen, setFundDetailOpen] = useState(false)
  const [selectedInterval, setSelectedInterval] = useState<ISelectInterval>(
    INTERVAL_SELECT_OPTIONS.WEEK_INTERVAL_SELECT_OPTION
  )
  const [filters, setFilters] = useState<IFundExtractFilter>({ 
    apply: false,
    redeem: false,
    quotaEater: false
   })
  const [interval, setInterval] = useState<IInterval>({
    startDate: '',
    endDate: '',
  })
  const { idFundo, bankExtractFund, isLoadingExtractFund, hasErrorExtractFund } = useSelector((state: any) => ({
    idFundo: state.investmentPosition.idFund,
    bankExtractFund: state.bankExtractFund.data,
    isLoadingExtractFund: state.bankExtractFund.isLoading,
    hasErrorExtractFund: state.bankExtractFund.hasError,
  }))

  useEffect(() => {
    if (idFundo) {
      dispatch(GetBankExtractFundRequest({
        idFundo,
        tipoFiltro: 
          selectedInterval.id !==
            INTERVAL_SELECT_OPTIONS.SPECIFIC_INTERVAL_SELECT_OPTION.id ? selectedInterval.value : null,
        dataInicial: 
          selectedInterval.id === 
            INTERVAL_SELECT_OPTIONS.SPECIFIC_INTERVAL_SELECT_OPTION.id ? interval.startDate : null,
        dataFinal: 
          selectedInterval.id === 
            INTERVAL_SELECT_OPTIONS.SPECIFIC_INTERVAL_SELECT_OPTION.id ? interval.endDate : null
      }))
    }
  }, [interval, idFundo, selectedInterval, dispatch])

  const cleanFilters = () => {
    setFilters({
      apply: false,
      redeem: false,
      quotaEater: false
    })
  }

  const getExtracts = () => {
    return bankExtractFund ? bankExtractFund.operacoes.operacao : []
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
              selectedFundId={idFundo}
            />
          </FundDetailContainer>
        </ColFundDetail>
        <ColStyled lg={9} md={12} data-testid="table-fund-extract">
          {isMobile ? (
            <>
              <ExtractTableMobile
                isLoading={isLoadingExtractFund}
                hasError={hasErrorExtractFund}
                extracts={getExtracts()}
                request={{
                  tipoFiltro: 0,
                  dataInicial: interval.startDate,
                  dataFinal: interval.endDate
                }}
              />
              <FloatButton
                color="primary"
                onClick={() => setOpenFilterDrawer(true)}
                size="large"
                icon="filter"
              />
              {isOpenFilterDrawer &&
                <TableFilterDrawer
                  isOpen={isOpenFilterDrawer}
                  onHandleClose={() => setOpenFilterDrawer(false)}
                  filters={filters}
                  handleFilters={setFilters}
                  interval={interval}
                  handleInterval={setInterval}
                  selectedInterval={selectedInterval}
                  handleSelectInterval={setSelectedInterval}
                  handleClearFilters={cleanFilters}
                />
              }
            </>
          ) : (
            <ContentCard data-testid="table-account-extract">
              <TableWrapper hasError={hasErrorExtractFund}>
                <TableFilter
                  filters={filters}
                  handleFilters={setFilters}
                  selectedInterval={selectedInterval}
                  handleSelectInterval={setSelectedInterval}
                  handleInterval={setInterval}
                  handleClearFilters={cleanFilters}
                />
                <ExtractTable 
                  isLoading={isLoadingExtractFund}
                  hasError={hasErrorExtractFund}
                  extracts={getExtracts()}
                  request={false}
                />
              </TableWrapper>
            </ContentCard>
          )}
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
