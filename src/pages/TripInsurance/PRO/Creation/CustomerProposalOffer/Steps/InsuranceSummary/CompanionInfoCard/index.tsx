import React from 'react'
import { uuid } from 'uuidv4'

import ButtonLink from 'components/Button/Link'
import DataRow from 'pages/TripInsurance/commons/DataRow'
import Divisor from 'components/Divisor'
import Text from 'components/Text'

import useFormFluxManagement from 'hooks/FluxManagement/useFormFluxManagement'

import { IForm } from 'pages/TripInsurance/PRO/types'
import { ICompanion } from 'pages/TripInsurance/Creation/types'

import { Companion, ItemWrapper } from './styles'
import * as s from '../styles'

const CompanionInfoCard: React.FC = () => {
  const { form } = useFormFluxManagement<IForm>()

  const checkEmptyCompanionFields = (companion: ICompanion): boolean => {
    return (
      !companion.nome ||
      !companion.email ||
      !companion.dataNascimento ||
      !companion.sexo ||
      !companion.numeroCpf ||
      !companion.digitoCpf ||
      !companion.celularDDD ||
      !companion.celularNumero ||
      !companion.contato ||
      !companion.contato.nome ||
      !companion.contato.celularDDD ||
      !companion.contato.celularNumero ||
      !companion.endereco ||
      !companion.endereco.tipo ||
      !companion.endereco.logradouro ||
      !companion.endereco.bairro ||
      !companion.endereco.cidade ||
      !companion.endereco.uf ||
      !companion.endereco.numero ||
      !companion.endereco.numeroCep ||
      !companion.endereco.complementoCep ||
      !companion.numeroCpfResponsavel ||
      !companion.digitoCpfResponsavel ||
      !companion.codigoPaisResidente
    )
  }

  return (
    <s.Card>
      <s.CardContentWrapper>
        <s.CardTitleWrapper>
          <Text type="subheading" bold color="gray5">
            DECLARAÇÃO DE ACOMPANHANTES
          </Text>
        </s.CardTitleWrapper>
        {form.acompanhantes?.map((companion, index) => (
          <ItemWrapper key={uuid()}>
            <Companion>
              <DataRow
                label={`Acompanhante ${index + 1}`}
                value={companion.nome ?? ''}
                error={checkEmptyCompanionFields(companion)}
              />
              <ButtonLink
                hasNotification={checkEmptyCompanionFields(companion)}
              >
                ALTERAR
              </ButtonLink>
            </Companion>
            <Divisor />
          </ItemWrapper>
        ))}
      </s.CardContentWrapper>
    </s.Card>
  )
}

export default CompanionInfoCard
