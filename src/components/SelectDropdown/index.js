import React, { useEffect, useState, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'

import { DropdownWrapper, OptionsWrapper, Option, Label } from './styles'

// Used to detect click outside dropdown
const Backdrop = ({ children, onClick }) => {
  const ref = React.createRef()

  useLayoutEffect(() => {
    const callback = event => {
      const { current: container } = ref
      const { target } = event
      if (container === target || (container && !container.contains(target))) {
        onClick()
      }
    }

    document.addEventListener('click', callback)

    return () => document.removeEventListener('click', callback)
  }, [ref, onClick])

  return <div ref={ref}>{children}</div>
}

export default function SelectDropdown({ currentValue, onChange, options }) {
  const [label, setLabel] = useState(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const { name = '' } =
      options.filter(obj => obj.value === currentValue)[0] || {}
    setLabel(name)
  }, [options, setLabel, currentValue])

  return (
    <Backdrop onClick={() => setIsOpen(false)}>
      <DropdownWrapper isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
        <Label>{label}</Label>
        <OptionsWrapper isOpen={isOpen}>
          {options.map(({ name, value }) => (
            <Option key={value} onClick={() => onChange(value)}>
              {name}
            </Option>
          ))}
        </OptionsWrapper>
      </DropdownWrapper>
    </Backdrop>
  )
}

SelectDropdown.propTypes = {
  currentValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    })
  ).isRequired,
}

Backdrop.propTypes = {
  children: PropTypes.element.isRequired,
  onClick: PropTypes.func.isRequired,
}
