import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import 'styled-components/macro'

import TransactionHeader from 'components/Header/TransactionsHeader'

import ExtractMovimentFund from 'pages/Objectives/Manager/ExtractMovimentFund'

import { IExtractProps, IState } from './types'
import * as s from './styles'

interface IRouteParams {
  objectiveId: string
}

export default function({ isOpen, handleClose, fund }: IExtractProps) {
  const { objectiveId } = useParams<IRouteParams>()

  const { isLoadingExtractFund, dataExtract } = useSelector(
    (state: IState) => state.objectiveManagement
  )

  return (
    <s.Layer
      isOpen={isOpen}
      handleClose={handleClose}
      headerContent={
        <TransactionHeader
          onClose={handleClose}
          showStepsBar
          stepsBarProps={{
            title: 'Extrato de',
            subtitle: 'Movimentações do fundo',
            hideSteps: true,
          }}
        />
      }
    >
      <ExtractMovimentFund
        extractFund={dataExtract}
        onSuccess={handleClose}
        fundId={fund.fund_id}
        objectiveId={objectiveId}
        isLoading={isLoadingExtractFund}
      />
    </s.Layer>
  )
}
