import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Modal from 'components/Modal/ModalEmpty'
import HorizontalList from 'components/HorizontalList'
import Text from 'components/Text'
import Button from 'components/Button'

import LogoConquistaBeta from 'assets/images/logoConquistaBeta.png'
import {
  HeaderContent,
  HeaderColTitle,
  HeaderIconButton,
  StepBar,
  ColStepBar,
  GridContainer,
  ModalBodyContainer,
  FooterContainer,
  GridRow,
  GridRowNoMargin,
  GridRowExpanded,
  GridCol,
  ModalCard,
} from './styles'

const ModalInvestment = ({ handleClose, ...rest }) => {
  const [step, setStep] = useState(0)
  const stepCount = 2

  const modalBody = [
    <ModalBodyContainer>
      <GridRowExpanded>
        <GridCol lg="3">
          <ModalCard>Step1</ModalCard>
        </GridCol>
        <GridCol lg="9">
          <ModalCard>
            <Button onClick={() => setStep(step + 1)}>Próximo Passo</Button>
          </ModalCard>
        </GridCol>
      </GridRowExpanded>
    </ModalBodyContainer>,
    <ModalBodyContainer>
      <GridRowExpanded>
        <GridCol lg="3">
          <ModalCard>Step2</ModalCard>
        </GridCol>
        <GridCol lg="9">
          <ModalCard>
            <Button onClick={() => setStep(step - 1)}>Passo Anterior</Button>
          </ModalCard>
        </GridCol>
      </GridRowExpanded>
    </ModalBodyContainer>,
  ]

  const headerAttributes = { step, setStep, handleClose }

  return (
    <Modal
      handleClose={handleClose}
      {...rest}
      headerContent={<ModalHeader {...headerAttributes} />}
      fullScreen
    >
      <StepBar>
        <GridContainer>
          <GridRow>
            <ColStepBar lg="12">
              <HorizontalList
                size="small"
                startItems={[
                  <Text color="gray4" type="headline">
                    Investir
                  </Text>,
                ]}
                endItems={[
                  <Text color="gray4" type="title">
                    {`ETAPA ${step + 1} de ${stepCount}`}
                  </Text>,
                ]}
                css={`
                  width: 100%;
                  padding: 0;
                `}
              />
            </ColStepBar>
          </GridRow>
        </GridContainer>
      </StepBar>
      {modalBody[step]}
      <FooterContainer>
        <GridRow>
          <GridCol lg="12">
            <Text color="gray5" type="body">
              Toda transmissão de ordem por meio digital está sujeita a
              interrupções ou atrasos, podendo impedir ou prejudicar o envio de
              ordens ou a recepção de informações atualizadas.
            </Text>
          </GridCol>
        </GridRow>
      </FooterContainer>
    </Modal>
  )
}

const ModalHeader = ({ step, setStep, handleClose }) => (
  <GridContainer>
    <GridRowNoMargin>
      <GridCol lg="12">
        <HeaderContent>
          <HeaderIconButton
            data-gtm-subname="modal Investimentir"
            data-gtm-name="botao voltar step"
            data-gtm-type="click"
            data-gtm-clicktype="button"
            icon="ArrowLeft"
            onClick={() => {
              if (step === 0) {
                handleClose()
              } else {
                setStep(step - 1)
              }
            }}
          />
          <HeaderColTitle style={{ flex: 1 }}>
            <img src={LogoConquistaBeta} alt="Logo Conquista Beta" />
          </HeaderColTitle>
          <HeaderIconButton
            className="layer-close-button"
            data-gtm-subname="botao fechar layer"
            data-gtm-name="botao fechar"
            data-gtm-type="click"
            data-gtm-clicktype="button"
            icon="CloseIcon"
            onClick={handleClose}
          />
        </HeaderContent>
      </GridCol>
    </GridRowNoMargin>
  </GridContainer>
)

ModalHeader.propTypes = {
  step: PropTypes.number.isRequired,
  setStep: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
}

ModalInvestment.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
}

export default ModalInvestment
