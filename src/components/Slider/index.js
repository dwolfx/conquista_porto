import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import 'styled-components/macro'

import Input from 'components/NewInput'

import { formatMoneyDecimal } from 'helpers'

import {
  SliderWrapper,
  Rail,
  Thumb,
  ThumbPopover,
  ThumbContainer,
} from './styles'

function valueToPercent(value, max) {
  return (value * 100) / max
}

function percentToValue(percent, max) {
  return max * percent
}

export default function Slider({
  min,
  max,
  initialValue,
  onChange,
  showTooltip,
  step,
  ...rest
}) {
  const sliderRef = useRef()
  const [value, setValue] = useState(formatMoneyDecimal(initialValue * 100))
  const [percentValue, setPercentValue] = useState(
    valueToPercent(initialValue, max)
  )

  const handleSliderPosition = event => {
    const finger = {
      x: ((event.changedTouches && event.changedTouches[0]) || event).clientX,
      y: ((event.changedTouches && event.changedTouches[0]) || event).clientY,
    }
    const { width, left } = sliderRef.current.getBoundingClientRect()

    let percent = (finger.x - left) / width
    percent = Math.floor(percent * 100)

    let moneyValue = percentToValue(percent, max) / 100
    moneyValue = Math.round(moneyValue / step) * step

    percent = valueToPercent(moneyValue, max)

    if (percent >= 0 && percent <= 100) {
      setPercentValue(percent)
      setValue(formatMoneyDecimal(+moneyValue * 100))
    }

    window.scrollTo(window.scrollX, window.scrollY - 1)
    window.scrollTo(window.scrollX, window.scrollY + 1)
  }

  const handleMouseMove = event => {
    handleSliderPosition(event)

    window.scrollTo(window.scrollX, window.scrollY - 1)
    window.scrollTo(window.scrollX, window.scrollY + 1)
  }

  const handleMouseLeave = () => {
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseLeave)
    document.removeEventListener('touchmove', handleMouseMove)
    document.removeEventListener('touchend', handleMouseLeave)
  }

  const handleMouseDown = event => {
    handleSliderPosition(event)

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseLeave)
    document.addEventListener('touchmove', handleMouseMove)
    document.addEventListener('touchend', handleMouseLeave)
  }

  const handleInputOnChange = event => {
    const targetValue = event.target.value

    setPercentValue(Math.floor(valueToPercent(targetValue, max)))
    setValue(targetValue)
  }

  return (
    <SliderWrapper>
      <Rail
        ref={sliderRef}
        value={percentValue}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
        {...rest}
      >
        {showTooltip ? (
          <ThumbPopover
            content={() => (
              <Input
                prefix="R$"
                value={value}
                onChange={handleInputOnChange}
                css={`
                  height: 33px;
                  width: 90px;
                  font-size: 14px;
                `}
              />
            )}
            alwaysVisible
          >
            <Thumb />
          </ThumbPopover>
        ) : (
          <ThumbContainer>
            <Thumb />
          </ThumbContainer>
        )}
      </Rail>
    </SliderWrapper>
  )
}

Slider.propTypes = {
  initialValue: PropTypes.number,
  max: PropTypes.number,
  min: PropTypes.number,
  onChange: PropTypes.func,
  showTooltip: PropTypes.bool,
  step: PropTypes.number,
}

Slider.defaultProps = {
  initialValue: 30.25,
  max: 150,
  min: 0,
  onChange: null,
  showTooltip: true,
  step: 1,
}
