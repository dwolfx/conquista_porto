import React from 'react'
import PropTypes from 'prop-types'

import { InputGroupContainer, InputGroupAddon, InputGroupText } from './styles'

const InputGroup = ({ iconPosition, content, children }) => (
  <InputGroupContainer iconPosition={iconPosition}>
    {iconPosition === 'left' && (
      <>
        {content && (
          <InputGroupAddon>
            <InputGroupText>{content}</InputGroupText>
          </InputGroupAddon>
        )}
        {children}
      </>
    )}
    {iconPosition === 'right' && (
      <>
        {children}
        {content && (
          <InputGroupAddon>
            <InputGroupText>{content}</InputGroupText>
          </InputGroupAddon>
        )}
      </>
    )}
  </InputGroupContainer>
)

InputGroup.propTypes = {
  iconPosition: PropTypes.oneOf(['left', 'right']).isRequired,
  content: PropTypes.any,
  children: PropTypes.node.isRequired,
}

InputGroup.defaultProps = {
  content: false,
}

export default InputGroup
