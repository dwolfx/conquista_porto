import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import Header from 'components/Wizard/Header'
import TopBar from 'pages/Objectives/GoalStreams/Components/TopBar'
import { Container } from 'pages/Objectives/GoalStreams/styles'

import StepOne from './Steps/StepOne'
import StepTwo from './Steps/StepTwo'
import StepThree from './Steps/StepThree'
import StepFour from './Steps/StepFour'
import StepFive from './Steps/StepFive'
import StepSix from './Steps/StepSix'
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
    6: <StepSix onChangeScreen={handleChangeScreen} />,
    7: <SuccessStep />,
  }

  const Option = options[step]
  return (
    <Container>
      <Header
        onClose={() => {
          history.push('/objetivos')
        }}
      />

      {step !== 7 && <TopBar numberSteps={6} currentStep={step} />}
      {Option}
    </Container>
  )
}
