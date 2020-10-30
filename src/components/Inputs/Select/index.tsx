import React, { useCallback, useState } from 'react'
import { uuid } from 'uuidv4'

import Loading from 'components/Loading'
import Icon from 'components/IconExporter'
import InputText from 'components/NewInput'
import Text from 'components/Text'

import * as s from './styles'
import * as t from './types'

export default function Select({
  selected,
  options,
  label,
  testId,
  disabled = false,
  isLoading = false,
  optionBoxSize = 400,
  optionBoxDirection = 'bottom',
  emptyText = 'Não há opções disponíveis',
}: t.IProps) {
  const [isOptionsOpen, setOptionsOpen] = useState(false)

  const renderOptions = useCallback(() => {
    if (!options.length) {
      return (
        <s.OptionsItem data-testid={`option-empty`} key={uuid()}>
          <Text type="headline" color="gray6" bold>
            {emptyText}
          </Text>
        </s.OptionsItem>
      )
    }
    return options.map(option => (
      <s.OptionsItem
        selected={option.id === selected.id}
        onClick={() => {
          if (option.onClick) {
            option.onClick()
          }
          setOptionsOpen(false)
        }}
        data-testid={`option-${option.text}`}
        key={uuid()}
      >
        {option.icon && (
          <Icon name={option.icon} color="gray6" width={21} height={21} />
        )}
        <Text type="headline" color="gray6" bold>
          {option.text}
        </Text>
      </s.OptionsItem>
    ))
  }, [options, selected, emptyText])

  return (
    <s.Container>
      <s.InputContainer
        onClick={() => {
          if (!isLoading && !disabled) {
            setOptionsOpen(currentState => !currentState)
          }
        }}
        data-testid={`select-${label}`}
      >
        <InputText
          label={label}
          placeholder="Selecione"
          value={selected?.name}
          disabled={isLoading || disabled}
          suffix={
            isLoading ? (
              <Loading type="spinner" color="blue4" />
            ) : (
              <Icon
                name={isOptionsOpen ? 'arrowup' : 'arrowdown'}
                color={disabled ? 'gray4' : 'gray6'}
                width={21}
                height={21}
              />
            )
          }
          readOnly
          data-testid={`select-option-input-${testId}`}
        />
      </s.InputContainer>

      {isOptionsOpen && (
        <>
          <s.OptionsWrapper
            optionBoxDirection={optionBoxDirection}
            optionBoxSize={optionBoxSize}
          >
            {renderOptions()}
          </s.OptionsWrapper>
          <s.Overlay
            data-testid="select-overlay"
            onClick={() => {
              setOptionsOpen(false)
            }}
          />
        </>
      )}
    </s.Container>
  )
}
