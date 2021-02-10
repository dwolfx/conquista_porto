import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Col, Container, Row } from 'styled-bootstrap-grid'
import 'styled-components/macro'

import Radio from 'components/Inputs/Radio/New'
import Text from 'components/Text'
import Icon from 'components/IconExporter'
import Loading from 'components/Loading'
import { TSelected } from 'components/Inputs/Select/types'
import HorizontalList from 'components/HorizontalList'
import useMedia from 'hooks/useMedia'
import { useToast } from 'hooks/toast'
import useZipCodeFetch from 'hooks/ZipCode/useZipCodeFetch'
import { OFFER_CODE } from 'store/modules/CreditCard/Offers/types'
import { errorCEP, isInvalidCEP } from 'helpers/validators'

import SelectExpirationDays from '../../common/Selects/ExpirationDays'
import SelectBrazilianStates from '../../common/Selects/BrazilianStates'
import { FLAGS, IStepComponent } from '../types'

import * as s from './styles'

const ForthStep = ({ formData, onNextStep }: IStepComponent) => {
  const isMobile = useMedia('xs')
  const { addToast } = useToast()
  const {
    data: cepData,
    isLoading: isZipCodeLoading,
    searchZipCode,
    hasError: hasZipCodeError,
  } = useZipCodeFetch()
  const [selectedDay, setSelectedDay] = useState<TSelected>({ id: 0, name: '' })
  const [selectedFlag, setSelectedFlag] = useState<FLAGS | ''>('')

  // Address states
  const [cep, setCep] = useState({ value: '', touched: false })
  const [streetAddress, setStreetAddress] = useState({
    value: '',
    touched: false,
  })
  const [number, setNumber] = useState({ value: '', touched: false })
  const [additionalInfo, setAdditionalInfo] = useState({
    value: '',
    touched: false,
  })
  const [neighbourhood, setNeighbourhood] = useState({
    value: '',
    touched: false,
  })
  const [city, setCity] = useState({ value: '', touched: false })
  const [stateOption, setStateOption] = useState<TSelected>({ id: 0, name: '' })
  const [hasAnyError, setHasAnyError] = useState(true)
  const [isAddressDisabled, setIsAddressDisabled] = useState(false)

  const { creditCardOffer, isCreditCardExpirationDaysLoading } = useSelector(
    (state: any) => ({
      creditCardOffer: state.creditCardOffer.data,
      isCreditCardExpirationDaysLoading:
        state.creditCardExpirationDays.isLoading,
    })
  )

  useEffect(() => {
    if (
      cep.value.trim().length !== 0 &&
      streetAddress.value.trim().length !== 0 &&
      number.value.trim().length !== 0 &&
      neighbourhood.value.trim().length !== 0 &&
      city.value.trim().length !== 0 &&
      stateOption.id !== 0 &&
      selectedFlag !== '' &&
      selectedDay.id !== 0
    ) {
      setHasAnyError(false)
    } else {
      setHasAnyError(true)
    }
  }, [
    setHasAnyError,
    cep,
    streetAddress,
    number,
    additionalInfo,
    neighbourhood,
    city,
    stateOption,
    selectedFlag,
    selectedDay,
  ])

  useEffect(() => {
    if (cepData.data) {
      const { bairro, uf, cidade, logradouro, tipoLogradouro } = cepData.data
      setStreetAddress({
        value: `${tipoLogradouro}. ${logradouro}`,
        touched: true,
      })
      setCity({ value: cidade, touched: true })
      setNeighbourhood({ value: bairro, touched: true })
      setStateOption({ id: 99, name: uf })
      setIsAddressDisabled(true)
    }
  }, [cepData])

  useEffect(() => {
    if (hasZipCodeError) {
      setIsAddressDisabled(false)
      addToast({
        type: 'error',
        title: 'Houve um erro ao buscar CEP.',
        description: 'Por favor, edite o endereço manualmente.',
      })
    }
  }, [hasZipCodeError, addToast])

  return (
    <s.ContentWrapper>
      <Container>
        <s.Row>
          <Col lg={6} md={6} sm={6} xs={12}>
            <s.Card
              data-testid="card-credit-card-flags"
              headerTitle={
                <s.TextTitle>Selecione a bandeira do cartão</s.TextTitle>
              }
            >
              <s.RadioCardWrapper>
                {isMobile && (
                  <s.SectionTitle>Bandeira do cartão</s.SectionTitle>
                )}
                {creditCardOffer && creditCardOffer.isMasterCardActive && (
                  <s.RadioCard
                    checked={
                      selectedFlag === FLAGS.MASTERCARD ||
                      (creditCardOffer &&
                        creditCardOffer.CodigoOferta ===
                          OFFER_CODE.ONLY_MASTER_CODE)
                    }
                    data-testid="card-credit-card-flag-master"
                    onClick={() => {
                      if (!isCreditCardExpirationDaysLoading) {
                        setSelectedFlag(FLAGS.MASTERCARD)
                        setSelectedDay({ id: 0, name: '' })
                      }
                    }}
                  >
                    <HorizontalList
                      startItems={[
                        <>
                          {creditCardOffer &&
                            creditCardOffer.CodigoOferta !==
                              OFFER_CODE.ONLY_MASTER_CODE && (
                              <Radio
                                id="master"
                                name="flag"
                                value={FLAGS.MASTERCARD}
                                checked={selectedFlag === FLAGS.MASTERCARD}
                                handleChange={() => {
                                  setSelectedDay({ id: 0, name: '' })
                                  setSelectedFlag(FLAGS.MASTERCARD)
                                }}
                              />
                            )}
                        </>,
                        <Icon name="mastercard" width={56} height={56} />,
                      ]}
                      endItems={[
                        <Text type="title" bold color="gray6">
                          Mastercard
                        </Text>,
                      ]}
                    />
                  </s.RadioCard>
                )}
                {creditCardOffer && creditCardOffer.isVisaActive && (
                  <s.RadioCard
                    checked={
                      selectedFlag === FLAGS.VISA ||
                      (creditCardOffer &&
                        creditCardOffer.CodigoOferta ===
                          OFFER_CODE.ONLY_VISA_CODE)
                    }
                    onClick={() => {
                      if (!isCreditCardExpirationDaysLoading) {
                        setSelectedFlag(FLAGS.VISA)
                        setSelectedDay({ id: 0, name: '' })
                      }
                    }}
                    data-testid="card-credit-card-flag-visa"
                  >
                    <HorizontalList
                      startItems={[
                        <>
                          {creditCardOffer &&
                            creditCardOffer.CodigoOferta !==
                              OFFER_CODE.ONLY_VISA_CODE && (
                              <Radio
                                id="visa"
                                name="flag"
                                value="visa"
                                checked={selectedFlag === FLAGS.VISA}
                                handleChange={() => {
                                  setSelectedFlag(FLAGS.VISA)
                                  setSelectedDay({ id: 0, name: '' })
                                }}
                              />
                            )}
                        </>,
                        <Icon name="visa" width={56} height={56} />,
                      ]}
                      endItems={[
                        <Text type="title" bold color="gray6">
                          Visa
                        </Text>,
                      ]}
                    />
                  </s.RadioCard>
                )}
                {isMobile && (
                  <s.SelectWrapper>
                    <SelectExpirationDays
                      type={selectedFlag}
                      selectedOption={selectedDay}
                      setSelectedOption={setSelectedDay}
                    />
                  </s.SelectWrapper>
                )}
              </s.RadioCardWrapper>
            </s.Card>
          </Col>
          {!isMobile && (
            <Col lg={6} md={6} sm={6}>
              <s.Card
                data-testid="card-credit-card-bill-expiration"
                headerTitle={
                  <s.TextTitle>
                    Selecione o dia de vencimento da fatura
                  </s.TextTitle>
                }
              >
                <s.SelectWrapper>
                  <SelectExpirationDays
                    type={selectedFlag}
                    selectedOption={selectedDay}
                    setSelectedOption={setSelectedDay}
                  />
                </s.SelectWrapper>
              </s.Card>
            </Col>
          )}
        </s.Row>
        <s.AddressRow>
          <Col lg={12}>
            <s.Card
              data-testid="card-credit-card-address"
              headerEndItem={isZipCodeLoading && <Loading type="spinner" />}
              headerTitle={
                <s.TextTitle>
                  Informe um endereço para receber o cartão
                </s.TextTitle>
              }
            >
              <s.FormContainer>
                <Row>
                  <s.FormCol md={3} sm={4} xs={12}>
                    <s.CEPInput
                      label="cep"
                      name="cep"
                      value={cep.value}
                      placeholder="00000-000"
                      hasError={isInvalidCEP(cep.value, cep.touched)}
                      error={
                        isInvalidCEP(cep.value, cep.touched) &&
                        errorCEP(cep.value)
                      }
                      onBlur={() => searchZipCode(cep.value)}
                      onChange={(e: any) => {
                        setIsAddressDisabled(false)
                        setCep({ ...cep, value: e.target.value })
                      }}
                    />
                  </s.FormCol>
                  <s.FormCol md={6} sm={8} xs={12}>
                    <s.FormInput
                      label="endereço"
                      name="endereco"
                      placeholder="Digite"
                      maxLength={40}
                      disabled={
                        isAddressDisabled || hasZipCodeError || isZipCodeLoading
                      }
                      value={streetAddress.value}
                      hasError={
                        streetAddress.value.length === 0 &&
                        streetAddress.touched
                      }
                      error={
                        streetAddress.value.length === 0 &&
                        streetAddress.touched && {
                          icon: 'information',
                          message: 'Campo obrigatório',
                        }
                      }
                      onBlur={() =>
                        setStreetAddress(oldState => ({
                          ...oldState,
                          touched: true,
                        }))
                      }
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setStreetAddress({
                          ...streetAddress,
                          value: e.currentTarget.value,
                        })
                      }}
                    />
                  </s.FormCol>
                  <s.FormCol md={3} sm={4} xs={12}>
                    <s.FormInput
                      label="número"
                      name="numero"
                      placeholder="Digite"
                      maxLength={5}
                      value={number.value}
                      hasError={number.value.length === 0 && number.touched}
                      onBlur={() =>
                        setNumber(oldState => ({ ...oldState, touched: true }))
                      }
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setNumber({
                          ...number,
                          value: e.currentTarget.value,
                        })
                      }}
                      error={
                        number.value.length === 0 &&
                        number.touched && {
                          icon: 'information',
                          message: 'Campo obrigatório',
                        }
                      }
                    />
                  </s.FormCol>
                  <s.FormCol md={3} sm={4} xs={12}>
                    <s.FormInput
                      label="complemento"
                      name="complemento"
                      maxLength={20}
                      value={additionalInfo.value}
                      hasError={false}
                      placeholder="Digite"
                      onBlur={() =>
                        setAdditionalInfo(oldState => ({
                          ...oldState,
                          touched: true,
                        }))
                      }
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setAdditionalInfo({
                          ...additionalInfo,
                          value: e.currentTarget.value,
                        })
                      }}
                    />
                  </s.FormCol>
                  <s.FormCol md={6} sm={4} xs={12}>
                    <s.FormInput
                      label="bairro"
                      name="bairro"
                      placeholder="Digite"
                      maxLength={30}
                      disabled={
                        isAddressDisabled || hasZipCodeError || isZipCodeLoading
                      }
                      value={neighbourhood.value}
                      hasError={
                        neighbourhood.value.length === 0 &&
                        neighbourhood.touched
                      }
                      onBlur={() =>
                        setNeighbourhood(oldState => ({
                          ...oldState,
                          touched: true,
                        }))
                      }
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setNeighbourhood({
                          ...neighbourhood,
                          value: e.currentTarget.value,
                        })
                      }}
                      error={
                        neighbourhood.value.length === 0 &&
                        neighbourhood.touched && {
                          icon: 'information',
                          message: 'Campo obrigatório',
                        }
                      }
                    />
                  </s.FormCol>
                  <s.FormCol md={3} sm={4} xs={12}>
                    <s.FormInput
                      label="cidade"
                      name="cidade"
                      placeholder="Digite"
                      value={city.value}
                      maxLength={25}
                      disabled={
                        isAddressDisabled || hasZipCodeError || isZipCodeLoading
                      }
                      hasError={city.value.length === 0 && city.touched}
                      onBlur={() =>
                        setCity(oldState => ({ ...oldState, touched: true }))
                      }
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setCity({
                          ...city,
                          value: e.currentTarget.value,
                        })
                      }}
                      error={
                        city.value.length === 0 &&
                        city.touched && {
                          icon: 'information',
                          message: 'Campo obrigatório',
                        }
                      }
                    />
                  </s.FormCol>

                  <s.FormCol md={3} sm={4} xs={12}>
                    <SelectBrazilianStates
                      disabled={
                        isAddressDisabled || hasZipCodeError || isZipCodeLoading
                      }
                      selectedOption={stateOption}
                      setSelectedOption={setStateOption}
                    />
                  </s.FormCol>
                </Row>
              </s.FormContainer>
            </s.Card>
          </Col>
        </s.AddressRow>
        <s.Footer data-testid="footer-layer">
          <s.ButtonNext
            disabled={hasAnyError}
            onClick={() =>
              onNextStep({
                ...formData,
                cep: cep.value,
                cidade: city.value,
                logradouro: streetAddress.value,
                bairro: neighbourhood.value,
                numeroLogradouro: number.value,
                complemento: additionalInfo.value,
                uf: stateOption.name,
                codigoBandeira: selectedFlag,
                diaVencimento: selectedDay.name,
                idSimulacao: creditCardOffer.IdSimulacao,
              })
            }
          >
            próximo
          </s.ButtonNext>
        </s.Footer>
      </Container>
    </s.ContentWrapper>
  )
}

export default ForthStep
