import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { Container, Col, Row } from 'styled-bootstrap-grid'
import { MD5 } from 'crypto-js'

import Loading from 'components/Loading'
import useMedia from 'hooks/useMedia'
import { useToast } from 'hooks/toast'
import { base64decode } from 'helpers'
import { baseURLNamespaceInvestAws, post } from 'services/api'
import { baseURLNamespacePROCartao } from 'services/apiConfig'
import Radio from 'components/Inputs/Radio/New'
import { TSelected } from 'components/Inputs/Select/types'
import Text from 'components/Text'
import Icon from 'components/IconExporter'
import HorizontalList from 'components/HorizontalList'
import UserCard from 'components/Card/UserCard'
// import LoadingState from 'pages/CreditCard/common/components/FullScreenLoadingState'
// import NoOffersState from 'pages/CreditCard/common/components/NoOffersState'
import SelectExpirationDays from 'pages/CreditCard/common/Selects/ExpirationDays'
import SelectBrazilianStates from 'pages/CreditCard/common/Selects/BrazilianStates'
import saveRedis from 'services/common/Redis'
import { IRedisRequest } from 'services/common/Redis/types'
import { errorCEP, isInvalidCEP } from 'helpers/validators'
import useZipCodeFetch from 'hooks/ZipCode/useZipCodeFetch'
import {
  FLAGS,
  ICreditCardCreationPayload,
  IBase64DecodedResponse,
} from 'pages/CreditCard/Creation/types'
import {
  GetCreditCardExpirationDaysRequest,
  GetCreditCardExpirationDaysClearData,
} from 'store/modules/CreditCard/ExpirationDays/action'

import ProposalStatus from '../../ProposalStatus'
import { ICreditCardRedis } from '../../../types'

import * as S from './styles'

const CreditCardStepPRO = () => {
  const { addToast } = useToast()
  const dispatch = useDispatch()
  const isMobile = useMedia('xs')
  const { hash } = useParams<{ hash: string }>()
  const {
    data: addressData,
    searchZipCode,
    isLoading: isZipCodeLoading,
    hasError: hasZipCodeError,
  } = useZipCodeFetch()

  // const { creditCardOffers, isCreditCardOffersLoading } = useSelector((state: any) => ({
  //   creditCardOffers: state.creditCardOffer.data,
  //   isCreditCardOffersLoading: state.creditCardOffer.isLoading,
  // }))

  const [isLoading, setIsLoading] = useState(false)
  const [submitErrorCount, setSubmitErrorCount] = useState<number>(0)
  const [customer, setCustomer] = useState<IBase64DecodedResponse | null>(null)
  const [selectedFlag, setSelectedFlag] = useState<FLAGS | ''>('')
  const [selectedDay, setSelectedDay] = useState<TSelected>({ id: 0, name: '' })

  // Address states
  const [isAddressDisabled, setIsAddressDisabled] = useState(false)
  const [cep, setCep] = useState({
    value: '',
    touched: false,
  })
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

  const [proposalStatus, setProposalStatus] = useState<
    'success' | 'error' | null
  >(null)

  // const syncToken = React.useCallback(() => {
  //   exchangePROToken()
  // }, [])

  // useEffect(() => {
  //   syncToken()
  // }, [syncToken])

  // Base64 Decode
  useEffect(() => {
    if (hash) {
      const dataDecoded: IBase64DecodedResponse = base64decode(hash)

      if (dataDecoded) {
        setCustomer(dataDecoded)
      }
    } else {
      setProposalStatus('error')
    }
  }, [hash])

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

  useEffect(() => {
    if (addressData.data) {
      const {
        bairro,
        uf,
        cidade,
        logradouro,
        tipoLogradouro,
      } = addressData.data
      setStreetAddress({
        value: `${tipoLogradouro}. ${logradouro}`,
        touched: true,
      })
      setCity({ value: cidade, touched: true })
      setNeighbourhood({ value: bairro, touched: true })
      setStateOption({ id: 99, name: uf })
      setIsAddressDisabled(true)
    }
  }, [addressData])

  useEffect(() => {
    dispatch(GetCreditCardExpirationDaysRequest())
    return () => {
      dispatch(GetCreditCardExpirationDaysClearData())
    }
  }, [dispatch])

  // const handleGetAddress = useCallback(() => {
  //   const handleSuccess = (cepResponse: CEPResponse) => {
  //     const { tipoLogradouro, cidade, logradouro, bairro, uf } = cepResponse
  //     setStreetAddress({
  //       value: `${tipoLogradouro}. ${logradouro}`,
  //       touched: true,
  //     })
  //     setCity({ value: cidade, touched: true })
  //     setNeighbourhood({ value: bairro, touched: true })
  //     setStateOption({ id: 99, name: uf })
  //     setLoadingCep(false)
  //     setIsAddressDisabled(true)
  //   }

  //   const handleError = () => {
  //     setLoadingCep(false)
  //     addToast({
  //       type: 'error',
  //       title: 'Houve um erro ao buscar CEP.',
  //       description: 'Por favor, edite o endereço manualmente.',
  //     })
  //   }

  //   getAddress({ cep: cep.value, handleSuccess, handleError })
  // }, [addToast, cep])

  const handleSaveRedis = async () => {
    if (customer?.cpfCliente) {
      const md5CPF = MD5(customer.cpfCliente.toString()).toString()
      const payload: IRedisRequest<ICreditCardRedis> = {
        chave: md5CPF,
        valor: {
          bandeira: selectedFlag,
          dataVencimento: selectedDay.name || '',
          enderecoRecebimento: {
            cep: cep.value,
            endereco: streetAddress.value,
            numero: number.value,
            complemento: additionalInfo.value,
            bairro: neighbourhood.value,
            cidade: city.value,
            estado: stateOption.name || '',
          },
        },
      }
      console.log({ md5CPF })
      await saveRedis<ICreditCardRedis>(payload, baseURLNamespacePROCartao)
    }
  }

  const handleFormSubmit = async () => {
    setIsLoading(true)

    const payload: ICreditCardCreationPayload = {
      codigoCanal: '2',
      idParceiro: customer?.idCorretor || '',
      cep: cep.value,
      cidade: city.value,
      logradouro: streetAddress.value,
      bairro: neighbourhood.value,
      numeroLogradouro: number.value,
      complemento: additionalInfo.value,
      uf: stateOption.name,
      codigoBandeira: selectedFlag,
      diaVencimento: selectedDay.name,
      codigoEstadoCivil: '',
      codigoProfissao: '',
      dataNascimento: '',
      nacionalidade: '',
      email: '',
      dddTelefone: '',
      numeroTelefone: '',
      nome: customer?.nomeCliente || '',
      sexo: '',
      tipoDocumento: '',
      numeroDocumentoIdentificacao: '',
      orgaoExpedidor: '',
      dataEmissaoDocumento: '',
      nomeMae: '',
      idOportunidade: '',
      idSimulacao: '',
    }

    try {
      await handleSaveRedis()
      const { data } = await post(
        `${baseURLNamespaceInvestAws}/cartoes/sugestao`,
        payload
      )

      if (data.Message.tipoCritica !== 'SUCESSO') {
        throw new Error(JSON.stringify({ msg: data.Message }))
      }
      setProposalStatus('success')
    } catch (error) {
      setSubmitErrorCount(submitErrorCount + 1)
      addToast({
        type: 'error',
        title: 'Desculpe, ocorreu uma falha ao enviar a solicitação',
      })
      if (submitErrorCount + 1 === 3) {
        setProposalStatus('error')
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (proposalStatus) {
    return (
      <S.ContentWrapperPRO>
        <ProposalStatus
          status={proposalStatus}
          customerName={customer?.nomeCliente || ''}
        />
      </S.ContentWrapperPRO>
    )
  }

  return (
    <S.ContentWrapperPRO>
      <Container>
        <Row>
          <Col md={3} sm={12}>
            <S.SidebarWrapper>
              <S.Title>Dados da Proposta</S.Title>
              <S.SubTitle>ENVIAR PROPOSTA PARA</S.SubTitle>
              <UserCard name={customer?.nomeCliente || ''} type="Cliente" />
            </S.SidebarWrapper>
          </Col>
          <Col md={9} sm={12}>
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
                        checked={selectedFlag === FLAGS.MASTERCARD}
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
                        checked={selectedFlag === FLAGS.VISA}
                        data-testid="card-credit-card-flag-visa"
                        onClick={() => {
                          setSelectedFlag(FLAGS.VISA)
                          setSelectedDay({ id: 0, name: '' })
                        }}
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
                    headerEndItem={
                      isZipCodeLoading && <Loading type="spinner" />
                    }
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
                            value={cep.value}
                            placeholder="00000-000"
                            hasError={isInvalidCEP(cep.value, cep.touched)}
                            error={
                              isInvalidCEP(cep.value, cep.touched) &&
                              errorCEP(cep.value)
                            }
                            onBlur={() => {
                              setCep(cepState => ({
                                ...cepState,
                                touched: true,
                              }))
                              if (!isInvalidCEP(cep.value, cep.touched)) {
                                searchZipCode(cep.value)
                              }
                            }}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              setIsAddressDisabled(false)
                              setCep({
                                ...cep,
                                value: e.currentTarget.value,
                              })
                            }}
                          />
                        </S.FormCol>
                        <S.FormCol md={6} sm={8} xs={12}>
                          <S.FormInput
                            label="endereço"
                            name="endereco"
                            placeholder="Digite"
                            maxLength={40}
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
                            disabled={isZipCodeLoading || isAddressDisabled}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              setStreetAddress({
                                value: e.currentTarget.value,
                                touched: true,
                              })
                            }}
                          />
                        </S.FormCol>
                        <S.FormCol md={3} sm={4} xs={12}>
                          <S.FormInput
                            label="número"
                            name="numero"
                            placeholder="Digite"
                            maxLength={5}
                            value={number.value}
                            hasError={
                              number.value.length === 0 && number.touched
                            }
                            disabled={isZipCodeLoading}
                            error={
                              number.value.length === 0 &&
                              number.touched && {
                                icon: 'information',
                                message: 'Campo obrigatório',
                              }
                            }
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              setNumber({
                                value: e.currentTarget.value,
                                touched: true,
                              })
                            }}
                          />
                        </S.FormCol>
                        <S.FormCol md={3} sm={4} xs={12}>
                          <S.FormInput
                            label="complemento"
                            name="complemento"
                            maxLength={20}
                            value={additionalInfo.value}
                            hasError={false}
                            disabled={isZipCodeLoading}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              setAdditionalInfo({
                                value: e.target.value,
                                touched: true,
                              })
                            }}
                          />
                        </S.FormCol>
                        <S.FormCol md={6} sm={4} xs={12}>
                          <S.FormInput
                            label="bairro"
                            name="bairro"
                            placeholder="Digite"
                            maxLength={30}
                            value={neighbourhood.value}
                            disabled={isZipCodeLoading || isAddressDisabled}
                            hasError={
                              neighbourhood.value.length === 0 &&
                              neighbourhood.touched
                            }
                            error={
                              neighbourhood.value.length === 0 &&
                              neighbourhood.touched && {
                                icon: 'information',
                                message: 'Campo obrigatório',
                              }
                            }
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              setNeighbourhood({
                                value: e.currentTarget.value,
                                touched: true,
                              })
                            }}
                          />
                        </S.FormCol>
                        <S.FormCol md={3} sm={4} xs={12}>
                          <S.FormInput
                            label="cidade"
                            name="cidade"
                            placeholder="Digite"
                            value={city.value}
                            maxLength={25}
                            disabled={isZipCodeLoading || isAddressDisabled}
                            hasError={city.value.length === 0 && city.touched}
                            error={
                              city.value.length === 0 &&
                              city.touched && {
                                icon: 'information',
                                message: 'Campo obrigatório',
                              }
                            }
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              setCity({
                                value: e.target.value,
                                touched: true,
                              })
                            }}
                          />
                        </S.FormCol>

                        <S.FormCol md={3} sm={4} xs={12}>
                          <SelectBrazilianStates
                            disabled={isZipCodeLoading || isAddressDisabled}
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
        <S.SendButton
          onClick={handleFormSubmit}
          loading={isLoading}
          disabled={!cep || !selectedFlag || !selectedDay.name || !number}
        >
          ENVIAR PROPOSTA
        </S.SendButton>
      </S.Footer>
    </S.ContentWrapperPRO>
  )
}

export default CreditCardStepPRO
