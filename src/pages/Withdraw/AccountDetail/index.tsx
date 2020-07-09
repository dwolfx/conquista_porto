import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Divisor from 'components/Divisor'
import { GetWithdrawDetailsRequest } from 'store/modules/Withdraw/actions'

import DetailContent from './AccountDetailContent'
import Error from './AccountDetailError'
import Loading from './AccountDetailLoading'
import RulesModal from './RulesModal'

import * as S from './styles'

export default function AccountDetail() {
  const dispatch = useDispatch()

  const [modalIsOpen, setModalIsOpen] = useState(false)

  const { cpf, id_cotista, details, hasError, isLoading } = useSelector<
    any,
    any
  >(state => ({
    cpf: state.auth.cpf,
    id_cotista: state.suitabilityInfo.data?.id_cotista,
    details: state.withdraw.detailsData?.conta_porto_seguro,
    hasError: state.withdraw.hasErrorDetails,
    isLoading: state.withdraw.isLoadingDetaisl,
  }))

  const getAccountDetail = useCallback(() => {
    if (id_cotista) {
      dispatch(GetWithdrawDetailsRequest({}))
    }
  }, [dispatch, id_cotista])

  useEffect(() => {
    getAccountDetail()
  }, [getAccountDetail])

  const onError = () => getAccountDetail()

  const contentIsNotEmpty = () => details && Object.keys(details).length > 0

  return (
    <>
      <RulesModal
        isOpen={modalIsOpen}
        handleClose={() => setModalIsOpen(false)}
      />
      <S.LayerCard>
        <S.CardContent>
          {isLoading && <Loading />}
          {hasError && <Error onClick={onError} />}
          {contentIsNotEmpty() && <DetailContent cpf_cnpj={cpf} {...details} />}
        </S.CardContent>
        <S.CardFooter>
          <Divisor />
          <S.FullButton outline onClick={() => setModalIsOpen(true)}>
            Regras e Condições
          </S.FullButton>
        </S.CardFooter>
      </S.LayerCard>
    </>
  )
}
