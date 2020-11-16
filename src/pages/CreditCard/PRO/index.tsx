import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Container, Col, Row } from 'styled-bootstrap-grid'

import useMedia from 'hooks/useMedia'
import { useToast } from 'hooks/toast'
import { getCookieValue } from 'helpers'
import { baseURLNamespaceInvestAws, post } from 'services/api'

import {
  GetCreditCardExpirationDaysRequest,
  GetCreditCardExpirationDaysClearData,
} from 'store/modules/CreditCard/ExpirationDays/action'

import Radio from 'components/Inputs/Radio/New'
import Text from 'components/Text'
import Icon from 'components/IconExporter'
import HorizontalList from 'components/HorizontalList'
import UserCard from 'components/Card/UserCard'

import SelectExpirationDays from './../Creation/CreditCardStep/Selects/ExpirationDays'
import SelectBrazilianStates from './../Creation/CreditCardStep/Selects/BrazilianStates'

import { ContentWrapper, SidebarWrapper, Title, SubTitle, SendButton } from './styles'
import * as S from './../Creation/CreditCardStep/styles'

import { FLAGS, IOption, ICreditCardCreationPayload } from '../Creation/types'

const CreditCardPro = () => {
  const dispatch = useDispatch()
  const isMobile = useMedia('xs')
  const { addToast } = useToast()
  const [token, setToken] = useState(getCookieValue('TOKEN') || null)
  const [isLoading, setIsLoading] = useState(false)

  const [selectedFlag, setSelectedFlag] = useState<FLAGS | ''>('')
  const [selectedDay, setSelectedDay] = useState<IOption>({ id: 0, name: '' })

  // Address states
  const [cep, setCep] = useState('')
  const [streetAddress, setStreetAddress] = useState('')
  const [number, setNumber] = useState('')
  const [additionalInfo, setAdditionalInfo] = useState('')
  const [neighbourhood, setNeighbourhood] = useState('')
  const [city, setCity] = useState('')
  const [stateOption, setStateOption] = useState<IOption>({ id: 0, name: '' })

  // Busca Token enviado pela aplicação Angular
  useEffect(() => {
    if (token) {
      console.log('Token', token)
    }
  }, [token])

  useEffect(() => {
    dispatch(GetCreditCardExpirationDaysRequest())
    return () => {
      dispatch(GetCreditCardExpirationDaysClearData())
    }
  }, [dispatch])

  const handleFormSubmit = async () => {
    setIsLoading(true)
    const payload: ICreditCardCreationPayload = {
      cep: cep,
      cidade: city,
      logradouro: streetAddress,
      bairro: neighbourhood,
      numeroLogradouro: number,
      complemento: additionalInfo,
      uf: stateOption.name,
      codigoBandeira: selectedFlag,
      diaVencimento: selectedDay.name,
    }

    try {
      // const { data } = await post(
      //   `${baseURLNamespaceInvestAws}/cartoes/solicitacao`,
      //   payload
      // )

      setTimeout(() => {
        setIsLoading(false)
        addToast({
          type: 'success',
          title: 'Solicitação enviada',
          description: 'A solicitação do cartão para o cliente foi enviada',
        })

      }, 4321)

    } catch (error) {
      addToast({
        type: 'error',
        title: 'Desculpe, ocorreu uma falha ao enviar a solicitação',
        description: JSON.parse(error.message)?.msg,
      })
      setIsLoading(false)
    }

    console.log('payload', payload)
  }

  return (
    <ContentWrapper>
      <Container>
        <Row>
          <Col lg={3}>
            <SidebarWrapper>
              <Title>Dados da Proposta</Title>
              <SubTitle>ENVIAR PROPOSTA PARA</SubTitle>
              <UserCard name="Felipe Santos" role="Cliente" />
            </SidebarWrapper>
          </Col>
          <Col lg={9}>
            <Container>
              <S.Row>
                <Col lg={6} md={6} sm={6} xs={12}>
                  <S.Card
                    data-testid="card-credit-card-flags"
                    headerTitle={
                      <S.TextTitle>Selecione a bandeira do cartão</S.TextTitle>
                    }
                  >
                    <S.RadioCardWrapper>
                      {isMobile && (
                        <S.SectionTitle>Bandeira do cartão</S.SectionTitle>
                      )}
                      <S.RadioCard
                        checked={
                          selectedFlag === FLAGS.MASTERCARD
                        }
                        data-testid="card-credit-card-flag-master"
                        onClick={() => {
                          setSelectedFlag(FLAGS.MASTERCARD)
                          setSelectedDay({ id: 0, name: '' })
                        }}
                      >
                        <HorizontalList
                          startItems={[
                            <>
                              <Radio
                                id="master"
                                name="flag"
                                value={FLAGS.MASTERCARD}
                                checked={selectedFlag === FLAGS.MASTERCARD}
                                handleChange={() => {
                                  setSelectedFlag(FLAGS.MASTERCARD)
                                  setSelectedDay({ id: 0, name: '' })
                                }}
                              />
                            </>,
                            <Icon name="mastercard" width={56} height={56} />,
                          ]}
                          endItems={[
                            <Text type="title" bold color="gray6">
                              Mastercard
                        </Text>,
                          ]}
                        />
                      </S.RadioCard>
                      <S.RadioCard
                        checked={
                          selectedFlag === FLAGS.VISA
                        }
                        onClick={() => {
                          setSelectedFlag(FLAGS.VISA)
                          setSelectedDay({ id: 0, name: '' })

                        }}
                        data-testid="card-credit-card-flag-visa"
                      >
                        <HorizontalList
                          startItems={[
                            <>
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
                            </>,
                            <Icon name="visa" width={56} height={56} />,
                          ]}
                          endItems={[
                            <Text type="title" bold color="gray6">
                              Visa
                        </Text>,
                          ]}
                        />
                      </S.RadioCard>
                      {isMobile && (
                        <S.SelectWrapper>
                          <SelectExpirationDays
                            type={selectedFlag}
                            selectedOption={selectedDay}
                            setSelectedOption={setSelectedDay}
                          />
                        </S.SelectWrapper>
                      )}
                    </S.RadioCardWrapper>
                  </S.Card>
                </Col>
                {!isMobile && (
                  <Col lg={6} md={6} sm={6}>
                    <S.Card
                      data-testid="card-credit-card-bill-expiration"
                      headerTitle={
                        <S.TextTitle>
                          Selecione o dia de vencimento da fatura
                  </S.TextTitle>
                      }
                    >
                      <S.SelectWrapper>
                        <SelectExpirationDays
                          type={selectedFlag}
                          selectedOption={selectedDay}
                          setSelectedOption={setSelectedDay}
                        />
                      </S.SelectWrapper>
                    </S.Card>
                  </Col>
                )}
              </S.Row>
              <S.AddressRow>
                <Col lg={12}>
                  <S.Card
                    data-testid="card-credit-card-address"
                    headerTitle={
                      <S.TextTitle>
                        Informe um endereço para receber o cartão
                      </S.TextTitle>
                    }
                  >
                    <S.FormContainer>
                      <Row>
                        <S.FormCol md={3} sm={4} xs={12}>
                          <S.CEPInput
                            label="cep"
                            name="cep"
                            hasError={false}
                            placeholder="00000-000"
                            onChange={(e: any) => {
                              setCep(e.target.value)
                            }}
                            value={cep}
                            onBlur={() => {
                              console.log('CEP', cep)
                            }}
                          />
                        </S.FormCol>
                        <S.FormCol md={6} sm={8} xs={12}>
                          <S.FormInput
                            label="endereço"
                            name="endereco"
                            placeholder="Digite"
                            maxLength={40}
                            value={streetAddress}
                            onChange={(e: any) => {
                              setStreetAddress(e.target.value)
                            }}
                            hasError={false}
                          />
                        </S.FormCol>
                        <S.FormCol md={3} sm={4} xs={12}>
                          <S.FormInput
                            label="número"
                            name="numero"
                            placeholder="Digite"
                            maxLength={5}
                            value={number}
                            onChange={(e: any) => {
                              setNumber(e.target.value)
                            }}
                            hasError={false}
                          />
                        </S.FormCol>
                        <S.FormCol md={3} sm={4} xs={12}>
                          <S.FormInput
                            label="complemento"
                            name="complemento"
                            maxLength={20}
                            value={additionalInfo}
                            onChange={(e: any) => {
                              setAdditionalInfo(e.target.value)
                            }}
                            hasError={false}
                          />
                        </S.FormCol>
                        <S.FormCol md={6} sm={4} xs={12}>
                          <S.FormInput
                            label="bairro"
                            name="bairro"
                            placeholder="Digite"
                            maxLength={30}
                            value={neighbourhood}
                            onChange={(e: any) => {
                              setNeighbourhood(e.target.value)
                            }}
                            hasError={false}
                          />
                        </S.FormCol>
                        <S.FormCol md={3} sm={4} xs={12}>
                          <S.FormInput
                            label="cidade"
                            name="cidade"
                            placeholder="Digite"
                            value={city}
                            onChange={(e: any) => {
                              setCity(e.target.value)
                            }}
                            hasError={false}
                            maxLength={25}
                          />
                        </S.FormCol>

                        <S.FormCol md={3} sm={4} xs={12}>
                          <SelectBrazilianStates
                            selectedOption={stateOption}
                            setSelectedOption={setStateOption}
                          />
                        </S.FormCol>
                      </Row>
                    </S.FormContainer>
                  </S.Card>
                </Col>
              </S.AddressRow>
            </Container>

          </Col>
        </Row>
      </Container>
      <S.Footer>
        <SendButton onClick={handleFormSubmit} loading={isLoading}>
          ENVIAR PROPOSTA
        </SendButton>
      </S.Footer>
    </ContentWrapper >
  )
}

export default CreditCardPro
