import React from 'react'

import { ICreditCardCreationPayload, IOrderResponse } from '../../types'
import * as S from './../styles'

interface IProps {
  formData: ICreditCardCreationPayload
  formOrderResponse: IOrderResponse
}

const PendingContent = ({ formData, formOrderResponse }: IProps) => (
  <S.BoxContainer>
    <S.IconWrapper>
      <S.PendingIcon />
    </S.IconWrapper>
    <S.BoxContent>
      <S.Title>Proposta de Cartão de Crédito Porto Seguro em análise.</S.Title>
      <S.Description>
        A sua proposta de número <b>{formOrderResponse.numeroProposta}</b>{' '}
        encontra-se em análise.
      </S.Description>
      <S.Description>
        Caso a proposta seja aprovada, você receberá o seu Cartão de Crédito
        Porto Seguro e a sua fatura será enviada para o e-mail{' '}
        <a href={`mailto:${formData.email}`}>{formData.email}</a>. Se preferir
        receber a fatura impressa, aguarde o recebimento do cartão e acesse a
        área do cliente.
      </S.Description>
    </S.BoxContent>
  </S.BoxContainer>
)

export default PendingContent
