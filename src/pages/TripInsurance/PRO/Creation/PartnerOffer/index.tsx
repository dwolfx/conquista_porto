import React from 'react'
import 'styled-components/macro'
import { Col, Container, Row } from 'styled-bootstrap-grid'

import LogoConquistaBeta from 'assets/images/logoConquistaBeta.png'

import useStackFluxManagement from 'hooks/FluxManagement/useStackFluxManagement'
import { StepComponentProps } from 'hooks/FluxManagement/types'

import { ParnerSteps } from '../../types'

import * as s from './styles'

const TripInsurenceParnerPRO = ({
  isOpen = true,
  closeHandler = () => {},
}: {
  isOpen: boolean
  closeHandler: () => void
}) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const {
    getLast,
    getLength,
    instantiate,
    pop,
    reset,
  } = useStackFluxManagement<StepComponentProps>()

  React.useEffect(() => {
    if (getLength() === 0) instantiate(ParnerSteps.TravelDetailsForm)
  }, [instantiate, getLength])

  React.useEffect(() => {
    return () => reset()
  }, [reset])

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
      <s.Modal
        modalTitle="Deseja sair da página?"
        isOpen={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
      >
        <s.Text type="headline" color="gray6">
          As informações serão perdidas e a sua solicitação não será enviada.
        </s.Text>
        {modalFooterButton()}
      </s.Modal>
      <s.Layer
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
      </s.Layer>
    </>
  )
}

export default TripInsurenceParnerPRO
