import React, { useState } from 'react'
import useMedia from 'hooks/useMedia'
import { useSelector, useDispatch } from 'react-redux'
import { Row } from 'styled-bootstrap-grid'
import 'styled-components/macro'

import Text from 'components/Text'
import Divisor from 'components/Divisor'
import ButtonTag from 'components/Button/Tag'
import MoneyInput from 'components/Inputs/Money'
import useFetchBankData from 'hooks/BankData/useFetchBankData'

import BaseAccountInfo from '../components/BaseAccountInfo'

import {
  ButtonStyled,
  ButtonsStepWrapper,
  CardStyled,
  RedeemFormContainer,
  BalanceInfoContainer,
  ButtonsBallanceWrapper,
  SimulationWrapper,
  CalculationWrapper,
  InformationsWrapper,
  FixedBottom,
} from './styles'
import HorizontalList from 'components/HorizontalList'
import useFetchSuitabilityInfo from 'hooks/Suitability/useSuitabilityInfo'

interface IFormData {
  moneyToRedeem: string
}
const FORM_DATA_INTIAL_STATE = {
  moneyToRedeem: '',
}

interface IBallanceRedeem {
  step: number
  onChangeFundDetailOpen: (isOpen: boolean) => void
  nextStep: () => void
  previousStep: () => void
  idFundo: string
}
const BallanceRedeem = ({
  step,
  nextStep,
  previousStep,
  onChangeFundDetailOpen,
  idFundo,
}: IBallanceRedeem) => {
  useFetchBankData()
  useFetchSuitabilityInfo()
  const dispatch = useDispatch()
  const isTabletOrSmaller = useMedia('md')
  const isMobile = useMedia('xs')

  const [formData, setFormData] = useState<IFormData>(FORM_DATA_INTIAL_STATE)
  const { bankData, investmentPosition } = useSelector((state: any) => ({
    bankData: state.bankData,
    investmentPosition: state.investmentPosition,
  }))

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
        <RedeemFormContainer sm={8} md={5} xs={12}>
          <Text type="headline" bold color="gray5">
            Quanto você quer resgatar?
          </Text>
          <ButtonsBallanceWrapper>
            <ButtonTag color="primary" onClick={() => console.log('tudo')}>
              tudo
            </ButtonTag>
            <ButtonTag
              color=""
              onClick={() => console.log('manter')}
              css={`
                margin-left: 7px;
              `}
            >
              manter saldo mínimo
            </ButtonTag>
          </ButtonsBallanceWrapper>
          <MoneyInput
            data-testid="financial-application-money-input"
            data-gtm-form="input"
            data-gtm-name="quanto investir"
            value={formData.moneyToRedeem}
            placeholder="1000,00"
            onChange={({ target }) => {
              setFormData({
                moneyToRedeem: target.value,
              })
            }}
          />
        </RedeemFormContainer>
      </Row>
      <Divisor />
      <SimulationWrapper>
        <Text type="headline" bold color="gray5">
          Simulação
        </Text>
        <CalculationWrapper>
          <HorizontalList
            startItems={[
              <Text type="headline" color="gray5">
                Valor Bruto do Resgate
              </Text>,
            ]}
            endItems={[
              <Text type="headline" color="gray6">
                R$ 9.875,00
              </Text>,
            ]}
          />
          <HorizontalList
            startItems={[
              <Text type="headline" color="gray5">
                IOF*
              </Text>,
            ]}
            endItems={[
              <Text type="headline" color="gray6">
                R$ 197,50
              </Text>,
            ]}
          />
          <HorizontalList
            startItems={[
              <Text type="headline" color="gray5">
                IR*
              </Text>,
            ]}
            endItems={[
              <Text type="headline" color="gray6">
                R$ 1.481,25
              </Text>,
            ]}
          />
        </CalculationWrapper>
        <HorizontalList
          css={`
            padding: 0 28px;
          `}
          startItems={[
            <Text type="headline" color="gray5">
              Valor líquido do resgate
            </Text>,
          ]}
          endItems={[
            <Text type="headline" color="gray6">
              R$ 8.196,25
            </Text>,
          ]}
        />
      </SimulationWrapper>
      <Divisor />
      <InformationsWrapper>
        <Text
          type="body"
          bold
          color="gray6"
          css={`
            margin-bottom: 14px;
          `}
        >
          O valor será creditado na sua conta de investimento.
        </Text>
        <Text type="body" bold color="gray6">
          O valor final de uma solicitação de resgate pode mudar, para mais ou
          para menos, dependendo da variação do valor das cotas que você possuir
          no momento da efetivação.
        </Text>
      </InformationsWrapper>
    </>
  )

  const cardFooter = () => (
    <ButtonsStepWrapper>
      {step > 1 && (
        <ButtonStyled
          data-gtm-subname="card de retirada"
          data-gtm-type="click"
          data-gtm-clicktype="button"
          data-gtm-name="voltar"
          outline
          onClick={previousStep}
          disabled={false}
        >
          Voltar
        </ButtonStyled>
      )}
      <ButtonStyled
        data-gtm-subname="card de retirada"
        data-gtm-type="click"
        data-gtm-clicktype="button"
        data-gtm-name="proximo"
        color="secondary"
        onClick={nextStep}
      >
        Próximo
      </ButtonStyled>
    </ButtonsStepWrapper>
  )

  return isMobile ? (
    <>
      <CardStyled
        headerIconInfo
        headerIconInfoClick={() => onChangeFundDetailOpen(true)}
        headerTitle="Informações"
      >
        {cardBody()}
      </CardStyled>
      <FixedBottom>{cardFooter()}</FixedBottom>
    </>
  ) : (
    <CardStyled footer={cardFooter()}>{cardBody()}</CardStyled>
  )
}

export default BallanceRedeem
