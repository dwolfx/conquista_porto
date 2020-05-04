import React, { useState } from 'react'

import Layer from 'components/Layer'
import HorizontalList from 'components/HorizontalList'
import Text from 'components/Text'
import Button from 'components/Button'
import LayerHeader from './LayerHeader'

import {
  StepBar,
  ColStepBar,
  GridContainer,
  LayerBodyContainer,
  FooterContainer,
  GridRow,
  GridRowExpanded,
  GridCol,
  LayerCard,
} from './styles'

interface IProps {
  handleClose: () => void
  isOpen: boolean 
}

const LayerInvestment: React.FC<IProps> = ({
  handleClose = () => {},
  isOpen = false,
}) => {
  const [step, setStep] = useState(0)
  const stepCount = 2

  const layerBody = [
    <LayerBodyContainer>
      <GridRowExpanded>
        <GridCol lg={3}>
          <LayerCard>Step1</LayerCard>
        </GridCol>
        <GridCol lg={9}>
          <LayerCard>
            <Button onClick={() => setStep(step + 1)}>Próximo Passo</Button>
          </LayerCard>
        </GridCol>
      </GridRowExpanded>
    </LayerBodyContainer>,
    <LayerBodyContainer>
      <GridRowExpanded>
        <GridCol lg={3}>
          <LayerCard>Step2</LayerCard>
        </GridCol>
        <GridCol lg={9}>
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
      isOpen={isOpen}
      headerContent={<LayerHeader {...headerAttributes} />}
    >
      <StepBar>
        <GridContainer>
          <GridRow>
            <ColStepBar lg={12}>
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
          <GridCol lg={12}>
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

export default LayerInvestment
