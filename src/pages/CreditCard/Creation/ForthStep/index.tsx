import React, { useState } from 'react'
import { Col, Container, Row } from 'styled-bootstrap-grid'
import 'styled-components/macro'

import Select from 'components/Inputs/Select'
import NewInput from 'components/NewInput'
import CEPInput from 'components/Inputs/CEPInput'
import Radio from 'components/Inputs/Radio/New'
import Text from 'components/Text'
import Icon from 'components/IconExporter'
import HorizontalList from 'components/HorizontalList'
import { TOptions } from 'components/Inputs/Select/types'
import useMedia from 'hooks/useMedia'
import * as s from './styles'

import SelectExpirationDays from './Selects/ExpirationDays'
import { IOption, IStepComponent } from '../types'

const ForthStep = ({ onNextStep }: IStepComponent) => {
  const isMobile = useMedia('xs')
  const [selectedOption, setSelectedOption] = useState<IOption>({
    id: 0,
    name: '',
  })
  const [stateOption, setStateOption] = useState<IOption>({ id: 1, name: 'SP' })
  const [selectedFlag, setSelectedFlag] = useState<'mastercard' | 'visa' | ''>(
    ''
  )

  const stateOptions: TOptions[] = [
    {
      id: 1,
      text: 'SP',
      onClick: () => setStateOption({ id: 1, name: 'SP' }),
    },
    {
      id: 2,
      text: 'RJ',
      onClick: () => setStateOption({ id: 2, name: 'RJ' }),
    },
  ]

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
                <s.RadioCard
                  checked={selectedFlag === 'mastercard'}
                  data-testid="card-credit-card-flag-master"
                  onClick={() => setSelectedFlag('mastercard')}
                >
                  <HorizontalList
                    startItems={[
                      <Radio
                        id="master"
                        name="flag"
                        value="master"
                        checked={selectedFlag === 'mastercard'}
                        handleChange={() => setSelectedFlag('mastercard')}
                      />,
                      <Icon name="mastercard" width={56} height={56} />,
                    ]}
                    endItems={[
                      <Text type="title" bold color="gray6">
                        Mastercard
                      </Text>,
                    ]}
                  />
                </s.RadioCard>
                <s.RadioCard
                  checked={selectedFlag === 'visa'}
                  onClick={() => setSelectedFlag('visa')}
                  data-testid="card-credit-card-flag-visa"
                >
                  <HorizontalList
                    startItems={[
                      <Radio
                        id="visa"
                        name="flag"
                        value="visa"
                        checked={selectedFlag === 'visa'}
                        handleChange={() => setSelectedFlag('visa')}
                      />,
                      <Icon name="visa" width={56} height={56} />,
                    ]}
                    endItems={[
                      <Text type="title" bold color="gray6">
                        Visa
                      </Text>,
                    ]}
                  />
                </s.RadioCard>
                {isMobile && (
                  <s.SelectWrapper>
                    <SelectExpirationDays
                      type={selectedFlag}
                      selectedOption={selectedOption}
                      setSelectedOption={setSelectedOption}
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
                    selectedOption={selectedOption}
                    setSelectedOption={setSelectedOption}
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
              headerEndItem={
                <s.ButtonLink onClick={() => console.log('clicked')}>
                  utilizar endereço do cadastro
                </s.ButtonLink>
              }
            >
              <s.FormContainer>
                <Row>
                  <s.FormCol md={3} sm={4} xs={12}>
                    <CEPInput
                      label="cep"
                      name="cep"
                      placeholder="00000-000"
                      onChange={(e: any) => {}}
                    />
                  </s.FormCol>
                  <s.FormCol md={6} sm={8} xs={12}>
                    <NewInput
                      label="endereço"
                      name="endereco"
                      placeholder="Digite"
                      onChange={(e: any) => {}}
                    />
                  </s.FormCol>
                  <s.FormCol md={3} sm={4} xs={12}>
                    <NewInput
                      label="número"
                      name="numero"
                      placeholder="Digite"
                      onChange={(e: any) => {}}
                    />
                  </s.FormCol>
                  <s.FormCol md={3} sm={4} xs={12}>
                    <NewInput
                      label="complemento"
                      name="complemento"
                      placeholder="Digite"
                      onChange={(e: any) => {}}
                    />
                  </s.FormCol>
                  <s.FormCol md={6} sm={4} xs={12}>
                    <NewInput
                      label="bairro"
                      name="bairro"
                      placeholder="Digite"
                      onChange={(e: any) => {}}
                    />
                  </s.FormCol>
                  <s.FormCol md={3} sm={4} xs={12}>
                    <NewInput
                      label="cidade"
                      name="cidade"
                      placeholder="Digite"
                      onChange={(e: any) => {}}
                    />
                  </s.FormCol>

                  <s.FormCol md={3} sm={4} xs={12}>
                    <Select
                      label="estado"
                      testId="estado"
                      options={stateOptions}
                      selected={stateOption}
                      optionBoxDirection="top"
                      optionBoxSize={200}
                    />
                  </s.FormCol>
                </Row>
              </s.FormContainer>
            </s.Card>
          </Col>
        </s.AddressRow>
        <s.Footer data-testid="footer-layer">
          <s.ButtonNext onClick={() => onNextStep({})}>próximo</s.ButtonNext>
        </s.Footer>
      </Container>
    </s.ContentWrapper>
  )
}

export default ForthStep
