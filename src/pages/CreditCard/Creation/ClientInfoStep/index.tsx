import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { uuid } from 'uuidv4'
import moment from 'moment'

import Loading from 'components/Loading'
import Button from 'components/Button'
import VerticalList from 'components/VerticalList'
import LoadingState from 'pages/CreditCard/common/components/FullScreenLoadingState'
import NoOffersState from 'pages/CreditCard/common/components/NoOffersState'
import { GetCreditCardClientDataRequest } from 'store/modules/CreditCard/action'
import { GetCreditCardOfferRequest } from 'store/modules/CreditCard/Offers/action'
import { useToast } from 'hooks/toast'
import useMedia from 'hooks/useMedia'
import { formatCpf, handleGiwRedirect, truncateString } from 'helpers'
import {
  ICreditCardOffer,
  OFFER_CODE,
} from 'store/modules/CreditCard/Offers/types'
import {
  ICreditCardCreationPayload,
  IStepComponent,
} from 'pages/CreditCard/Creation/types'

import { GridContainer, WhiteContent } from '../styles'
import { brazilianStates } from '../../common/Selects/BrazilianStates/types'

import * as s from './styles'
import * as t from './types'

const FirstStep = ({
  onNextStep,
  ...rest
}: Pick<IStepComponent, 'onNextStep'>) => {
  const dispatch = useDispatch()
  const { addToast } = useToast()
  const isMobile = useMedia('xs')
  const [hasNoOffers, setHasNoOffers] = useState(false)
  const [brazilianStateOption, setBrazilianStateOption] = useState('')
  const [customerData, setCustomerData] = useState<t.TCustomerData | undefined>(
    undefined
  )

  const {
    creditCardClient,
    creditCardOffers,
    isLoadingCreditCardOffers,
    isClientDataLoading,
    hasClientDataError,
  } = useSelector((state: any) => ({
    creditCardClient: state.creditCard.clientData,
    creditCardOffers: state.creditCardOffer.data,
    isLoadingCreditCardOffers: state.creditCardOffer.isLoading,
    isClientDataLoading: state.creditCard.isClientDataLoading,
    hasClientDataError: state.creditCard.hasClientDataError,
  }))

  useEffect(() => {
    if (!creditCardClient) {
      dispatch(GetCreditCardClientDataRequest({ addToast }))
    }
  }, [dispatch, creditCardClient, addToast, creditCardOffers])

  useEffect(() => {
    if (creditCardClient?.estado) {
      const stateIsValid = brazilianStates.find(
        state => state === creditCardClient.estado
      )
      setBrazilianStateOption(stateIsValid ? creditCardClient.estado : '')
    }
  }, [creditCardClient])

  useEffect(() => {
    if (creditCardClient) {
      const phoneNumber =
        String(creditCardClient.numeroTelefone).length === 9
          ? String(creditCardClient.numeroTelefone).replace(
              /(\d{1})(\d{4})(\d{4})/,
              '$1 $2-$3'
            )
          : String(creditCardClient.numeroTelefone).replace(
              /(\d{4})(\d{4})/,
              '$1-$2'
            )

      setCustomerData({
        email: creditCardClient.emailCliente,
        numeroDocumentoIdentificacao: formatCpf(creditCardClient.cpfCnpj),
        dataNascimento: moment(creditCardClient.dataNascimento).format(
          'DD/MM/YYYY'
        ),
        numeroTelefone: `(${creditCardClient.dddNumeroTelefone}) ${phoneNumber}`,
      })
    }
  }, [creditCardClient])

  const onSuccess = (data: ICreditCardOffer) => {
    let stepAnswers: ICreditCardCreationPayload = {}
    if (data.CodigoOferta === OFFER_CODE.NO_FLAGS_AVAILABLE) {
      setHasNoOffers(true)
    } else {
      stepAnswers = {
        cep: creditCardClient.cep,
        codigoEstadoCivil: creditCardClient.codigoEstadoCivil?.toString() || '',
        codigoCanal: '14',
        dataEmissaoDocumento: creditCardClient.dataExpedicao
          ? moment(creditCardClient.dataExpedicao).format('DD/MM/YYYY')
          : '',
        dataNascimento: creditCardClient.dataNascimento
          ? moment(creditCardClient.dataNascimento).format('DD/MM/YYYY')
          : '',
        dddTelefone: creditCardClient.dddNumeroTelefone?.toString() || '',
        email: creditCardClient.emailCliente,
        idSimulacao: data.IdSimulacao,
        nome: creditCardClient.nomeCliente,
        nomeMae: creditCardClient.nomeMae,
        numeroDocumentoIdentificacao:
          creditCardClient.numeroDocumento?.toString() || '',
        numeroTelefone: creditCardClient.numeroTelefone?.toString() || '',
        orgaoExpedidor: creditCardClient.orgaoEmissor,
        sexo: creditCardClient.sexo,
        tipoDocumento: creditCardClient.tipoDocumento,
        uf: creditCardClient.estado,
      }
      onNextStep(stepAnswers)
    }
  }

  const FirstStepErrorState = () => (
    <s.ErrorWrapper>
      <s.ErrorText>
        Desculpe, não foi possível carregar suas informações. Aguarde alguns
        instantes e tente novamente.
      </s.ErrorText>

      <Button
        data-gtm-subname="primeira etapa - cartão de crédito"
        data-gtm-name="tentar novamente"
        data-gtm-type="click"
        data-gtm-clicktype="button"
        color="primary"
        onClick={() => dispatch(GetCreditCardClientDataRequest({ addToast }))}
      >
        tentar novamente
      </Button>
    </s.ErrorWrapper>
  )

  const renderContent = () => {
    if (hasClientDataError) {
      return <FirstStepErrorState />
    }

    if (isClientDataLoading) {
      return (
        <s.LoadingWrapper>
          <Loading
            type="bar"
            legend="Aguarde, estamos buscando suas informações..."
            textAlign="center"
          />
        </s.LoadingWrapper>
      )
    }

    return (
      <>
        <s.Title>Confirme as informações abaixo</s.Title>
        {customerData &&
          Object.entries(customerData).map(([key, value], index) => (
            <React.Fragment key={uuid()}>
              <VerticalList
                elements={[
                  <s.Label>{t.EInputsLabel[key as t.TEnumKeys]}</s.Label>,
                  <s.Value>{isMobile ? truncateString(value, 25) : value}</s.Value>,
                ]}
              />
              {index === 3 ? null : <s.Divisor />}
            </React.Fragment>
          ))}
        <s.Button
          outline
          data-gtm-type="click"
          data-gtm-clicktype="button"
          data-gtm-subname={'primeira etapa - cartão de crédito'}
          data-gtm-name="alterar no perfil"
          onClick={() => {
            handleGiwRedirect('portaldecliente/conquista/perfil?r=true')
          }}
        >
          ALTERAR NO PERFIL
        </s.Button>
        <s.StyledSelectBrazilianStates
          selectedOption={brazilianStateOption}
          setSelectedOption={setBrazilianStateOption}
          label="ESTADO ONDE RESIDE"
          optionBoxDirection="top"
        />
        <s.Button
          data-gtm-type="click"
          data-gtm-clicktype="button"
          data-gtm-subname={'primeira etapa - cartão de crédito'}
          data-gtm-name="confirmar"
          disabled={!brazilianStateOption}
          onClick={() => {
            if (creditCardClient) {
              dispatch(
                GetCreditCardOfferRequest({
                  onSuccess,
                  nome: creditCardClient.nomeCliente.replace(' ', ''),
                  dataNasc: moment(creditCardClient.dataNascimento).format(
                    'DD/MM/YYYY'
                  ),
                  uf: brazilianStateOption,
                  addToast,
                })
              )
            }
          }}
        >
          CONFIRMAR
        </s.Button>
        <s.Divisor />
        <s.FooterText>
          Não se preocupe, a solicitação só será enviada após informarmos o
          cartão disponível para você.
        </s.FooterText>
      </>
    )
  }

  return (
    <>
      {isLoadingCreditCardOffers && (
        <GridContainer>
          <LoadingState />
        </GridContainer>
      )}

      {hasNoOffers && (
        <GridContainer>
          <NoOffersState />
        </GridContainer>
      )}

      {!isLoadingCreditCardOffers && !hasNoOffers && (
        <WhiteContent>
          <GridContainer>
            <s.GridRow {...rest}>
              <s.GridCol lg={4} md={6} sm={7} xs={12}>
                <s.InfoContainer>{renderContent()}</s.InfoContainer>
              </s.GridCol>
            </s.GridRow>
          </GridContainer>
        </WhiteContent>
      )}
    </>
  )
}

export default FirstStep
