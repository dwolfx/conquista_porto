import React from 'react'
import Divisor from 'components/Divisor'
import StepBar from 'components/StepBar'
import useMedia from 'hooks/useMedia'
import { texts } from 'pages/ConsortiumBuilding/commons/Texts'
import PersonalDataCard from './PersonalDataCard'
import ContactCard from './ContactCard'
import CardStructure from './CardStructure'
import useFetchCustomerProfile from 'hooks/CustomerProfile/useFetchCustomerProfile'

import * as s from './styles'

export interface IPersonalDataForm {
  civilStatus: string
  spouseName?: string
  spouseDocument?: string
}

const InformationConfirmation: React.FC = () => {
  const { hire, page, buttons } = texts()
  const [personalDataForm, setPersonalDataForm] = React.useState<
    IPersonalDataForm
  >({
    civilStatus: '',
    spouseName: '',
    spouseDocument: '',
  })
  const isSmUp = useMedia('smUp')
  const isLgUp = useMedia('lgUp')

  useFetchCustomerProfile()

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
