import React from 'react'
import Divisor from 'components/Divisor'
import StepBar from 'components/StepBar'
import useMedia from 'hooks/useMedia'
import { texts } from 'pages/ConsortiumBuilding/commons/Texts'
import useFetchCustomerProfile from 'hooks/CustomerProfile/useFetchCustomerProfile'
import { useDispatch } from 'react-redux'
import { GetCountriesRequest } from 'store/modules/ConsortiumBuilding/Countries/action'
import { GetCivilStatusRequest } from 'store/modules/ConsortiumBuilding/CivilStatus/action'
import { GetFatcaRequest } from 'store/modules/ConsortiumBuilding/Fatca/action'
import PersonalDataCard from './PersonalDataCard'
import ContactCard from './ContactCard'
import CardStructure from './CardStructure'
import DocumentCard from './DocumentCard'

import * as s from './styles'
import { IDocumentForm, IPersonalDataForm } from './types'

const InformationConfirmation: React.FC = () => {
  const dispatch = useDispatch()
  const { hire, page, buttons } = texts()
  const [personalDataForm, setPersonalDataForm] = React.useState<
    IPersonalDataForm
  >({
    civilStatus: '',
    spouseName: '',
    spouseDocument: '',
  })

  const [documentForm, setDocumentForm] = React.useState<IDocumentForm>({
    isForeignResidency: false,
    documentType: '',
    address: '',
    documentNumber: '',
    dateDispatch: '',
    expeditedBody: '',
    foreignResidence: '',
    countryResidence: '',
    documentNumberNIF: '',
    fatca: '',
    passportNumber: '',
    passportType: '',
    passportIssuingCountry: '',
  })

  const [isForeignResidency, setIsForeignResidency] = React.useState<boolean>(
    false
  )

  const isSmUp = useMedia('smUp')
  const isLgUp = useMedia('lgUp')

  useFetchCustomerProfile()

  React.useEffect(() => {
    dispatch(GetCountriesRequest())
    dispatch(GetCivilStatusRequest())
    dispatch(GetFatcaRequest())
  }, [dispatch])

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
            title={hire.steps.informationConfirmation.containerThird.title}
          >
            <DocumentCard
              documentData={[documentForm, setDocumentForm]}
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
        </s.Column>
      </s.ContentContainer>
      <s.FooterContainer>
        <s.FooterContent>
          <s.RowContent>
            <s.Column lg={3} />
            <s.Column lg={8} md={11}>
              <s.ButtonAlign>
                <s.NextButton color="secondary">{buttons.next}</s.NextButton>
              </s.ButtonAlign>
            </s.Column>
          </s.RowContent>
        </s.FooterContent>
      </s.FooterContainer>
    </>
  )
}

export default InformationConfirmation
