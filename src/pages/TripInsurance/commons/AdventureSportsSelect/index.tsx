import React, { useCallback, useState, useEffect } from 'react'
import { uuid } from 'uuidv4'

import Loading from 'components/Loading'
import Icon from 'components/IconExporter'
import InputText from 'components/NewInput'
import Text from 'components/Text'

import Popover from 'components/Popover'
import { dict } from 'components/IconExporter'

import * as t from './types'
import * as s from './styles'

export default function AdventureSportsSelect({
  selected,
  options,
  label,
  testId,
  disabled = false,
  isLoading = false,
  optionBoxSize = 400,
  optionBoxDirection = 'bottom',
  emptyText = 'Não há opções disponíveis',
  popoverContent = 'Teste',
  ...rest
}: t.IProps) {
  const [isOptionsOpen, setOptionsOpen] = useState(false)
  const [icon, setIcon] = useState<keyof typeof dict>('arrowdown')

  useEffect(() => {
    if (!isOptionsOpen && !disabled) {
      setIcon('arrowdown')
    }
    if (isOptionsOpen && !disabled) {
      setIcon('arrowup')
    }
    if (disabled) {
      setIcon('lock')
    }
  }, [disabled, isOptionsOpen])

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
    <Popover content={popoverContent} turnOff={!disabled}>
      <s.Container {...rest}>
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
                  name={icon}
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
    </Popover>
  )
}
