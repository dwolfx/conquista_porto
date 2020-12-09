import React from 'react'

import * as S from '../styles'

const SuccessState = () => {
  return (
    <S.CardBodyWrapper data-testid="hire-status-success">
      <S.ContentWrapper>
        <S.IconWrapper>
          <S.SuccessIcon />
        </S.IconWrapper>
        <S.StatusTextWrapper>
          <S.TextStatusTitle>
            Tudo certo com a  solicitação do seu Seguro Viagem.
          </S.TextStatusTitle>
          <S.TextStatusDescription>
            Agora, basta acessar seu e-mail e assinar eletronicamente a proposta.
          </S.TextStatusDescription>
        </S.StatusTextWrapper>
      </S.ContentWrapper>
    </S.CardBodyWrapper>
  )
}

export default SuccessState