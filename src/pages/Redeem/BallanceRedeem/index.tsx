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
import { GetBankDataRequest } from 'store/modules/BankData/action'
import { GetPositionDataRequest } from 'store/modules/Investment/Position/action'
import { formatMoney } from 'helpers'

import {
  ButtonStyled,
  ButtonsStepWrapper,
  CardStyled,
  IconRetry,
  LoadingSpinner,
  RedeemFormContainer,
  VerticalListStyled,
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
const BallanceRedeem = ({ step, nextStep, previousStep, onChangeFundDetailOpen, idFundo }: IBallanceRedeem) => {
  useFetchBankData()
  useFetchSuitabilityInfo()
  const dispatch = useDispatch()
  const isTabletOrSmaller = useMedia('md')
  const isMobile = useMedia('xs')

  const [formData, setFormData] = useState<IFormData>(FORM_DATA_INTIAL_STATE)
  const { bankData, investmentPosition, auth } = useSelector((state: any) => ({
    bankData: state.bankData,
    investmentPosition: state.investmentPosition,
    auth: state.auth,
  }))

  const renderBaseAccountInfo = (idFundo: string) => {
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
      </>
    )
  }

  const dispatchPositionData = () => {
    if (!isTabletOrSmaller) {
      dispatch(GetPositionDataRequest(auth.cpf))
    }
  }

  const cardBody = () => (
    <>
      <BalanceInfoContainer>
        {renderBaseAccountInfo(idFundo)}
      </BalanceInfoContainer>
      <Divisor />
      <Row>
        <RedeemFormContainer sm={8} md={5} xs={12}>
          <Text type="headline" bold color="gray5">
            Quanto você quer resgatar?
          </Text>
          <ButtonsBallanceWrapper>
            <ButtonTag color="primary" onClick={() => console.log('tudo')}>tudo</ButtonTag>
            <ButtonTag
              color=""
              onClick={() => console.log('manter')}
              css={`
                margin-left: 7px;
              `}
              >manter saldo mínimo</ButtonTag>
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
              </Text>
            ]}
            endItems={[
              <Text type="headline" color="gray6">
                R$ 9.875,00
              </Text>
            ]}
          />
          <HorizontalList 
            startItems={[
              <Text type="headline" color="gray5">
                IOF*
              </Text>
            ]}
            endItems={[
              <Text type="headline" color="gray6">
                R$ 197,50
              </Text>
            ]}
          />
          <HorizontalList 
            startItems={[
              <Text type="headline" color="gray5">
                IR*
              </Text>
            ]}
            endItems={[
              <Text type="headline" color="gray6">
                R$ 1.481,25
              </Text>
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
            </Text>
          ]}
          endItems={[
            <Text type="headline" color="gray6">
              R$ 8.196,25
            </Text>
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
          O valor final de uma solicitação de resgate pode mudar, para mais ou para menos, dependendo da variação do valor das cotas que você possuir no momento da efetivação.
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
    <CardStyled footer={cardFooter()}>
      {cardBody()}
    </CardStyled>
  )
}

export default BallanceRedeem