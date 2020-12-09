import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Manager, Reference, Popper } from 'react-popper'
import 'styled-components/macro'

import Text from 'components/Text'

import { PopoverContainer, Arrow, ChildrenWrapper, Tooltip } from './styles'

type TPlacement = 'bottom' | 'left' | 'right' | 'top'

interface IProps {
  turnOff?: boolean
  alwaysVisible?: boolean
  content: string | (() => React.ReactNode) | React.ReactNode
  flippable?: boolean
  placement?: TPlacement
  trigger?: string
  tooltip?: boolean
  zIndex?: number
}

const Popover: React.FC<IProps> = ({
  turnOff = false,
  alwaysVisible = false,
  children,
  content = () => null,
  flippable = true,
  placement = 'top',
  trigger,
  tooltip = false,
  zIndex = 12,
  ...rest
}) => {
  const portalContainer = document.querySelector('#root')

  const [isOpen, setIsOpen] = useState(alwaysVisible)

  useEffect(() => {
    setIsOpen(alwaysVisible)
  }, [alwaysVisible])

  const actions = () => {
    if (alwaysVisible) {
      return null
    }

    if (trigger === 'click') {
      return {
        onClick: () => setIsOpen(current => !current),
      }
    } else {
      return {
        onMouseEnter: () => setIsOpen(true),
        onMouseLeave: () => setIsOpen(false),
      }
    }
  }

  const renderContent = () => {
    if (typeof content === 'function') {
      return content()
    } else if (typeof content === 'string') {
      return <Text>{content}</Text>
    }

    return content
  }

  const renderPopover = (
    ref: React.Ref<any>,
    style: object,
    innerPlacement: string,
    zIndex: number
  ) => (
    <PopoverContainer
      ref={ref}
      style={style}
      placement={placement || innerPlacement}
      zIndex={zIndex}
    >
      <Arrow placement={placement || innerPlacement} />
      {renderContent()}
    </PopoverContainer>
  )

  const renderTooltip = (
    ref: React.Ref<any>,
    style: object,
    innerPlacement: TPlacement
  ) => (
    <Tooltip
      ref={ref}
      style={style}
      placement={placement || innerPlacement}
      zIndex={zIndex}
    >
      <Arrow placement={placement || innerPlacement} tooltip />
      {renderContent()}
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
      {isOpen && !turnOff && portalContainer
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
              {({ placement: innerPlacement, ref, style }: any) =>
                tooltip
                  ? renderTooltip(ref, style, innerPlacement)
                  : renderPopover(ref, style, innerPlacement, zIndex)
              }
            </Popper>,
            portalContainer
          )
        : null}
    </Manager>
  )
}

export default Popover
