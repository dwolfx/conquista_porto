import React from 'react'

import * as s from '../styles'
import * as t from '../types'
import * as u from '../utils'

export const SectionTwo: React.FC<t.ISectionTwo> = ({
  setIsSectionValid,
  emailState,
  phoneState,
  selectedPhoneTypeState,
  sectionTwoRef,
  ...rest
}) => {
  const [email, setEmail] = emailState
  const [phone, setPhone] = phoneState
  const [selectedPhoneType, setSelectedPhoneType] = selectedPhoneTypeState

  return (
    <section id="section-2" ref={sectionTwoRef} {...rest}>
      <s.Card overflow="visible">
        <s.CardTitle bold type="subheading" color="gray5">
          DADOS PARA CONTATO
        </s.CardTitle>
        <s.ContentWrapper>
          <s.TextInput
            label="E-MAIL"
            value={email.value}
            placeholder="Digite aqui..."
            hasError={!email.value && email.touched}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEmail({ value: e.currentTarget.value, touched: true })
            }}
            error={
              !email.value &&
              email.touched && {
                icon: 'alertrounded',
                message: 'Campo obrigatório',
              }
            }
          />
          <s.InputsWrapper>
            <s.TextInputMedium
              label="TELEFONE"
              value={phone.value}
              placeholder="Ex: (12) 34567890"
              hasError={!email.value && email.touched}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPhone({
                  value: e.currentTarget.value,
                  touched: true,
                })
              }}
              error={
                !phone.value &&
                phone.touched && {
                  icon: 'alertrounded',
                  message: 'Campo obrigatório',
                }
              }
            />
            <s.SelectTelephoneType
              label="TIPO DE TELEFONE"
              options={u.phoneTypeOptions(setSelectedPhoneType)}
              selected={selectedPhoneType}
            />
          </s.InputsWrapper>
        </s.ContentWrapper>
      </s.Card>
    </section>
  )
}

export default SectionTwo
