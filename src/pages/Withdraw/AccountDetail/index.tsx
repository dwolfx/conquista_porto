import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import DetailContent from './AccountDetailContent'
import Error from './AccountDetailError'
import Loading from './AccountDetailLoading'
import RulesModal from './RulesModal'
import * as S from './styles'

interface IProps {
  onError: () => void
}

export default function AccountDetail({ onError }: IProps) {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const { cpf, details, hasError, isLoading } = useSelector<any, any>(
    state => ({
      cpf: state.auth.cpf,
      details: state.withdraw.detailsData?.conta_porto_seguro,
      hasError: state.withdraw.hasErrorDetails,
      isLoading: state.withdraw.isLoadingDetails,
    })
  )

  const contentIsNotEmpty = () =>
    details && Object.keys(details).length > 0 && !isLoading && !hasError

  return (
    <>
      <RulesModal
        isOpen={modalIsOpen}
        handleClose={() => setModalIsOpen(false)}
      />
      <S.LayerCard
        footer={
          <S.FullButton outline onClick={() => setModalIsOpen(true)}>
            Regras e Condições
          </S.FullButton>
        }
      >
        <S.CardContent>
          {isLoading && <Loading />}
          {hasError && <Error onClick={onError} />}
          {contentIsNotEmpty() && <DetailContent cpf_cnpj={cpf} {...details} />}
        </S.CardContent>
      </S.LayerCard>
    </>
  )
}
