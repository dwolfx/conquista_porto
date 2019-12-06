import React from 'react'
import PropTypes from 'prop-types'

import {
  Section,
  Wrapper,
  StepContainer,
  Step,
  StepNumber,
  BulletPoint,
} from './styles'

const StepBullets = ({ numberSteps, currentStep }) => {
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

StepBullets.defaultProps = {
  numberSteps: 0,
  currentStep: 0,
}

StepBullets.propTypes = {
  numberSteps: PropTypes.number,
  currentStep: PropTypes.number,
}

export default StepBullets
