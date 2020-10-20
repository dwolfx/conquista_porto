import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'

import { columns } from './columns'
import * as s from './styles'

import { IFundExtract } from 'store/modules/ObjectiveManagement/types'

import { useToast } from 'hooks/toast'

export default function ExtractMovimentFund({
  extractFund,
  onSuccess,
  isLoading,
}: {
  extractFund: IFundExtract[]
  onSuccess?: () => void
  isLoading?: boolean
}) {
  const { addToast } = useToast()
  const dispatch = useDispatch()
  const tableRef = useRef<HTMLDivElement>(null)

  return (
    <s.ExtractFund data-testid="ExtractFund">
      <s.CardContainer>
        <s.CustomCard>
          {isLoading ? (
            <s.Loading type="bar" legend="Buscando informações do extrato..." />
          ) : (
            <s.CustomTable
              customRef={tableRef}
              data={extractFund}
              columns={columns()}
            />
          )}
        </s.CustomCard>
      </s.CardContainer>
    </s.ExtractFund>
  )
}
