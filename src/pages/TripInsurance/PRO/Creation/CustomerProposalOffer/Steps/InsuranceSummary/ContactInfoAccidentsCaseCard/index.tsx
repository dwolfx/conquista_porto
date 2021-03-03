import React from 'react'

import ButtonLink from 'components/Button/Link'
import DataRow from 'pages/TripInsurance/commons/DataRow'
import Divisor from 'components/Divisor'
import ContactInfoAccidentsCaseCardDrawerDrawer from 'pages/TripInsurance/PRO/Creation/CustomerProposalOffer/Steps/InsuranceSummary/ContactInfoAccidentsCaseCard/ContactInfoAccidentsCaseDrawer'
import Text from 'components/Text'

import useFormFluxManagement from 'hooks/FluxManagement/useFormFluxManagement'

import { formatPhoneNumber } from 'helpers'

import { IForm } from 'pages/TripInsurance/PRO/types'
import { IPassengerContact } from 'pages/TripInsurance/Creation/types'

import { ICardInterface } from '../types'
import * as s from '../styles'

const ContactInfoAccidentsCaseCard: React.FC<ICardInterface> = ({
  setHasEmptyData,
  ...rest
}) => {
  const { form } = useFormFluxManagement<IForm>()

  const [
    isContactInfoAccidentsCaseCardDrawerOpen,
    setIsContactInfoAccidentsCaseCardDrawerOpen,
  ] = React.useState<boolean>(false)

  const checkEmptyContactInfoAccidentsCaseFields = (
    contactInfo: IPassengerContact
  ): boolean => {
    return (
      !contactInfo.nome || !contactInfo.celularDDD || !contactInfo.celularNumero
    )
  }

  // Set 'contratar' button disabled
  React.useEffect(() => {
    setHasEmptyData(
      checkEmptyContactInfoAccidentsCaseFields(
        form.passageiroPrincipal?.contato ?? {}
      )
    )
  }, [form.passageiroPrincipal, setHasEmptyData])

  return (
    <>
      <ContactInfoAccidentsCaseCardDrawerDrawer
        isOpen={isContactInfoAccidentsCaseCardDrawerOpen}
        handleClose={() => setIsContactInfoAccidentsCaseCardDrawerOpen(false)}
      />
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
              onClick={() => setIsContactInfoAccidentsCaseCardDrawerOpen(true)}
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
    </>
  )
}

export default ContactInfoAccidentsCaseCard
