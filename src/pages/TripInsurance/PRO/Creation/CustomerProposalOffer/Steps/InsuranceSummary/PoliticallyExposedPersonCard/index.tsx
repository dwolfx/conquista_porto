import React from 'react'

import ButtonLink from 'components/Button/Link'
import DataRow from 'pages/TripInsurance/commons/DataRow'
import PoliticallyExposedPersonDrawer from 'pages/TripInsurance/PRO/Creation/CustomerProposalOffer/Steps/InsuranceSummary/PoliticallyExposedPersonCard/PoliticallyExposedPersonDrawer'
import Text from 'components/Text'

import useFormFluxManagement from 'hooks/FluxManagement/useFormFluxManagement'

import { IForm } from 'pages/TripInsurance/PRO/types'
import { IPoliticallyExposedPerson } from 'pages/TripInsurance/Creation/types'

import * as s from '../styles'

const PoliticallyExposedPersonCard: React.FC = () => {
  const { form } = useFormFluxManagement<IForm>()

  const [
    isPoliticallyExposedPersonCardDrawerOpen,
    setIsPoliticallyExposedPersonCardDrawerOpen,
  ] = React.useState<boolean>(false)

  const checkEmptyExposedPersonFields = (
    exposedPerson: IPoliticallyExposedPerson
  ): boolean => {
    return exposedPerson.grauRelacionamento
      ? exposedPerson.grauRelacionamento !== 2
        ? !exposedPerson.nome ||
          !exposedPerson.numeroCpf ||
          !exposedPerson.digitoCpf ||
          !exposedPerson.grauParentesco ||
          exposedPerson.grauParentesco < 1 ||
          exposedPerson.grauParentesco > 7
        : false
      : true
  }

  return (
    <>
      <PoliticallyExposedPersonDrawer
        isOpen={isPoliticallyExposedPersonCardDrawerOpen}
        handleClose={() => setIsPoliticallyExposedPersonCardDrawerOpen(false)}
      />
      <s.Card>
        <s.CardContentWrapper>
          <s.CardTitleWrapper>
            <Text type="subheading" bold color="gray5">
              PESSOA POLITICAMENTE EXPOSTA
            </Text>
            <ButtonLink
              hasNotification={checkEmptyExposedPersonFields(
                form.pessoaExposta ?? {}
              )}
              onClick={() => setIsPoliticallyExposedPersonCardDrawerOpen(true)}
            >
              ALTERAR
            </ButtonLink>
          </s.CardTitleWrapper>
          <DataRow
            label="Declarar"
            value={form.pessoaExposta?.grauRelacionamento !== 2 ? 'Sim' : 'Não'}
            error={checkEmptyExposedPersonFields(form.pessoaExposta ?? {})}
          />
        </s.CardContentWrapper>
      </s.Card>
    </>
  )
}

export default PoliticallyExposedPersonCard
