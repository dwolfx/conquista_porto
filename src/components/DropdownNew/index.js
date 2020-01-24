import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import {
  Container,
  RelativeHolder,
  Backdrop,
  ItemWrapper,
  ItemIcon,
  ItemText,
  Wrapper,
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

export default function Dropdown({ items, children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [childrenElements, setChildrenElements] = useState(null)

  const history = useHistory()

  function handleDropDown(value) {
    setIsOpen(value)
  }

  function handleMountChildren(elements) {
    if (!elements) {
      setIsHovering(false)
      return
    }

    setIsHovering(true)
    setChildrenElements(
      elements.map(element => (
        <ItemWrapper
          key={element.text}
          onClick={() => element.path && handleClick(element.path)}
        >
          <ItemIcon name={element.icon} />
          <ItemText>{element.text}</ItemText>
        </ItemWrapper>
      ))
    )
  }

  function handleClick(path) {
    handleDropDown(false)
    return history.push(path)
  }

  return (
    <>
      <RelativeHolder>
        <div
          role="button"
          onClick={() => {
            handleDropDown(true)
          }}
        >
          {children}
        </div>
        <Container isOpen={isOpen} onMouseLeave={() => handleMountChildren()}>
          <Wrapper>
            {items.map(item => (
              <ItemWrapper
                key={item.text}
                onMouseEnter={() =>
                  handleMountChildren(item.children && item.children)
                }
                onClick={() => item.path && handleClick(item.path)}
              >
                <ItemIcon name={item.icon} />
                <ItemText>{item.text}</ItemText>
                {item.children && <ItemIcon name="arrowright2" alignToEnd />}
              </ItemWrapper>
            ))}
          </Wrapper>
          {isHovering && <Wrapper>{childrenElements}</Wrapper>}
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

Dropdown.propTypes = {
  items: PropTypes.arrayOf(PropTypes.element).isRequired,
  children: PropTypes.element.isRequired,
}
