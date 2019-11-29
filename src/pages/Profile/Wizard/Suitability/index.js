import React, { useState } from 'react'
import Header from '../components/Header'
import StepsBullet from '../components/StepsBullet'
import StepOne from './Steps/StepOne'
import StepTwo from './Steps/StepTwo'
import { Container } from '../styles'

export default () => {
  const [step, setStep] = useState(1)

  return (
    <Container>
      <Header />

      <StepsBullet numberSteps={2} currentStep={step} />

      {step === 1 && (
        <StepOne
          changeScreen={() => {
            setStep(step + 1)
          }}
        />
      )}
      {step === 2 && (
        <StepTwo
          backScreen={() => {
            setStep(step - 1)
          }}
        />
      )}
    </Container>
  )
}
