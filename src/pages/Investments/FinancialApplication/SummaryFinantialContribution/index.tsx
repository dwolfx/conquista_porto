import React, { useState } from 'react'
import 'styled-components/macro'

import {
  CardStyled,
  FooterContainer,
  StyledRetryButton,
  StyledReturnButton,
  StyledConfirmButton,
  ContentContainer,
  SummaryContainer,
  HorizontalListStyled,
  FixedBottom,
} from './styles'

import { FlexTextWrapper } from 'pages/Investments/FinancialApplication/styles'
import Text from 'components/Text'
import Divisor from 'components/Divisor'

import { useToast } from 'hooks/toast'
import { IFormData } from 'pages/Investments/FinancialApplication'
import useMedia from 'hooks/useMedia'

interface IProps {
  formData: IFormData
  errorCount: number
  previousStep: () => void
  onChangeRequestStatus: (id: 'success' | 'error', value: boolean) => void
  onChangeErrorCount: () => void
}

const SummaryFinantialContribution = ({
  formData,
  errorCount,
  previousStep,
  onChangeRequestStatus,
  onChangeErrorCount,
}: IProps) => {
  // Bloco de código mockado
  const [isLoading, setIsLoading] = useState<boolean>(false)
  // Bloco de código mockado

  const { addToast } = useToast()
  const isMobile = useMedia('xs')

  const navigationButtons = () => (
    <FooterContainer>
      <StyledReturnButton onClick={() => previousStep()} disabled={isLoading}>
        VOLTAR
      </StyledReturnButton>
      {errorCount > 0 ? (
        <StyledRetryButton
          disabled={!formData!.isAwareOfTerms}
          loading={isLoading}
          onClick={() => {
            // Bloco de código mockado
            setIsLoading(true)
            if (formData!.whenToInvest === '31/12/2030') {
              return setTimeout(() => {
                addToast({
                  type: 'error',
                  title: 'Erro ao enviar solicitação.',
                  description: 'Por favor, tente novamente.',
                })
                setIsLoading(false)
                onChangeErrorCount()
              }, 1500)
            }
            return setTimeout(() => {
              setIsLoading(false)
              onChangeRequestStatus('success', true)
            }, 700)
          }}
        >
          TENTAR NOVAMENTE
        </StyledRetryButton>
      ) : (
        <StyledConfirmButton
          disabled={!formData!.isAwareOfTerms}
          loading={isLoading}
          onClick={() => {
            // Bloco de código mockado
            setIsLoading(true)
            if (formData!.whenToInvest === '31/12/2030') {
              return setTimeout(() => {
                addToast({
                  type: 'error',
                  title: 'Erro ao enviar solicitação.',
                  description: 'Por favor, tente novamente.',
                })
                setIsLoading(false)
                onChangeErrorCount()
              }, 1500)
            }
            return setTimeout(() => {
              setIsLoading(false)
              onChangeRequestStatus('success', true)
            }, 700)
          }}
          // Bloco de código mockado
        >
          CONFIRMAR
        </StyledConfirmButton>
      )}
    </FooterContainer>
  )

  return (
    <>
      <CardStyled footer={!isMobile && navigationButtons()}>
        <ContentContainer>
          <HorizontalListStyled
            startItems={[
              <Text type="headline" color={isMobile ? 'gray5' : 'gray6'} bold>
                Solicitação
              </Text>,
            ]}
          />
          {!isMobile && <Divisor />}
          <SummaryContainer>
            <HorizontalListStyled
              startItems={[
                <Text type="headline" color="gray5">
                  {isMobile ? 'Valor' : 'Valor do investimento'}
                </Text>,
              ]}
              endItems={[
                <Text type="headline" color="gray6" bold>
                  R$ {formData!.moneyToInvest}
                </Text>,
              ]}
            />
            <HorizontalListStyled
              startItems={[
                <Text type="headline" color="gray5">
                  {isMobile ? 'Data' : 'Data do investimento'}
                </Text>,
              ]}
              endItems={[
                <Text type="headline" color="gray6" bold>
                  {formData!.whenToInvest}
                </Text>,
              ]}
            />
          </SummaryContainer>
          {isMobile && (
            <>
              <Divisor />
              <FlexTextWrapper>
                <Text bold color="gray6">
                  Devido ao horário a data do investimento foi atualizada para o
                  próximo dia útil.
                </Text>
              </FlexTextWrapper>
            </>
          )}
        </ContentContainer>
      </CardStyled>
      {isMobile && <FixedBottom>{navigationButtons()}</FixedBottom>}
    </>
  )
}

export default SummaryFinantialContribution
