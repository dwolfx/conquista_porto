import React from 'react'
import PropTypes from 'prop-types'
import 'styled-components/macro'
import { useSelector, useDispatch } from 'react-redux'

import useFetchBankData from 'hooks/BankData/useFetchBankData'
import useInvestmentPosition from 'hooks/Investments/useFetchPosition'

import { GetPositionDataRequest } from 'store/modules/Investment/Position/action'
import { GetBankDataRequest } from 'store/modules/BankData/action'

import Text from 'components/Text'
import Button from 'components/Button'
import MoneyInput from 'components/Inputs/Money'
import DateInput from 'components/Inputs/DateInput'

import { formatMoney } from 'helpers'

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

const FormFinancialContribution = ({
  formData,
  nextStep,
  onChangeFormData,
  idFundo,
}) => {
  useFetchBankData()
  useInvestmentPosition()

  const dispatch = useDispatch()

  const { bankData, investmentPosition, auth } = useSelector(state => ({
    bankData: state.bankData,
    investmentPosition: state.investmentPosition,
    auth: state.auth,
  }))

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
              dispatch(GetPositionDataRequest(auth.cpf))
              dispatch(GetBankDataRequest(auth.cpf))
            }}
          />
        </>
      )
    }

    const chosenInvestmentFund = () =>
      investmentPosition.data.length !== 0 &&
      investmentPosition.data[0].posicoes.posicao.find(
        posicao => posicao.fundo.id_carteira === idFundo
      )

    const fund = chosenInvestmentFund()

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
        <VerticalListStyled
          elements={[
            <Text type="captionUppercase" color="gray4" bold>
              fundo
            </Text>,
            <Text type="headline" color="gray6" bold>
              {formatMoney(
                investmentPosition.data.length === 0 ? 0 : fund.saldo_atual
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

  return (
    <CardStyled
      footer={
        <CardFooter>
          <Button
            color="secondary"
            onClick={() => {
              // TODO Talvez entre algum código aqui para validar o próximo step
              nextStep()
            }}
          >
            Próximo
          </Button>
        </CardFooter>
      }
    >
      <BalanceInfoContainer>{renderBaseAccountInfo()}</BalanceInfoContainer>
      <DivisorStyled margin="21px 0 21px 0" />
      <InputsContainer>
        <InputContainer>
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
            css={`
              margin-top: 7px;
            `}
          />
        </InputContainer>
        <InputContainer>
          <Text type="headline" color="gray6">
            Quando você deseja investir?
          </Text>
          <DateInput
            newInput
            data-gtm-form="input"
            data-gtm-name="quando investir"
            value={formData.whenToInvest}
            onChange={({ target }) => {
              onChangeFormData({
                ...formData,
                whenToInvest: target.value,
              })
            }}
            css={`
              margin-top: 7px;
            `}
          />
        </InputContainer>
      </InputsContainer>
      <DivisorStyled margin="28px 0 21px 0" />
      <Text bold color="gray5">
        Solicitações enviadas após às 15h serão processadas no próximo dia útil.
      </Text>
    </CardStyled>
  )
}

FormFinancialContribution.defaultProps = {
  idFundo: null,
}

FormFinancialContribution.propTypes = {
  formData: PropTypes.object.isRequired,
  nextStep: PropTypes.func.isRequired,
  onChangeFormData: PropTypes.func.isRequired,
  idFundo: PropTypes.string,
}

export default FormFinancialContribution
