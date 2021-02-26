import React from 'react'

import { dict } from 'components/IconExporter'

import { cpf, formatCpf } from 'helpers'

import { Card, CardTitle, ContentWrapper } from '../styles'
import * as s from './styles'
import * as t from '../types'
import * as u from '../utils'

export const SectionThree: React.FC<t.ISectionThree> = ({
  setIsSectionValid,
  sectionThreeRef,
  customer,
  hasPoliticallyExposedPersonState,
  selectedPoliticalyExposedKinshipState,
  politicalyExposedPersonNameState,
  politicalyExposedPersonCPFState,
  ...rest
}) => {
  const [isCPFValid, setIsCPFValid] = React.useState<boolean>(true)
  const [
    hasPoliticallyExposedPerson,
    setHasPoliticallyExposedPerson,
  ] = hasPoliticallyExposedPersonState
  const [
    selectedPoliticalyExposedKinship,
    setSelectedPoliticalyExposedKinship,
  ] = selectedPoliticalyExposedKinshipState
  const [
    politicalyExposedPersonName,
    setPoliticalyExposedPersonName,
  ] = politicalyExposedPersonNameState
  const [
    politicalyExposedPersonCPF,
    setPoliticalyExposedPersonCPF,
  ] = politicalyExposedPersonCPFState

  const checkSectionThreeValidity = React.useCallback(
    (): boolean =>
      hasPoliticallyExposedPerson
        ? typeof selectedPoliticalyExposedKinship.id === 'number' &&
          selectedPoliticalyExposedKinship.id > 0 &&
          politicalyExposedPersonName.length > 0 &&
          politicalyExposedPersonCPF.length === 11 &&
          isCPFValid
        : true,
    [
      hasPoliticallyExposedPerson,
      selectedPoliticalyExposedKinship.id,
      politicalyExposedPersonName,
      politicalyExposedPersonCPF,
      isCPFValid,
    ]
  )

  React.useEffect(() => {
    setIsSectionValid(checkSectionThreeValidity())
  }, [setIsSectionValid, checkSectionThreeValidity])

  // Reset fields values
  React.useEffect(() => {
    if (!hasPoliticallyExposedPerson) {
      setSelectedPoliticalyExposedKinship({ id: 0, name: '' })
      setPoliticalyExposedPersonName('')
      setPoliticalyExposedPersonCPF('')
      setIsCPFValid(true)
    }
  }, [
    hasPoliticallyExposedPerson,
    setPoliticalyExposedPersonCPF,
    setPoliticalyExposedPersonName,
    setSelectedPoliticalyExposedKinship,
  ])

  // Check if the CPF value is equal to customer CPF when the kinship value is not '7'
  React.useEffect(() => {
    if (
      selectedPoliticalyExposedKinship.id !== 7 &&
      customer &&
      customer.cpfCliente
    ) {
      if (politicalyExposedPersonCPF === `${customer.cpfCliente}`) {
        setIsCPFValid(false)
      }
    }
  }, [selectedPoliticalyExposedKinship, politicalyExposedPersonCPF, customer])

  // Set name and CPF case kinship is equal ({ id: 7, name: 'Segurado', })
  React.useEffect(() => {
    if (selectedPoliticalyExposedKinship.id === 7 && customer) {
      setPoliticalyExposedPersonName(customer.nomeCliente)
      setPoliticalyExposedPersonCPF(`${customer.cpfCliente}`)
    }
  }, [
    selectedPoliticalyExposedKinship,
    customer,
    setPoliticalyExposedPersonName,
    setPoliticalyExposedPersonCPF,
  ])

  return (
    <section id="section-3" ref={sectionThreeRef} {...rest}>
      <Card overflow="visible">
        <CardTitle bold type="subheading" color="gray5">
          PESSOA POLITICAMENTE EXPOSTA (PPE)
        </CardTitle>
        <ContentWrapper>
          <s.Text bold type="headline">
            Segurado é ou possui parentesco com uma pessoa politicamente
            exposta?
          </s.Text>
          <s.Text bold color="gray5">
            Pessoa Exposta Politicamente é aquela que desempenha ou desempenhou
            nos últimos cinco anos, cargos, empregos ou funções públicas
            relevantes como chefes de estado e de governo, políticos, altos
            servidores dos poderes públicos, magistrados ou militares de alto
            nível, dirigentes de empresas públicas ou dirigentes de partidos
            políticos.
          </s.Text>
          <s.RadioContainer>
            <s.Radio
              options={[...u.radioOptions].reverse()}
              itemsDirection="row"
              justifyContent="flex-start"
              checkedItem={hasPoliticallyExposedPerson ? '1' : '0'}
              onChange={(event: React.FormEvent<HTMLInputElement>) =>
                setHasPoliticallyExposedPerson(
                  event.currentTarget.value === '1'
                )
              }
            />
          </s.RadioContainer>
          {hasPoliticallyExposedPerson ? (
            <>
              <s.Select
                options={u.getPoliticalyExposedKinshipOptions(
                  setSelectedPoliticalyExposedKinship
                )}
                selected={selectedPoliticalyExposedKinship}
                label="Quem é a pessoa políticamente exposta?"
                optionBoxSize={250}
              />
              {selectedPoliticalyExposedKinship.id !== 7 &&
              selectedPoliticalyExposedKinship.id !== 0 ? (
                <>
                  <s.Input
                    data-gtm-form="input"
                    data-gtm-name="pessoa-politicamente-exposta-nome"
                    name="politicallyExposedPersonName"
                    label="Nome completo"
                    placeholder="Digite aqui"
                    value={politicalyExposedPersonName}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setPoliticalyExposedPersonName(event.target.value)
                    }}
                  />
                  <s.Input
                    data-gtm-form="input"
                    data-gtm-name="pessoa-politicamente-exposta-cpf"
                    name="politicallyExposedPersonCPF"
                    maxLength={14}
                    label="CPF"
                    placeholder="000.000.000-00"
                    value={formatCpf(politicalyExposedPersonCPF)}
                    error={
                      !isCPFValid && {
                        icon: 'alertrounded' as keyof typeof dict,
                        message: 'CPF inválido. Por favor, verifique.',
                      }
                    }
                    onBlur={(event: React.ChangeEvent<HTMLInputElement>) => {
                      politicalyExposedPersonCPF.length < 11
                        ? setIsCPFValid(cpf.isValid(politicalyExposedPersonCPF))
                        : u.checkOnChangeCpfValidity(
                            event.target.value,
                            setIsCPFValid,
                            selectedPoliticalyExposedKinship.id
                              ? +selectedPoliticalyExposedKinship.id
                              : 0,
                            customer ? `${customer.cpfCliente}` : ''
                          )
                    }}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setPoliticalyExposedPersonCPF(
                        event.target.value.replace(/\./g, '').replace('-', '')
                      )
                      u.checkOnChangeCpfValidity(
                        event.target.value,
                        setIsCPFValid,
                        selectedPoliticalyExposedKinship.id
                          ? +selectedPoliticalyExposedKinship.id
                          : 0,
                        customer ? `${customer.cpfCliente}` : ''
                      )
                    }}
                  />
                </>
              ) : null}
            </>
          ) : null}
        </ContentWrapper>
      </Card>
    </section>
  )
}

export default SectionThree
