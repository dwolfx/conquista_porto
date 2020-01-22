import React from 'react'
import PropTypes from 'prop-types'

import { InputGroupWrapper, InputAddon, InputAddonText } from './styles'

const InputGroup = ({ addonPosition, content, children }) => (
  <InputGroupWrapper addonPosition={addonPosition}>
    {addonPosition === 'left' && (
      <>
        {content && (
          <InputAddon>
            <InputAddonText>{content}</InputAddonText>
          </InputAddon>
        )}
        {children}
      </>
    )}
    {addonPosition === 'right' && (
      <>
        {children}
        {content && (
          <InputAddon>
            <InputAddonText>{content}</InputAddonText>
          </InputAddon>
        )}
      </>
    )}
  </InputGroupWrapper>
)

InputGroup.propTypes = {
  addonPosition: PropTypes.oneOf(['left', 'right']).isRequired,
  content: PropTypes.any,
  children: PropTypes.node.isRequired,
}

InputGroup.defaultProps = {
  content: false,
}

export default InputGroup
