import React from 'react'

import ButtonLink from 'components/Button/Link'
import DataRow from 'pages/TripInsurance/commons/DataRow'
import Divisor from 'components/Divisor'
import Text from 'components/Text'

import useFormFluxManagement from 'hooks/FluxManagement/useFormFluxManagement'

import { formatPhoneNumber, handleGiwRedirect } from 'helpers'

import { IForm } from 'pages/TripInsurance/PRO/types'
import { IMainPassenger } from 'pages/TripInsurance/Creation/types'

import { ICardInterface } from '../types'
import * as s from '../styles'

const ClientContactDetailsCard: React.FC<ICardInterface> = ({
  setHasEmptyData,
  ...rest
}) => {
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

  // Set 'contratar' button disabled
  React.useEffect(() => {
    setHasEmptyData(checkEmptyContactDataFields(form.passageiroPrincipal ?? {}))
  }, [form.passageiroPrincipal, setHasEmptyData])

  return (
    <s.Card {...rest}>
      <s.CardContentWrapper>
        <s.CardTitleWrapper>
          <Text type="subheading" bold color="gray5">
            DADOS PARA CONTATO
          </Text>
          <ButtonLink
            hasNotification={checkEmptyContactDataFields(
              form.passageiroPrincipal ?? {}
            )}
            onClick={() => {
              handleGiwRedirect('portaldecliente/conquista/perfil?r=true')
            }}
          >
            ALTERAR NO PERFIL
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
