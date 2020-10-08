import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GetBankExtractRequest } from 'store/modules/BankExtract/action'
import { columns } from './constants'
import * as S from './styles'

const ExtractTable = () => {
  const columnsToRender = columns()
  const dispatch = useDispatch()
  const { transactions, isLoading, hasError, cpf, isLayerOpen } = useSelector<any, any>(state => ({
    transactions: state.bankExtract.data?.transacoes,
    isLoading: state.bankExtract.isLoading,
    hasError: state.bankExtract.hasError,
    cpf: state.auth.cpf,
    isLayerOpen: state.bankExtract.isLayerOpen,
  }))
  const payload = {
    tipoFiltro: 30,
    dataInicial: '2020-01-01',
    dataFinal: '2020-10-09',
  }

  useEffect(() => {
    if (isLayerOpen && !transactions) {
      dispatch(GetBankExtractRequest(payload, cpf))
    }
  }, [cpf, dispatch, transactions, isLayerOpen])

  return (
    <S.TableWrapper hasError={hasError}>
      <S.Table
        columns={columnsToRender}
        data={transactions?.transacao || []}
        isLoading={isLoading}
        hasError={hasError}
        errorMessage="Não foi possível carregar as movimentações da conta de investimento. Por favor, tente novamente."
        loadingMessage="Buscando movimentações da conta de investimento..."
        hasPagination
        onError={() => dispatch(GetBankExtractRequest(payload, cpf))}
      />
    </S.TableWrapper>
  )
}

export default ExtractTable
