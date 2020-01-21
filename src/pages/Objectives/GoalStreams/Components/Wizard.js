import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Col } from 'styled-bootstrap-grid'

import TopBar from './TopBar'
import QuestionFlow from './QuestionFlow'

import {
  BodyWizard,
  ButtonAction,
  RowButton,
  Wizard,
  WizardStep,
} from './styles'

export const WizardFlow = ({ data }) => {
  const [currentStep, setStepIndex] = useState(0)
  const increment = () => setStepIndex(currentStep + 1)
  const decrement = () => setStepIndex(currentStep - 1)
  const [formData, setFormData] = useState({})
  const computedState = {
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === data.length - 1,
  }
  const { isFirstStep, isLastStep } = computedState

  const postFlow = () => console.log({ formData })

  const handleSingleValue = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const WizardContainer = () => (
    <WizardStep>
      <QuestionFlow
        formData={formData}
        onChangeFormData={handleSingleValue}
        {...data[currentStep]}
      />
    </WizardStep>
  )

  const WizardButtom = () => (
    <RowButton>
      {!isFirstStep && (
        <Col lg="6" xs="12">
          <ButtonAction outline onClick={decrement}>
            Anterior
          </ButtonAction>
        </Col>
      )}
      {!isLastStep && (
        <Col lg={isFirstStep ? '12' : '6'} xs="12">
          <ButtonAction onClick={increment}>Próximo</ButtonAction>
        </Col>
      )}
      {isLastStep && (
        <Col lg="6" xs="12">
          <ButtonAction onClick={postFlow}>POST</ButtonAction>
        </Col>
      )}
    </RowButton>
  )

  return (
    <Wizard>
      <TopBar numberSteps={data.length} currentStep={currentStep + 1} />
      <BodyWizard>
        {WizardContainer()}
        {WizardButtom()}
      </BodyWizard>
    </Wizard>
  )
}

WizardFlow.defaultProps = {
  data: [],
}

WizardFlow.propTypes = {
  data: PropTypes.array,
}
