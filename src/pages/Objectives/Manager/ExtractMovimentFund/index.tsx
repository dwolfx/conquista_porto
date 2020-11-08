import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import moment from 'moment'

import useMedia from 'hooks/useMedia'
import { useToast } from 'hooks/toast'

import { columns } from './columns'
import ExtractFilter from './Filter'
import ExtractTableMobile from './Mobile'
import ExtractTableTablet from './Tablet'
import TableFilterDrawer from './TableFilterDrawer'
import { INTERVAL_SELECT_OPTIONS } from './constants'

import { GetObjectiveManagementExtractFundRequest } from 'store/modules/ObjectiveManagement/action'

import { IFundExtract } from 'store/modules/ObjectiveManagement/types'

import * as s from './styles'
import * as t from './types'

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
  const isMobile = useMedia('sm')
  const isTablet = useMedia('md')
  const { addToast } = useToast()
  const tableRef = useRef<HTMLDivElement>(null)
  const [selectedInterval, setSelectedInterval] = useState<t.ISelectInterval>(
    INTERVAL_SELECT_OPTIONS.WEEK_INTERVAL_SELECT_OPTION
  )
  const [interval, setInterval] = useState<t.IInterval>({ ...initialInterval })
  const [filters, setFilters] = useState<t.IAllocationType[]>([])
  const [isOpenFilterDrawer, setOpenFilterDrawer] = useState(false)

  const cleanFilters = () => {
    setFilters([])
  }

  const request = () => {
    dispatch(
      GetObjectiveManagementExtractFundRequest({
        id: +objectiveId,
        fund_id: fundId,
        addToast,
        allocationTypeList: filters.map(item => item.id),
        initialDate: interval.initialDate,
        finalDate: interval.finalDate,
      })
    )
  }

  useEffect(() => {
    if (filters.length > 0 || (interval.initialDate && interval.finalDate)) {
      debugger
      request()
    }
  }, [filters, interval])

  return (
    <s.ExtractFund data-testid="ExtractMovimentFund">
      <s.CardContainer>
        <s.CustomCard>
          {isMobile || isTablet ? (
            <>
              {isMobile ? (
                <ExtractTableMobile
                  extractFund={extractFund}
                  isLoading={isLoading}
                  request={request}
                />
              ) : (
                <ExtractTableTablet
                  extractFund={extractFund}
                  isLoading={isLoading}
                  request={request}
                />
              )}
              <s.FloatButton
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
                  handleClearFilters={cleanFilters}
                />
              )}
            </>
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
                data={extractFund}
                columns={columns()}
                isLoading={isLoading}
                loadingMessage="Buscando informações do extrato…"
                emptyMessage="Não há movimentações com essas especificações"
                filteringEmptyMessage="Não há movimentações com essas especificações"
                hasPagination
              />
            </>
          )}
        </s.CustomCard>
      </s.CardContainer>
    </s.ExtractFund>
  )
}
