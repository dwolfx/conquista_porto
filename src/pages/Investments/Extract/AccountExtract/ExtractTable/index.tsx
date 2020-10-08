import React from 'react'
import { useDispatch } from 'react-redux'

import { GetBankExtractRequest } from 'store/modules/BankExtract/action'

import { columns } from './constants'
import { ITransaction } from '../types'
import * as S from './styles'


interface IProps {
  extracts: ITransaction[]
  isLoading: boolean,
  hasError: boolean
  request: any
}
const ExtractTable = ({ extracts, isLoading, hasError, request }: IProps) => {
  const columnsToRender = columns()
  const dispatch = useDispatch()

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
