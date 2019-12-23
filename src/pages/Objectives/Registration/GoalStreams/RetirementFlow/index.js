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
import SuccessStep from './Steps/SuccessStep'

import TopBar from '../Components/TopBar'

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
    4: (
      <StepFour
        changeScreen={() => {
          setStep(5)
        }}
      />
    ),
    5: (
      <StepFive
        changeScreen={() => {
          setStep(6)
        }}
      />
    ),
    6: (
      <StepSix
        changeScreen={() => {
          setStep(7)
        }}
      />
    ),
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
