import React, { useEffect, useState, useContext, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'
import { ThemeContext } from 'styled-components'
import {
  DropdownWrapper,
  Label,
  OptionsWrapper,
  Option,
} from 'components/SelectDropdown/styles'

import { BoxColor } from './styles'
const getOptions = ({
  fundRiskColors: {
    lowRisk,
    lowMediumRisk,
    mediumRisk,
    mediumHighRisk,
    highRisk,
  },
}) => [
  {
    name: 'Todos os fundos',
    value: 'todos',
  },
  {
    name: 'Baixo',
    value: 1,
    riskColor: lowRisk,
  },
  {
    name: 'Médio-Baixo',
    value: 2,
    riskColor: lowMediumRisk,
  },
  {
    name: 'Médio',
    value: 3,
    riskColor: mediumRisk,
  },
  {
    name: 'Médio-Alto',
    value: 4,
    riskColor: mediumHighRisk,
  },
  {
    name: 'Alto',
    value: 5,
    riskColor: highRisk,
  },
]

// Used to detect click outside dropdown
const Backdrop = ({ children, onClick }) => {
  const ref = React.createRef()

  useLayoutEffect(() => {
    const callback = event => {
      const container = ref.current
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

export default function Dropdown({ currentValue, onChange }) {
  const options = getOptions(useContext(ThemeContext))

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
          {options.map(({ riskColor, name, value }) => (
            <Option key={value} onClick={() => onChange(value)}>
              {riskColor && <BoxColor riskColor={riskColor} />}
              {name}
            </Option>
          ))}
        </OptionsWrapper>
      </DropdownWrapper>
    </Backdrop>
  )
}

Dropdown.propTypes = {
  currentValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  onChange: PropTypes.func.isRequired,
}

Backdrop.propTypes = {
  children: PropTypes.element.isRequired,
  onClick: PropTypes.func.isRequired,
}
