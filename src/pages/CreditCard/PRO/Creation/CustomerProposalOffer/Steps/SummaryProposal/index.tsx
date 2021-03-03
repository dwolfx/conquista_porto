import React, { useState, useEffect } from 'react'
import { Row, Col } from 'styled-bootstrap-grid'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Text from 'components/Text'
import Checkbox from 'components/Inputs/Checkbox'
import Button from 'components/Button'
import HorizontalList from 'components/HorizontalList'
import LogoConquistaBeta from 'assets/images/logoConquistaBeta.png'
import { GetCreditCardClientDataRequest } from 'store/modules/CreditCard/action'
import { GetCreditCardOccupationRequest } from 'store/modules/CreditCard/Occupation/action'
import { useToast } from 'hooks/toast'
import PersonalData from 'pages/CreditCard/common/components/PersonalData'
import CardData from 'pages/CreditCard/common/components/CardData'
import DeliveryData from 'pages/CreditCard/common/components/DeliveryData'
import {
  GetCreditCardExpirationDaysRequest,
  GetCreditCardExpirationDaysClearData,
} from 'store/modules/CreditCard/ExpirationDays/action'
import {
  ICreditCardProposalResponse,
  ICreditCardProposalRequest,
  IOrderResponse,
} from 'pages/CreditCard/Creation/types'

import SummaryProposalLoading from './Loading'
import SummaryProposalError from './Error'
import SummaryProposalResponse from './Response'
import {
  isFormValid,
  populateData,
  getSummaryProposal,
  handlePostSubmit,
} from './utils'

import * as S from './styles'
interface IRouteParams {
  redisKey: string
}
const SummaryProposalPRO = () => {
  const { redisKey } = useParams<IRouteParams>()
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
  const [redisProposalData, setRedisProposalData] = useState<
    ICreditCardProposalRequest | undefined
  >()

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
    if (!hasError && !redisProposalData && redisKey) {
      getSummaryProposal(
        redisKey,
        setIsLoading,
        setHasError,
        setRedisProposalData
      )
    }
  }, [redisProposalData, hasError, redisKey])

  useEffect(() => {
    if (redisProposalData && !isLoading) {
      populateData(redisProposalData, setProposalData, proposalData)
    }
    // eslint-disable-next-line
  }, [redisProposalData, isLoading])

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
          tokenLocker={redisKey}
          setIsLoading={setIsLoading}
          setRedisProposalData={setRedisProposalData}
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

    if (formResponse.NumeroProposta || submitErrorCount === 3) {
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
                <S.StyledCard>
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
                </S.StyledCard>
              </S.StyledCol>
            </Row>
          </S.GridContainer>
        </S.Wrapper>

        <S.Footer>
          <Button color="primary" outline>
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

export default SummaryProposalPRO
