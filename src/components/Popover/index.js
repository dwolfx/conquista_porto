import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { Manager, Reference, Popper } from 'react-popper'
import 'styled-components/macro'

import Text from 'components/Text'

import { PopoverContainer, Arrow, ChildrenWrapper, Tooltip } from './styles'

export default function Popover({
  alwaysVisible,
  children,
  content,
  flippable,
  placement,
  trigger,
  tooltip,
  ...rest
}) {
  const [isOpen, setIsOpen] = useState(alwaysVisible)

  useEffect(() => {
    setIsOpen(alwaysVisible)
  }, [alwaysVisible])

  const actions = () => {
    if (alwaysVisible) {
      return null
    }

    switch (trigger) {
      case 'click': {
        return {
          onClick: () => setIsOpen(current => !current),
        }
      }
      default: {
        return {
          onMouseEnter: () => setIsOpen(true),
          onMouseLeave: () => setIsOpen(true),
        }
      }
    }
  }

  const Content =
    typeof content === 'string' ? () => <Text>{content}</Text> : content

  const renderPopover = (ref, style, innerPlacement) => (
    <PopoverContainer
      ref={ref}
      style={style}
      placement={placement || innerPlacement}
    >
      <Arrow placement={placement || innerPlacement} />
      <Content />
    </PopoverContainer>
  )

  const renderTooltip = (ref, style, innerPlacement) => (
    <Tooltip ref={ref} style={style} placement={placement || innerPlacement}>
      <Arrow placement={placement || innerPlacement} tooltip />
      <Content />
    </Tooltip>
  )

  return (
    <Manager>
      <Reference>
        {({ ref }) => (
          <ChildrenWrapper ref={ref} {...actions()} {...rest}>
            {children}
          </ChildrenWrapper>
        )}
      </Reference>
      {isOpen
        ? ReactDOM.createPortal(
            <Popper
              placement={placement}
              modifiers={{
                offset: {
                  offset: '0,14',
                },
                flip: {
                  padding: 70,
                  enabled: flippable,
                },
              }}
              css={`
                #popper[data-popper-reference-hidden] {
                  visibility: hidden;
                  pointer-events: none;
                }
              `}
            >
              {({ placement: innerPlacement, ref, style }) =>
                tooltip
                  ? renderTooltip(ref, style, innerPlacement)
                  : renderPopover(ref, style, innerPlacement)
              }
            </Popper>,
            document.querySelector('#root')
          )
        : null}
    </Manager>
  )
}

Popover.propTypes = {
  alwaysVisible: PropTypes.bool,
  children: PropTypes.node.isRequired,
  content: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
  flippable: PropTypes.bool,
  placement: PropTypes.oneOf(['bottom', 'left', 'right', 'top']),
  trigger: PropTypes.string,
  tooltip: PropTypes.bool,
}

Popover.defaultProps = {
  alwaysVisible: false,
  placement: 'top',
  flippable: true,
  trigger: '',
  tooltip: false,
}
