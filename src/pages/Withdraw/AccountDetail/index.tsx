import React, { useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'

import Divisor from 'components/Divisor'
import { get, baseURLNamespaceInvest } from 'services/api'

import DetailContent from './AccountDetailContent'
import Error from './AccountDetailError'
import Loading from './AccountDetailLoading'
import RulesModal from './RulesModal'
import * as S from './styles'

export default function AccountDetail() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [error, setError] = useState(false)
  const [content, setContent] = useState({})
  const { id_cotista, cpf } = useSelector((state: any) => ({
    id_cotista: state.suitabilityInfo?.data?.id_cotista,
    cpf: state.auth.cpf,
  }))

  const isLoading = () => content === null && !error
  const contentIsNotEmpty = () => Object.keys(content).length > 0

  const getAccountDetail = useCallback(async () => {
    setContent({})
    setError(false)

    try {
      const endpoint = `${baseURLNamespaceInvest}/aws/cotista/retiradas`

      if (id_cotista) {
        const { data } = await get(
          `${endpoint}?id_cotista=${id_cotista}&cpf_cnpj=${cpf}`
        )
        setContent({ cpf_cnpj: cpf, ...data.dadosRetirada.conta_porto_seguro })
      }
    } catch (error) {
      setError(true)
    }
  }, [cpf, id_cotista])

  useEffect(() => {
    getAccountDetail()
  }, [getAccountDetail])

  return (
    <>
      <RulesModal
        isOpen={modalIsOpen}
        handleClose={() => setModalIsOpen(false)}
      />
      <S.LayerCard>
        <S.CardContent>
          {isLoading() && <Loading />}
          {error && <Error onClick={() => getAccountDetail()} />}
          {contentIsNotEmpty() && <DetailContent {...content} />}
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
