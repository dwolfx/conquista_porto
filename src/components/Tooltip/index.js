import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { Manager, Reference, Popper } from 'react-popper'
import 'styled-components/macro'

import Text from 'components/Text'

import { TooltipContainer, Arrow } from './styles'

export default function Tooltip({
  children,
  placement,
  tooltip,
  trigger,
  ...rest
}) {
  const [isOpen, setIsOpen] = useState(true)

  const actions = () => {
    switch (trigger) {
      case 'click': {
        return {
          onClick: () => setIsOpen(current => !current),
        }
      }
      default: {
        return {
          onMouseEnter: () => setIsOpen(true),
          onMouseLeave: () => setIsOpen(false),
        }
      }
    }
  }

  return (
    <Manager {...rest}>
      <Reference>
        {({ ref }) => (
          <div
            ref={ref}
            {...actions()}
            css={`
              display: inline-flex;
            `}
          >
            {children}
          </div>
        )}
      </Reference>
      {isOpen
        ? ReactDOM.createPortal(
            <Popper placement={placement}>
              {({ placement: innerPlacement, ref, style }) => (
                <TooltipContainer
                  ref={ref}
                  style={style}
                  data-placement={innerPlacement}
                >
                  <Arrow />
                  {typeof tooltip === 'string' ? (
                    <Text>{tooltip}</Text>
                  ) : (
                    tooltip
                  )}
                </TooltipContainer>
              )}
            </Popper>,
            document.querySelector('#root')
          )
        : null}
    </Manager>
  )
}

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  placement: PropTypes.oneOf(['right', 'left', 'top', 'bottom']),
  tooltip: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  trigger: PropTypes.string,
}

Tooltip.defaultProps = {
  placement: 'top',
  trigger: '',
}
