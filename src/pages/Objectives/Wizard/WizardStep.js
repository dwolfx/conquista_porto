import React from 'react'
import PropTypes from 'prop-types'
import { WizardContainer } from './styles'

const WizardStep = ({ children }) => (
  <WizardContainer>{children}</WizardContainer>
)

WizardStep.defaultProps = {
  children: {},
}

WizardStep.propTypes = {
  children: PropTypes.object,
}

export default WizardStep
