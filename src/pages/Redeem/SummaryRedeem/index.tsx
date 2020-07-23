import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'
import Divisor from 'components/Divisor'
import HorizontalList from 'components/HorizontalList'
import ModalAccountInfo from '../components/ModalAccountInfo'
import Text from 'components/Text'
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
} from './styles'

interface ISummaryRedeem {
  step: number
  nextStep: () => void
  previousStep: () => void
  onChangeFundDetailOpen: (isOpen: boolean) => void
  idFundo: string
}

const SummaryRedeem = ({
  step,
  nextStep,
  previousStep,
  onChangeFundDetailOpen,
  idFundo,
}: ISummaryRedeem) => {
  const [isModalAccountInfoOpen, setIsModalAccountInfoOpen] = useState(false)
  const { bankData, investmentPosition, redeemData } = useSelector(
    (state: any) => ({
      bankData: state.bankData,
      investmentPosition: state.investmentPosition,
      redeemData: state.redeemData.data,
    })
  )

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
                {formatMoney(redeemData?.dados_para_aplicacao?.valor_bruto)}
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
                {formatMoney(redeemData?.dados_para_aplicacao?.valor_iof)}
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
                {formatMoney(redeemData?.dados_para_aplicacao?.valor_ir)}
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
              {formatMoney(redeemData?.dados_para_aplicacao?.valor_liquido)}
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
                {moment(
                  redeemData?.dados_para_resgate?.data_prevista_conversão
                ).format('DD/MM/YYYY')}
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
                {moment(
                  redeemData?.dados_para_resgate?.data_prevista_liquidacao
                ).format('DD/MM/YYYY')}
              </Text>,
            ]}
          />
        </DateWrapper>
      </SimulationWrapper>
      <Divisor />
      <WrapperAccountInfoLink>
        <Text type="body" color="gray5" bold>
          O valor resgatado será creditado na sua{' '}
          <AccountInfoLink onClick={() => setIsModalAccountInfoOpen(true)}>
            Conta de Investimento
          </AccountInfoLink>
        </Text>
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
        <CardFooter step={step} prevStep={previousStep} nextStep={nextStep} />
      }
      onChangeFundDetailOpen={() => onChangeFundDetailOpen(true)}
    />
  )
}

export default SummaryRedeem
