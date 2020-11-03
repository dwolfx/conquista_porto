import React, { useContext, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { ThemeContext } from 'styled-components'
import 'styled-components/macro'

import TransactionHeader from 'components/Header/TransactionsHeader'
import Text from 'components/Text'

import ExtractMovimentFund from 'pages/Objectives/Manager/ExtractMovimentFund'

import useMedia from 'hooks/useMedia'
import { useToast } from 'hooks/toast'

import { GetObjectiveManagementExtractFundRequest } from 'store/modules/ObjectiveManagement/action'

import { IExtractProps, TError, IState } from './types'
import * as s from './styles'

interface IRouteParams {
  objectiveId: string
}

export default function({ isOpen, handleClose, fund }: IExtractProps) {
  const theme = useContext(ThemeContext)
  const { objectiveId } = useParams<IRouteParams>()
  const dispatch = useDispatch()
  const isMobile = useMedia('sm')
  const { addToast } = useToast()

  const { isLoadingExtractFund, dataExtract } = useSelector(
    (state: IState) => state.objectiveManagement
  )

  // useEffect(() => {
  //   if (fund) {
  //     dispatch(
  //       GetObjectiveManagementExtractFundRequest({
  //         id: +objectiveId,
  //         fund_id: fund.fund_id,
  //         addToast,
  //       })
  //     )
  //   }
  // }, [fund, addToast, objectiveId])

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
