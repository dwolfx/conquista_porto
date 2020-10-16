import React from 'react'
import { useDispatch } from 'react-redux'

import { GetBankExtractRequest } from 'store/modules/BankExtract/action'
import ExtractTableTabletVertical from './Tablet'

import { columns } from './constants'
import { ITransaction } from '../types'
import * as S from './styles'
import useMedia from 'hooks/useMedia'


interface IProps {
  extracts: ITransaction[]
  isLoading: boolean,
  hasError: boolean
  request: any
}
const ExtractTable = (props: IProps) => {
  const { extracts, isLoading, hasError, request } = props
  const columnsToRender = columns()
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

export default ExtractTable
