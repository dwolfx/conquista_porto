import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import 'styled-components/macro'

import Icon from 'components/IconExporter'
import Input from 'components/Inputs/Money'
import Text from 'components/Text'

import { formatMoneyDecimal, formatMoney } from 'helpers'

import {
  SliderContainer,
  Rail,
  Thumb,
  ThumbPopover,
  ThumbContainer,
} from './styles'

function valueToPercent(value, max) {
  if (max <= 0) {
    return 0
  }

  return (value * 100) / max
}

function percentToValue(percent, max) {
  if (percent <= 0) {
    return 0
  }

  return max * percent
}

export default function Slider({
  className,
  error: errorProp,
  initialValue,
  max,
  normalizeValue,
  onMouseDown,
  onTouchStart,
  showThumb,
  showTooltip,
  onChange,
  ...rest
}) {
  const sliderRef = useRef()
  const inputRef = useRef()
  const [value, setValue] = useState(0)
  const [percentValue, setPercentValue] = useState(0)
  const [error, setError] = useState(errorProp)

  useEffect(() => {
    const percent = valueToPercent(initialValue, max)

    if (percent >= 0 && percent <= 100) {
      setValue(formatMoneyDecimal(initialValue * 100))
      setPercentValue(percent)
    }
  }, [initialValue, max])

  useEffect(() => {
    setError(errorProp)
  }, [errorProp])

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

    if (moneyValue / 100 > max) {
      setError(true)
    } else {
      setError(false)
    }

    // if percentage between 0% and 100%, update states
    if (percent >= 0 && percent <= 100) {
      setPercentValue(percent)
      setValue(formatMoneyDecimal(+moneyValue * 100))

      if (onChange) {
        onChange(moneyValue)
      }
    }

    // update popover position
    window.dispatchEvent(new Event('resize'))
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

    if (moneyValue / 100 > max) {
      setError(true)
    } else {
      setError(false)
    }

    // if percentage between 0% and 100%, update states
    if (percent >= 0 && percent <= 100) {
      setValue(formatMoneyDecimal(moneyValue))
      setPercentValue(percent)

      if (onChange) {
        onChange(moneyValue / 100)
      }
    }

    // update popover position
    window.dispatchEvent(new Event('resize'))

    // prevent input from focus out on change
    setTimeout(() => {
      inputRef.current.focus()
    }, 0)
  }

  return (
    <SliderContainer value={percentValue} className={className} {...rest}>
      <Rail
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
        className={className}
      />
      {showTooltip ? (
        <ThumbPopover
          flippable={false}
          content={() => (
            <div
              css={`
                margin: -7px;
                width: ${error ? 211 : 40 + (value.length + 1) * 8}px;
              `}
            >
              <Input
                ref={inputRef}
                value={value}
                onChange={handleInputOnChange}
                css={`
                  height: 33px;
                  font-size: 14px;
                `}
                maxLength="14"
                error={error}
              />
              {error && (
                <div
                  css={`
                    align-items: center;
                    display: flex;
                    margin-top: 7px;
                  `}
                >
                  <Icon name="alertrounded" color="magenta2" width={16} />
                  <Text
                    color="magenta2"
                    bold
                    css={`
                      margin-left: 7px;
                    `}
                  >
                    Limite máximo: {formatMoney(max)}
                  </Text>
                </div>
              )}
            </div>
          )}
          alwaysVisible
        >
          {showThumb && (
            <Thumb
              onMouseDown={handleMouseDown}
              onTouchStart={handleMouseDown}
              error={error}
            />
          )}
        </ThumbPopover>
      ) : (
        <ThumbContainer>
          {showThumb && (
            <Thumb
              onMouseDown={handleMouseDown}
              onTouchStart={handleMouseDown}
              error={error}
            />
          )}
        </ThumbContainer>
      )}
    </SliderContainer>
  )
}

Slider.propTypes = {
  className: PropTypes.string,
  error: PropTypes.bool,
  initialValue: PropTypes.number,
  max: PropTypes.number,
  normalizeValue: PropTypes.number,
  onMouseDown: PropTypes.func,
  onTouchStart: PropTypes.func,
  showThumb: PropTypes.bool,
  showTooltip: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
}

Slider.defaultProps = {
  className: '',
  error: false,
  initialValue: 0,
  max: 100,
  normalizeValue: 1,
  onMouseDown: null,
  onTouchStart: null,
  showThumb: true,
  showTooltip: true,
}
