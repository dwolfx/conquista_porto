import React, { useState, useEffect } from 'react'
import { uuid } from 'uuidv4'
import moment from 'moment'

import ButtonLink from 'components/Button/Link'
import DataRow from 'pages/TripInsurance/commons/DataRow'
import CompanionEditDrawer from 'pages/TripInsurance/Hire/CompanionStep/EditDrawer'
import Divisor from 'components/Divisor'
import Text from 'components/Text'

import useFormFluxManagement from 'hooks/FluxManagement/useFormFluxManagement'

import { calculateAge } from 'helpers'

import { IForm } from 'pages/TripInsurance/PRO/types'
import { ICompanion } from 'pages/TripInsurance/Creation/types'

import { Companion, ItemWrapper } from './styles'
import * as s from '../styles'

interface ICompanionInfoCard {
  isCompanionOverSeventy?: boolean
}

const CompanionInfoCard: React.FC<ICompanionInfoCard> = ({
  isCompanionOverSeventy = false,
}) => {
  const { form } = useFormFluxManagement<IForm>()
  const [companions, setCompanions] = useState<ICompanion[]>([])
  const [filtredCompanions, setFiltredCompanions] = useState<ICompanion[]>([])
  const [isDrawerOpened, setIsDrawerOpened] = useState(false)
  const [selectedCompanion, setSelectedCompanion] = useState<number>(0)
  const [companionAge, setCompanionAge] = useState<number>(0)

  const checkEmptyCompanionFields = (companion: ICompanion): boolean => {
    return (
      !companion.nome ||
      !companion.dataNascimento ||
      !companion.sexo ||
      !companion.numeroCpf ||
      !companion.digitoCpf ||
      !companion.contato ||
      !companion.contato.nome ||
      !companion.contato.celularDDD ||
      !companion.contato.celularNumero ||
      !companion.numeroCpfResponsavel ||
      !companion.digitoCpfResponsavel ||
      !companion.codigoPaisResidente
    )
  }

  useEffect(() => {
    setCompanions(form.acompanhantes || [])
    if (isCompanionOverSeventy) {
      setFiltredCompanions(
        (form.acompanhantes &&
          form.acompanhantes.filter(person => {
            const age = moment(person.dataNascimento, 'DD/MM/YYYY')
            return calculateAge(age.format('DD/MM/YYYY')) > 70
          })) ||
          []
      )
    } else {
      setFiltredCompanions(
        (form.acompanhantes &&
          form.acompanhantes.filter(person => {
            const age = moment(person.dataNascimento, 'DD/MM/YYYY')
            return calculateAge(age.format('DD/MM/YYYY')) <= 70
          })) ||
          []
      )
    }
  }, [form, isCompanionOverSeventy])

  const handleButtonClick = (companionId: number | undefined): void => {
    if (companionId) {
      const companion = companions.find(
        companion => companion.id === companionId
      )
      const age = calculateAge(
        moment(companion?.dataNascimento, 'DD/MM/YYYY').format('DD/MM/YYYY')
      )
      setCompanionAge(age)
      setSelectedCompanion(companionId)
      setIsDrawerOpened(true)
    }
  }

  return (
    <s.Card>
      <CompanionEditDrawer
        isDrawerOpen={isDrawerOpened}
        handleClose={setIsDrawerOpened}
        companions={companions}
        selectedCompanion={selectedCompanion}
        companionAge={companionAge}
        mainPassenger={form.passageiroPrincipal || {}}
      />
      <s.CardContentWrapper>
        <s.CardTitleWrapper>
          <Text type="subheading" bold color="gray5">
            {isCompanionOverSeventy
              ? 'DECLARAÇÃO DE ACOMPANHANTES (DE 71 A 90 ANOS)'
              : 'DECLARAÇÃO DE ACOMPANHANTES (ATÉ 70 ANOS)'}
          </Text>
        </s.CardTitleWrapper>
        {filtredCompanions.map((companion, index) => {
          return (
            <ItemWrapper key={uuid()}>
              <Companion>
                <DataRow
                  label={`Acompanhante ${index + 1}`}
                  value={companion.nome ?? ''}
                  error={checkEmptyCompanionFields(companion)}
                />
                <ButtonLink
                  hasNotification={checkEmptyCompanionFields(companion)}
                  onClick={() => handleButtonClick(companion.id)}
                >
                  ALTERAR
                </ButtonLink>
              </Companion>
              {index === 1 || index === filtredCompanions.length - 1 ? null : (
                <Divisor />
              )}
            </ItemWrapper>
          )
        })}
      </s.CardContentWrapper>
    </s.Card>
  )
}

export default CompanionInfoCard
