import React from 'react'
import {
  Section,
  Wrapper,
  StepContainer,
  Step,
  StepNumber,
  BulletPoint,
} from './styles'

export default ({ numberSteps, currentStep }) => {
  const renderSteps = () => {
    const output = []

    for (let index = 0; index < numberSteps; index++) {
      output.push(
        <Step>
          <BulletPoint filled={index < currentStep} />
          <StepNumber>{index + 1}</StepNumber>
        </Step>
      )
    }

    return output
  }

  return (
    <Section>
      <Wrapper>
        <StepContainer>{renderSteps()}</StepContainer>
      </Wrapper>
    </Section>
  )
}
