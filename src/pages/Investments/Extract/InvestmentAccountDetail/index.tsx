import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GetBankDataRequest } from 'store/modules/BankData/action'

import DetailContent from './InvestmentAccountDetailContent'
import Error from './InvestmentAccountDetailError'
import Loading from './InvestmentAccountDetailLoading'
import * as S from './styles'

export default function InvestmentAccountDetail() {
  const dispatch = useDispatch()

  const { cpf, details, hasError, isLoading } = useSelector<any, any>(
    state => ({
      cpf: state.auth.cpf,
      details: state.bankData.data,
      hasError: state.bankData.hasError,
      isLoading: state.bankData.isLoading,
    })
  )

  useEffect(() => {
    if (details === null) {
      dispatch(GetBankDataRequest(cpf))
    }
  }, [cpf, details, dispatch])

  const contentIsNotEmpty = () =>
    details && Object.keys(details).length > 0 && !isLoading && !hasError

  return (
    <>
      <S.LayerCard headerTitle="Conta de investimento" data-testid="card-account-info">
        <S.CardContent>
          {isLoading && <Loading />}
          {hasError && <Error onClick={() => dispatch(GetBankDataRequest(cpf))} />}
          {contentIsNotEmpty() && <DetailContent cpf_cnpj={cpf} {...details?.DadosContaPortoSeguro} />}
        </S.CardContent>
      </S.LayerCard>
    </>
  )
}
