import React from 'react'
import * as S from '../styles'
import { ICreditCardCreationPayload, IOrderResponse } from '../../types'

interface IProps {
  formData: ICreditCardCreationPayload
  formOrderResponse: IOrderResponse
}

const SuccessContent = ({ formData, formOrderResponse }: IProps) => (
  <S.BoxContainer>
    <S.IconWrapper>
      <S.SuccessIcon />
    </S.IconWrapper>
    <S.BoxContent>
      <S.Title>
        A solicitação do seu cartão de crédito Porto Seguro foi enviada com
        sucesso!
      </S.Title>
      <S.Description>
        Sua proposta de número <b>{formOrderResponse.NumeroProposta}</b> será
        analisada em breve.
      </S.Description>
      <S.Description>
        Após o recebimento do cartão, a primeira fatura será enviada para o
        e-mail cadastrado (
        <a href={`mailto:${formData.email}`}>{formData.email}</a>). Para
        modificar a forma de envio da fatura, aguarde o cartão e acesse a área
        do cliente.
      </S.Description>
    </S.BoxContent>
  </S.BoxContainer>
)

export default SuccessContent
