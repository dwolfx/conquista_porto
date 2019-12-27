import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import Header from 'components/Wizard/Header'
import { Container } from '../styles'

import StepOne from './Steps/StepOne'
import StepTwo from './Steps/StepTwo'
import StepThree from './Steps/StepThree'
import StepFour from './Steps/StepFour'
import StepFive from './Steps/StepFive'
import StepSix from './Steps/StepSix'
import StepSeven from './Steps/StepSeven'
import StepEight from './Steps/StepEight'
import SuccessStep from './Steps/SuccessStep'

import TopBar from '../Components/TopBar'

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
    7: <StepSeven onChangeScreen={handleChangeScreen} />,
    8: <StepEight onChangeScreen={handleChangeScreen} />,
    9: <SuccessStep />,
  }

  const Option = options[step]
  return (
    <Container>
      <Header
        onClose={() => {
          history.push('/objetivos')
        }}
      />

      {step !== 9 && <TopBar numberSteps={8} currentStep={step} />}
      {Option}
    </Container>
  )
}
