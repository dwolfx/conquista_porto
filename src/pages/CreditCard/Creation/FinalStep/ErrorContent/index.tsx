import React from 'react'

import { renderFooter } from '../'

import * as S from './../styles'

const ErrorContent = () => (
  <S.GridContainer>
    <S.GridRow>
      <S.GridCol lg={12}>
        <S.StyledCard footer={renderFooter()}>
          <S.WrapperContent>
            <S.BoxContainer>
              <S.IconWrapper>
                <S.ErrorIcon />
              </S.IconWrapper>
              <S.BoxContent>
                <S.Title>Desculpe, ocorreu uma falha e não foi possível enviar a sua solicitação.</S.Title>
                <S.Description>Por favor, aguarde alguns minutos e tente novamente</S.Description>
              </S.BoxContent>
            </S.BoxContainer>
          </S.WrapperContent>
        </S.StyledCard>
      </S.GridCol>
    </S.GridRow>
  </S.GridContainer>
)

export default ErrorContent
