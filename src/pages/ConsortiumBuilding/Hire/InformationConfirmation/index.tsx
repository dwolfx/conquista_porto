import React from 'react'

import Divisor from 'components/Divisor'
import StepBar from 'components/StepBar'
import useMedia from 'hooks/useMedia'
import { TextsConsortiumBuilding } from 'pages/ConsortiumBuilding/commons/Texts'
import { cpf } from 'cpf-cnpj-validator'
import { TSelected } from 'components/Inputs/Select/types'
import useFormFluxManagement from 'hooks/FluxManagement/useFormFluxManagement'
import { IFormConsortiumBuilding } from 'pages/ConsortiumBuilding/Creation/types'
import { ErrorForm } from 'pages/ConsortiumBuilding/commons/ErrorForm'
import { formatMoneyDecimal } from 'helpers'
import PersonalDataCard from './PersonalDataCard'
import ContactCard from './ContactCard'
import CardStructure from './CardStructure'
import DocumentCard from './DocumentCard'

import * as t from './types'

import PpeCard from './PpeCard'
import FinancialCard from './FinancialCard'
import AddressCard from './AddressCard'

import * as s from './styles'
import {
  validationErrorDateDispatch,
  validationErrorDocument,
  validationErrorExpeditedBody,
  validationErrorNIF,
  validationErrorPassportNumber,
} from './DocumentCard/utils'

const InformationConfirmation: React.FC = () => {
  const { hire, page, buttons } = TextsConsortiumBuilding()
  const { form } = useFormFluxManagement<IFormConsortiumBuilding>()

  const [personalDataForm, setPersonalDataForm] = React.useState<
    t.IPersonalDataForm
  >({
    civilStatus: '',
    spouseName: '',
    spouseDocument: '',
  })

  const [documentTypeSelect, setDocumentTypeSelect] = React.useState<TSelected>(
    {
      id: 0,
      name: '',
    }
  )

  const [documentForm, setDocumentForm] = React.useState<t.IDocumentForm>({
    isForeignResidency: false,
    documentNumber: '',
    dateDispatch: '',
    expeditedBody: '',
    foreignResidence: '',
    documentNumberNIF: '',
    fatca: '',
    passportNumber: '',
    passportType: '',
    passportIssuingCountry: '',
  })

  const [isForeignResidency, setIsForeignResidency] = React.useState<boolean>(
    false
  )

  const [ppe, setPee] = React.useState<t.IPpeForm>({
    isPpe: false,
    whoPoliticallyExport: '',
  })

  const [financial, setFinancial] = React.useState<t.IFinancialForm>({
    profession: '',
    grossMonthlyIncome: '',
  })

  const [address, setAddress] = React.useState<t.IAddressForm>({
    tipo: 'Rua',
    logradouro: '',
    bairro: '',
    cidade: '',
    uf: '',
    complemento: '',
    numero: '',
    numeroCep: '',
    complementoCep: '',
  })

  const isSmUp = useMedia('smUp')
  const isLgUp = useMedia('lgUp')

  const isDisabled = (): boolean => {
    let validDefault: boolean =
      !!personalDataForm.civilStatus &&
      !!documentTypeSelect.name &&
      validationErrorDocument(
        documentForm.documentNumber,
        true,
        documentTypeSelect.name
      ) === undefined &&
      !!documentForm.dateDispatch &&
      validationErrorDateDispatch(documentForm.dateDispatch, true) ===
        undefined &&
      documentTypeSelect.name === 'RNE'
        ? true
        : validationErrorExpeditedBody(documentForm.expeditedBody, true) ===
            undefined &&
          !!address.bairro &&
          !!address.cidade &&
          !!address.complementoCep &&
          !!address.logradouro &&
          !!address.numero &&
          !!address.numero &&
          !!address.numeroCep &&
          !!address.tipo &&
          !!address.uf &&
          !!financial.profession &&
          validationGrossMonthlyIncome(!!financial.grossMonthlyIncome) ===
            undefined &&
          !!financial.grossMonthlyIncome

    if (['Casado', 'União Estável'].includes(personalDataForm.civilStatus)) {
      validDefault =
        validDefault &&
        !!personalDataForm.spouseDocument &&
        !!personalDataForm.spouseName &&
        cpf.isValid(personalDataForm.spouseDocument)
    }

    if (ppe.isPpe) {
      validDefault = validDefault && !!ppe.whoPoliticallyExport
    }

    if (isForeignResidency) {
      validDefault =
        validDefault &&
        !!documentForm.documentNumberNIF &&
        validationErrorNIF(documentForm.documentNumberNIF, true) ===
          undefined &&
        !!documentForm.fatca &&
        !!documentForm.passportNumber &&
        validationErrorPassportNumber(documentForm.passportNumber, true) ===
          undefined &&
        !!documentTypeSelect.name &&
        !!documentForm.passportIssuingCountry
    }

    return validDefault
  }

  const validationGrossMonthlyIncome = (
    validForm: boolean
  ): t.IValidationFunction => {
    if (form && form.plan && form.plan.valorParcela) {
      const { grossMonthlyIncomeValidationMessage } = ErrorForm(
        formatMoneyDecimal(form.plan?.valorParcela)
      )

      const percentageGrossMonthlyIncome = 0.3 // 30%
      const valueSalary =
        Number(financial.grossMonthlyIncome.replace(/\D/g, '')) / 100

      const resultPercentageSalary = valueSalary * percentageGrossMonthlyIncome

      if (form.plan?.valorParcela > resultPercentageSalary && validForm) {
        return grossMonthlyIncomeValidationMessage
      }
    }

    return undefined
  }

  return (
    <>
      <StepBar
        title={hire.title}
        type={page}
        actualStep={hire.steps.informationConfirmation.actualStep}
        totalNumberOfSteps={hire.stepMax}
      />
      <s.ContentContainer>
        <s.Column lg={3}>
          <s.TitleWrapper>
            <s.TitleText type="heading4" bold>
              {hire.steps.informationConfirmation.title}
            </s.TitleText>
            {isLgUp ? <Divisor /> : null}
            <s.TitleText color="gray6" type={isSmUp ? 'headline' : 'body'}>
              {hire.steps.informationConfirmation.subtitle}
            </s.TitleText>
          </s.TitleWrapper>
        </s.Column>
        <s.Column lg={8} md={10}>
          <CardStructure
            title={hire.steps.informationConfirmation.containerFirst.title}
            link={hire.steps.informationConfirmation.containerFirst.link}
          >
            <PersonalDataCard
              personalData={[personalDataForm, setPersonalDataForm]}
              label={hire.steps.informationConfirmation.containerFirst.label}
            />
          </CardStructure>
          <CardStructure
            title={hire.steps.informationConfirmation.containerSecond.title}
            link={hire.steps.informationConfirmation.containerSecond.link}
          >
            <ContactCard
              label={hire.steps.informationConfirmation.containerSecond.label}
            />
          </CardStructure>
          <CardStructure
            title={hire.steps.informationConfirmation.containerFourth.title}
            link={hire.steps.informationConfirmation.containerFourth.link}
          >
            <AddressCard
              addressData={[address, setAddress]}
              texts={hire.steps.informationConfirmation.containerFourth}
            />
          </CardStructure>
          <CardStructure
            title={hire.steps.informationConfirmation.containerThird.title}
          >
            <DocumentCard
              documentData={[documentForm, setDocumentForm]}
              documentType={[documentTypeSelect, setDocumentTypeSelect]}
              isForeignResidency={[isForeignResidency, setIsForeignResidency]}
              label={hire.steps.informationConfirmation.containerThird.label}
              text={
                hire.steps.informationConfirmation.containerThird.messageRNE
              }
              placeholder={
                hire.steps.informationConfirmation.containerThird.placeholder
              }
            />
          </CardStructure>
          <CardStructure
            title={hire.steps.informationConfirmation.containerFifth.title}
          >
            <PpeCard
              ppeData={[ppe, setPee]}
              label={hire.steps.informationConfirmation.containerFifth.text}
            />
          </CardStructure>
          <CardStructure
            title={hire.steps.informationConfirmation.containerSixth.title}
          >
            <FinancialCard
              financialData={[financial, setFinancial]}
              validationGrossMonthlyIncome={validationGrossMonthlyIncome}
              label={hire.steps.informationConfirmation.containerSixth.label}
            />
          </CardStructure>
        </s.Column>
      </s.ContentContainer>
      <s.FooterContainer>
        <s.FooterContent>
          <s.RowContent>
            <s.Column lg={3} />
            <s.Column lg={8} md={11}>
              <s.ButtonAlign>
                <s.NextButton
                  data-testid="button-next-id"
                  color="secondary"
                  disabled={!isDisabled()}
                >
                  {buttons.next}
                </s.NextButton>
              </s.ButtonAlign>
            </s.Column>
          </s.RowContent>
        </s.FooterContent>
      </s.FooterContainer>
    </>
  )
}

export default InformationConfirmation
