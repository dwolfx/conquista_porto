import React from 'react'
import Loading from 'components/Loading'
import * as S from './styles'

export default function AccountDetailLoading() {
  return (
    <S.Container>
      <Loading type="bar" legend="Buscando informações da conta de investimento..." />
    </S.Container>
  )
}
