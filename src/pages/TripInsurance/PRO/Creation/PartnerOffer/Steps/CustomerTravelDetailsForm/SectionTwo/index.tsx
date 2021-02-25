import React from 'react'

import { formatPhoneNumber } from 'helpers'

import { Card, CardTitle } from '../styles'
import * as s from './styles'
import * as t from '../types'
import * as u from '../utils'

export const SectionTwo: React.FC<t.ISectionTwo> = ({
  setIsSectionValid,
  emailState,
  phoneNumberState,
  selectedPhoneTypeState,
  sectionTwoRef,
  ...rest
}) => {
  const [email, setEmail] = emailState
  const [isEmailValid, setIsEmailValid] = React.useState<boolean>(true)
  const [phoneNumber, setPhoneNumber] = phoneNumberState
  const [isPhoneNumberValid, setIsPhoneNumberValid] = React.useState<boolean>(
    true
  )
  const [selectedPhoneType, setSelectedPhoneType] = selectedPhoneTypeState

  const checkSectionTwoValidity = React.useCallback(
    (): boolean =>
      isEmailValid &&
      isPhoneNumberValid &&
      !!selectedPhoneType.id &&
      selectedPhoneType.id > 0,
    [isEmailValid, isPhoneNumberValid, selectedPhoneType.id]
  )

  React.useEffect(() => {
    setIsSectionValid(checkSectionTwoValidity())
  }, [setIsSectionValid, checkSectionTwoValidity])

  return (
    <section id="section-2" ref={sectionTwoRef} {...rest}>
      <Card overflow="visible">
        <CardTitle bold type="subheading" color="gray5">
          DADOS PARA CONTATO
        </CardTitle>
        <s.ContentWrapper>
          <s.TextInput
            data-gtm-form="input"
            data-gtm-name="dados-para-contato-email"
            label="e-mail"
            placeholder="Digite aqui..."
            value={email}
            onBlur={() => {
              setIsEmailValid(email.length > 0)
            }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(event.currentTarget.value)
              setIsEmailValid(true)
            }}
          />
          <s.InputsWrapper>
            <s.TextInputMedium
              data-gtm-form="input"
              data-gtm-name="dados-para-contato-telefone"
              maxLength={16}
              label="telefone"
              placeholder="Digite somente números"
              value={formatPhoneNumber(phoneNumber)}
              onBlur={() => {
                setIsPhoneNumberValid(phoneNumber.length > 9)
              }}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setPhoneNumber(event.target.value.replace(/\D/g, ''))
                setIsPhoneNumberValid(true)
              }}
            />
            <s.SelectTelephoneType
              testId="phone-type"
              label="TIPO DE TELEFONE"
              options={u.phoneTypeOptions(setSelectedPhoneType)}
              selected={selectedPhoneType}
            />
          </s.InputsWrapper>
        </s.ContentWrapper>
      </Card>
    </section>
  )
}

export default SectionTwo
