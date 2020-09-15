import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'
import Divisor from 'components/Divisor'
import ModalAccountInfo from '../components/ModalAccountInfo'
import Text from 'components/Text'
import useMedia from 'hooks/useMedia'
import BaseAccountInfo from '../components/BaseAccountInfo'
import BaseFormStep from '../components/BaseFormStep'
import CardFooter from '../components/CardFooter'
import { formatMoney } from 'helpers'
import {
  BalanceInfoContainer,
  SimulationWrapper,
  CalculationWrapper,
  DateWrapper,
  WrapperAccountInfoLink,
  AccountInfoLink,
  HorizontalListStyled,
  SimulationDateWrapper,
  LiquidValueWrapper,
  WrapperButtonInvestorAccount,
  ButtonInvestorAccount,
} from './styles'

interface ISummaryRedeem {
  step: number
  nextStep: () => void
  previousStep: () => void
  onChangeFundDetailOpen: (isOpen: boolean) => void
  idFundo: number
}

const SummaryRedeem = ({
  step,
  nextStep,
  previousStep,
  onChangeFundDetailOpen,
  idFundo,
}: ISummaryRedeem) => {
  const [isModalAccountInfoOpen, setIsModalAccountInfoOpen] = useState(false)
  const {
    bankData,
    investmentPosition,
    redeemSummaryData,
    is2FARequestLoadingInfo,
    isToken2faLoading,
    isVirtualKeyboardLoading,
  } = useSelector((state: any) => ({
    bankData: state.bankData,
    investmentPosition: state.investmentPosition,
    redeemSummaryData: state.redeemSummaryData.data,
    is2FARequestLoadingInfo: state.token2fa.isLoadingGetInfo,
    isToken2faLoading: state.token2fa.isLoadingGetInfo,
    isVirtualKeyboardLoading: state.virtualKeyboard.isLoading,
  }))
  const isMobile = useMedia('sm')

  const isNextLoading =
    is2FARequestLoadingInfo || isToken2faLoading || isVirtualKeyboardLoading

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
      <SimulationWrapper>
        <Text type="headline" bold color="gray5">
          Resumo da solicitação
        </Text>
        <CalculationWrapper>
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
                {formatMoney(
                  redeemSummaryData?.dados_para_aplicacao?.valor_bruto
                )}
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
                {formatMoney(
                  redeemSummaryData?.dados_para_aplicacao?.valor_iof
                )}
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
                {formatMoney(redeemSummaryData?.dados_para_aplicacao?.valor_ir)}
              </Text>,
            ]}
          />
        </CalculationWrapper>
        <LiquidValueWrapper>
          <HorizontalListStyled
            css={`
              padding: 0 28px !important;
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
                {formatMoney(
                  redeemSummaryData?.dados_para_aplicacao?.valor_liquido
                )}
              </Text>,
            ]}
          />
        </LiquidValueWrapper>
      </SimulationWrapper>
      <Divisor />
      <SimulationDateWrapper>
        <Text type="headline" bold color="gray5">
          Estimativa de datas
        </Text>
        <DateWrapper>
          <HorizontalListStyled
            startItems={[
              <Text
                type={isMobile ? 'body' : 'headline'}
                bold={isMobile}
                color="gray5"
              >
                Cotização
              </Text>,
            ]}
            endItems={[
              <Text
                type={isMobile ? 'body' : 'headline'}
                bold={isMobile}
                color="gray6"
              >
                {moment(
                  redeemSummaryData?.dados_para_resgate?.data_prevista_conversão
                ).format('DD/MM/YYYY')}
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
                Liquidação
              </Text>,
            ]}
            endItems={[
              <Text
                type={isMobile ? 'body' : 'headline'}
                bold={isMobile}
                color="gray6"
              >
                {moment(
                  redeemSummaryData?.dados_para_resgate
                    ?.data_prevista_liquidacao
                ).format('DD/MM/YYYY')}
              </Text>,
            ]}
          />
        </DateWrapper>
      </SimulationDateWrapper>
      <Divisor />
      <WrapperAccountInfoLink>
        {isMobile ? (
          <>
            <Text type="body" color="gray5" bold>
              O valor resgatado será creditado na sua Conta de Investimento.
            </Text>
            <WrapperButtonInvestorAccount>
              <ButtonInvestorAccount
                data-gtm-subname="resgate de fundo"
                data-gtm-name="conta de investimento"
                data-gtm-type="click"
                data-gtm-clicktype="button"
                outline
                color="primary"
                onClick={() => setIsModalAccountInfoOpen(true)}
              >
                sobre a conta de investimento
              </ButtonInvestorAccount>
            </WrapperButtonInvestorAccount>
          </>
        ) : (
          <Text type="body" color="gray5" bold>
            O valor resgatado será creditado na sua{' '}
            <AccountInfoLink onClick={() => setIsModalAccountInfoOpen(true)}>
              Conta de Investimento
            </AccountInfoLink>
          </Text>
        )}
      </WrapperAccountInfoLink>
      <ModalAccountInfo
        isOpen={isModalAccountInfoOpen}
        onChangeModalOpen={() => setIsModalAccountInfoOpen(false)}
        bankData={bankData?.data}
      />
    </>
  )

  return (
    <BaseFormStep
      cardBody={cardBody()}
      cardFooter={
        <CardFooter
          step={step}
          prevStep={previousStep}
          nextStep={nextStep}
          isNextDisabled={isNextLoading}
          isNextLoading={isNextLoading}
        />
      }
      onChangeFundDetailOpen={() => onChangeFundDetailOpen(true)}
    />
  )
}

export default SummaryRedeem
