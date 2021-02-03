import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import 'styled-components/macro'
import { Row } from 'styled-bootstrap-grid'

import FundDetailDrawer from 'components/FundDetail/Drawer'
import FundDetailModal from 'components/FundDetail/Modal'
import { GetBankExtractFundRequest } from 'store/modules/BankExtractFund/action'
import useMedia from 'hooks/useMedia'

import { FloatButton } from '../components/BaseLayer/styles'

import FundDetailCard from './FundDetail'
import BaseLayer from '../components/BaseLayer'
import BaseTable from '../components/BaseTable'
import BaseTableMobile from '../components/BaseTable/Mobile'
import TableFilter from './TableFilter'
import TableFilterDrawer from './TableFilterDrawer'
import { IFundExtractFilter, ITransaction } from './types'
import { ISelectInterval, IInterval } from '../AccountExtract/types'
import fundExtractsFilters from './TableFilter/utils/fundExtractsFilters'
import { INTERVAL_SELECT_OPTIONS } from '../constants'

import { FundDetailContainer, ColFundDetail, ColStyled, ContentCard, TableWrapper } from './styles'
import { IBankExtract } from '../components/BaseTable/types'

interface IProps {
  isOpen: boolean
  handleClose: () => void
}
const FundExtract = ({ isOpen, handleClose }: IProps) => {
  const dispatch = useDispatch()
  const isMobile = useMedia('sm')
  const isTablet = useMedia('md')
  const [filteredExtracts, setFilteredExtracts] = useState<ITransaction[]>([])
  const [isOpenFilterDrawer, setOpenFilterDrawer] = useState(false)
  const [isFundDetailOpen, setFundDetailOpen] = useState(false)
  const [selectedInterval, setSelectedInterval] = useState<ISelectInterval>(
    INTERVAL_SELECT_OPTIONS.WEEK_INTERVAL_SELECT_OPTION
  )
  const [filters, setFilters] = useState<IFundExtractFilter>({ 
    apply: false,
    redeem: false,
    quotaEater: false,
    others: false
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

  const fundExtractRequest = useCallback(() => {
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

  useEffect(() => {
    fundExtractRequest()
  }, [fundExtractRequest])

  useEffect(() => {
    if (bankExtractFund) {
      setFilteredExtracts(fundExtractsFilters(filters, bankExtractFund.operacoes.operacao as IBankExtract[] || []))
    }
  }, [filters, bankExtractFund])

  const cleanFilters = () => {
    setFilters({
      apply: false,
      redeem: false,
      quotaEater: false,
      others: false,
    })
  }

  const getExtracts = () => {
    return bankExtractFund ? filteredExtracts : []
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
              <BaseTableMobile
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
                {isTablet ? (
                  <>
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
                  <TableFilter
                    filters={filters}
                    handleFilters={setFilters}
                    selectedInterval={selectedInterval}
                    handleSelectInterval={setSelectedInterval}
                    handleInterval={setInterval}
                    handleClearFilters={cleanFilters}
                  />
                )}
                <BaseTable 
                  isLoading={isLoadingExtractFund}
                  hasError={hasErrorExtractFund}
                  isFundTransaction
                  onErrorHandler={fundExtractRequest}
                  extracts={getExtracts()}
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
