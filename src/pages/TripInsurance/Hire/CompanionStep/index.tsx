import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { uuid } from 'uuidv4'
import { Col } from 'styled-bootstrap-grid'

import Icon from 'components/IconExporter'
import ButtonLink from 'components/Button/Link'
import DivisorDescription from 'pages/TripInsurance/commons/DivisorDescription'
import StepBar from 'pages/TripInsurance/commons/StepBar'
import CompanionEditDrawer from './EditDrawer'
import { useToast } from 'hooks/toast'
import useStackFluxManagement from 'hooks/FluxManagement/useStackFluxManagement'

import useMedia from 'hooks/useMedia'
import { StepComponent, StepComponentProps } from 'hooks/FluxManagement/types'

import { GetTripInsuranceCreditCardRequest } from 'store/modules/TripInsurance/CreditCard/action'
import { ITripInsuranceCreditCard } from 'store/modules/TripInsurance/CreditCard/types'

import { Steps } from 'pages/TripInsurance/Creation/types'

import * as s from './styles'
import { IFormDrawerCompanion } from './EditDrawer/types'

const renderTableCompanionDataMock: IFormDrawerCompanion[] = [
  {
    name: 'Bruno Mizhari',
    status: true,
    documentNumber: '000.000.001-91',
    birthdayDate: new Date(1995, 10, 8),
    gender: { id: 1, name: 'Masculino' },
    isBrazilianResident: false,
    hasPoliticallyExposedPerson: false,
    isSameContactForEmergencyData: true,
  },
  {
    name: '',
    status: false,
    documentNumber: '000.000.001-92',
    birthdayDate: new Date(1995, 12, 1),
    gender: { id: 1, name: 'Feminino' },
    isBrazilianResident: false,
    hasPoliticallyExposedPerson: false,
    isSameContactForEmergencyData: true,
  },
  {
    name: '',
    status: false,
    documentNumber: '000.000.001-93',
    birthdayDate: new Date(1999, 8, 11),
    gender: { id: 1, name: 'Feminino' },
    isBrazilianResident: false,
    hasPoliticallyExposedPerson: false,
    isSameContactForEmergencyData: true,
  },
  {
    name: '',
    status: false,
    documentNumber: '000.000.001-92',
    birthdayDate: new Date(1991, 3, 28),
    gender: { id: 1, name: 'Masculino' },
    isBrazilianResident: false,
    hasPoliticallyExposedPerson: false,
    isSameContactForEmergencyData: true,
  },
]

const CompanionStep: StepComponent = () => {
  const dispatch = useDispatch()
  const { addToast } = useToast()
  const isDesktop = useMedia('lgUp')
  const isTablet = useMedia('mdUp')
  const isMobile = useMedia('sm')
  const { instantiate } = useStackFluxManagement<StepComponentProps>()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [companionEditable, setCompanionEditable] = useState<
    IFormDrawerCompanion
  >({
    name: '',
    status: false,
    documentNumber: '',
    birthdayDate: new Date(),
    gender: { id: 0, name: '' },
    isBrazilianResident: false,
    hasPoliticallyExposedPerson: false,
    isSameContactForEmergencyData: true,
  })

  const { creditCardData, isCreditCardLoading } = useSelector(
    (state: { tripInsuranceCreditCard: ITripInsuranceCreditCard }) => ({
      creditCardData: state.tripInsuranceCreditCard.data,
      isCreditCardLoading: state.tripInsuranceCreditCard.isLoading,
    })
  )

  const handleClick = () => {
    if (!creditCardData) {
      dispatch(
        GetTripInsuranceCreditCardRequest({
          onSuccess: instantiate,
          Step: Steps.paymentStep,
          onErrorToast: addToast,
        })
      )
    } else {
      instantiate(Steps.paymentStep)
    }
  }

  const renderStatusBody = (companionStatus: boolean) => {
    return (
      <s.StatusWrapper>
        <Icon
          width="21"
          color={companionStatus ? 'green4' : 'magenta2'}
          name={companionStatus ? 'check' : 'closerounded'}
        />
        {!isMobile && (
          <s.StatusText
            type="caption"
            bold
            color={companionStatus ? 'green4' : 'magenta2'}
          >
            {companionStatus ? 'Dados preenchidos' : 'Dados não inseridos'}
          </s.StatusText>
        )}
      </s.StatusWrapper>
    )
  }

  const renderTableBody = (companions: IFormDrawerCompanion[]) => {
    return companions.map((companion: IFormDrawerCompanion, index) => (
      <s.Tr key={uuid()}>
        <s.Td>
          <s.NameText bold>
            {companion.name || `Acompanhante ${index + 1}`}
            <ButtonLink
              data-gtm-type="click"
              data-gtm-clicktype="link"
              data-gtm-name={
                companion.status ? 'Alterar Dados ' : 'Inserir Dados'
              }
              noIcon={true}
              noIconPadding
              onClick={() => {
                setCompanionEditable(companion)
                setIsDrawerOpen(true)
              }}
            >
              INSERIR DADOS
            </ButtonLink>
          </s.NameText>
        </s.Td>
        <s.Td>{renderStatusBody(companion.status)}</s.Td>
      </s.Tr>
    ))
  }

  return (
    <s.Section>
      <CompanionEditDrawer
        isDrawerOpen={isDrawerOpen}
        handleClose={setIsDrawerOpen}
        companion={companionEditable}
      />
      <StepBar actualStep={2} totalNumberOfSteps={5} />
      <s.ContentWrapper>
        <s.Row
          alignItems="center"
          justifyContent={isDesktop ? 'start' : 'center'}
        >
          <Col sm={12} md={12} lg={3}>
            {isDesktop ? (
              <DivisorDescription
                title="Acompanhantes"
                text="Aqui você vai inserir os dados
                  das pessoas que irão viajar junto com você."
              />
            ) : (
              <>
                <s.DescriptionText
                  textAlign={isTablet ? 'center' : 'unset'}
                  type="heading4"
                  color="gray6"
                  bold
                >
                  Acompanhantes
                </s.DescriptionText>
                <s.DescriptionText
                  textAlign={isTablet ? 'center' : 'unset'}
                  type="headline"
                  color="gray6"
                >
                  Aqui você vai inserir os dados das pessoas que irão viajar
                  junto com você.
                </s.DescriptionText>
              </>
            )}
          </Col>
          <Col offset={isDesktop ? 1 : 0} xs={12} sm={12} md={10} lg={8}>
            <s.Card>
              <s.TitleText
                type="subheading"
                bold
                textTransform="uppercase"
                textAlign={isMobile ? 'center' : 'left'}
                color="gray5"
              >
                Declaração de Acompanhante
              </s.TitleText>
              <s.Table>
                <s.Thead>
                  <s.THeadTr>
                    <s.Th>
                      <s.Text type="subheading" bold color="gray6">
                        NOMES
                      </s.Text>
                    </s.Th>
                    <s.Th>
                      <s.Text type="subheading" bold color="gray6">
                        STATUS
                      </s.Text>
                    </s.Th>
                  </s.THeadTr>
                </s.Thead>
                <s.Tbody>
                  {renderTableBody(renderTableCompanionDataMock)}
                </s.Tbody>
              </s.Table>
            </s.Card>
          </Col>
        </s.Row>
      </s.ContentWrapper>
      <s.FooterContainer>
        <s.NextButton
          loading={isCreditCardLoading}
          color="secondary"
          onClick={() => handleClick()}
        >
          próximo
        </s.NextButton>
      </s.FooterContainer>
    </s.Section>
  )
}

export default CompanionStep
