import React, { useCallback, useState } from 'react'
import { uuid } from 'uuidv4'

import Icon from 'components/IconExporter'
import InputText from 'components/NewInput'
import Text from 'components/Text'

import * as s from './styles'
import * as t from './types'

export default function Select({ selected, options, label, testId }: t.IProps) {
  const [isOptionsOpen, setOptionsOpen] = useState(false)

  const renderOptions = useCallback(
    () =>
      options.map(option => (
        <s.OptionsItem
          selected={option.id === selected.id}
          onClick={() => {
            if (option.onClick) {
              option.onClick()
            }
          }}
          data-testid={`option-${option.text}`}
          key={uuid()}
        >
          {option.icon ? (
            <Icon name={option.icon} color="gray6" width={21} height={21} />
          ) : null}
          <Text type="headline" color="gray6" bold>
            {option.text}
          </Text>
        </s.OptionsItem>
      )),
    [options, selected]
  )

  return (
    <>
      <s.InputContainer
        onClick={() => {
          setOptionsOpen(currentState => !currentState)
        }}
        data-testid={`select-${label}`}
      >
        <InputText
          label={label}
          value={selected?.name || 'Selecione'}
          suffix={
            <Icon name="arrowdown" color="gray6" width={21} height={21} />
          }
          readOnly
          data-testid={`select-option-input-${testId}`}
        />

        {isOptionsOpen ? (
          <s.OptionsWrapper>{renderOptions()}</s.OptionsWrapper>
        ) : null}
      </s.InputContainer>
    </>
  )
}
