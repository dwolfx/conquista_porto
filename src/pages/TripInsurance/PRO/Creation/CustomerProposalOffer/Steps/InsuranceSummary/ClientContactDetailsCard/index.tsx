import React from 'react'

import ButtonLink from 'components/Button/Link'
import DataRow from 'pages/TripInsurance/commons/DataRow'
import Divisor from 'components/Divisor'
import Text from 'components/Text'

import useFormFluxManagement from 'hooks/FluxManagement/useFormFluxManagement'

import { formatPhoneNumber } from 'helpers'

import { IForm } from 'pages/TripInsurance/PRO/types'
import { IMainPassenger } from 'pages/TripInsurance/Creation/types'

import * as s from '../styles'

const ClientContactDetailsCard: React.FC = () => {
  const { form } = useFormFluxManagement<IForm>()

  const checkEmptyContactDataFields = (
    mainPassenger: IMainPassenger
  ): boolean => {
    return (
      !mainPassenger.celularDDD ||
      !mainPassenger.celularNumero ||
      !mainPassenger.email
    )
  }

  return (
    <s.Card>
      <s.CardContentWrapper>
        <s.CardTitleWrapper>
          <Text type="subheading" bold color="gray5">
            DADOS PARA CONTATO
          </Text>
          <ButtonLink
            hasNotification={checkEmptyContactDataFields(
              form.passageiroPrincipal ?? {}
            )}
          >
            ALTERAR
          </ButtonLink>
        </s.CardTitleWrapper>
        <DataRow
          label="Telefone"
          value={formatPhoneNumber(
            `${form.passageiroPrincipal?.celularDDD}${form.passageiroPrincipal?.celularNumero}`
          )}
          error={
            !form.passageiroPrincipal?.celularDDD ||
            !form.passageiroPrincipal?.celularNumero
          }
        />
        <Divisor />
        <DataRow label="Tipo de telefone" value="Celular" />
        <Divisor />
        <DataRow
          label="E-mail"
          value={form.passageiroPrincipal?.email ?? ''}
          error={!form.passageiroPrincipal?.email}
        />
      </s.CardContentWrapper>
    </s.Card>
  )
}

export default ClientContactDetailsCard
