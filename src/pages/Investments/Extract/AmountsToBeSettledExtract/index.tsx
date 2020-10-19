import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row } from 'styled-bootstrap-grid'
import 'styled-components/macro'
import moment from 'moment'

import useMedia from 'hooks/useMedia'
// atualizar quando existir informações sobre o serviço de Saldo a liquidar
import { GetBankExtractRequest } from 'store/modules/BankExtract/action'

import BaseLayer from '../BaseLayer'
import TableFilter from './TableFilter'
import AmountsToBeSettleTableMobile from './AmountsToBeSettledTable/Mobile'
import AmountToBeSettledTable from './AmountsToBeSettledTable'
import amountToBeSettledFilters from './TableFilter/utils/amountToBeSettledFilters'
import TableFilterDrawer from './TableFilterDrawer'
import { FloatButton } from '../BaseLayer/styles'
import { INTERVAL_SELECT_OPTIONS } from '../constants'
import { IFilter, IInterval, ITransaction, ISelectInterval } from './types'

import * as s from './styles'

const initialFilters = {
  application: false,
  redeem: false,
}

const initialInterval = {
  startDate: moment()
    .subtract(7, 'days')
    .format('YYYY-MM-DD'),
  endDate: moment().format('YYYY-MM-DD'),
}

interface IProps {
  isOpen: boolean
  handleClose: () => void
}

const AmountsToBeSettledExtract: React.FC<IProps> = ({
  isOpen,
  handleClose,
}) => {
  const dispatch = useDispatch()
  const isMobile = useMedia('xs')
  const [isOpenFilterDrawer, setOpenFilterDrawer] = useState(false)
  const [filteredExtracts, setFilteredExtracts] = useState<ITransaction[]>([])
  const [filters, setFilters] = useState<IFilter>({ ...initialFilters })
  const [interval, setInterval] = useState<IInterval>({ ...initialInterval })
  const [selectedInterval, setSelectedInterval] = useState<ISelectInterval>(
    INTERVAL_SELECT_OPTIONS.WEEK_INTERVAL_SELECT_OPTION
  )
  // atualizar quando existir informações sobre o serviço de Saldo a liquidar
  const { transactions, isLoading, hasError } = useSelector<any, any>(
    state => ({
      transactions: state.bankExtract.data?.transacoes,
      isLoading: state.bankExtract.isLoading,
      hasError: state.bankExtract.hasError,
    })
  )

  useEffect(() => {
    dispatch(
      // atualizar quando existir informações sobre o serviço de Saldo a liquidar
      GetBankExtractRequest({
        tipoFiltro: 0,
        dataInicial: interval.startDate,
        dataFinal: interval.endDate,
      })
    )
  }, [interval, dispatch])

  useEffect(() => {
    if (transactions) {
      setFilteredExtracts(
        amountToBeSettledFilters(
          filters,
          (transactions.transacao as ITransaction[]) || []
        )
      )
    }
  }, [filters, transactions])

  const clearFilters = () => {
    setFilters({ ...initialFilters })
    setSelectedInterval(INTERVAL_SELECT_OPTIONS.WEEK_INTERVAL_SELECT_OPTION)
    setInterval({
      startDate: moment()
        .subtract(7, 'days')
        .format('YYYY-MM-DD'),
      endDate: moment().format('YYYY-MM-DD'),
    })
  }

  return (
    <BaseLayer
      handleClose={handleClose}
      isOpen={isOpen}
      id="extrato-conta"
      title="Saldo a liquidar"
    >
      <Row>
        <s.ColStyled lg={12} md={12}>
          {isMobile ? (
            <>
              <AmountsToBeSettleTableMobile
                isLoading={isLoading}
                hasError={hasError}
                extracts={filteredExtracts}
                request={{
                  tipoFiltro: 0,
                  dataInicial: interval.startDate,
                  dataFinal: interval.endDate,
                }}
              />
              <FloatButton
                color="primary"
                onClick={() => setOpenFilterDrawer(true)}
                size="large"
                icon="filter"
              />
              {isOpenFilterDrawer && (
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
              )}
            </>
          ) : (
            <s.ContentCard data-testid="table-amounts-to-be-settled-extract">
              <s.TableWrapper hasError={false}>
                <TableFilter
                  filters={filters}
                  handleFilters={setFilters}
                  interval={interval}
                  handleInterval={setInterval}
                  selectedInterval={selectedInterval}
                  handleSelectInterval={setSelectedInterval}
                  handleClearFilters={clearFilters}
                />
                <AmountToBeSettledTable
                  isLoading={isLoading}
                  hasError={hasError}
                  extracts={filteredExtracts}
                  request={{
                    tipoFiltro: 0,
                    dataInicial: interval.startDate,
                    dataFinal: interval.endDate,
                  }}
                />
              </s.TableWrapper>
            </s.ContentCard>
          )}
        </s.ColStyled>
      </Row>
    </BaseLayer>
  )
}

export default AmountsToBeSettledExtract
