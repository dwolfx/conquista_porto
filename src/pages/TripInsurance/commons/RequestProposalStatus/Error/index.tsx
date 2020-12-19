import React from 'react'
import 'styled-components/macro'

import * as S from '../styles'

interface IProps {
  type?: 'errorRequest' | 'errorPayment'
}
const ErrorState = ({ type = 'errorRequest' }: IProps) => (
  <S.CardBodyWrapper data-testid="hire-status-error">
    <S.ContentWrapper>
      <S.IconWrapper>
        <S.ErrorIcon />
      </S.IconWrapper>
      <S.StatusTextWrapper>
        <S.TextStatusTitle>
          {type === 'errorPayment'
            ? 'Seu pagamento pelo cartão de crédito foi declinado.'
            : 'Não foi possível confirmar sua solitação.'}
        </S.TextStatusTitle>
        <S.TextStatusDescription>
          {type === 'errorPayment'
            ? `Pedimos que entre em contato com nossa central. 
               Foi enviado para o e-mail cadastrado com mais informações, 
               junto com a opção de pagamento por boleto.`
            : 'Tente novamente mais tarde, por favor.'}
        </S.TextStatusDescription>
      </S.StatusTextWrapper>
    </S.ContentWrapper>
  </S.CardBodyWrapper>
)

export default ErrorState
