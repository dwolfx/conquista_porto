import React from 'react'
import { useSelector } from 'react-redux'
import Divisor from 'components/Divisor'
import HorizontalList from 'components/HorizontalList'
import Text from 'components/Text'
import BaseAccountInfo from '../components/BaseAccountInfo'
import BaseFormStep from '../components/BaseFormStep'
import CardFooter from '../components/CardFooter'

import {
  BalanceInfoContainer,
  SimulationWrapper,
  CalculationWrapper,
  DateWrapper,
  WrapperExternalLink,
  ExternalLink,
} from './styles'

interface IResumeRedeem {
  step: number
  setStep: (step: number) => void
  onChangeFundDetailOpen: (isOpen: boolean) => void
  idFundo: string
}

const ResumeRedeem = ({
  step,
  setStep,
  onChangeFundDetailOpen,
  idFundo,
}: IResumeRedeem) => {
  const { bankData, investmentPosition } = useSelector((state: any) => ({
    bankData: state.bankData,
    investmentPosition: state.investmentPosition,
  }))

  const nextStep = () => {
    setStep(step + 1)
  }
  const prevStep = () => {
    setStep(step - 1)
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
      <SimulationWrapper>
        <Text type="headline" bold color="gray5">
          Resumo da solicitação
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
      <SimulationWrapper>
        <Text type="headline" bold color="gray5">
          Estimativa de datas
        </Text>
        <DateWrapper>
          <HorizontalList
            startItems={[
              <Text type="headline" color="gray5">
                Cotização
              </Text>,
            ]}
            endItems={[
              <Text type="headline" color="gray6">
                20/01/2020
              </Text>,
            ]}
          />
          <HorizontalList
            startItems={[
              <Text type="headline" color="gray5">
                Liquidação
              </Text>,
            ]}
            endItems={[
              <Text type="headline" color="gray6">
                20/01/2020
              </Text>,
            ]}
          />
        </DateWrapper>
      </SimulationWrapper>
      <Divisor />
      <WrapperExternalLink>
        <Text type="body" color="gray5" bold>
          O valor resgatado será creditado na sua{' '}
          <ExternalLink href="/" target="_blank" rel="noopener noreferrer">
            Conta de Investimento
          </ExternalLink>
          .
        </Text>
      </WrapperExternalLink>
    </>
  )

  return (
    <BaseFormStep
      cardBody={cardBody()}
      cardFooter={
        <CardFooter step={step} prevStep={prevStep} nextStep={nextStep} />
      }
      onChangeFundDetailOpen={() => onChangeFundDetailOpen(true)}
    />
  )
}

export default ResumeRedeem
