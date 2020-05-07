import React, { useState } from 'react'

import Layer from 'components/Layer'
import HorizontalList from 'components/HorizontalList'
import Text from 'components/Text'
import LayerHeader from './LayerHeader'
import FormFinancialContribution from './FormFinancialContribution'

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

export type IFormData = {
  moneyToInvest: string
  whenToInvest: string
  isAwareOfTerms: boolean
}

const LayerInvestment: React.FC<IProps> = ({
  handleClose = () => {},
  isOpen = false,
}) => {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState<IFormData>({
    moneyToInvest: '',
    whenToInvest: '',
    isAwareOfTerms: false,
  })
  const stepCount = 2

  const headerAttributes = { step, setStep, handleClose }

  const nextStep = () => {
    setStep(step + 1)
  }

  const previousStep = () => {
    if (step === 0) {
      handleClose()
    } else {
      setStep(step - 1)
    }
  }

  const handleChangeFormData = (newFormData: IFormData) => {
    setFormData(prevState => ({ ...prevState, ...newFormData }))
  }

  // ## AQUI ENTRAM OS COMPONENTES DE STEP
  const layerBody = [
    <FormFinancialContribution
      formData={formData}
      nextStep={nextStep}
      onChangeFormData={handleChangeFormData}
    />,
  ]

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
      <LayerBodyContainer>
        <GridRowExpanded>
          <GridCol lg={3}>
            <LayerCard>Card Descrição Fundo</LayerCard>
          </GridCol>
          <GridCol lg={9}>{layerBody[step]}</GridCol>
        </GridRowExpanded>
      </LayerBodyContainer>
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
