import React from 'react'

import Divisor from 'components/Divisor'
import StepBar from 'components/StepBar'
import useMedia from 'hooks/useMedia'
import { TextsConsortiumBuilding } from 'pages/ConsortiumBuilding/commons/Texts'

import { TSelected } from 'components/Inputs/Select/types'
import PersonalDataCard from './PersonalDataCard'
import ContactCard from './ContactCard'
import CardStructure from './CardStructure'
import DocumentCard from './DocumentCard'

import {
  IAddressForm,
  IDocumentForm,
  IFinancialForm,
  IPersonalDataForm,
  IPpeForm,
} from './types'
import PpeCard from './PpeCard'
import FinancialCard from './FinancialCard'
import AddressCard from './AddressCard'

import * as s from './styles'

const InformationConfirmation: React.FC = () => {
  const { hire, page, buttons } = TextsConsortiumBuilding()

  const [personalDataForm, setPersonalDataForm] = React.useState<
    IPersonalDataForm
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

  const [documentForm, setDocumentForm] = React.useState<IDocumentForm>({
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

  const [ppe, setPee] = React.useState<IPpeForm>({
    isPpe: false,
    whoPoliticallyExport: '',
  })

  const [financial, setFinancial] = React.useState<IFinancialForm>({
    profession: '',
    grossMonthlyIncome: '',
  })

  const [address, setAddress] = React.useState<IAddressForm>({
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
      !!documentForm.documentNumber &&
      !!documentForm.dateDispatch &&
      !!documentForm.expeditedBody &&
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
      !!financial.grossMonthlyIncome

    if (['Casado', 'União Estável'].includes(personalDataForm.civilStatus)) {
      validDefault =
        validDefault &&
        !!personalDataForm.spouseDocument &&
        !!personalDataForm.spouseName
    }

    if (ppe.isPpe) {
      validDefault = validDefault && !!ppe.whoPoliticallyExport
    }

    if (isForeignResidency) {
      validDefault =
        validDefault &&
        !!documentForm.documentNumberNIF &&
        !!documentForm.fatca &&
        !!documentForm.passportNumber &&
        !!documentTypeSelect.name &&
        !!documentForm.passportIssuingCountry
    }

    return validDefault
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
