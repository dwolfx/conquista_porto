import React from 'react'
import { Col, Container, Row } from 'styled-bootstrap-grid'

import Layer from 'components/Layer'
import useStackFluxManagement from 'hooks/FluxManagement/useStackFluxManagement'
import { Steps } from './types'
import { StepComponentProps } from 'hooks/FluxManagement/types'
import { TextsConsortiumBuilding } from '../commons/Texts'
import Modal from 'components/Modal/ModalNew'

import * as s from './styles'
import useFetchCustomerProfile from 'hooks/CustomerProfile/useFetchCustomerProfile'
import { useSelector, useDispatch } from 'react-redux'
import { GetConsortiumBuildingCloseLayer } from 'store/modules/ConsortiumBuilding/action'

export default function ConsortiumBuildingCreation({
  isOpen = true,
  closeHandler = () => {},
}: {
  isOpen: boolean
  closeHandler: () => void
}) {
  const { modalFlowExit } = TextsConsortiumBuilding()

  const { pop, getLast, getLength, instantiate } = useStackFluxManagement<
    StepComponentProps
  >()
  const dispatch = useDispatch()
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  const { closeLayer } = useSelector((state: any) => {
    return {
      closeLayer: state.consortiumBuilding.closeLayer,
    }
  })

  useFetchCustomerProfile()

  // Steps:
  // 1 - ChooseState
  // 2 - ContemplatedValue
  // 3 - ChoosePlan
  // 4 - InformationConfirmation
  // 5 - Declarations
  // 6 - Credit Life Insurance

  React.useEffect(() => {
    if (isOpen && getLength() === 0) instantiate(Steps.declarationStep)
  }, [isOpen, instantiate, getLength])

  React.useEffect(() => {
    if (closeLayer) {
      dispatch(GetConsortiumBuildingCloseLayer(false))
      closeHandler()
    }
  }, [closeLayer, dispatch, closeHandler])

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
        {modalFlowExit.button.exit}
      </s.Button>
      <s.Button
        data-gtm-type="click"
        data-gtm-clicktype="button"
        data-gtm-name="continuar solicitação"
        onClick={() => setIsModalOpen(false)}
      >
        {modalFlowExit.button.continue}
      </s.Button>
    </s.ButtonWrapper>
  )

  return (
    <>
      <Modal
        modalTitle={modalFlowExit.title}
        isOpen={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
      >
        <s.Text type="headline" color="gray6">
          {modalFlowExit.content}
        </s.Text>
        {modalFooterButton()}
      </Modal>
      <Layer
        isOpen={isOpen}
        handleClose={() => setIsModalOpen(true)}
        data-testid="consortium-building-layer"
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
                    <s.Logo />
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
