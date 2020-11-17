import React from 'react'
import { Col } from 'styled-bootstrap-grid'

import HorizontalList from 'components/HorizontalList'
import Text from 'components/Text'

import LogoConquistaBeta from 'assets/images/logoConquistaBeta.png'

import * as S from '../styles'
import { useDispatch, useSelector } from 'react-redux'
import { GetCreditCardClientDataRequest } from 'store/modules/CreditCard/action'
import { GetCreditCardExpirationDaysRequest } from 'store/modules/CreditCard/ExpirationDays/action'
import { GetCreditCardOccupationRequest } from 'store/modules/CreditCard/Occupation/action'
import { ICreditCardProposalRequest } from 'pages/CreditCard/Creation/types'
import { getSummaryProposal } from '../utils'

interface IProps {
  hasError: boolean
  setHasError: React.Dispatch<React.SetStateAction<boolean>>
  tokenLocker: string
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  setLockerProposalData: React.Dispatch<
    React.SetStateAction<ICreditCardProposalRequest | undefined>
  >
}

const SummaryProposalError = ({
  hasError,
  setHasError,
  tokenLocker,
  setIsLoading,
  setLockerProposalData,
}: IProps) => {
  const dispatch = useDispatch()

  const {
    hasClientDataError,
    hasCreditCardExpirationDaysError,
    hasCreditCardOccupationError,
  } = useSelector((state: any) => ({
    hasClientDataError: state.creditCard.hasClientDataError,
    hasCreditCardExpirationDaysError: state.creditCardExpirationDays.hasError,
    hasCreditCardOccupationError: state.creditCardOccupation.hasError,
  }))

  const handleTryAgain = () => {
    if (hasClientDataError) {
      dispatch(GetCreditCardClientDataRequest({}))
    }
    if (hasCreditCardExpirationDaysError) {
      dispatch(GetCreditCardExpirationDaysRequest())
    }
    if (hasCreditCardOccupationError) {
      dispatch(GetCreditCardOccupationRequest())
    }
    if (hasError) {
      getSummaryProposal(
        tokenLocker,
        setIsLoading,
        setHasError,
        setLockerProposalData
      )
    }
  }

  return (
    <>
      <S.Header>
        <S.HeaderGridContainer>
          <S.HaderGridRow>
            <S.HaderGridCol lg={12}>
              <S.HeaderContent>
                <S.LogoWrapper>
                  <img src={LogoConquistaBeta} alt="Logo Conquista Beta" />
                </S.LogoWrapper>
              </S.HeaderContent>
            </S.HaderGridCol>
          </S.HaderGridRow>
        </S.HeaderGridContainer>
      </S.Header>
      <S.SubHeader>
        <S.GridContainer>
          <S.GridRow>
            <S.GridCol lg={12}>
              <HorizontalList
                size="small"
                startItems={[
                  <Text color="gray4" type="headline">
                    Proposta
                  </Text>,
                  <Text color="white" type="headline">
                    Cartão de Crédito
                  </Text>,
                ]}
              />
            </S.GridCol>
          </S.GridRow>
        </S.GridContainer>
      </S.SubHeader>
      <S.FullHeightRow>
        <Col col={12}>
          <S.CenterContentCard>
            <Text color="magenta2" type="headline" textAlign="center">
              Desculpe, não foi possível carregar suas informações. Aguarde
              alguns instantes e tente novamente.
            </Text>
            <S.TryAgainButton
              color="primary"
              data-testid="proposal-summary-try-again-button"
              data-gtm-subname="botao tentar novamente proposta"
              data-gtm-name="botao tentar novamente"
              data-gtm-type="click"
              data-gtm-clicktype="button"
              onClick={() => handleTryAgain()}
            >
              TENTAR NOVAMENTE
            </S.TryAgainButton>
          </S.CenterContentCard>
        </Col>
      </S.FullHeightRow>
    </>
  )
}

export default SummaryProposalError
