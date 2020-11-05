import React from 'react'
import { useHistory } from 'react-router-dom'

import Button from 'components/Button'
import SuccessContent from './SuccessContent'
import ErrorContent from './ErrorContent'

import { ECardFlagLabel } from 'pages/CreditCard/Creation/common/labels'

import * as S from './styles'
import { ICreditCardCreationPayload, IOrderResponse } from '../types'

interface IProps {
  formData: ICreditCardCreationPayload
  formOrderResponse: IOrderResponse
  hasError?: boolean
  handleClose: () => void
}

export const renderFooter = (handleClose: () => void) => (
  <S.FooterWrapper>
    <Button color="primary" onClick={handleClose}>
      Início
    </Button>
  </S.FooterWrapper>
)

const FinalStep = ({
  formData,
  formOrderResponse,
  hasError,
  handleClose,
}: IProps) => {
  const { mensagem } = formOrderResponse

  if (mensagem?.tipoCritica !== 'SUCESSO' || hasError) {
    return <ErrorContent handleClose={handleClose} />
  }

  return (
    <S.GridContainer>
      <S.GridRow>
        <S.GridCol lg={3} md={4} sm={12}>
          <S.StyledCard headerTitle="Sua solicitação">
            <S.ListWrapper>
              <S.StyledItem>
                <S.StyledCaption>BANDEIRA</S.StyledCaption>
                <S.Title>{ECardFlagLabel[+formData.codigoBandeira!]}</S.Title>
                <S.StyledDivisor />
              </S.StyledItem>
              <S.StyledItem>
                <S.StyledCaption>DIA DO VENCIMENTO</S.StyledCaption>
                <S.Title>{formData.diaVencimento}</S.Title>
              </S.StyledItem>
            </S.ListWrapper>
            <S.CreditCardImg />
          </S.StyledCard>
        </S.GridCol>
        <S.GridCol lg={9} md={8} sm={12}>
          <S.StyledCard footer={renderFooter(handleClose)}>
            <S.WrapperContent>
              <SuccessContent
                formData={formData}
                formOrderResponse={formOrderResponse}
              />
            </S.WrapperContent>
          </S.StyledCard>
        </S.GridCol>
      </S.GridRow>
    </S.GridContainer>
  )
}

export default FinalStep
