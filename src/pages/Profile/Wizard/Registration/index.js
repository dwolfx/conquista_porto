import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import Header from 'components/Wizard/Header'
import StepsBullet from 'components/Wizard/StepsBullet'
import { Container } from '../styles'

import StepOne from './Steps/StepOne'
import StepTwo from './Steps/StepTwo'
import StepThree from './Steps/StepThree'
import SuccessStep from './Steps/SuccessStep'

export default () => {
  const history = useHistory()
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
      <Header
        onClose={() => {
          history.push('/perfil')
        }}
      />

      {step !== 4 && <StepsBullet numberSteps={3} currentStep={step} />}

      {Option}
    </Container>
  )
}
