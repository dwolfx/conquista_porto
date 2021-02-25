import React from 'react'
import { Row, Col } from 'styled-bootstrap-grid'

import StepBar from 'components/StepBar'
import ButtonLink from 'components/Button/Link'
import Divisor from 'components/Divisor'
import DataRow from '../../commons/DataRow'
import Modal from 'components/Modal/ModalNew'

import { TextsConsortiumBuilding } from 'pages/ConsortiumBuilding/commons/Texts'
import Text from 'components/Text'
import * as s from './styles'

import { Steps } from '../../Creation/types'
import useStackFluxManagement from 'hooks/FluxManagement/useStackFluxManagement'
import { StepComponentProps } from 'hooks/FluxManagement/types'

const Summary = () => {
  const { hire, page, buttons } = TextsConsortiumBuilding()
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false)

  const { instantiate } = useStackFluxManagement<StepComponentProps>()

  //Mock temporário
  const mockSummary = {
    consortium: {
      creditValue: 'R$ 127.264,50',
      reserveFund: '3%',
      lifeInsurance: 'R$ 20,89',
      administrativeFree: '18%',
      earlyAdministrationFree: '2%',
    },
    portion: {
      monthlyInstallment: 'R$ 1.345,29',
      numberInstallment: '200',
      dateForeseenFirstInstallment: '15/12/2020',
      dateOtherPlots: 'Dia 15 de cada mês',
    },
    payment: {
      firstInstallmentPaymentMethod: 'Boleto',
      paymentRemainingInstallments: 'Débito automático em conta corrente',
      bank: '001 – Banco do Brasil S.A. ',
      agency: '01234',
      currentAccount: '051123-3',
      earlyAdministrationFree: '2% dividido nas 12 primeiras parcelas',
    },
  }

  const modalFooterButton = () => (
    <s.ModalFooterWrapper>
      <s.GoBackButton outline onClick={() => instantiate(Steps.chooseState)}>
        {hire.steps.summary.modalBackSimulation.button.goback}
      </s.GoBackButton>
      <s.ContinueButton onClick={() => setIsModalOpen(false)}>
        {hire.steps.summary.modalBackSimulation.button.continue}
      </s.ContinueButton>
    </s.ModalFooterWrapper>
  )

  return (
    <>
      <StepBar
        title={hire.title}
        type={page}
        actualStep={hire.steps.summary.actualStep}
        totalNumberOfSteps={hire.stepMax}
      />
      <Modal
        modalTitle={hire.steps.summary.modalBackSimulation.title}
        isOpen={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
      >
        <Text type="headline" color="gray6">
          {hire.steps.summary.modalBackSimulation.content}
        </Text>
        {modalFooterButton()}
      </Modal>
      <s.Container>
        <Row>
          <Col lg={3} md={10} mdOffset={1} lgOffset={0}>
            <s.HeaderWrapper>
              <s.HeaderTitleWrapper>
                <Text type="heading4" bold color="gray6">
                  {hire.steps.summary.title}
                </Text>
              </s.HeaderTitleWrapper>
              <s.HeaderTitleWrapper>
                <Text type="headline" color="gray6">
                  {hire.steps.summary.subtitle}
                </Text>
              </s.HeaderTitleWrapper>
            </s.HeaderWrapper>
          </Col>
          <Col lg={8} lgOffset={0} md={10} mdOffset={1}>
            <s.Card>
              <s.CardWrapper>
                <s.CardTitleWrapper>
                  <s.CardTitleText
                    type="subheading"
                    bold
                    color="gray5"
                    textTransform="uppercase"
                  >
                    {hire.steps.summary.containerFirst.title}
                  </s.CardTitleText>
                  <ButtonLink onClick={() => setIsModalOpen(true)}>
                    <Text type="button" bold color="blue4" textAlign="right">
                      {hire.steps.summary.containerFirst.link}
                    </Text>
                  </ButtonLink>
                </s.CardTitleWrapper>
                <DataRow
                  label={hire.steps.summary.containerFirst.creditValue}
                  value={mockSummary.consortium.creditValue}
                />
                <Divisor />
                <DataRow
                  label={hire.steps.summary.containerFirst.reserveFund}
                  value={mockSummary.consortium.reserveFund}
                />
                <Divisor />
                <DataRow
                  label={hire.steps.summary.containerFirst.lifeInsurance}
                  value={mockSummary.consortium.lifeInsurance}
                />
                <Divisor />
                <DataRow
                  label={hire.steps.summary.containerFirst.administrativeFree}
                  value={mockSummary.consortium.administrativeFree}
                />
                <Divisor />
                <DataRow
                  label={
                    hire.steps.summary.containerFirst.earlyAdministrationFree
                  }
                  value={mockSummary.consortium.earlyAdministrationFree}
                />
              </s.CardWrapper>
            </s.Card>

            <s.Card>
              <s.CardWrapper>
                <s.CardTitleWrapper>
                  <Text
                    type="subheading"
                    bold
                    color="gray5"
                    textTransform="uppercase"
                  >
                    {hire.steps.summary.containerSecond.title}
                  </Text>
                </s.CardTitleWrapper>
                <DataRow
                  label={hire.steps.summary.containerSecond.monthlyInstallment}
                  value={mockSummary.portion.monthlyInstallment}
                />
                <Divisor />
                <DataRow
                  label={hire.steps.summary.containerSecond.numberInstallment}
                  value={mockSummary.portion.numberInstallment}
                />
                <Divisor />
                <DataRow
                  label={
                    hire.steps.summary.containerSecond
                      .dateForeseenFirstInstallment
                  }
                  value={mockSummary.portion.dateForeseenFirstInstallment}
                />
                <Divisor />
                <DataRow
                  label={hire.steps.summary.containerSecond.dateOtherPlots}
                  value={mockSummary.portion.dateOtherPlots}
                />
              </s.CardWrapper>
            </s.Card>

            <s.Card>
              <s.CardWrapper>
                <s.CardTitleWrapper>
                  <Text
                    type="subheading"
                    bold
                    color="gray5"
                    textTransform="uppercase"
                  >
                    {hire.steps.summary.containerThird.title}
                  </Text>
                  <ButtonLink onClick={() => {}}>ALTERAR</ButtonLink>
                </s.CardTitleWrapper>
                <DataRow
                  label={
                    hire.steps.summary.containerThird
                      .firstInstallmentPaymentMethod
                  }
                  value={mockSummary.payment.firstInstallmentPaymentMethod}
                />
                <Divisor />
                <DataRow
                  label={
                    hire.steps.summary.containerThird
                      .paymentRemainingInstallments
                  }
                  value={mockSummary.payment.paymentRemainingInstallments}
                />
                <Divisor />
                <DataRow
                  label={hire.steps.summary.containerThird.bank}
                  value={mockSummary.payment.bank}
                />
                <Divisor />
                <DataRow
                  label={hire.steps.summary.containerThird.agency}
                  value={mockSummary.payment.agency}
                />
                <Divisor />
                <DataRow
                  label={hire.steps.summary.containerThird.currentAccount}
                  value={mockSummary.payment.currentAccount}
                />
                <Divisor />
                <DataRow
                  label={
                    hire.steps.summary.containerThird.earlyAdministrationFree
                  }
                  value={mockSummary.payment.earlyAdministrationFree}
                />
              </s.CardWrapper>
            </s.Card>
          </Col>
        </Row>
      </s.Container>
      <s.FixedFooter>
        <s.FooterContainer>
          <s.Button color="secondary" loading={false} onClick={() => {}}>
            {buttons.hire}
          </s.Button>
        </s.FooterContainer>
      </s.FixedFooter>
    </>
  )
}

export default Summary
