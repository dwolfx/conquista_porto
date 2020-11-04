import React from 'react'
import 'styled-components/macro'
import { Col, Row, Container } from 'styled-bootstrap-grid'

import useStackFluxManagement from 'hooks/FluxManagement/useStackFluxManagement'
import { StepComponentProps } from 'hooks/FluxManagement/types'

import LogoConquistaBeta from 'assets/images/logoConquistaBeta.png'

import Layer from 'components/Layer'

import { HeaderContent, LogoWrapper, CloseIcon, PreviousIcon } from './styles'
import { Steps } from './types'

export default function TripInsurenceCreation({
  isOpen = false,
  closeHandler = () => {  },
}: {
  isOpen: boolean
  closeHandler: () => void
}) {
  const { pop, getLast, getLength, instantiate } = useStackFluxManagement<StepComponentProps>()

  React.useEffect(() => {
    if(isOpen)
      instantiate(Steps.passengerStep)
  }, [isOpen, instantiate])

  return (
    <Layer
      isOpen={isOpen}
      handleClose={closeHandler}
      headerContent={
        <Container>
          <Row>
            <Col lg={12}>
              <HeaderContent>
                <PreviousIcon
                  data-gtm-subname="layer seguro viagem"
                  data-gtm-name="botao voltar step"
                  data-gtm-type="click"
                  data-gtm-clicktype="button"
                  onClick={() => getLength() === 1 ? closeHandler() : pop()}
                />
                <LogoWrapper>
                  <img src={LogoConquistaBeta} alt="Logo Conquista Beta" />
               </LogoWrapper>
                <CloseIcon
                  className="layer-close-button"
                  data-gtm-subname="botao fechar layer"
                  data-gtm-name="botao fechar"
                  data-gtm-type="click"
                  data-gtm-clicktype="button"
                  onClick={closeHandler}
                />
              </HeaderContent >
            </Col >
          </Row >
        </Container >
      }
    >
      {getLast()}
    </Layer >
  )
}
