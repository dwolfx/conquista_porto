import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import 'styled-components/macro'

import Divisor from 'components/Divisor'
import Icon from 'components/IconExporter'
import Text from 'components/Text'

import useMedia from 'hooks/useMedia'
import { useToast } from 'hooks/toast'
import { IFormData } from 'pages/Investments/FinancialApplication'
import { FlexTextWrapper } from 'pages/Investments/FinancialApplication/styles'
import { PostFinancialApplicationDataRequest } from 'store/modules/Investment/FinancialApplication/action'
import { formatLocaleStringToNumber } from 'helpers'

import {
  CardStyled,
  FooterContainer,
  StyledReturnButton,
  StyledConfirmButton,
  ContentContainer,
  SummaryContainer,
  HorizontalListStyled,
  FixedBottom,
} from './styles'

interface IProps {
  idFundo: number
  formData: IFormData
  errorCount: number
  acceptAlignmentTerms: boolean
  previousStep: () => void
  onChangeRequestStatus: (id: 'success' | 'error', value: boolean) => void
  onChangeErrorCount: () => void
}

const SummaryFinancialContribution = ({
  idFundo,
  formData,
  errorCount,
  acceptAlignmentTerms,
  previousStep,
  onChangeRequestStatus,
  onChangeErrorCount,
}: IProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { financialApplicationGetData } = useSelector<any, any>(state => ({
    financialApplicationGetData: state.financialApplicationGetData.data,
  }))

  const limitHour =
    financialApplicationGetData.dados_para_aplicacao.fundo.hora_aplicacao

  const { addToast } = useToast()
  const isMobile = useMedia('sm')
  const dispatch = useDispatch()

  const handleDispatchPostFinancialApplicationDataRequest = () => {
    dispatch(
      PostFinancialApplicationDataRequest({
        data: {
          data: moment(
            financialApplicationGetData.dados_para_aplicacao.data_operacao
          ).format('YYYY-MM-DD'),
          valor: formatLocaleStringToNumber(formData.moneyToInvest),
          id_fundo: idFundo,
          ciencia_desenquadramento: acceptAlignmentTerms ? 'S' : 'N',
        },
        onSuccess: () => {
          onChangeRequestStatus('success', true)
          setIsLoading(false)
        },
        onError: () => {
          onChangeErrorCount()
          setIsLoading(false)
          addToast({
            type: 'error',
            description: 'Por favor, tente novamente.',
            title: 'Erro ao enviar solicitação.',
          })
        },
      })
    )
  }

  const navigationButtons = () => (
    <FooterContainer>
      <StyledReturnButton onClick={() => previousStep()} disabled={isLoading}>
        VOLTAR
      </StyledReturnButton>
      <StyledConfirmButton
        disabled={!formData!.isAwareOfTerms}
        loading={isLoading}
        retryAction={errorCount > 0}
        color="secondary"
        loadingColor="white"
        onClick={() => {
          setIsLoading(true)
          handleDispatchPostFinancialApplicationDataRequest()
        }}
      >
        {errorCount > 0 ? 'TENTAR NOVAMENTE' : 'CONFIRMAR'}
      </StyledConfirmButton>
    </FooterContainer>
  )

  return (
    <>
      <CardStyled footer={!isMobile && navigationButtons()}>
        <ContentContainer>
          <HorizontalListStyled
            startItems={[
              <Text type="headline" color={isMobile ? 'gray5' : 'gray6'} bold>
                {isMobile ? 'Resumo da Solicitação' : 'Solicitação'}
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
                <>
                  {!moment(formData.whenToInvest, 'DD/MM/YYYY').isSame(
                    moment(
                      financialApplicationGetData.dados_para_aplicacao
                        .data_operacao
                    )
                  ) && (
                    <>
                      <Text type="headline" color="gray4" bold>
                        {formData!.whenToInvest}
                      </Text>
                      <Icon name="arrowright" color="gray4" width={21} />
                    </>
                  )}
                  <Text type="headline" color="gray6" bold>
                    {moment(
                      financialApplicationGetData.dados_para_aplicacao
                        .data_operacao
                    ).format('DD/MM/YYYY')}
                  </Text>
                </>,
              ]}
            />
          </SummaryContainer>
          {!moment(formData.whenToInvest, 'DD/MM/YYYY').isSame(
            moment(
              financialApplicationGetData.dados_para_aplicacao.data_operacao
            )
          ) && (
            <FlexTextWrapper>
              <Text bold color="gray6">
                Devido ao horário a data do investimento foi atualizada para o
                próximo dia útil.
              </Text>
            </FlexTextWrapper>
          )}
          <Divisor />
          <FlexTextWrapper>
            <Text bold color="gray5">
              Solicitações enviadas após às {limitHour}h serão processadas no
              próximo dia útil.
            </Text>
          </FlexTextWrapper>
        </ContentContainer>
      </CardStyled>
      {isMobile && <FixedBottom>{navigationButtons()}</FixedBottom>}
    </>
  )
}

export default SummaryFinancialContribution
