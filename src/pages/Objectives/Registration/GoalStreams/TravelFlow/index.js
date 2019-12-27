import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import Header from 'components/Wizard/Header'
import TopBar from 'pages/Objectives/Registration/GoalStreams/Components/TopBar'
import { Container } from 'pages/Objectives/Registration/GoalStreams/styles'

import StepOne from './Steps/StepOne'
import StepTwo from './Steps/StepTwo'
import StepThree from './Steps/StepThree'
import StepFour from './Steps/StepFour'
import StepFive from './Steps/StepFive'
import SuccessStep from './Steps/SuccessStep'

export default () => {
  const history = useHistory()
  const [step, setStep] = useState(1)

  const handleChangeScreen = stepValue => {
    setStep(stepValue)
  }

  const options = {
    1: <StepOne onChangeScreen={handleChangeScreen} />,
    2: <StepTwo onChangeScreen={handleChangeScreen} />,
    3: <StepThree onChangeScreen={handleChangeScreen} />,
    4: <StepFour onChangeScreen={handleChangeScreen} />,
    5: <StepFive onChangeScreen={handleChangeScreen} />,
    6: <SuccessStep />,
  }

  const Option = options[step]
  return (
    <Container>
      <Header
        onClose={() => {
          history.push('/objetivos')
        }}
      />

      {step !== 6 && <TopBar numberSteps={5} currentStep={step} />}
      {Option}
    </Container>
  )
}
