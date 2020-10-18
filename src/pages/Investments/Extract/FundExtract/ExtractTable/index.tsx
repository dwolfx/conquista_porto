import React from 'react'
import { useDispatch } from 'react-redux'

import { GetBankExtractFundRequest } from 'store/modules/BankExtractFund/action'

import { ITransaction } from '../../AccountExtract/types'
import { columns } from '../../AccountExtract/ExtractTable/constants'

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
      onError={() => dispatch(GetBankExtractFundRequest(request))}
    />
)
}

export default ExtractTable