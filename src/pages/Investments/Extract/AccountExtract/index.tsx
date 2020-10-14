import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row } from 'styled-bootstrap-grid'
import 'styled-components/macro'

import Card from 'components/Card'
import useMedia from 'hooks/useMedia'
import { GetBankExtractRequest } from 'store/modules/BankExtract/action'

import BaseLayer from '../BaseLayer'
import TableFilter from './TableFilter'
import ExtractTable from './ExtractTable'
import accountExtractFilters from './TableFilter/utils/accountExtractFilters'
import InvestmentAccountDetail from './InvestmentAccountDetail'
import { IFilter, IInterval, ITransaction } from './types'
import TableFilterDrawer from './TableFilterDrawer'
import { FloatButton } from '../BaseLayer/styles'

import { ColStyled, TableWrapper } from './styles'


export const initialFilters = {
  entry: false,
  withdraw: false
}

export const initialInterval = {
  startDate: '',
  endDate: ''
}

interface IProps {
  isOpen: boolean
  handleClose: () => void
}
const AccountExtract = ({ isOpen, handleClose }: IProps) => {
  const dispatch = useDispatch()
  const isMobile = useMedia('xs')
  const [isOpenFilterDrawer, setOpenFilterDrawer] = useState(false)
  const [filters, setFilters] = useState<IFilter>({ ...initialFilters })
  const [interval, setInterval] = useState<IInterval>({ ...initialInterval })
  const [filteredExtracts, setFilteredExtracts] = useState<ITransaction[]>([])
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
          <Card
            data-testid="table-account-extract"
            css={`
              height: 460px;
            `}
          >
            {isMobile ? (
              <>
                <FloatButton
                  color="primary"
                  onClick={() => setOpenFilterDrawer(true)}
                  size="large"
                  icon="filter"
                />
                <TableFilterDrawer isOpen={isOpenFilterDrawer} onHandleClose={() => setOpenFilterDrawer(false)}/>
              </>
            ) : (
              <TableWrapper hasError={false}>
                <TableFilter 
                  filters={filters}
                  interval={interval}
                  handleInterval={setInterval}
                  handleFilters={setFilters}
                />
                <ExtractTable 
                  isLoading={isLoading}
                  hasError={hasError}
                  extracts={filteredExtracts}
                  request={false}
                />
              </TableWrapper>
            )}
          </Card>
        </ColStyled>
      </Row>
    </BaseLayer>
  )
}
export default AccountExtract
