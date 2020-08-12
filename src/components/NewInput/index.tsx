import React, { createRef, forwardRef, InputHTMLAttributes } from 'react'
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
  error?: boolean | { icon: keyof typeof dict; message: string }
  label?: string
  className?: string
  disabled?: boolean
}

const NewInput = forwardRef<
  HTMLInputElement,
  IProps & Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix'>
>(({ prefix, suffix, label, error, className, disabled, ...rest }, ref) => {
  const inputRef = (ref || createRef()) as React.RefObject<HTMLInputElement>

  return (
    <InputFieldGroup
      className={className}
      disabled={disabled}
      hasLabel={!!label}
    >
      <InputGroupWrapper>
        {label ? <InputLabel>{label}</InputLabel> : null}
        <InputWrapper
          error={error}
          onClick={() => {
            inputRef && inputRef.current && inputRef.current.focus()
          }}
        >
          {prefix && <InputAddon id="prefix">{prefix}</InputAddon>}
          <Input ref={inputRef} {...rest} />
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
})

export default NewInput
