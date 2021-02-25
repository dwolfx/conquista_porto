import React from 'react'

import DataRow from 'pages/TripInsurance/commons/DataRow'
import WarningFlag from 'pages/TripInsurance/commons/WarningFlag'

import useFormFluxManagement from 'hooks/FluxManagement/useFormFluxManagement'

import { formatCpf } from 'helpers'

import { IForm } from 'pages/TripInsurance/PRO/types'
import { Divisor } from 'pages/TripInsurance/PRO/Creation/PartnerOffer/styles'

import { Card, CardTitle } from '../styles'
import * as s from './styles'
import * as t from '../types'
import * as u from '../utils'

export const SectionOne: React.FC<t.ISectionOne> = ({
  setIsSectionValid,
  brazilianResidentState,
  sectionOneRef,
  ...rest
}) => {
  const { form } = useFormFluxManagement<IForm>()
  const [isBrazilianResident, setIsBrazilianResident] = brazilianResidentState

  const checkSectionOneValidity = React.useCallback(
    (): boolean => isBrazilianResident === '1',
    [isBrazilianResident]
  )

  React.useEffect(() => {
    setIsSectionValid(checkSectionOneValidity())
  }, [setIsSectionValid, checkSectionOneValidity])

  return (
    <section id="section-1" ref={sectionOneRef} {...rest}>
      <Card>
        <CardTitle bold type="subheading" color="gray5">
          DADOS DO CLIENTE
        </CardTitle>
        <DataRow label="Nome" value={form.passageiroPrincipal?.nome ?? ''} />
        <Divisor />
        <DataRow
          label="CPF"
          value={
            form.passageiroPrincipal?.numeroCpf &&
            form.passageiroPrincipal?.digitoCpf
              ? formatCpf(
                  form.passageiroPrincipal?.numeroCpf +
                    form.passageiroPrincipal?.digitoCpf
                )
              : ''
          }
        />
        <Divisor />
        <s.RadioContainer>
          <s.RadioTitle type="headline" bold>
            O cliente reside no Brasil?
          </s.RadioTitle>
          <s.Radio
            options={u.radioOptions}
            itemsDirection="row"
            justifyContent="flex-start"
            checkedItem={isBrazilianResident}
            onChange={(event: React.FormEvent<HTMLInputElement>) =>
              setIsBrazilianResident(event.currentTarget.value)
            }
          />
          {isBrazilianResident === '0' ? (
            <WarningFlag title="Este seguro só poderá ser contratado pelo segurado residente no Brasil." />
          ) : null}
        </s.RadioContainer>
      </Card>
    </section>
  )
}

export default SectionOne
