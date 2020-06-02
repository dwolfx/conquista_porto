import React, { useState, useEffect } from 'react'
import 'styled-components/macro'
import { useSelector, useDispatch } from 'react-redux'

import useFetchBankData from 'hooks/BankData/useFetchBankData'

import { GetPositionDataRequest } from 'store/modules/Investment/Position/action'
import { GetBankDataRequest } from 'store/modules/BankData/action'

import Text from 'components/Text'
import Button from 'components/Button'
import MoneyInput from 'components/Inputs/Money'
import DateInput from 'components/Inputs/DateInput'

import { formatMoneyDecimal, formatMoney } from 'helpers'
import useMedia from 'hooks/useMedia'

import {
  isPastDate,
  isToday,
  isTodayAndBefore15pm,
  isInvalidDate,
  formatMoneyToNumber,
} from './utils'

import { IFormData } from 'pages/Investments/FinancialApplication'

import {
  CardStyled,
  BalanceInfoContainer,
  VerticalListStyled,
  InputsContainer,
  InputContainer,
  DivisorStyled,
  LoadingSpinner,
  IconRetry,
  CardFooter,
} from './styles'

interface IProps {
  formData: IFormData
  formDataCopy: IFormData
  nextStep: () => void
  onChangeFormData: (formData: IFormData) => void
  onFormHasChanged: (formChanged: boolean) => void
  idFundo?: string
}

const FormFinancialContribution: React.FC<IProps> = ({
  formData,
  formDataCopy,
  nextStep,
  onChangeFormData,
  onFormHasChanged,
  idFundo,
}) => {
  useFetchBankData()
  const dispatch = useDispatch()
  const isTabletOrSmaller = useMedia('md')

  const { bankData, investmentPosition, auth } = useSelector((state: any) => ({
    bankData: state.bankData,
    investmentPosition: state.investmentPosition,
    auth: state.auth,
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
    isPastDate(formData!.whenToInvest) ||
    (isToday(formData!.whenToInvest) &&
      !isTodayAndBefore15pm(formData!.whenToInvest))

  const isMoneyLessThanAllowed = () => {
    if (formDataCopy && formData) {
      return (
        formatMoneyToNumber(formData.moneyToInvest) <
        formatMoneyToNumber(formDataCopy.moneyToInvest)
      )
    }
    return false
  }

  if (formData) {
    return (
      <>
        <CardStyled
          footer={
            <CardFooter>
              <Button
                color="secondary"
                onClick={nextStep}
                disabled={isDateInvalid() || isMoneyLessThanAllowed()}
              >
                Próximo
              </Button>
            </CardFooter>
          }
        >
          <BalanceInfoContainer>{renderBaseAccountInfo()}</BalanceInfoContainer>
          <DivisorStyled margin="21px 0 21px 0" />
          <InputsContainer>
            <InputContainer sm={6}>
              <Text type="headline" color="gray6">
                Quanto você quer investir?
              </Text>
              <MoneyInput
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
                    message: `O valor não pode ser menor do que ${formatMoneyDecimal(
                      Number(
                        formDataCopy!.moneyToInvest
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
                  onChangeFormData({
                    ...formData,
                    whenToInvest: target.value,
                  })
                }}
                value={formData.whenToInvest}
                error={
                  isDateInvalid() && {
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
          <DivisorStyled margin="35px 0 21px 0" />
          <Text
            bold
            color="gray5"
            css={`
              margin-bottom: ${({ theme }: any) => `${theme.spacing(2)}px`};
            `}
          >
            Solicitações enviadas após às 15h serão processadas no próximo dia
            útil.
          </Text>
        </CardStyled>
      </>
    )
  }
  return null
}

export default FormFinancialContribution
