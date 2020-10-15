import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import 'styled-components/macro'

import ButtonLink from 'components/Button/Link'
import WithdrawButton from 'components/Button/WithdrawButton'
import Divisor from 'components/Divisor'
import { formatMoney, formatLocaleStringToNumber } from 'helpers'
import useMedia from 'hooks/useMedia'
import useFetchBankData from 'hooks/BankData/useFetchBankData'
import { GetBankDataRequest } from 'store/modules/BankData/action'
import { OpenAccountExtractLayer } from 'store/modules/BankExtract/action'

import { InvestorAccountInfoEnum } from '../../types'

import {
  CardStyled,
  TextCaption,
  TextHeadline,
  TextError,
  InfoContainer,
  LoadingStyled,
  CustomVerticalList,
  CustomHorizontalList,
  ButtonBlock,
  ButtonsWrapper,
  IconRetry,
} from './styles'

const InvestorAccount = () => {
  useFetchBankData()
  const isTablet = useMedia('lg')
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

  const renderExtractLink = (id: string) => (
    <ButtonLink
      noIcon
      data-testid={`link-investor-extract-${id}`}
      data-gtm-subname="conta de investimentos"
      data-gtm-name="ver extrato"
      data-gtm-type="click"
      data-gtm-clicktype="link"
      onClick={() => {
        history.push('/investimentos/extrato')
      }}
    >
      ver extrato &gt;
    </ButtonLink>
  )

  const renderBody = () => {
    if (isLoading) {
      return (
        <InfoContainer>
          <LoadingStyled
            data-testid="loading-account-info"
            type="bar"
            legend="Aguarde, estamos buscando suas informações..."
          />
        </InfoContainer>
      )
    }
    return (
      <>
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
                    data-testid="button-ballance-retry"
                    onClick={() => dispatch(GetBankDataRequest(auth.cpf))}
                  />
                ) : null}
              </>,
            ]}
          />
          <ButtonsWrapper>
            {isTablet && (
              <ButtonBlock
                outline
                color="primary"
                onClick={() => dispatch(OpenAccountExtractLayer())}
                disabled={
                  !formatLocaleStringToNumber(
                    bankData?.DadosContaPortoSeguro?.saldo_disponivel || '0'
                  )
                }
              >
                ver extrato
              </ButtonBlock>
            )}
            <WithdrawButton
              gtmSubname="investimentos gerenciar"
              css={`width: 100%;`}
            />
          </ButtonsWrapper>
          {!isTablet && 
            <ButtonLink
              noIcon
              data-testid={`link-investor-extract`}
              data-gtm-subname="conta de investimentos"
              data-gtm-name="ver extrato"
              data-gtm-type="click"
              data-gtm-clicktype="link"
              css={`margin-top: 14px;`}
              onClick={() => dispatch(OpenAccountExtractLayer())}
            >
              ver extrato &gt;
            </ButtonLink>
          }              

        </InfoContainer>
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
          {!isTablet ? (
            renderExtractLink('retirar')
          ) : (
            <ButtonBlock
              outline
              color="primary"
              onClick={() => {
                history.push('/investimentos/extrato')
              }}
            >
              ver extrato
            </ButtonBlock>
          )}
        </InfoContainer>
      </>
    )
  }

  return <CardStyled>{renderBody()}</CardStyled>
}

export default InvestorAccount
