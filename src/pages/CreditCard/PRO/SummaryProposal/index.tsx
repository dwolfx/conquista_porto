import React, { useState, useEffect } from 'react'
import { Row, Col } from 'styled-bootstrap-grid'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import {
  isFormValid,
  populateData,
  getSummaryProposal,
  handlePostSubmit,
} from './utils'

import Text from 'components/Text'
import Checkbox from 'components/Inputs/Checkbox'
import Button from 'components/Button'
import HorizontalList from 'components/HorizontalList'

import PersonalData from '../../Creation/SummaryStep/PersonalData'
import CardData from '../../Creation/SummaryStep/CardData'
import DeliveryData from '../../Creation/SummaryStep/DeliveryData'
import { StyledCard } from '../../Creation/SummaryStep/CardData/styles'

import {
  ICreditCardProposalResponse,
  ICreditCardProposalRequest,
  IOrderResponse,
} from 'pages/CreditCard/Creation/types'

import * as S from './styles'
import LogoConquistaBeta from 'assets/images/logoConquistaBeta.png'

import { GetCreditCardClientDataRequest } from 'store/modules/CreditCard/action'
import {
  GetCreditCardExpirationDaysRequest,
  GetCreditCardExpirationDaysClearData,
} from 'store/modules/CreditCard/ExpirationDays/action'

import { GetCreditCardOccupationRequest } from 'store/modules/CreditCard/Occupation/action'
import SummaryProposalLoading from './Loading'
import SummaryProposalError from './Error'
import { useToast } from 'hooks/toast'
import SummaryProposalResponse from './Response'
interface IRouteParams {
  tokenLocker: string
}

const SummaryProposal = () => {
  const [isChecked, setChecked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isButtonLoading, setIsButtonLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [formResponse, setFormResponse] = useState<IOrderResponse>({})
  const [submitErrorCount, setSubmitErrorCount] = useState(0)
  const dispatch = useDispatch()
  const { addToast } = useToast()

  const [proposalData, setProposalData] = useState<ICreditCardProposalResponse>(
    {}
  )
  const [lockerProposalData, setLockerProposalData] = useState<
    ICreditCardProposalRequest | undefined
  >()

  const { tokenLocker } = useParams<IRouteParams>()
  const {
    isClientDataLoading,
    hasClientDataError,
    isCreditCardExpirationDaysLoading,
    hasCreditCardExpirationDaysError,
    isCreditCardOccupationLoading,
    hasCreditCardOccupationError,
  } = useSelector((state: any) => ({
    isClientDataLoading: state.creditCard.isClientDataLoading,
    hasClientDataError: state.creditCard.hasClientDataError,
    isCreditCardExpirationDaysLoading: state.creditCardExpirationDays.isLoading,
    hasCreditCardExpirationDaysError: state.creditCardExpirationDays.hasError,
    isCreditCardOccupationLoading: state.creditCardOccupation.isLoading,
    hasCreditCardOccupationError: state.creditCardOccupation.hasError,
  }))

  useEffect(() => {
    dispatch(GetCreditCardExpirationDaysRequest())
    dispatch(GetCreditCardOccupationRequest())
    dispatch(GetCreditCardClientDataRequest({}))
    return () => {
      dispatch(GetCreditCardExpirationDaysClearData())
    }
  }, [dispatch])

  useEffect(() => {
    if (!hasError && !lockerProposalData && tokenLocker) {
      getSummaryProposal(
        tokenLocker,
        setIsLoading,
        setHasError,
        setLockerProposalData
      )
    }
  }, [lockerProposalData, hasError, tokenLocker])

  useEffect(() => {
    if (lockerProposalData && !isLoading) {
      populateData(lockerProposalData, setProposalData)
    }
  }, [lockerProposalData, isLoading])

  const getContent = () => {
    if (
      hasClientDataError ||
      hasCreditCardExpirationDaysError ||
      hasCreditCardOccupationError ||
      hasError
    ) {
      return (
        <SummaryProposalError
          hasError={hasError}
          setHasError={setHasError}
          tokenLocker={tokenLocker}
          setIsLoading={setIsLoading}
          setLockerProposalData={setLockerProposalData}
        />
      )
    }
    if (
      isClientDataLoading ||
      isCreditCardExpirationDaysLoading ||
      isCreditCardOccupationLoading ||
      isLoading
    ) {
      return <SummaryProposalLoading />
    }

    if (formResponse.numeroProposta || submitErrorCount === 3) {
      return (
        <SummaryProposalResponse
          formData={proposalData}
          formOrderResponse={formResponse}
          hasError={submitErrorCount === 3}
        />
      )
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

        <S.Wrapper>
          <S.GridContainer>
            <Row>
              <Col lg={3} md={3} sm={12}>
                <S.StickyContent>
                  <S.StyledVerticalList
                    elements={[
                      <S.ProposalTitle bold type="heading4" color="gray6">
                        Proposta de cartão especial para você!
                      </S.ProposalTitle>,
                      <Text bold type="body" color="gray5">
                        Se precisar tirar dúvidas fale com o seu parceiro ou
                        através de nossos canais de atendimento.
                      </Text>,
                    ]}
                  />
                </S.StickyContent>
              </Col>
              <S.StyledCol lg={8} md={9} sm={12}>
                <PersonalData
                  formData={proposalData}
                  setFormData={setProposalData}
                />
                <CardData
                  formData={proposalData}
                  setFormData={setProposalData}
                />
                <DeliveryData
                  formData={proposalData}
                  setFormData={setProposalData}
                />
                <StyledCard>
                  <S.CheckboxWrapper>
                    <Checkbox
                      data-testid="credit-card-check"
                      id="credit-card-check"
                      checked={isChecked}
                      onChange={() => setChecked(!isChecked)}
                      label={
                        <S.StyledText bold type="body" color="gray6">
                          Concordo com a solicitação do Cartão de Crédito Porto
                          Seguro e com as condições do contrato, que será
                          enviado com o cartão.
                        </S.StyledText>
                      }
                    />
                  </S.CheckboxWrapper>
                </StyledCard>
              </S.StyledCol>
            </Row>
          </S.GridContainer>
        </S.Wrapper>

        <S.Footer>
          <Button color="primary" outline={true}>
            Rejeitar proposta
          </Button>
          <S.Tooltip
            content={() => (
              <S.TooltipText type="body" color="gray5">
                Há campos vazios ou com erros. Por favor, verifique e tente
                novamente.
              </S.TooltipText>
            )}
            turnOff={isFormValid(proposalData, isChecked)}
            placement="top"
          >
            <S.AcceptButton
              color="secondary"
              disabled={!isFormValid(proposalData, isChecked)}
              loading={isButtonLoading}
              data-testid="proposal-summary-accept-button"
              data-gtm-subname="botao aceitar proposta"
              data-gtm-name="botao aceitar"
              data-gtm-type="click"
              data-gtm-clicktype="button"
              onClick={() =>
                handlePostSubmit(
                  proposalData,
                  setFormResponse,
                  setSubmitErrorCount,
                  submitErrorCount,
                  addToast,
                  setIsButtonLoading
                )
              }
            >
              Concluir contratação
            </S.AcceptButton>
          </S.Tooltip>
        </S.Footer>
      </>
    )
  }
  return getContent()
}

export default SummaryProposal
