import React, { useState } from 'react'
import PropTypes from 'prop-types'
import QuestionFlow from 'pages/Objectives/Wizard/QuestionFlow'

import Button from 'components/Button'
import TopBar from 'pages/Objectives/GoalStreams/Components/TopBar'
import { ScreenAlignment, Wizard, WizardButtom, WizardStep } from './styles'

export const WizardFlow = ({ data }) => {
  const [currentStep, setStepIndex] = useState(0)
  const increment = () => setStepIndex(currentStep + 1)
  const decrement = () => setStepIndex(currentStep - 1)
  const computedState = {
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === data.length - 1,
  }
  const { isFirstStep, isLastStep } = computedState

  const postFlow = () => {
    alert('Requisição API')
  }

  const WizardContainer = () => (
    <WizardStep>
      <QuestionFlow
        question={data[currentStep].question}
        name={data[currentStep].name}
        type={data[currentStep].type}
        minimumValue={data[currentStep].minimumValue}
      />
    </WizardStep>
  )

  return (
    <Wizard>
      <TopBar numberSteps={data.length} currentStep={currentStep + 1} />
      <ScreenAlignment>
        {WizardContainer(currentStep)}
        <WizardButtom>
          {!isFirstStep && <Button outline onClick={decrement}> Anterior</Button> }
          {!isLastStep && <Button onClick={increment}>Próximo</Button>}
          {isLastStep && <Button onClick={postFlow}>POST</Button>}
        </WizardButtom>
      </ScreenAlignment>
    </Wizard>
  )
}

WizardFlow.defaultProps = {
  data: [],
}

WizardFlow.propTypes = {
  data: PropTypes.array,
}
