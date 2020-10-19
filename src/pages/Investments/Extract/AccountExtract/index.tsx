import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row } from 'styled-bootstrap-grid'
import 'styled-components/macro'
import moment from 'moment'

import useMedia from 'hooks/useMedia'
import { GetBankExtractRequest } from 'store/modules/BankExtract/action'

import BaseLayer from '../BaseLayer'
import TableFilter from './TableFilter'
import ExtractTableMobile from './ExtractTable/Mobile'
import ExtractTable from './ExtractTable'
import accountExtractFilters from './TableFilter/utils/accountExtractFilters'
import InvestmentAccountDetail from './InvestmentAccountDetail'
import TableFilterDrawer from './TableFilterDrawer'
import { FloatButton } from '../BaseLayer/styles'
import { INTERVAL_SELECT_OPTIONS } from '../constants'
import { IFilter, IInterval, ITransaction, ISelectInterval } from './types'

import { ColStyled, TableWrapper, ContentCard } from './styles'


const initialFilters = {
  entry: false,
  withdraw: false
}

const initialInterval = {
  startDate: moment().subtract(7, 'days').format('YYYY-MM-DD'),
  endDate: moment().format('YYYY-MM-DD')
}

interface IProps {
  isOpen: boolean
  handleClose: () => void
}
const AccountExtract = ({ isOpen, handleClose }: IProps) => {
  const dispatch = useDispatch()
  const isMobile = useMedia('xs')
  const [isOpenFilterDrawer, setOpenFilterDrawer] = useState(false)
  const [selectedInterval, setSelectedInterval] = 
    useState<ISelectInterval>(INTERVAL_SELECT_OPTIONS.WEEK_INTERVAL_SELECT_OPTION)
  const [filteredExtracts, setFilteredExtracts] = useState<ITransaction[]>([])
  const [filters, setFilters] = useState<IFilter>({ ...initialFilters })
  const [interval, setInterval] = useState<IInterval>({ ...initialInterval })
  const { transactions, isLoading, hasError } = useSelector<any, any>(state => ({
    transactions: state.bankExtract.data?.transacoes,
    isLoading: state.bankExtract.isLoading,
    hasError: state.bankExtract.hasError,
  }))

  useEffect(() => {
    dispatch(GetBankExtractRequest({
      tipoFiltro: 0,
      dataInicial: interval.startDate,
      dataFinal: interval.endDate
    }))
  }, [interval, dispatch])

  useEffect(() => {
    if (transactions) {
      setFilteredExtracts(accountExtractFilters(filters, transactions.transacao as ITransaction[] || []))
    }
  }, [filters, transactions])

  const clearFilters = () => {
    setFilters({ ...initialFilters })
    setSelectedInterval(INTERVAL_SELECT_OPTIONS.WEEK_INTERVAL_SELECT_OPTION)
    setInterval({
      startDate: moment().subtract(7, 'days').format('YYYY-MM-DD'),
      endDate: moment().format('YYYY-MM-DD')
    })
  }

  return (
    <BaseLayer
      handleClose={handleClose}
      isOpen={isOpen}
      id="extrato-conta"
      title="Conta de investimento"
    >
      <Row>
        <ColStyled lg={3} md={12}>
          <InvestmentAccountDetail />
        </ColStyled>
        <ColStyled lg={9} md={12}>
          {isMobile ? (
            <>
              <ExtractTableMobile
                isLoading={isLoading}
                hasError={hasError}
                extracts={filteredExtracts}
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
                  handleClearFilters={clearFilters}
                />
              }
            </>
          ) : (
            <ContentCard
                data-testid="table-account-extract"
              >
                <TableWrapper hasError={false}>
                  <TableFilter
                    filters={filters}
                    handleFilters={setFilters}
                    interval={interval}
                    handleInterval={setInterval}
                    selectedInterval={selectedInterval}
                    handleSelectInterval={setSelectedInterval}
                    handleClearFilters={clearFilters}
                  />
                  <ExtractTable
                    isLoading={isLoading}
                    hasError={hasError}
                    extracts={filteredExtracts}
                    request={{
                      tipoFiltro: 0,
                      dataInicial: interval.startDate,
                      dataFinal: interval.endDate
                    }}
                  />
                </TableWrapper>
            </ContentCard>
          )}
        </ColStyled>
      </Row>
    </BaseLayer>
  )
}
export default AccountExtract
