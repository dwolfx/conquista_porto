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

export default function SelectDropdown({
  currentValue,
  onChange,
  options,
  ...rest
}) {
  const [label, setLabel] = useState(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const { name = '' } =
      options.filter(obj => obj.value === currentValue)[0] || {}
    setLabel(name)
  }, [options, setLabel, currentValue])

  return (
    <Backdrop onClick={() => setIsOpen(false)}>
      <DropdownWrapper
        data-gtm-type="click"
        data-gtm-clicktype="menu"
        data-gtm-name={label}
        isOpen={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        {...rest}
      >
        <Label>{label}</Label>
        <OptionsWrapper isOpen={isOpen}>
          {options && options.length
            ? options.map(({ name, value }) => (
                <Option
                  data-gtm-type="click"
                  data-gtm-clicktype="sub-menu"
                  data-gtm-subname={label}
                  data-gtm-name={name}
                  key={value}
                  onClick={() => onChange(value)}
                >
                  {name}
                </Option>
              ))
            : null}
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
