import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Col, Container, Row } from 'styled-bootstrap-grid'
import 'styled-components/macro'
import { baseURLNamespaceInvestAws, axiosInstance } from 'services/api'

import Radio from 'components/Inputs/Radio/New'
import Text from 'components/Text'
import Icon from 'components/IconExporter'
import HorizontalList from 'components/HorizontalList'
import useMedia from 'hooks/useMedia'
import { useToast } from 'hooks/toast'
import { OFFER_CODE } from 'store/modules/CreditCard/Offers/types'

import SelectExpirationDays from './Selects/ExpirationDays'
import SelectBrazilianStates from './Selects/BrazilianStates'
import { errorCEP, isInvalidCEP } from './validators'
import { FLAGS, IOption, IStepComponent, CEPResponse } from '../types'

import * as s from './styles'

const ForthStep = ({ formData, onNextStep }: IStepComponent) => {
  const isMobile = useMedia('xs')
  const { addToast } = useToast()
  const [selectedDay, setSelectedDay] = useState<IOption>({ id: 0, name: '' })
  const [selectedFlag, setSelectedFlag] = useState<FLAGS | ''>('')

  // Address states
  const [cep, setCep] = useState('')
  const [streetAddress, setStreetAddress] = useState('')
  const [number, setNumber] = useState('')
  const [additionalInfo, setAdditionalInfo] = useState('')
  const [neighbourhood, setNeighbourhood] = useState('')
  const [city, setCity] = useState('')
  const [stateOption, setStateOption] = useState<IOption>({ id: 0, name: '' })
  const [hasAnyError, setHasAnyError] = useState(true)
  const [addressDisabled, setAddressDisabled] = useState(false)
  const [touched, setTouched] = useState({
    cep: false,
    streetAddress: false,
    number: false,
    additionalInfo: false,
    neighbourhood: false,
    city: false,
    stateOption: false,
  })

  const { creditCardOffer, isCreditCardExpirationDaysLoading } = useSelector(
    (state: any) => ({
      creditCardOffer: state.creditCardOffer.data,
      isCreditCardExpirationDaysLoading:
        state.creditCardExpirationDays.isLoading,
    })
  )

  useEffect(() => {
    if (
      cep.trim().length !== 0 &&
      streetAddress.trim().length !== 0 &&
      number.trim().length !== 0 &&
      neighbourhood.trim().length !== 0 &&
      city.trim().length !== 0 &&
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

  const touch = (key: string) => {
    setTouched(touched => ({
      ...touched,
      [key]: true,
    }))
  }

  const getAddress = async () => {
    if (cep.length === 9) {
      try {
        const [cepPrefix, cepSufix] = cep.split('-')
        const { data, status } = await axiosInstance.get<CEPResponse>(
          `${baseURLNamespaceInvestAws}/cliente/endereco`,
          {
            params: { cep: cepPrefix, cepSufixo: cepSufix },
          }
        )

        if (status === 200) {
          const { bairro, uf, cidade, logradouro, tipoLogradouro } = data
          setStreetAddress(`${tipoLogradouro}. ${logradouro}`)
          setCity(cidade)
          setNeighbourhood(bairro)
          setStateOption({ id: 99, name: uf })
          setAddressDisabled(true)
        }
      } catch (e) {
        setAddressDisabled(false)
        addToast({
          type: 'error',
          title: 'Houve um erro ao buscar CEP.',
          description: 'Por favor, edite o endereço manualmente.',
        })
      }
    }
  }

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
              headerTitle={
                <s.TextTitle>
                  Informe um endereço para receber o cartão
                </s.TextTitle>
              }
              // Aguardando definição de negócio: API de CEP
              // headerEndItem={
              //   <s.ButtonLink onClick={() => console.log('clicked')}>
              //     utilizar endereço do cadastro
              //   </s.ButtonLink>
              // }
            >
              <s.FormContainer>
                <Row>
                  <s.FormCol md={3} sm={4} xs={12}>
                    <s.CEPInput
                      label="cep"
                      name="cep"
                      value={cep}
                      placeholder="00000-000"
                      hasError={isInvalidCEP(cep, touched.cep)}
                      error={isInvalidCEP(cep, touched.cep) && errorCEP(cep)}
                      onBlur={() => {
                        getAddress()
                        touch('cep')
                      }}
                      onChange={(e: any) => {
                        setCep(e.target.value)
                      }}
                    />
                  </s.FormCol>
                  <s.FormCol md={6} sm={8} xs={12}>
                    <s.FormInput
                      label="endereço"
                      name="endereco"
                      placeholder="Digite"
                      maxLength={40}
                      disabled={addressDisabled}
                      value={streetAddress}
                      hasError={
                        streetAddress.length === 0 && touched.streetAddress
                      }
                      error={
                        streetAddress.length === 0 &&
                        touched.streetAddress && {
                          icon: 'information',
                          message: 'Campo obrigatório',
                        }
                      }
                      onBlur={() => touch('streetAddress')}
                      onChange={(e: any) => {
                        setStreetAddress(e.target.value)
                      }}
                    />
                  </s.FormCol>
                  <s.FormCol md={3} sm={4} xs={12}>
                    <s.FormInput
                      label="número"
                      name="numero"
                      placeholder="Digite"
                      maxLength={5}
                      value={number}
                      hasError={number.length === 0 && touched.number}
                      onBlur={() => touch('number')}
                      onChange={(e: any) => {
                        setNumber(e.target.value)
                      }}
                      error={
                        number.length === 0 &&
                        touched.number && {
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
                      value={additionalInfo}
                      hasError={false}
                      placeholder="Digite"
                      onBlur={() => touch('additionalInfo')}
                      onChange={(e: any) => {
                        setAdditionalInfo(e.target.value)
                      }}
                    />
                  </s.FormCol>
                  <s.FormCol md={6} sm={4} xs={12}>
                    <s.FormInput
                      label="bairro"
                      name="bairro"
                      placeholder="Digite"
                      maxLength={30}
                      disabled={addressDisabled}
                      value={neighbourhood}
                      hasError={
                        neighbourhood.length === 0 && touched.neighbourhood
                      }
                      onBlur={() => touch('neighbourhood')}
                      onChange={(e: any) => {
                        setNeighbourhood(e.target.value)
                      }}
                      error={
                        neighbourhood.length === 0 &&
                        touched.neighbourhood && {
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
                      value={city}
                      maxLength={25}
                      disabled={addressDisabled}
                      hasError={city.length === 0 && touched.city}
                      onBlur={() => touch('city')}
                      onChange={(e: any) => {
                        setCity(e.target.value)
                      }}
                      error={
                        city.length === 0 &&
                        touched.city && {
                          icon: 'information',
                          message: 'Campo obrigatório',
                        }
                      }
                    />
                  </s.FormCol>

                  <s.FormCol md={3} sm={4} xs={12}>
                    <SelectBrazilianStates
                      disabled={addressDisabled}
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
                cep,
                cidade: city,
                logradouro: streetAddress,
                bairro: neighbourhood,
                numeroLogradouro: number,
                complemento: additionalInfo.length > 0 ? additionalInfo : '',
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
