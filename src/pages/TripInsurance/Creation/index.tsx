import React, { useState } from 'react'
import 'styled-components/macro'
import { Col, Row, Container } from 'styled-bootstrap-grid'

import Modal from 'components/Modal/ModalNew'
import useStackFluxManagement from 'hooks/FluxManagement/useStackFluxManagement'
import { StepComponentProps } from 'hooks/FluxManagement/types'

import LogoConquistaBeta from 'assets/images/logoConquistaBeta.png'

import Layer from 'components/Layer'

import { Steps } from './types'
import * as s from './styles'

export default function TripInsurenceCreation({
  isOpen = true,
  closeHandler = () => {},
}: {
  isOpen: boolean
  closeHandler: () => void
}) {
  const { pop, getLast, getLength, instantiate } = useStackFluxManagement<
    StepComponentProps
  >()

  const [isModalOpen, setIsModalOpen] = useState(false)

  // Steps:
  // 1 - originTrip
  // 2 - coverageDate
  // 3 - passengerStep
  // 4 - adventureSports
  // 5 - motocicleQuestion
  // 6 - choosePlan
  // 7 - informationConfirmationStep
  // 8 - companionStep
  // 9 - paymentStep
  // 10 - summaryStep
  // 11 - succesStep/errorStep

  React.useEffect(() => {
    if (isOpen && getLength() === 0) instantiate(Steps.originTrip)
  }, [isOpen, instantiate, getLength])

  const modalFooterButton = () => (
    <s.ButtonWrapper>
      <s.Button
        data-gtm-type="click"
        data-gtm-clicktype="button"
        data-gtm-name="sair"
        outline
        onClick={() => {
          setIsModalOpen(false)
          closeHandler()
        }}
      >
        SAIR
      </s.Button>
      <s.Button
        data-gtm-type="click"
        data-gtm-clicktype="button"
        data-gtm-name="continuar solicitação"
        onClick={() => setIsModalOpen(false)}
      >
        CONTINUAR SOLICITAÇÃO
      </s.Button>
    </s.ButtonWrapper>
  )

  return (
    <>
      <Modal
        modalTitle="Deseja sair da página?"
        isOpen={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
      >
        <s.Text type="headline" color="gray6">
          As informações serão perdidas e a sua solicitação não será enviada.
        </s.Text>
        {modalFooterButton()}
      </Modal>
      <Layer
        isOpen={isOpen}
        handleClose={() => setIsModalOpen(true)}
        data-testid="trip-insurance-layer"
        headerContent={
          <Container>
            <Row>
              <Col lg={12}>
                <s.HeaderContent>
                  <s.PreviousIcon
                    data-gtm-subname="layer seguro viagem"
                    data-gtm-name="botao voltar step"
                    data-gtm-type="click"
                    data-gtm-clicktype="button"
                    onClick={() =>
                      getLength() === 1 ? setIsModalOpen(true) : pop()
                    }
                  />
                  <s.LogoWrapper>
                    <img src={LogoConquistaBeta} alt="Logo Conquista Beta" />
                  </s.LogoWrapper>
                  <s.CloseIcon
                    className="layer-close-button"
                    data-gtm-subname="botao fechar layer"
                    data-gtm-name="botao fechar"
                    data-gtm-type="click"
                    data-gtm-clicktype="button"
                    onClick={() => setIsModalOpen(true)}
                  />
                </s.HeaderContent>
              </Col>
            </Row>
          </Container>
        }
      >
        {getLast()}
      </Layer>
    </>
  )
}
