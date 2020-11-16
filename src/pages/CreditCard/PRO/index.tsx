import React, { useState } from 'react'
import { Container, Col, Row } from 'styled-bootstrap-grid'

import useMedia from 'hooks/useMedia'

import Radio from 'components/Inputs/Radio/New'
import Text from 'components/Text'
import Icon from 'components/IconExporter'
import HorizontalList from 'components/HorizontalList'
import UserCard from 'components/Card/UserCard'

import SelectExpirationDays from './../Creation/CreditCardStep/Selects/ExpirationDays'
import SelectBrazilianStates from './../Creation/CreditCardStep/Selects/BrazilianStates'

import { ContentWrapper, SidebarWrapper, Title, SubTitle } from './styles'
import * as S from './../Creation/CreditCardStep/styles'

import { FLAGS, IOption, ICreditCardCreationPayload } from '../Creation/types'

const CreditCardPro = () => {
  const isMobile = useMedia('xs')
  const [formData, setFormData] = useState<ICreditCardCreationPayload>({})
  const [selectedFlag, setSelectedFlag] = useState<FLAGS | ''>('')
  const [selectedDay, setSelectedDay] = useState<IOption>({ id: 0, name: '' })
  const [stateOption, setStateOption] = useState<IOption>({ id: 0, name: '' })

  function handleSubmit() {
    console.log('handleSubmit formData', formData)
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
                            value="00000-000"
                            onChange={() => { }}
                          />
                        </S.FormCol>
                        <S.FormCol md={6} sm={8} xs={12}>
                          <S.FormInput
                            label="endereço"
                            name="endereco"
                            placeholder="Digite"
                            maxLength={40}
                            value={1}
                            hasError={false}
                          />
                        </S.FormCol>
                        <S.FormCol md={3} sm={4} xs={12}>
                          <S.FormInput
                            label="número"
                            name="numero"
                            placeholder="Digite"
                            maxLength={5}
                            value={1}
                            hasError={false}
                          />
                        </S.FormCol>
                        <S.FormCol md={3} sm={4} xs={12}>
                          <S.FormInput
                            label="complemento"
                            name="complemento"
                            maxLength={20}
                            value={1}
                            hasError={false}
                          />
                        </S.FormCol>
                        <S.FormCol md={6} sm={4} xs={12}>
                          <S.FormInput
                            label="bairro"
                            name="bairro"
                            placeholder="Digite"
                            maxLength={30}
                            value={1}
                            hasError={false}
                          />
                        </S.FormCol>
                        <S.FormCol md={3} sm={4} xs={12}>
                          <S.FormInput
                            label="cidade"
                            name="cidade"
                            placeholder="Digite"
                            value={1}
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
        <S.ButtonNext
          onClick={() =>
            handleSubmit()
          }
        >
          ENVIAR PROPOSTA
          </S.ButtonNext>
      </S.Footer>
    </ContentWrapper>
  )
}

export default CreditCardPro
