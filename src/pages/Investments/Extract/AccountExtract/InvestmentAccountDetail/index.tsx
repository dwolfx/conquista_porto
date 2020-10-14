import useMedia from 'hooks/useMedia'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GetBankDataRequest } from 'store/modules/BankData/action'

import DetailContent from './InvestmentAccountDetailContent'
import MobileDetailContent from './InvestmentAccountDetailContent/Mobile'
import Error from './InvestmentAccountDetailError'
import Loading from './InvestmentAccountDetailLoading'
import * as S from './styles'

export default function InvestmentAccountDetail() {
  const dispatch = useDispatch()
  const isMobile = useMedia('sm')

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

  if(isMobile) {
    return <MobileDetailContent cpf_cnpj={cpf} {...details?.DadosContaPortoSeguro} />
  }

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
