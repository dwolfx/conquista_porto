import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Modal from 'components/Modal/ModalEmpty'
import HorizontalList from 'components/HorizontalList'
import Text from 'components/Text'
import Button from 'components/Button'

import LogoConquistaBeta from 'assets/images/logoConquistaBeta.png'
import {
  HeaderColTitle,
  PrevButton,
  StepBar,
  ModalContent,
  GridRow,
  GridCol,
  ModalCard,
  FooterInfo,
} from './styles'

const ModalInvestment = ({ handleClose, ...rest }) => {
  const [step, setStep] = useState(0)
  const stepCount = 2

  const modalBody = [
    <ModalContent>
      <GridRow>
        <GridCol lg="3">
          <ModalCard>Step1</ModalCard>
        </GridCol>
        <GridCol lg="9">
          <ModalCard>
            <Button onClick={() => setStep(step + 1)}>Próximo Passo</Button>
          </ModalCard>
        </GridCol>
      </GridRow>
    </ModalContent>,
    <ModalContent>
      <GridRow>
        <GridCol lg="3">
          <ModalCard>Step2</ModalCard>
        </GridCol>
        <GridCol lg="9">
          <ModalCard>
            <Button onClick={() => setStep(step - 1)}>Passo Anterior</Button>
          </ModalCard>
        </GridCol>
      </GridRow>
    </ModalContent>,
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
      </StepBar>
      {modalBody[step]}
      <FooterInfo>
        <Text color="gray5" type="body">
          Toda transmissão de ordem por meio digital está sujeita a interrupções
          ou atrasos, podendo impedir ou prejudicar o envio de ordens ou a
          recepção de informações atualizadas.
        </Text>
      </FooterInfo>
    </Modal>
  )
}

const ModalHeader = ({ step, setStep, handleClose }) => (
  <>
    <PrevButton
      data-gtm-subname="modal Investimentir"
      data-gtm-name="botao voltar step"
      data-gtm-type="click"
      data-gtm-clicktype="button"
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
  </>
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
