import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Button from 'components/Button'
import TopBar from 'pages/Objectives/GoalStreams/Components/TopBar'
import { ScreenAlignment, Wizard, WizardButtom } from './styles'

export const WizardFlow = ({ children }) => {
  const [currentStep, setStepIndex] = useState(0)
  const incrementStep = () => setStepIndex(currentStep + 1)
  const decrementStep = () => setStepIndex(currentStep - 1)
  const computedState = {
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === children.length - 1,
  }
  const { isFirstStep, isLastStep } = computedState

  const postFlow = () => {
    alert('Requisição API')
  }

  return (
    <Wizard>
      <TopBar numberSteps={children.length} currentStep={currentStep + 1} />
      <ScreenAlignment>
        {children[currentStep]}
        <WizardButtom>
          {!isFirstStep && <Button onClick={decrementStep}>Anterior</Button>}
          {!isLastStep && <Button onClick={incrementStep}>Próximo</Button>}
          {isLastStep && <Button onClick={postFlow}>POST</Button>}
        </WizardButtom>
      </ScreenAlignment>
    </Wizard>
  )
}

WizardFlow.defaultProps = {
  children: [],
}

WizardFlow.propTypes = {
  children: PropTypes.array,
}
