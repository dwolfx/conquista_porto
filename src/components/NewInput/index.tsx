import React, { createRef, forwardRef } from 'react'
import { dict } from 'components/IconExporter'

import {
  InputFieldGroup,
  Input,
  InputAddon,
  InputGroupWrapper,
  InputLabel,
  InputWrapper,
  ErrorMessage,
  ErrorIcon,
} from './styles'

interface IProps {
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  width?: string | number
  error?: boolean | { icon: keyof typeof dict; message: string }
  label?: string
  className?: string
  maxLength?: number
  name?: string
  value?: string
  placeholder?: string
  onChange?: (event: any) => void
  onKeyUp?: (event: any) => void
}

const NewInput = forwardRef<HTMLInputElement, IProps>(
  ({ prefix, suffix, label, width, error, className, ...rest }, ref) => {
    const inputRef = (ref || createRef()) as React.RefObject<HTMLInputElement>

    return (
      <InputFieldGroup>
        <InputGroupWrapper>
          {label && (
            <InputLabel data-testid="new-input-label">{label}</InputLabel>
          )}
          <InputWrapper
            onClick={() => {
              inputRef.current?.focus()
            }}
            width={width}
            error={error}
            className={className}
            data-testid="new-input-addon"
          >
            {prefix && <InputAddon id="prefix">{prefix}</InputAddon>}
            <Input ref={inputRef} data-testid="new-input-input" {...rest} />
            {suffix && <InputAddon id="suffix">{suffix}</InputAddon>}
          </InputWrapper>
        </InputGroupWrapper>
        {error && typeof error === 'object' && (
          <ErrorMessage>
            <ErrorIcon name={error.icon} width="16px" />
            {error.message}
          </ErrorMessage>
        )}
      </InputFieldGroup>
    )
  }
)

export default NewInput
