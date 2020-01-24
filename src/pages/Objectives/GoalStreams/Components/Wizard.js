import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Col } from 'styled-bootstrap-grid'

import TopBar from './TopBar'
import QuestionFlow from './QuestionFlow'

import { BodyWizard, ButtonAction, RowFull, Wizard, WizardStep } from './styles'

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

  const postFlow = () => {}

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
    <RowFull>
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
    </RowFull>
  )

  return (
    <Wizard>
      <TopBar numberSteps={data.length} currentStep={currentStep + 1} />
      <BodyWizard>
        <RowFull>
          <Col lg="4" xs="12">
            {WizardContainer()}
            {WizardButtom()}
          </Col>
        </RowFull>
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
