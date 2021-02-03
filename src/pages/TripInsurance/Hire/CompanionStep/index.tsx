import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { uuid } from 'uuidv4'
import { Col } from 'styled-bootstrap-grid'
import 'styled-components/macro'

import Icon from 'components/IconExporter'
import ButtonLink from 'components/Button/Link'
import { ICompanion, IForm, Steps } from 'pages/TripInsurance/Creation/types'
import StepBar from 'components/StepBar'
import { useToast } from 'hooks/toast'
import useStackFluxManagement from 'hooks/FluxManagement/useStackFluxManagement'

import useMedia from 'hooks/useMedia'
import { StepComponentProps } from 'hooks/FluxManagement/types'

import { GetTripInsuranceCreditCardRequest } from 'store/modules/TripInsurance/CreditCard/action'
import { ITripInsuranceCreditCard } from 'store/modules/TripInsurance/CreditCard/types'

import useFormFluxManagement from 'hooks/FluxManagement/useFormFluxManagement'
import Divisor from 'components/Divisor'
import Text from 'components/Text'
import CompanionEditDrawer from './EditDrawer'

import * as s from './styles'

const CompanionStep = () => {
  const { instantiate } = useStackFluxManagement<StepComponentProps>()
  const { form } = useFormFluxManagement<IForm>()
  const isDesktop = useMedia('lgUp')
  const isTablet = useMedia('mdUp')
  const isMobile = useMedia('sm')
  const dispatch = useDispatch()
  const { addToast } = useToast()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [companions, setCompanions] = useState<ICompanion[]>([])
  const [selectedCompanion, setSelectedCompanion] = useState<number>(0)
  const [greaterThanSeventy, setGreaterThanSeventy] = useState<number>(0)
  const [lessThanSeventy, setLessThanSeventy] = useState<number>(0)
  const [isCompanionsFilled, setIsCompanionsFilled] = useState(false)
  const [companionAge, setCompanionAge] = useState<number>(0)

  useEffect(() => {
    setCompanions(form.acompanhantes || [])
    setGreaterThanSeventy(form.qtdPassagMaiorSetentaAnos || 0)
    setLessThanSeventy(form.qtdPassagMenorSetentaAnos || 0)
    const checkAllStatusTrue = form.acompanhantes?.every(
      companion => companion.status === true
    )
    if (checkAllStatusTrue) {
      setIsCompanionsFilled(true)
    }
  }, [form])

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

  const renderStatusBody = (companionStatus: boolean) => (
    <s.StatusWrapper>
      <Icon
        width="21"
        name={companionStatus ? 'check' : 'closerounded'}
        color={companionStatus ? 'green4' : 'magenta2'}
      />
      {!isMobile && (
        <s.StatusText color={companionStatus ? 'green4' : 'magenta2'}>
          {companionStatus ? 'Dados preenchidos' : 'Dados não inseridos'}
        </s.StatusText>
      )}
    </s.StatusWrapper>
  )

  const renderTableBody = (
    companionsList: ICompanion[],
    companionAgeQuantity: number,
    companionAgeType: number
  ) => {
    if (companionAgeType === 70) {
      companionsList = companionsList.slice(0, companionAgeQuantity)
    } else {
      companionsList = companionsList.slice(
        Math.max(companionsList.length - companionAgeQuantity)
      )
    }
    return companionsList.map((companion: ICompanion, index) => (
      <s.Tr key={uuid()}>
        <s.Td>
          <s.NameText bold>
            {companion?.nome || `Acompanhante ${index + 1}`}
          </s.NameText>
          <ButtonLink
            data-gtm-type="click"
            data-gtm-clicktype="link"
            noIcon
            noIconPadding
            data-gtm-name={
              companion?.status ? 'Alterar Dados ' : 'Inserir Dados'
            }
            onClick={() => {
              setCompanionAge(companionAgeType)
              setSelectedCompanion(companion?.id || 0)
              setIsDrawerOpen(true)
            }}
          >
            {companion?.status ? 'ALTERAR DADOS ' : 'INSERIR DADOS'}
          </ButtonLink>
        </s.Td>
        <s.Td center>{renderStatusBody(!!companion?.status)}</s.Td>
      </s.Tr>
    ))
  }

  return (
    <s.Section>
      <CompanionEditDrawer
        isDrawerOpen={isDrawerOpen}
        handleClose={setIsDrawerOpen}
        companions={companions}
        selectedCompanion={selectedCompanion}
        companionAge={companionAge}
      />
      <StepBar
        title="Contratação"
        type="Seguro Viagem"
        actualStep={2}
        totalNumberOfSteps={4}
      />
      <s.ContentWrapper>
        <s.Row
          alignItems="start"
          justifyContent={isDesktop ? 'start' : 'center'}
        >
          <Col md={12} sm={12} lg={3}>
            {isDesktop ? (
              <s.ContentInfo>
                <s.ContentInfoText>
                  <Text type="heading4" bold color="gray6">
                    Acompanhantes
                  </Text>
                </s.ContentInfoText>
                <Divisor />
                <s.ContentInfoText>
                  <Text type="headline" color="gray6">
                    Aqui você vai inserir os dados das pessoas que irão viajar
                    junto com você.
                  </Text>
                </s.ContentInfoText>
              </s.ContentInfo>
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
          <Col xs={12} sm={12} md={12} lg={9}>
            <s.Card>
              {lessThanSeventy > 0 && (
                <s.CardContentWrapper>
                  <s.TitleText
                    type="subheading"
                    bold
                    textTransform="uppercase"
                    textAlign={isMobile ? 'center' : 'left'}
                    color="gray5"
                  >
                    acompanhantes até 70 anos
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
                      {renderTableBody(companions, lessThanSeventy, 70)}
                    </s.Tbody>
                  </s.Table>
                </s.CardContentWrapper>
              )}
              {greaterThanSeventy > 0 && (
                <s.CardContentWrapper>
                  <s.TitleText
                    type="subheading"
                    bold
                    textTransform="uppercase"
                    textAlign={isMobile ? 'center' : 'left'}
                    color="gray5"
                  >
                    acompanhantes de 71 até 90 anos
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
                      {renderTableBody(companions, greaterThanSeventy, 71)}
                    </s.Tbody>
                  </s.Table>
                </s.CardContentWrapper>
              )}
            </s.Card>
          </Col>
        </s.Row>
      </s.ContentWrapper>
      <s.FooterContainer>
        <s.ContentWrapperFooter>
          <s.NextButton
            disabled={!isCompanionsFilled}
            loading={isCreditCardLoading}
            color="secondary"
            onClick={() => handleClick()}
          >
            continuar
          </s.NextButton>
        </s.ContentWrapperFooter>
      </s.FooterContainer>
    </s.Section>
  )
}

export default CompanionStep
