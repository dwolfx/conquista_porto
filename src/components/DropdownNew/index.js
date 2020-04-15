import React, { useState, useRef, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { mobileItemsPropTypes } from 'components/HeaderNew/Mobile'

import {
  Container,
  RelativeHolder,
  Backdrop,
  ItemWrapper,
  ItemIcon,
  ItemText,
  Wrapper,
  WrapperChildren,
  ItemIconContainer,
} from './styles'

/**
 * ### HOW TO USE ###
 *
 * # Using the component #
 *  Wrap the element with the DropDown component.
 *  <DropdownNew>
 *    <div>MENU</div>
 *  </DropDownNew>
 *
 * # The props it requires #
 *  It's an array of objects which contains the following structure:
 *  items: [
 *    {
 *      icon: 'arrowup', (valid icon name, check IconExporter component)
        text: 'test', (the text that will be displayed at the dropdown list)
        path: '/home', (the path to redirect)
        children: [ (it's not required, but if you use it must follow the same structure)
          {
            icon: 'arrowup',
            text: 'teste',
            path: '/home',
          },
          {
            icon: 'arrowdown',
            text: 'teste2',
            path: '/profile',
          },
        ],
 *    },
 *  ]
 */

export default function Dropdown({
  items,
  children,
  nodes,
  customWidth,
  containerPadding,
  redirectPath,
  openingSide,
  disabled,
  ...rest
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [childrenElements, setChildrenElements] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)

  const history = useHistory()
  const containerRef = useRef(null)

  function checkElementOut() {
    const elementBounding = containerRef.current.getBoundingClientRect()

    if (elementBounding.top < 0) {
      containerRef.current.style.top = '0px'
    }

    if (elementBounding.left < 0) {
      containerRef.current.style.left = '0px'
    }

    if (
      elementBounding.bottom >
      (window.innerHeight || document.documentElement.clientHeight)
    ) {
      const offsetDifference =
        elementBounding.bottom -
        (window.innerHeight || document.documentElement.clientHeight)
      containerRef.current.style.top = `-${offsetDifference}px`
    }

    if (
      elementBounding.right >
      (window.innerWidth || document.documentElement.clientWidth)
    ) {
      const offsetDifference =
        elementBounding.right -
        (window.innerWidth || document.documentElement.clientWidth)
      containerRef.current.style.left = `-${offsetDifference}px`
    }
  }

  useEffect(() => {
    if (isOpen) checkElementOut()
  }, [isOpen])

  function handleDropDown(value) {
    setIsOpen(value)
  }

  const handleMountChildren = (elements, subMenuTitle) => {
    setSelectedItem(subMenuTitle)
    setIsHovering(true)

    if (!elements) {
      setIsHovering(false)
      return
    }

    setChildrenElements(
      elements.map(item => (
        <ItemWrapper
          data-gtm-type="click"
          data-gtm-clicktype="link"
          data-gtm-subname={subMenuTitle}
          data-gtm-name={item.text}
          key={item.text}
          onClick={() => item.path && handleClick(item.path)}
        >
          {item.icon && (
            <ItemIconContainer>
              <ItemIcon name={item.icon} />
            </ItemIconContainer>
          )}
          <ItemText>{item.text}</ItemText>
        </ItemWrapper>
      ))
    )
  }

  function handleClick(path) {
    if (path) {
      handleDropDown(false)
      history.push(path)
    }
    return handleDropDown(false)
  }

  if (nodes) {
    return (
      <>
        <RelativeHolder disabled={disabled}>
          <div
            role="button"
            onClick={() => {
              handleDropDown(true)
            }}
          >
            {children}
          </div>
          <Container
            ref={containerRef}
            isOpen={isOpen}
            onMouseLeave={() => handleMountChildren()}
          >
            <Wrapper
              containerPadding={containerPadding}
              customWidth={customWidth}
            >
              {nodes.map(node => {
                if (typeof node === 'function')
                  return node(() =>
                    redirectPath ? handleClick(redirectPath) : handleClick()
                  )
                return node
              })}
            </Wrapper>
          </Container>
        </RelativeHolder>
        <Backdrop
          isOpen={isOpen}
          id="backdrop"
          onClick={() => handleDropDown(false)}
        />
      </>
    )
  }

  if (items) {
    return (
      <>
        <RelativeHolder disabled={disabled}>
          <div
            role="button"
            onClick={() => {
              handleDropDown(true)
            }}
          >
            {children}
          </div>
          <Container
            ref={containerRef}
            isOpen={isOpen}
            onMouseLeave={() => handleMountChildren()}
          >
            <Wrapper
              containerPadding={containerPadding}
              customWidth={customWidth}
            >
              {items.map(item => (
                <ItemWrapper
                  data-gtm-type="click"
                  data-gtm-clicktype={item.children ? 'sub-menu' : 'link'}
                  data-gtm-subname={rest.title}
                  data-gtm-name={item.text}
                  key={item.text}
                  onMouseEnter={() =>
                    handleMountChildren(
                      item.children && item.children,
                      item.text
                    )
                  }
                  onClick={() => item.path && handleClick(item.path)}
                >
                  <ItemIconContainer>
                    <ItemIcon name={item.icon} />
                  </ItemIconContainer>
                  <ItemText>{item.text}</ItemText>
                  {item.children && (
                    <ItemIconContainer alignToEnd>
                      <ItemIcon name="arrowright2" />
                    </ItemIconContainer>
                  )}
                  {isHovering && item.text === selectedItem && (
                    <WrapperChildren openingSide={openingSide}>
                      {childrenElements}
                    </WrapperChildren>
                  )}
                </ItemWrapper>
              ))}
            </Wrapper>
          </Container>
        </RelativeHolder>
        <Backdrop
          isOpen={isOpen}
          id="backdrop"
          onClick={() => handleDropDown(false)}
        />
      </>
    )
  }
}

Dropdown.propTypes = {
  items: mobileItemsPropTypes,
  children: PropTypes.element.isRequired,
  containerPadding: PropTypes.string,
  redirectPath: PropTypes.string,
  customWidth: PropTypes.string,
  openingSide: PropTypes.string,
  disabled: PropTypes.bool,
}

Dropdown.defaultProps = {
  containerPadding: '14px',
  redirectPath: null,
  customWidth: null,
  openingSide: 'right',
  disabled: false,
}
