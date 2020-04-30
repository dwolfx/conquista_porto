import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Layer from 'components/Layer'
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
  LayerBodyContainer,
  FooterContainer,
  GridRow,
  GridRowNoMargin,
  GridRowExpanded,
  GridCol,
  LayerCard,
} from './styles'

const LayerInvestment = ({ handleClose, ...rest }) => {
  const [step, setStep] = useState(0)
  const stepCount = 2

  const layerBody = [
    <LayerBodyContainer>
      <GridRowExpanded>
        <GridCol lg="3">
          <LayerCard>Step1</LayerCard>
        </GridCol>
        <GridCol lg="9">
          <LayerCard>
            <Button onClick={() => setStep(step + 1)}>Próximo Passo</Button>
          </LayerCard>
        </GridCol>
      </GridRowExpanded>
    </LayerBodyContainer>,
    <LayerBodyContainer>
      <GridRowExpanded>
        <GridCol lg="3">
          <LayerCard>Step2</LayerCard>
        </GridCol>
        <GridCol lg="9">
          <LayerCard>
            <Button onClick={() => setStep(step - 1)}>Passo Anterior</Button>
          </LayerCard>
        </GridCol>
      </GridRowExpanded>
    </LayerBodyContainer>,
  ]

  const headerAttributes = { step, setStep, handleClose }

  return (
    <Layer
      handleClose={handleClose}
      {...rest}
      headerContent={<LayerHeader {...headerAttributes} />}
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
      {layerBody[step]}
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
    </Layer>
  )
}

const LayerHeader = ({ step, setStep, handleClose }) => (
  <GridContainer>
    <GridRowNoMargin>
      <GridCol lg="12">
        <HeaderContent>
          <HeaderIconButton
            data-gtm-subname="layer Investimentir"
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

LayerHeader.propTypes = {
  step: PropTypes.number.isRequired,
  setStep: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
}

LayerInvestment.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
}

export default LayerInvestment
