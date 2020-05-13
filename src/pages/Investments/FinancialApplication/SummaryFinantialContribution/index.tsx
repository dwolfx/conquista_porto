import React, { useState } from 'react'
import 'styled-components/macro'

import {
  CardStyled,
  FooterContainer,
  StyledButton,
  CheckboxContainer,
  ContentContainer,
  SummaryContainer,
  ExternalLink,
} from './styles'
import HorizontalList from 'components/HorizontalList'
import Text from 'components/Text'
import Divisor from 'components/Divisor'
import Checkbox from 'components/Inputs/Checkbox'

import { useToast } from 'hooks/toast'
import { IFormData } from 'pages/Investments/FinancialApplication'

interface IProps {
  formData: IFormData | null
  errorCount: number
  previousStep: () => void
  onChangeFormData: (newFormData: IFormData) => void
  onChangeRequestStatus: (id: 'success' | 'error', value: boolean) => void
  onChangeErrorCount: () => void
}

const SummaryFinantialContribution = ({
  formData,
  errorCount,
  previousStep,
  onChangeFormData,
  onChangeRequestStatus,
  onChangeErrorCount,
}: IProps) => {
  // Bloco de código mockado
  const [isLoading, setIsLoading] = useState<boolean>(false)
  // Bloco de código mockado

  const { addToast } = useToast()
  return (
    <CardStyled
      footer={
        <FooterContainer>
          <StyledButton
            outline
            color="primary"
            onClick={() => previousStep()}
            disabled={isLoading}
          >
            VOLTAR
          </StyledButton>
          <StyledButton
            color="secondary"
            disabled={!formData!.isAwareOfTerms}
            loading={isLoading}
            loadingColor="white"
            css={`
              min-width: 133px;
            `}
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
            {errorCount > 0 ? 'TENTAR NOVAMENTE' : 'CONFIRMAR'}
          </StyledButton>
        </FooterContainer>
      }
    >
      <ContentContainer>
        <HorizontalList
          startItems={[
            <Text type="headline" color="gray6" bold>
              Solicitação
            </Text>,
          ]}
        />
        <Divisor />
        <SummaryContainer>
          <HorizontalList
            startItems={[
              <Text type="headline" color="gray5">
                Valor do investimento
              </Text>,
            ]}
            endItems={[
              <Text type="headline" color="gray6" bold>
                R$ {formData!.moneyToInvest}
              </Text>,
            ]}
          />
          <HorizontalList
            startItems={[
              <Text type="headline" color="gray5">
                Data do investimento
              </Text>,
            ]}
            endItems={[
              <Text type="headline" color="gray6" bold>
                {formData!.whenToInvest}
              </Text>,
            ]}
          />
        </SummaryContainer>
        <Divisor />
        <CheckboxContainer>
          <Checkbox
            label={
              <Text type="body" color="gray5" bold>
                Confirmo que li e concordo com todas as informações contidas no{' '}
                <ExternalLink
                  href="https://google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  termo de adesão
                </ExternalLink>
                .
              </Text>
            }
            checked={formData!.isAwareOfTerms}
            onChange={() =>
              onChangeFormData({
                ...formData!,
                isAwareOfTerms: !formData!.isAwareOfTerms,
              })
            }
            id="checkbox-1"
          />
        </CheckboxContainer>
      </ContentContainer>
    </CardStyled>
  )
}

export default SummaryFinantialContribution
