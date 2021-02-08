import React from 'react'

import ButtonLink from 'components/Button/Link'
import DataRow from 'pages/TripInsurance/commons/DataRow'
import Divisor from 'components/Divisor'
import Text from 'components/Text'

import useFormFluxManagement from 'hooks/FluxManagement/useFormFluxManagement'

import { IForm } from 'pages/TripInsurance/PRO/types'
import { IPassengerAddress } from 'pages/TripInsurance/Creation/types'

import * as s from '../styles'

const AddressCard: React.FC = () => {
  const { form } = useFormFluxManagement<IForm>()

  const checkEmptyAddressFields = (address: IPassengerAddress): boolean => {
    return (
      !address.numeroCep ||
      !address.complementoCep ||
      !address.logradouro ||
      !address.numero ||
      !address.bairro ||
      !address.cidade ||
      !address.uf
    )
  }

  return (
    <s.Card>
      <s.CardContentWrapper>
        <s.CardTitleWrapper>
          <Text type="subheading" bold color="gray5">
            ENDEREÇO
          </Text>
          <ButtonLink
            hasNotification={checkEmptyAddressFields(
              form.passageiroPrincipal?.endereco ?? {}
            )}
          >
            ALTERAR
          </ButtonLink>
        </s.CardTitleWrapper>
        <DataRow
          label="CEP"
          value={
            form.passageiroPrincipal?.endereco?.numeroCep &&
            form.passageiroPrincipal?.endereco?.complementoCep
              ? `${form.passageiroPrincipal?.endereco?.numeroCep}-${form.passageiroPrincipal?.endereco?.complementoCep}`
              : ''
          }
          error={
            !form.passageiroPrincipal?.endereco?.numeroCep ||
            !form.passageiroPrincipal?.endereco?.complementoCep
          }
        />
        <Divisor />
        <DataRow
          label="Endereço"
          value={
            form.passageiroPrincipal?.endereco?.logradouro &&
            form.passageiroPrincipal?.endereco?.numero &&
            form.passageiroPrincipal?.endereco?.bairro &&
            form.passageiroPrincipal?.endereco?.cidade &&
            form.passageiroPrincipal?.endereco?.uf
              ? `${form.passageiroPrincipal?.endereco?.logradouro}, ${
                  form.passageiroPrincipal?.endereco?.numero
                }${
                  form.passageiroPrincipal?.endereco?.complemento
                    ? ` - ${form.passageiroPrincipal?.endereco?.complemento}`
                    : ''
                } - ${form.passageiroPrincipal?.endereco?.bairro} - ${
                  form.passageiroPrincipal?.endereco?.cidade
                } - ${form.passageiroPrincipal?.endereco?.uf}`
              : ''
          }
          error={
            !form.passageiroPrincipal?.endereco?.logradouro ||
            !form.passageiroPrincipal?.endereco?.numero ||
            !form.passageiroPrincipal?.endereco?.bairro ||
            !form.passageiroPrincipal?.endereco?.cidade ||
            !form.passageiroPrincipal?.endereco?.uf
          }
        />
      </s.CardContentWrapper>
    </s.Card>
  )
}

export default AddressCard
