import React from 'react'
import { dict } from 'components/IconExporter'
import * as s from './styles'

export interface IProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'prefix'> {
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  error?: boolean | { icon: keyof typeof dict; message: string }
  label?: string
  disabled?: boolean
  placeholder?: string
}

const TextAreaComponent: React.FC<IProps> = ({
  prefix,
  suffix,
  label,
  error,
  className,
  disabled,
  placeholder,
  ...rest
}: IProps) => {
  return (
    <>
      {label ? <label htmlFor="col">{label}</label> : null}
      <s.TextArea disabled={disabled} placeholder={placeholder} {...rest} />
    </>
  )
}

export default TextAreaComponent
