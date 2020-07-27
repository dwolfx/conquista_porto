import React, { useState, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import 'styled-components/macro'
import { ThemeContext } from 'styled-components/macro'
import { Row } from 'styled-bootstrap-grid'
import moment from 'moment'

import Text from 'components/Text'
import Divisor from 'components/Divisor'
import ButtonTag from 'components/Button/Tag'
import MoneyInput from 'components/Inputs/Money'
import useFetchBankData from 'hooks/BankData/useFetchBankData'
import { useToast } from 'hooks/toast'
import useMedia from 'hooks/useMedia'
import { formatMoneyToNumber } from 'pages/Investments/FinancialApplication/FormFinancialContribution/utils'
import { GetRedeemSummaryRequest } from 'store/modules/Investment/Redeem/SummaryRedeem/action'
import { formatMoney, formatNumber, formatMoneyDecimal } from 'helpers'

import BaseAccountInfo from '../components/BaseAccountInfo'
import BaseFormStep from '../components/BaseFormStep'
import CardFooter from '../components/CardFooter'
import { IFormData } from '..'

import {
  RedeemFormContainer,
  BalanceInfoContainer,
  ButtonsBallanceWrapper,
  SimulationWrapper,
  CalculationWrapper,
  InformationsWrapper,
  ButtonStyled,
  CalculationOverlay,
  InputWrapper,
  HorizontalListStyled,
} from './styles'

interface IBallanceRedeem {
  formData: IFormData
  onChangeFormData: (form: IFormData) => void
  step: number
  onChangeFundDetailOpen: (isOpen: boolean) => void
  nextStep: () => void
  previousStep: () => void
  idFundo: string
  resetValue: () => void
}
const BallanceRedeem = ({
  formData,
  onChangeFormData,
  step,
  nextStep,
  previousStep,
  onChangeFundDetailOpen,
  idFundo,
  resetValue,
}: IBallanceRedeem) => {
  useFetchBankData()

  type TButtonOption = 'manter' | 'tudo' | null

  const [redeemOptionButton, setRedeemOptionButton] = useState<TButtonOption>(
    null
  )
  const dispatch = useDispatch()
  const isMobile = useMedia('xs')
  const themeContext = useContext(ThemeContext)
  const { addToast } = useToast()
  const {
    bankData,
    investmentPosition,
    redeemData,
    redeemSummaryData,
    isRedeemSummaryLoading,
  } = useSelector((state: any) => ({
    bankData: state.bankData,
    investmentPosition: state.investmentPosition,
    redeemData: state.redeemData.data,
    isRedeemSummaryLoading: state.redeemSummaryData.isLoading,
    redeemSummaryData: state.redeemSummaryData.data,
  }))

  const calcMinimalBallance = () => {
    if (redeemData) {
      const minFundBallance = Number(
        redeemData.dados_para_resgate.fundo.saldo_minimo
      )
      const currentBallance = Number(
        redeemData.dados_para_resgate.posicao_cotista_fundo.saldo_atual
      )
      return formatMoney(currentBallance - minFundBallance, { style: 'decimal' })
    }
    return formatNumber('0')
  }

  const isMoneyLessThanAllowed = () => {
    if (formData && redeemData) {
      return (
        formatMoneyToNumber(formData.moneyToRedeem) >
        Number(redeemData.dados_para_resgate.posicao_cotista_fundo.saldo_atual)
      )
    }
    return false
  }

  const handleRedeemSummaryRequest = () => {
    dispatch(GetRedeemSummaryRequest({
      id_fundo: redeemData.dados_para_resgate.fundo.id_carteira,
      data_operacao: moment(new Date()).format('YYYY-MM-DD'),
      valor: formatMoneyToNumber(
        formData.moneyToRedeem
      ).toString(),
      onErrorToast: addToast,
    }))
  }

  const cardBody = () => (
    <>
      <BalanceInfoContainer>
        <BaseAccountInfo
          idFundo={idFundo}
          isLoading={bankData.isLoading || investmentPosition.isLoading}
          hasError={investmentPosition.hasError || bankData.hasError}
        />
      </BalanceInfoContainer>
      <Divisor />
      <Row>
        <RedeemFormContainer sm={8} md={7} xs={12}>
          <Text type="headline" bold color="gray5">
            Quanto você quer resgatar?
          </Text>
          <ButtonsBallanceWrapper>
            <ButtonTag
              color={redeemOptionButton === 'tudo' ? 'primary' : ''}
              onClick={() => {
                if (redeemOptionButton === 'tudo') {
                  setRedeemOptionButton(null)
                  return resetValue()
                }
                setRedeemOptionButton('tudo')
                onChangeFormData({
                  ...formData,
                  moneyToRedeem: formatMoney(
                    redeemData.dados_para_resgate.posicao_cotista_fundo
                      .saldo_atual, { style: 'decimal' }
                  ),
                })
              }}
            >
              tudo
            </ButtonTag>
            <ButtonTag
              color={redeemOptionButton === 'manter' ? 'primary' : ''}
              onClick={() => {
                if (redeemOptionButton === 'manter') {
                  setRedeemOptionButton(null)
                  return resetValue()
                }
                setRedeemOptionButton('manter')
                onChangeFormData({
                  ...formData,
                  moneyToRedeem: calcMinimalBallance(),
                })
              }}
              css={`
                margin-left: ${themeContext.spacing(1)}px;
              `}
            >
              manter saldo mínimo
            </ButtonTag>
          </ButtonsBallanceWrapper>
          <InputWrapper>
            <MoneyInput
              data-testid="financial-application-money-input"
              data-gtm-form="input"
              data-gtm-name="quanto investir"
              value={formData.moneyToRedeem}
              placeholder="1000,00"
              onChange={({ target }: any) => {
                onChangeFormData({
                  ...formData,
                  moneyToRedeem: target.value,
                })
              }}
              error={
                isMoneyLessThanAllowed() && {
                  icon: 'alertrounded',
                  message: `O valor não pode ser menor do que ${formatMoneyDecimal(
                    Number(
                      redeemData!.dados_para_resgate.posicao_cotista_fundo.saldo_atual
                        .toString()
                        .replace(/\D/g, '')
                    )
                  )}`,
                }
              }
            />
            <ButtonStyled
              data-gtm-subname="simulacao de resgate"
              data-gtm-type="click"
              data-gtm-clicktype="button"
              data-gtm-name="simular"
              color="primary"
              loading={isRedeemSummaryLoading}
              loadingColor="blue4"
              disabled={
                isMoneyLessThanAllowed() || formData.moneyToRedeem === '' || isRedeemSummaryLoading
              }
              onClick={handleRedeemSummaryRequest}
            >
              simular
            </ButtonStyled>
          </InputWrapper>
        </RedeemFormContainer>
      </Row>
      <Divisor />
      <SimulationWrapper>
        <Text type="headline" bold color="gray5">
          Simulação
        </Text>
        <CalculationWrapper>
          <CalculationOverlay isOpen={isRedeemSummaryLoading}>
            {isRedeemSummaryLoading && (
              <Text type="headline" bold color="gray5">
                Carregando...
              </Text>
            )}
          </CalculationOverlay>
          <div
            css={`
              padding: ${themeContext.spacing(2)}px;
            `}
          >
            <HorizontalListStyled
              startItems={[
                <Text
                  type={isMobile ? 'body' : 'headline'}
                  bold={isMobile}
                  color="gray5"
                >
                  Valor Bruto do Resgate
                </Text>,
              ]}
              endItems={[
                <Text
                  type={isMobile ? 'body' : 'headline'}
                  bold={isMobile}
                  color="gray6"
                >
                  {(redeemSummaryData &&
                    redeemSummaryData.dados_para_aplicacao &&
                    formatMoney(
                      redeemSummaryData.dados_para_aplicacao.valor_bruto
                    )) ||
                    formatMoney(0)}
                </Text>,
              ]}
            />
            <HorizontalListStyled
              startItems={[
                <Text
                  type={isMobile ? 'body' : 'headline'}
                  bold={isMobile}
                  color="gray5"
                >
                  IOF*
                </Text>,
              ]}
              endItems={[
                <Text
                  type={isMobile ? 'body' : 'headline'}
                  bold={isMobile}
                  color="gray6"
                >
                  {(redeemSummaryData &&
                    redeemSummaryData.dados_para_aplicacao &&
                    formatMoney(
                      redeemSummaryData.dados_para_aplicacao.valor_iof
                    )) ||
                    formatMoney(0)}
                </Text>,
              ]}
            />
            <HorizontalListStyled
              startItems={[
                <Text
                  type={isMobile ? 'body' : 'headline'}
                  bold={isMobile}
                  color="gray5"
                >
                  IR*
                </Text>,
              ]}
              endItems={[
                <Text
                  type={isMobile ? 'body' : 'headline'}
                  bold={isMobile}
                  color="gray6"
                >
                  {(redeemSummaryData &&
                    redeemSummaryData.dados_para_aplicacao &&
                    formatMoney(
                      redeemSummaryData.dados_para_aplicacao.valor_ir
                    )) ||
                    formatMoney(0)}
                </Text>,
              ]}
            />
          </div>
        </CalculationWrapper>
        <HorizontalListStyled
          css={`
            padding: 0 ${themeContext.spacing(4)}px !important;
          `}
          startItems={[
            <Text
              type={isMobile ? 'body' : 'headline'}
              bold={isMobile}
              color="gray5"
            >
              Valor líquido do resgate
            </Text>,
          ]}
          endItems={[
            <Text
              type={isMobile ? 'body' : 'headline'}
              bold={isMobile}
              color="gray6"
            >
              {(redeemSummaryData &&
                redeemSummaryData.dados_para_aplicacao &&
                formatMoney(
                  redeemSummaryData.dados_para_aplicacao.valor_liquido
                )) ||
                formatMoney(0)}
            </Text>,
          ]}
        />
      </SimulationWrapper>
      <Divisor />
      <InformationsWrapper>
        <Text
          type="body"
          bold
          color={isMobile ? 'gray5' : 'gray6'}
          css={`
            margin-bottom: ${themeContext.spacing(2)}px;
          `}
        >
          O valor será creditado na sua conta de investimento.
        </Text>
        <Text type="body" bold color={isMobile ? 'gray5' : 'gray6'}>
          O valor final de uma solicitação de resgate pode mudar, para mais ou
          para menos, dependendo da variação do valor das cotas que você possuir
          no momento da efetivação.
        </Text>
      </InformationsWrapper>
    </>
  )

  return (
    <BaseFormStep
      cardBody={cardBody()}
      cardFooter={
        <CardFooter
          step={step}
          prevStep={previousStep}
          nextStep={() => {
            if (!redeemSummaryData) {
              handleRedeemSummaryRequest()
            }
            nextStep()
          }}
          isNextDisabled={
            isMoneyLessThanAllowed() || formData.moneyToRedeem === ''
          }
          isNextLoading={isRedeemSummaryLoading}
        />
      }
      onChangeFundDetailOpen={() => onChangeFundDetailOpen(true)}
    />
  )
}

export default BallanceRedeem
