import React from 'react'
import { Col, Container, Row } from 'styled-bootstrap-grid'

import StepBar from 'pages/TripInsurance/commons/StepBar'
import Text from 'components/Text'

import AddressCard from './AddressCard'
import ClientDataCard from './ClientDataCard'
import ClientContactDetailsCard from './ClientContactDetailsCard'
import CompanionInfoCard from './CompanionInfoCard'
import ContactInfoAccidentsCaseCard from './ContactInfoAccidentsCaseCard'
import PaymentInfoCard from './PaymentInfoCard'
import PoliticallyExposedPersonCard from './PoliticallyExposedPersonCard'

import useMedia from 'hooks/useMedia'
// import useStackFluxManagement from 'hooks/FluxManagement/useStackFluxManagement'

import * as S from './styles'

const InsuranceSummary = () => {
  const isMobile = useMedia('xs')
  // const { instantiate } = useStackFluxManagement<{}>()

  return (
    <>
      <StepBar title="Contratação" actualStep={2} totalNumberOfSteps={2} />
      <S.Container>
        <Row>
          <S.HeaderCol lg={3} md={3} sm={12}>
            <S.HeaderWrapper>
              <S.HeaderTitleWrapper>
                <Text type="heading4" bold color="gray6">
                  Proposta de Seguro Viagem especial para você!
                </Text>
              </S.HeaderTitleWrapper>

              <S.HeaderTitleWrapper>
                <Text type={isMobile ? 'body' : 'headline'} color="gray6">
                  Se precisar tirar dúvidas fale com seu parceiro.
                </Text>
              </S.HeaderTitleWrapper>
            </S.HeaderWrapper>
          </S.HeaderCol>

          <Col lg={8} md={9} sm={12}>
            <ClientDataCard />
            <ClientContactDetailsCard />
            <PoliticallyExposedPersonCard />
            <AddressCard />
            <ContactInfoAccidentsCaseCard />
            <CompanionInfoCard />
            <PaymentInfoCard />
          </Col>
        </Row>
      </S.Container>

      <S.FooterContainer>
        <Container>
          <Row>
            <Col lg={3} md={3} sm={12} />
            <S.FooterCol lg={8} md={9} sm={12}>
              <S.Button color="primary" outline>
                rejeitar proposta
              </S.Button>
              <S.Popover
                placement="top"
                content={
                  <Text bold type="body" color="gray5">
                    Há campos vazios ou com
                    <br />
                    erros. Por favor, verifique e
                    <br />
                    tente novamente.
                  </Text>
                }
              >
                <S.Button color="secondary" disabled>
                  concluir contratação
                </S.Button>
              </S.Popover>
            </S.FooterCol>
          </Row>
        </Container>
      </S.FooterContainer>
    </>
  )
}

export default InsuranceSummary
