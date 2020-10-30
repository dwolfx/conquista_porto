import React from 'react'
import { handleGiwRedirect } from 'helpers'

import Button from 'components/Button'
import SuccessContent from './SuccessContent'
import PendingContent from './PendingContent'
import ErrorContent from './ErrorContent'

import * as S from './styles'

interface IProps {
  hasError: boolean,
  isPending: boolean
}

export const renderFooter = () => (
  <S.FooterWrapper>
    <Button color="primary" onClick={() => handleGiwRedirect('portaldecliente/conquista/perfil?r=true')}>Início</Button>
  </S.FooterWrapper>
)

const FinalStep: React.FC<IProps> = ({ hasError, isPending }) => {
  if (hasError) return <ErrorContent />

  return (
    <S.GridContainer>
      <S.GridRow>
        <S.GridCol lg={3} md={4} sm={12} >
          <S.StyledCard headerTitle="Sua solicitação">
            <S.ListWrapper>
              <S.StyledItem>
                <S.StyledCaption>MODELO</S.StyledCaption>
                <S.Title>{'Porto Seguro Platinum'}</S.Title>
                <S.StyledDivisor />
              </S.StyledItem>
              <S.StyledItem>
                <S.StyledCaption>BANDEIRA</S.StyledCaption>
                <S.Title>{'Mastercard'}</S.Title>
                <S.StyledDivisor />
              </S.StyledItem>
              <S.StyledItem>
                <S.StyledCaption>DIA DO VENCIMENTO</S.StyledCaption>
                <S.Title>{'17'}</S.Title>
              </S.StyledItem>
            </S.ListWrapper>
            <S.CreditCardImg />
          </S.StyledCard>
        </S.GridCol>
        <S.GridCol lg={9} md={8} sm={12}>
          <S.StyledCard footer={renderFooter()}>
            <S.WrapperContent>
              {isPending
                ? <PendingContent />
                : <SuccessContent />
              }
            </S.WrapperContent>
          </S.StyledCard>
        </S.GridCol>
      </S.GridRow>
    </S.GridContainer>
  )
}

export default FinalStep;
