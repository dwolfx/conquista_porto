import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import 'styled-components/macro'

import Input from 'components/Inputs/Money'

import { formatMoneyDecimal } from 'helpers'

import {
  SliderContainer,
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
  max,
  initialValue,
  onMouseDown,
  onTouchStart,
  showTooltip,
  normalizeValue,
  ...rest
}) {
  const sliderRef = useRef()
  const inputRef = useRef()
  const [value, setValue] = useState(formatMoneyDecimal(initialValue * 100))
  const [percentValue, setPercentValue] = useState(
    valueToPercent(initialValue, max)
  )

  const handleSliderPosition = event => {
    // get click position in reference to slider
    const finger = {
      x: ((event.changedTouches && event.changedTouches[0]) || event).clientX,
      y: ((event.changedTouches && event.changedTouches[0]) || event).clientY,
    }
    // get slider position and width
    const { width, left } = sliderRef.current.getBoundingClientRect()

    // get the percentage of position relative to the slider
    let percent = (finger.x - left) / width
    percent = Math.floor(percent * 100)

    // get the value relative to position then normalize value
    let moneyValue = percentToValue(percent, max) / 100
    moneyValue = Math.round(moneyValue / normalizeValue) * normalizeValue

    // update percentage with the value normalized
    percent = valueToPercent(moneyValue, max)

    // if percentage between 0% and 100%, update states
    if (percent >= 0 && percent <= 100) {
      setPercentValue(percent)
      setValue(formatMoneyDecimal(+moneyValue * 100))
    }

    // update popover position
    window.scrollTo(window.scrollX, window.scrollY - 1)
    window.scrollTo(window.scrollX, window.scrollY + 1)
  }

  const handleMouseMove = event => {
    // prevent from selecting html text/tags on mouse drag
    event.preventDefault()

    handleSliderPosition(event)
  }

  const handleMouseLeave = () => {
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseLeave)
    document.removeEventListener('touchmove', handleMouseMove)
    document.removeEventListener('touchend', handleMouseLeave)
  }

  const handleMouseDown = event => {
    event.preventDefault()

    // in case onMouseDown or onTouchStart is passed, run the functions before the default behavior
    if (onMouseDown) {
      onMouseDown(event)
    }
    if (onTouchStart) {
      onTouchStart(event)
    }

    handleSliderPosition(event)

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseLeave)
    document.addEventListener('touchmove', handleMouseMove)
    document.addEventListener('touchend', handleMouseLeave)
  }

  const handleInputOnChange = event => {
    event.preventDefault()

    const moneyValue = +event.target.value.replace(/[\D]/g, '')
    const percent = Math.min(valueToPercent(moneyValue / 100, max), 100)

    setValue(formatMoneyDecimal(moneyValue))
    setPercentValue(percent)

    // update popover position
    window.scrollTo(window.scrollX, window.scrollY - 1)
    window.scrollTo(window.scrollX, window.scrollY + 1)

    // prevent input from focus out on change
    setTimeout(() => {
      inputRef.current.focus()
    }, 0)
  }

  return (
    <SliderContainer value={percentValue} {...rest}>
      <Rail
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      />
      {showTooltip ? (
        <ThumbPopover
          content={() => (
            <Input
              ref={inputRef}
              value={value}
              onChange={handleInputOnChange}
              css={`
                height: 33px;
                font-size: 14px;
              `}
            />
          )}
          alwaysVisible
        >
          <Thumb onMouseDown={handleMouseDown} onTouchStart={handleMouseDown} />
        </ThumbPopover>
      ) : (
        <ThumbContainer>
          <Thumb onMouseDown={handleMouseDown} onTouchStart={handleMouseDown} />
        </ThumbContainer>
      )}
    </SliderContainer>
  )
}

Slider.propTypes = {
  initialValue: PropTypes.number,
  max: PropTypes.number,
  onMouseDown: PropTypes.func,
  onTouchStart: PropTypes.func,
  showTooltip: PropTypes.bool,
  normalizeValue: PropTypes.number,
}

Slider.defaultProps = {
  initialValue: 0,
  max: 100,
  onMouseDown: null,
  onTouchStart: null,
  showTooltip: true,
  normalizeValue: 1,
}
