import React, { useEffect, useState } from 'react'
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

interface IProps {
  hasCheckbox: boolean
  formData: IFormData
  formDataCopy: IFormData
  nextStep: () => void
  onChangeFormData: (formData: IFormData) => void
  onFormHasChanged: (formChanged: boolean) => void
  idFundo: string
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
  operationDate: string
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
  operationDate,
}: IProps) => {
  useFetchBankData()
  const dispatch = useDispatch()
  const { addToast } = useToast()
  const isTabletOrSmaller = useMedia('md')
  const isMobile = useMedia('xs')

  const [showError, setShowError] = useState(false)

  const financialData = financialApplication.dados_para_aplicacao
  const { limitHour, link } = {
    limitHour: financialData.fundo.hora_aplicacao,
    link: financialData.fundo.link_termo_adesao,
  }

  const {
    bankData,
    investmentPosition,
    auth,
    financialApplicationLoading,
    financialApplicationData,
    alignmentTermsLoading,
  } = useSelector((state: any) => ({
    bankData: state.bankData,
    investmentPosition: state.investmentPosition,
    auth: state.auth,
    financialApplicationLoading: state.financialApplicationGetData.isLoading,
    financialApplicationData: state.financialApplicationGetData.data,
    alignmentTermsLoading: state.alignmentTerms.isLoading,
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
    if (bankData.isLoading || investmentPosition.isLoading) {
      return (
        <>
          <Text type="headline" color="gray5">
            Buscando informações de saldo...
          </Text>
          <LoadingSpinner />
        </>
      )
    }

    if (investmentPosition.hasError || bankData.hasError) {
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

    const chosenInvestmentFund = () =>
      investmentPosition.data &&
      investmentPosition.data.length !== 0 &&
      investmentPosition.data[0].posicoes.posicao.find(
        (posicao: any) => posicao.fundo.id_carteira === idFundo
      )

    const fund: any = chosenInvestmentFund()
    let saldoAtual = ''
    if (fund) {
      saldoAtual = fund.saldo_atual
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
                bankData.data.DadosContaPortoSeguro &&
                  bankData.data.DadosContaPortoSeguro.saldo_disponivel
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
                  investmentPosition.data &&
                    investmentPosition.data.length === 0
                    ? 0
                    : saldoAtual
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
    isPastDate(
      formData!.whenToInvest,
      financialApplication.dados_para_aplicacao.data_operacao
    )

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
            nextStep()
          },
          onErrorToast: addToast,
        })
      )
    } else {
      nextStep()
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
        investmentPosition.isLoading ||
        investmentPosition.hasError ||
        financialApplicationLoading ||
        nextButtonLoading ||
        alignmentTermsLoading
      }
      loading={
        financialApplicationLoading ||
        nextButtonLoading ||
        alignmentTermsLoading
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
                onChange={({ target }) => {
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
