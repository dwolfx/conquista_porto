import React from 'react'

import IconExporter from 'components/IconExporter'
import { themeColors } from 'styles/theme'

import * as S from './styles'
import { Actions, IPerformArguments, IProps, IGetFillColorArguments } from './types'


export default function InputNumber({ label = '', minValue = 0, maxValue = 99, initialValue = 0, disabledCase = false, testId = '' } : IProps) {
  const [value, setValue] = React.useState(initialValue)

  const getFillColor = ({ checkingIfIsDisabled }: IGetFillColorArguments) => {
    const color = checkingIfIsDisabled ? "gray4" : "white"
    return color as keyof typeof themeColors
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const valueAsNumber = Number(value)
    if (isNaN(valueAsNumber)) {
      return
    }

    if (valueAsNumber > maxValue) {
      setValue(maxValue)
    } else if (valueAsNumber < minValue) {
      setValue(minValue)
    } else {
      setValue(valueAsNumber)
    }
  }

  const perform = ({ action }: IPerformArguments ) => {
    switch(action) {
      case Actions.ADD:
        value < maxValue && setValue(value + 1)
        break

      case Actions.SUBTRACT:
        value > minValue && setValue(value - 1)
        break
    }
  }

  return (
    <S.Wrapper>
        <S.Label>
          <S.LabelText>{label}</S.LabelText>
        </S.Label>


      <S.InputNumberContainer>
        <S.ControlButton
        left
        onClick={() => perform({ action: Actions.SUBTRACT })}
        disabled={value === minValue}
        data-testid={`${testId}-subtract-button`}
        >
          <IconExporter
            name="subtract"
            width={12}
            color={getFillColor({ checkingIfIsDisabled: value === minValue })}
          />
        </S.ControlButton>

        <S.StyledInput
          value={value.toString()}
          min={minValue}
          max={maxValue}
          onChange={handleOnChange}
          disabled={disabledCase}
          data-testid={`input-number-${testId}`}
        />

        <S.ControlButton
          onClick={() => perform({ action: Actions.ADD })}
          disabled={value === maxValue}
          data-testid={`${testId}-add-button`}
        >
          <IconExporter
            name="plus"
            width={12}
            color={getFillColor({ checkingIfIsDisabled: value === maxValue })}
          />
        </S.ControlButton>
      </S.InputNumberContainer>

    </S.Wrapper>
  )
}
