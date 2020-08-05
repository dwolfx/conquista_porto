import React, { useEffect, useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import 'styled-components/macro'

import useFetchBankData from 'hooks/BankData/useFetchBankData'
import { GetPositionDataRequest } from 'store/modules/Investment/Position/action'
import { GetBankDataRequest } from 'store/modules/BankData/action'

import Text from 'components/Text'
import Divisor from 'components/Divisor'
import MoneyInput from 'components/Inputs/Money'
import DateInput from 'components/Inputs/DateInput'
import Checkbox from 'components/Inputs/Checkbox'

import { formatMoneyDecimal, formatMoney } from 'helpers'
import useMedia from 'hooks/useMedia'
import { useToast } from 'hooks/toast'

import { FlexTextWrapper } from 'pages/Investments/FinancialApplication/styles'
import { IFormData } from 'pages/Investments/FinancialApplication'

import { baseURLNamespaceInvestAws, get } from 'services/api'
import { GetFinancialApplicationDataRequest } from 'store/modules/Investment/FinancialApplication/action'

import { isPastDate, isInvalidDate, formatMoneyToNumber } from './utils'
import {
  Button,
  CardStyled,
  CheckboxContainer,
  BalanceInfoContainer,
  VerticalListStyled,
  InputsContainer,
  InputContainer,
  DivisorStyled,
  ExternalLink,
  LoadingSpinner,
  IconRetry,
  CardFooter,
  FixedBottom,
} from './styles'
import { IFund } from 'store/modules/Investment/Position/iPositions'

interface IProps {
  hasCheckbox: boolean
  formData: IFormData
  formDataCopy: IFormData
  nextStep: () => void
  onChangeFormData: (formData: IFormData) => void
  onFormHasChanged: (formChanged: boolean) => void
  idFundo: number
  financialApplication: {
    dados_para_aplicacao: {
      fundo: {
        hora_aplicacao: string
        link_termo_adesao: string
      }
      data_operacao: string
    }
  }
  nextButtonLoading: boolean
}

const FormFinancialContribution = ({
  hasCheckbox,
  formData,
  formDataCopy,
  nextStep,
  onChangeFormData,
  onFormHasChanged,
  idFundo,
  financialApplication,
  nextButtonLoading,
}: IProps) => {
  useFetchBankData()
  const dispatch = useDispatch()
  const { addToast } = useToast()
  const isTabletOrSmaller = useMedia('md')
  const isMobile = useMedia('xs')

  const [showError, setShowError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const financialData = financialApplication.dados_para_aplicacao
  const { limitHour, link } = {
    limitHour: financialData.fundo.hora_aplicacao,
    link: financialData.fundo.link_termo_adesao,
  }

  const {
    bankData,
    auth,
    financialApplicationHasError,
    financialApplicationLoading,
    financialApplicationData,
    alignmentTermsLoading,
    suitabilityInfoData,
    investmentPosition,
  } = useSelector((state: any) => ({
    bankData: state.bankData,
    auth: state.auth,
    financialApplicationHasError: state.financialApplicationGetData.hasError,
    financialApplicationLoading: state.financialApplicationGetData.isLoading,
    financialApplicationData: state.financialApplicationGetData.data,
    alignmentTermsLoading: state.alignmentTerms.isLoading,
    suitabilityInfoData: state.suitabilityInfo.data,
    investmentPosition: state.investmentPosition,
  }))

  useEffect(() => {
    if (formData && formDataCopy) {
      if (JSON.stringify(formDataCopy) !== JSON.stringify(formData)) {
        onFormHasChanged(true)
      }
    }
  }, [formData, onFormHasChanged, formDataCopy])

  const dispatchPositionData = () => {
    if (!isTabletOrSmaller) {
      dispatch(GetPositionDataRequest(auth.cpf))
    }
  }

  const renderBaseAccountInfo = () => {
    if (bankData.isLoading || financialApplicationLoading) {
      return (
        <>
          <Text type="headline" color="gray5">
            Buscando informações de saldo...
          </Text>
          <LoadingSpinner />
        </>
      )
    }

    if (financialApplicationHasError || bankData.hasError) {
      return (
        <>
          <Text type="headline" color="magenta2">
            Não foi possível carregar o saldo. Por favor, tente novamente.
          </Text>
          <IconRetry
            onClick={() => {
              dispatch(GetBankDataRequest(auth.cpf))
              dispatchPositionData()
            }}
          />
        </>
      )
    }

    const chosenInvestmentFund = (): IFund =>
      investmentPosition.data &&
      investmentPosition.data.fundos.find(
        (posicao: any) => posicao.id_carteira === idFundo
      )

    const fund = chosenInvestmentFund()
    let saldoAtual = ''
    if (fund) {
      saldoAtual = fund.saldoLiquido
    }

    return (
      <>
        <VerticalListStyled
          elements={[
            <Text type="captionUppercase" color="gray4" bold>
              conta de investimento
            </Text>,
            <Text type="headline" color="gray6" bold>
              {formatMoney(
                financialApplicationData.dados_para_aplicacao.saldo_conta
              )}
            </Text>,
            <Text type="caption" color="gray5" bold>
              Saldo em conta
            </Text>,
          ]}
        />
        {!isTabletOrSmaller && (
          <VerticalListStyled
            elements={[
              <Text type="captionUppercase" color="gray4" bold>
                fundo
              </Text>,
              <Text type="headline" color="gray6" bold>
                {formatMoney(
                  financialApplicationData.dados_para_aplicacao
                    ?.posicao_cotista_fundo?.saldo_atual
                    ? financialApplicationData.dados_para_aplicacao
                        ?.posicao_cotista_fundo.saldo_atual
                    : 0
                )}
              </Text>,
              <Text type="caption" color="gray5" bold>
                Saldo e rendimento bruto
              </Text>,
            ]}
          />
        )}
      </>
    )
  }

  const isDateInvalid = () =>
    isInvalidDate(formData!.whenToInvest) ||
    isPastDate(formData!.whenToInvest, moment())

  const isMoneyLessThanAllowed = () => {
    if (!hasCheckbox) {
      return (
        formatMoneyToNumber(formData.moneyToInvest) <
        +financialApplicationData.dados_para_aplicacao.fundo.aplicacao_minima
      )
    }

    if (hasCheckbox && formDataCopy && formData) {
      return (
        formatMoneyToNumber(formData.moneyToInvest) <
        formatMoneyToNumber(formDataCopy.moneyToInvest)
      )
    }

    return false
  }

  const handleGetIsAwareOfTerms = useCallback(async () => {
    setIsLoading(true)

    await get(
      `${baseURLNamespaceInvestAws}/cotista/aplicacoes/resumo?id_fundo=${idFundo}&id_cotista=${
        suitabilityInfoData.id_cotista
      }&cpf_cnpj=${auth.cpf}&data_operacao=${moment(
        formData.whenToInvest,
        'DD/MM/YYYY'
      ).format('YYYY-MM-DD')}&valor=${formatMoneyToNumber(
        formData.moneyToInvest
      )}&aceite_termo_adesao=true`
    )
      .then(() => nextStep())
      .catch(() =>
        addToast({
          type: 'error',
          description: 'Por favor, tente novamente.',
          title: 'Erro ao enviar solicitação.',
        })
      )
      .finally(() => setIsLoading(false))
  }, [suitabilityInfoData, idFundo, auth, formData, addToast, nextStep])

  const handleClickButtonNext = () => {
    if (
      !moment(formData.whenToInvest, 'DD/MM/YYYY').isSame(
        moment(financialApplication.dados_para_aplicacao.data_operacao)
      )
    ) {
      dispatch(
        GetFinancialApplicationDataRequest({
          data: {
            id_fundo: idFundo,
            data_operacao: moment(formData.whenToInvest, 'DD/MM/YYYY').format(
              'YYYY-MM-DD'
            ),
          },
          onSuccess: () => {
            setShowError(false)
            handleGetIsAwareOfTerms()
          },
          onErrorToast: addToast,
        })
      )
    } else {
      handleGetIsAwareOfTerms()
    }
  }

  const buttonNext = () => (
    <Button
      color="secondary"
      onClick={handleClickButtonNext}
      disabled={
        (isDateInvalid() && showError) ||
        isMoneyLessThanAllowed() ||
        !formData.isAwareOfTerms ||
        bankData.isLoading ||
        bankData.hasError ||
        financialApplicationLoading ||
        financialApplicationHasError ||
        financialApplicationLoading ||
        nextButtonLoading ||
        alignmentTermsLoading
      }
      loading={
        financialApplicationLoading ||
        nextButtonLoading ||
        alignmentTermsLoading ||
        isLoading
      }
      loadingColor="white"
      isMobile={isMobile}
    >
      Próximo
    </Button>
  )

  if (formData) {
    return (
      <>
        <CardStyled
          footer={!isMobile && <CardFooter>{buttonNext()}</CardFooter>}
        >
          <BalanceInfoContainer>{renderBaseAccountInfo()}</BalanceInfoContainer>
          <DivisorStyled margin="21px 0 21px 0" />
          <InputsContainer>
            <InputContainer sm={6}>
              <Text type="headline" color="gray6">
                Quanto você quer investir?
              </Text>
              <MoneyInput
                data-testid="financial-application-money-input"
                data-gtm-form="input"
                data-gtm-name="quanto investir"
                value={formData.moneyToInvest}
                onChange={({ target }: React.ChangeEvent<HTMLInputElement>) => {
                  onChangeFormData({
                    ...formData,
                    moneyToInvest: target.value,
                  })
                }}
                error={
                  isMoneyLessThanAllowed() && {
                    icon: 'alertrounded',
                    message: hasCheckbox
                      ? `O valor não pode ser menor do que ${formatMoneyDecimal(
                          Number(
                            formDataCopy!.moneyToInvest
                              .toString()
                              .replace(/\D/g, '')
                          )
                        )}`
                      : `O valor não pode ser menor do que ${formatMoneyDecimal(
                          Number(
                            financialApplicationData.dados_para_aplicacao.fundo.aplicacao_minima
                              .toString()
                              .replace(/\D/g, '')
                          )
                        )}`,
                  }
                }
                css={`
                  margin-top: 7px;
                `}
              />
            </InputContainer>
            <InputContainer sm={6}>
              <Text type="headline" color="gray6">
                Quando você deseja investir?
              </Text>
              <DateInput
                newInput
                data-gtm-form="input"
                data-gtm-name="quando investir"
                onChange={({ target }: any) => {
                  setShowError(true)
                  onChangeFormData({
                    ...formData,
                    whenToInvest: target.value,
                  })
                }}
                value={formData.whenToInvest}
                error={
                  isDateInvalid() &&
                  showError && {
                    icon: 'alertrounded',
                    message: 'Digite uma data válida',
                  }
                }
                css={`
                  margin-top: 7px;
                `}
              />
            </InputContainer>
          </InputsContainer>
          <Divisor />
          <FlexTextWrapper>
            <Text bold color="gray5">
              Solicitações enviadas após às {limitHour}h serão processadas no
              próximo dia útil.
            </Text>
          </FlexTextWrapper>
          <Divisor />
          {hasCheckbox && (
            <CheckboxContainer>
              <Checkbox
                label={
                  <Text type="body" color="gray5" bold>
                    Confirmo que li e concordo com todas as informações contidas
                    no{' '}
                    <ExternalLink
                      href={link}
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
          )}
        </CardStyled>
        {isMobile && <FixedBottom>{buttonNext()}</FixedBottom>}
      </>
    )
  }
  return null
}

export default FormFinancialContribution
