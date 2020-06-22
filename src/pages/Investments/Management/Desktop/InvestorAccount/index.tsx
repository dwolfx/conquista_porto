import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import 'styled-components/macro'
import { useHistory } from 'react-router-dom'

import ButtonLink from 'components/Button/Link'
import Divisor from 'components/Divisor'
import { formatMoney, handleGiwRedirect } from 'helpers'
import useFetchBankData from 'hooks/BankData/useFetchBankData'
import { GetSuitabilityInfoAndValidate } from 'store/modules/SuitabilityInfo/action'
import { GetBankDataRequest } from 'store/modules/BankData/action'
import { useToast } from 'hooks/toast'
import { IModalProps } from 'pages/Investments/Management/Desktop'

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
  IconRetry,
} from './styles'

interface IProps {
  onChangeModalSuitabilityInfo: (data: IModalProps) => void
}

interface IValidProps {
  isValid: boolean
}

enum InvestorAccountInfo {
  INFO_TOTAL_BALANCE = 'info-total-ballance',
  INFO_SETTLE_BALANCE = 'info-settle-ballance',
}

const InvestorAccount = ({ onChangeModalSuitabilityInfo }: IProps) => {
  useFetchBankData()
  const history = useHistory()
  const dispatch = useDispatch()
  const { addToast } = useToast()
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
    id: InvestorAccountInfo
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
      InvestorAccountInfo.INFO_TOTAL_BALANCE === id
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

  const handleClickWithdrawButton = () => {
    const onSuccess = (modalProps: IModalProps | IValidProps) => {
      onChangeModalSuitabilityInfo({ ...modalProps } as IModalProps)
      if ((modalProps as IValidProps).isValid) {
        handleGiwRedirect('portaldecliente/conquista/retirada?r=true')
      }
    }
    dispatch(GetSuitabilityInfoAndValidate(onSuccess, 'retirar', addToast))
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
                      InvestorAccountInfo.INFO_TOTAL_BALANCE
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
          {Number(
            bankData.DadosContaPortoSeguro &&
              bankData.DadosContaPortoSeguro.saldo_disponivel
          ) > 0 && (
            <ButtonBlock
              outline
              color="primary"
              data-testid="button-draw"
              onClick={handleClickWithdrawButton}
            >
              retirar
            </ButtonBlock>
          )}
          {renderExtractLink('saldo')}
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
                      InvestorAccountInfo.INFO_SETTLE_BALANCE
                    )}
                  </>,
                ]}
              />,
            ]}
          />
          {renderExtractLink('retirar')}
        </InfoContainer>
      </>
    )
  }

  return <CardStyled>{renderBody()}</CardStyled>
}

export default InvestorAccount
