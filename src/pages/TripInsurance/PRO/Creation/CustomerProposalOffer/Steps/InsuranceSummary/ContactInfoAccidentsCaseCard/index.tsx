import React from 'react'

import ButtonLink from 'components/Button/Link'
import DataRow from 'pages/TripInsurance/commons/DataRow'
import Divisor from 'components/Divisor'
import Text from 'components/Text'

import useFormFluxManagement from 'hooks/FluxManagement/useFormFluxManagement'

import { formatPhoneNumber } from 'helpers'

import { IForm } from 'pages/TripInsurance/PRO/types'
import { IPassengerContact } from 'pages/TripInsurance/Creation/types'

import * as s from '../styles'

const ContactInfoAccidentsCaseCard: React.FC = () => {
  const { form } = useFormFluxManagement<IForm>()

  const checkEmptyContactInfoAccidentsCaseFields = (
    contactInfo: IPassengerContact
  ): boolean => {
    return (
      !contactInfo.nome || !contactInfo.celularDDD || !contactInfo.celularNumero
    )
  }

  return (
    <s.Card>
      <s.CardContentWrapper>
        <s.CardTitleWrapper>
          <Text type="subheading" bold color="gray5">
            CONTATO EM CASO DE ACIDENTES
          </Text>
          <ButtonLink
            hasNotification={checkEmptyContactInfoAccidentsCaseFields(
              form.passageiroPrincipal?.contato ?? {}
            )}
          >
            ALTERAR
          </ButtonLink>
        </s.CardTitleWrapper>
        <DataRow
          label="Nome"
          value={form.passageiroPrincipal?.contato?.nome ?? ''}
          error={!form.passageiroPrincipal?.contato?.nome}
        />
        <Divisor />
        <DataRow
          label="Telefone"
          value={formatPhoneNumber(
            `${form.passageiroPrincipal?.contato?.celularDDD}${form.passageiroPrincipal?.contato?.celularNumero}`
          )}
          error={
            !form.passageiroPrincipal?.contato?.celularDDD ||
            !form.passageiroPrincipal?.contato?.celularNumero
          }
        />
      </s.CardContentWrapper>
    </s.Card>
  )
}

export default ContactInfoAccidentsCaseCard
