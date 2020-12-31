import React from 'react'
import { useDispatch } from 'react-redux'

// atualizar quando existir informações sobre o serviço de Saldo a liquidar
import { GetBankExtractRequest } from 'store/modules/BankExtract/action'
import AmountsToBeSettledTableTabletVertical from './TabletVertical'

import useMedia from 'hooks/useMedia'

import { columns } from './constants'
import { ITransaction } from '../types'

import * as s from './styles'

interface IProps {
  extracts: ITransaction[]
  isLoading: boolean
  hasError: boolean
  request: {
    tipoFiltro: number
    dataInicial: string | null
    dataFinal: string | null
  }
}

const AmountsToBeSettledTable = (props: IProps) => {
  const { extracts, isLoading, hasError, request } = props
  const columnsToRender = columns()
  const dispatch = useDispatch()
  const isTabletVertical = useMedia('md')

  if (isTabletVertical) {
    return <AmountsToBeSettledTableTabletVertical {...props} />
  }

  return (
    <s.Table
      columns={columnsToRender}
      data={extracts}
      isLoading={isLoading}
      hasError={hasError}
      errorMessage="Não foi possível carregar os saldos a liquidar. Por favor, tente novamente."
      loadingMessage="Buscando saldos a liquidar..."
      hasPagination
      onError={() => dispatch(GetBankExtractRequest(request))}
    />
  )
}

export default AmountsToBeSettledTable
