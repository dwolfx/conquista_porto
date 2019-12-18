import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import Header from 'components/Wizard/Header'
import StepsBullet from 'components/Wizard/StepsBullet'

import StepOne from './Steps/StepOne'
import StepTwo from './Steps/StepTwo'
import { Container } from '../styles'

export default () => {
  const [step, setStep] = useState(1)
  const history = useHistory()

  return (
    <Container>
      <Header
        onClose={() => {
          history.push('/perfil')
        }}
      />

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
