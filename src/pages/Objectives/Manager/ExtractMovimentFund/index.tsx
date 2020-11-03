import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import moment from 'moment'

import useMedia from 'hooks/useMedia'
import { useToast } from 'hooks/toast'

import { columns } from './columns'
import ExtractFilter from './Filter'

import { GetObjectiveManagementExtractFundRequest } from 'store/modules/ObjectiveManagement/action'

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
  initialDate: moment()
    .subtract(7, 'days')
    .format('DD/MM/YYYY'),
  finalDate: moment().format('DD/MM/YYYY'),
}

export default function ExtractMovimentFund({
  extractFund,
  onSuccess,
  isLoading,
  objectiveId,
  fundId,
}: {
  extractFund: IFundExtract[]
  onSuccess?: () => void
  isLoading?: boolean
  objectiveId: string
  fundId: number
}) {
  const dispatch = useDispatch()
  const isMobile = useMedia('xs')
  const { addToast } = useToast()
  const tableRef = useRef<HTMLDivElement>(null)
  const [selectedInterval, setSelectedInterval] = useState<t.ISelectInterval>(
    INTERVAL_SELECT_OPTIONS.WEEK_INTERVAL_SELECT_OPTION
  )
  const [interval, setInterval] = useState<t.IInterval>({ ...initialInterval })
  const [filters, setFilters] = useState<string[]>([])

  const cleanFilters = () => {
    setFilters([])
  }

  useEffect(() => {
    if (filters.length > 0 || (interval.initialDate && interval.finalDate)) {
      dispatch(
        GetObjectiveManagementExtractFundRequest({
          id: +objectiveId,
          fund_id: fundId,
          addToast,
          allocationTypeList: filters,
          initialDate: interval.initialDate,
          finalDate: interval.finalDate,
        })
      )
    }
  }, [filters, interval])

  return (
    <s.ExtractFund data-testid="ExtractMovimentFund">
      <s.CardContainer>
        <s.CustomCard>
          {/* {isLoading ? (
            <s.Loading type="bar" legend="Buscando informações do extrato..." />
          ) : ( */}
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
              data={extractFund}
              columns={columns()}
              isLoading={isLoading}
              loadingMessage="Buscando informações do extrato…"
              emptyMessage="Não há movimentações com essas especificações"
              filteringEmptyMessage="Não há movimentações com essas especificações"
              hasPagination
            />
          </>
          {/* )} */}
        </s.CustomCard>
      </s.CardContainer>
    </s.ExtractFund>
  )
}
