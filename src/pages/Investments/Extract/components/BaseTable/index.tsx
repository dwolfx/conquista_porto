import React from 'react'
import { useDispatch } from 'react-redux'

import { GetBankExtractRequest } from 'store/modules/BankExtract/action'
import useMedia from 'hooks/useMedia'

import ExtractTableTabletVertical from './Tablet'
import { columns } from './formatter'
import { ITransaction } from '../../AccountExtract/types'
import * as S from './styles'

interface IProps {
  extracts: ITransaction[]
  isFundTransaction?: boolean
  isLoading: boolean,
  hasError: boolean
  request: {
    tipoFiltro: number
    dataInicial: string | null
    dataFinal: string | null
  }
}
const BaseTable = (props: IProps) => {
  const { extracts, isLoading, hasError, request, isFundTransaction = false } = props
  const columnsToRender = columns(isFundTransaction)
  const dispatch = useDispatch()
  const isTabletVertical = useMedia('md')

  if(isTabletVertical) {
    return <ExtractTableTabletVertical {...props}/>
  }

  return (
      <S.Table
        columns={columnsToRender}
        data={extracts}
        isLoading={isLoading}
        hasError={hasError}
        errorMessage="Não foi possível carregar as movimentações da conta de investimento. Por favor, tente novamente."
        loadingMessage="Buscando movimentações da conta de investimento..."
        hasPagination
        onError={() => dispatch(GetBankExtractRequest(request))}
      />
  )
}

export default BaseTable
