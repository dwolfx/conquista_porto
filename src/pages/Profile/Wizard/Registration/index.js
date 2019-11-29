import React, { useState } from 'react'

import Header from '../components/Header'
import StepsBullet from '../components/StepsBullet'
import { Container } from '../styles'

import StepOne from './Steps/StepOne'
import StepTwo from './Steps/StepTwo'
import StepThree from './Steps/StepThree'
import SuccessStep from './Steps/SuccessStep'

export default () => {
  const [step, setStep] = useState(1)
  const options = {
    1: (
      <StepOne
        changeScreen={() => {
          setStep(2)
        }}
      />
    ),
    2: (
      <StepTwo
        changeScreen={() => {
          setStep(3)
        }}
      />
    ),
    3: (
      <StepThree
        changeScreen={() => {
          setStep(4)
        }}
      />
    ),
    4: <SuccessStep />,
  }

  const Option = options[step]

  return (
    <Container>
      <Header />

      {step !== 4 && <StepsBullet numberSteps={3} currentStep={step} />}

      {Option}
    </Container>
  )
}
