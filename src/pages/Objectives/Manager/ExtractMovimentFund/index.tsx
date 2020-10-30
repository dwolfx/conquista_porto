import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import moment from 'moment'

import { useToast } from 'hooks/toast'

import { columns } from './columns'
import ExtractFilter from './Filter'
import fundTypeExtractFilters from './Filter/utils/fundTypeExtractFilters'

import { IFundExtract } from 'store/modules/ObjectiveManagement/types'

import * as s from './styles'
import * as t from './types'

export const INTERVAL_SELECT_OPTIONS = {
  WEEK_INTERVAL_SELECT_OPTION: {
    id: 1,
    name: 'Últimos 7 dias',
    value: 7,
  },
  MONTH_INTERVAL_SELECT_OPTION: {
    id: 2,
    name: 'Últimos 30 dias',
    value: 30,
  },
  SPECIFIC_INTERVAL_SELECT_OPTION: {
    id: 3,
    name: 'Período específico',
    value: null,
  },
}

const initialInterval = {
  startDate: moment()
    .subtract(7, 'days')
    .format('YYYY-MM-DD'),
  endDate: moment().format('YYYY-MM-DD'),
}

export default function ExtractMovimentFund({
  extractFund,
  onSuccess,
  isLoading,
}: {
  extractFund: IFundExtract[]
  onSuccess?: () => void
  isLoading?: boolean
}) {
  const tableRef = useRef<HTMLDivElement>(null)
  const [filteredFundExtracts, setFilteredFundExtracts] = useState<
    IFundExtract[]
  >([])
  const [selectedInterval, setSelectedInterval] = useState<t.ISelectInterval>(
    INTERVAL_SELECT_OPTIONS.WEEK_INTERVAL_SELECT_OPTION
  )
  const [interval, setInterval] = useState<t.IInterval>({ ...initialInterval })
  const [filters, setFilters] = useState<t.IFundExtractFilter>({
    applyFund: false,
    linkObjective: false,
    redeemFund: false,
    delinkObjective: false,
    transferBetweenObjectives: false,
  })
  const cleanFilters = () => {
    setFilters({
      applyFund: false,
      linkObjective: false,
      redeemFund: false,
      delinkObjective: false,
      transferBetweenObjectives: false,
    })
  }

  useEffect(() => {
    if (extractFund) {
      setFilteredFundExtracts(
        fundTypeExtractFilters(filters, (extractFund as IFundExtract[]) || [])
      )
    }
  }, [filters, extractFund])

  return (
    <s.ExtractFund data-testid="ExtractMovimentFund">
      <s.CardContainer>
        <s.CustomCard>
          {isLoading ? (
            <s.Loading type="bar" legend="Buscando informações do extrato..." />
          ) : (
            <>
              <ExtractFilter
                filters={filters}
                handleFilters={setFilters}
                interval={interval}
                selectedInterval={selectedInterval}
                handleSelectInterval={setSelectedInterval}
                handleInterval={setInterval}
                handleClearFilters={cleanFilters}
              />
              <s.CustomTable
                customRef={tableRef}
                data={filteredFundExtracts}
                columns={columns()}
                hasPagination
              />
            </>
          )}
        </s.CustomCard>
      </s.CardContainer>
    </s.ExtractFund>
  )
}
