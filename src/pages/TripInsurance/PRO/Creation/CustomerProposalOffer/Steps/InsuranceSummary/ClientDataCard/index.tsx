import React from 'react'

import ButtonLink from 'components/Button/Link'
import DataRow from 'pages/TripInsurance/commons/DataRow'
import Divisor from 'components/Divisor'
import EditHirerData from 'pages/TripInsurance/PRO/Creation/CustomerProposalOffer/Steps/InsuranceSummary/ClientDataCard/EditingData/EditHirerData'
import Text from 'components/Text'

import useFormFluxManagement from 'hooks/FluxManagement/useFormFluxManagement'

import { formatCpf } from 'helpers'

import { IForm } from 'pages/TripInsurance/PRO/types'
import { IMainPassenger } from 'pages/TripInsurance/Creation/types'

import * as s from '../styles'

const ClientDataCard: React.FC = () => {
  const { form } = useFormFluxManagement<IForm>()

  const [isHirerDataDrawerOpen, setIsHirerDataDrawerOpen] = React.useState<
    boolean
  >(false)

  const checkEmptyClientDataFields = (
    mainPassenger: IMainPassenger
  ): boolean => {
    return (
      !mainPassenger.nome ||
      !mainPassenger.numeroCpf ||
      !mainPassenger.digitoCpf ||
      !mainPassenger.dataNascimento ||
      !mainPassenger.sexo ||
      !mainPassenger.isResidePais
    )
  }

  return (
    <>
      <EditHirerData
        isOpen={isHirerDataDrawerOpen}
        handleClose={() => setIsHirerDataDrawerOpen(false)}
      />
      <s.Card>
        <s.CardContentWrapper>
          <s.CardTitleWrapper>
            <Text type="subheading" bold color="gray5">
              DADOS DO CONTRATANTE
            </Text>
            <ButtonLink
              onClick={() => {
                setIsHirerDataDrawerOpen(true)
              }}
              hasNotification={checkEmptyClientDataFields(
                form.passageiroPrincipal ?? {}
              )}
            >
              ALTERAR
            </ButtonLink>
          </s.CardTitleWrapper>

          <DataRow
            label="Nome"
            value={form.passageiroPrincipal?.nome ?? ''}
            error={!form.passageiroPrincipal?.nome}
          />
          <Divisor />
          <DataRow
            label="CPF"
            value={formatCpf(
              `${form.passageiroPrincipal?.numeroCpf}${form.passageiroPrincipal?.digitoCpf}`
            )}
            error={
              !form.passageiroPrincipal?.numeroCpf ||
              !form.passageiroPrincipal?.digitoCpf
            }
          />
          <Divisor />
          <DataRow
            label="Data de nascimento"
            value={form.passageiroPrincipal?.dataNascimento ?? ''}
            error={!form.passageiroPrincipal?.dataNascimento}
          />
          <Divisor />
          <DataRow
            label="Sexo"
            value={
              !!form.passageiroPrincipal?.sexo
                ? form.passageiroPrincipal?.sexo === 'M'
                  ? 'Masculino'
                  : 'Feminino'
                : ''
            }
            error={!form.passageiroPrincipal?.sexo}
          />
          <Divisor />
          <DataRow
            label="País de residência"
            value={form.passageiroPrincipal?.isResidePais ? 'Brasil' : ''}
            error={!form.passageiroPrincipal?.isResidePais}
          />
        </s.CardContentWrapper>
      </s.Card>
    </>
  )
}

export default ClientDataCard
