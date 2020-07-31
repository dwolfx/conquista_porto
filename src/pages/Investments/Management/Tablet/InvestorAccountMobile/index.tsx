import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import 'styled-components/macro'

import theme from 'styles/theme'
import WithdrawButton from 'components/Button/WithdrawButton'
import Divisor from 'components/Divisor'

import useFetchBankData from 'hooks/BankData/useFetchBankData'
import { GetBankDataRequest } from 'store/modules/BankData/action'
import { formatMoney, formatLocaleStringToNumber } from 'helpers'

import { InvestorAccountInfoEnum } from '../../types'

import {
  ButtonsWrapper,
  ButtonBlock,
  CardAccordion,
  CardStyled,
  CustomHorizontalList,
  CustomVerticalList,
  IconRetry,
  LoadingStyled,
  InfoContainer,
  TextHeadline,
  TextCaption,
  TextError,
} from './styles'

const InvestorAccountMobile = () => {
  useFetchBankData()
  const dispatch = useDispatch()
  const history = useHistory()

  const {
    bankData,
    auth,
    isLoading,
    hasError,
    displayInformation,
  } = useSelector<any, any>(state => ({
    bankData: state.bankData.data,
    auth: state.auth,
    isLoading: state.bankData.isLoading,
    hasError: state.bankData.hasError,
    displayInformation: state.investmentPosition.displayInformation,
  }))

  const [withdrawLoading, setWithdrawLoading] = useState(false)

  const renderBallanceInfo = (
    bankDataPayload: any,
    id: InvestorAccountInfoEnum
  ) => {
    if (hasError) {
      return (
        <TextError data-testid={`${id}-error-message`}>
          FALHA AO CARREGAR
        </TextError>
      )
    }
    const { DadosContaPortoSeguro } = bankDataPayload
    const value =
      InvestorAccountInfoEnum.INFO_TOTAL_BALANCE === id
        ? DadosContaPortoSeguro.saldo_disponivel
        : DadosContaPortoSeguro.saldo_liquidar
    return (
      <TextHeadline
        data-testid={id}
        css={`
          -webkit-text-security: ${displayInformation ? 'disc' : 'none'};
        `}
      >
        {formatMoney(value)}
      </TextHeadline>
    )
  }

  const BallanceAccountContent = () => {
    return (
      <InfoContainer>
        <CustomHorizontalList
          startItems={[
            <CustomVerticalList
              elements={[
                <TextCaption>SALDO EM CONTA</TextCaption>,
                <>
                  {renderBallanceInfo(
                    bankData,
                    InvestorAccountInfoEnum.INFO_TOTAL_BALANCE
                  )}
                </>,
              ]}
            />,
          ]}
          endItems={[
            <>
              {hasError ? (
                <IconRetry
                  data-gtm-subname="botao tentar novamente"
                  data-gtm-type="click"
                  data-gtm-button="button"
                  data-testid="button-ballance-retry"
                  onClick={() => dispatch(GetBankDataRequest(auth.cpf))}
                />
              ) : null}
            </>,
          ]}
        />
        <ButtonsWrapper>
          <ButtonBlock
            outline
            data-gtm-subname="botao link extrato conta"
            data-gtm-type="click"
            data-gtm-button="button"
            color="primary"
            onClick={() => {
              history.push('/investimentos/extrato')
            }}
            disabled={
              !formatLocaleStringToNumber(
                bankData?.DadosContaPortoSeguro?.saldo_disponivel || '0'
              )
            }
          >
            ver extrato
          </ButtonBlock>
          <WithdrawButton
            gtmSubname="investimentos gerenciar"
            css={`
              width: 100%;
            `}
            loading={withdrawLoading}
            onClickSetLoading={setWithdrawLoading}
          />
        </ButtonsWrapper>
      </InfoContainer>
    )
  }

  const renderBody = () => {
    if (isLoading) {
      return (
        <CardStyled>
          <InfoContainer>
            <LoadingStyled
              data-testid="loading-account-info"
              type="bar"
              legend="Aguarde, estamos buscando suas informações..."
            />
          </InfoContainer>
        </CardStyled>
      )
    }

    return (
      <CardAccordion
        titleNode={<BallanceAccountContent />}
        triggerCloseOnArrow
        bodyPadding={`0 0 ${theme.spacing(2)}px`}
        openByDefault={false}
      >
        <Divisor />
        <InfoContainer>
          <CustomHorizontalList
            startItems={[
              <CustomVerticalList
                elements={[
                  <TextCaption>VALORES A LIQUIDAR</TextCaption>,
                  <>
                    {renderBallanceInfo(
                      bankData,
                      InvestorAccountInfoEnum.INFO_SETTLE_BALANCE
                    )}
                  </>,
                ]}
              />,
            ]}
          />
          {Number(
            bankData &&
              bankData.DadosContaPortoSeguro &&
              bankData.DadosContaPortoSeguro.saldo_liquidar
          ) > 0 && (
            <ButtonBlock
              outline
              data-gtm-subname="botao link extrato a liquidar"
              data-gtm-type="click"
              data-gtm-button="button"
              color="primary"
              onClick={() => {
                history.push('/investimentos/extrato')
              }}
            >
              ver extrato
            </ButtonBlock>
          )}
        </InfoContainer>
      </CardAccordion>
    )
  }

  return renderBody()
}

export default InvestorAccountMobile
