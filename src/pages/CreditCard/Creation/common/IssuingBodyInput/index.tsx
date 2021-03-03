import React from 'react'

import { dict } from 'components/IconExporter'

import * as s from '../styles'

interface IProps {
  issuingBody: string
  touched: boolean
  handleTouchField: () => void
  setIssuingBody: (date: string) => void
}
const IssuingBodyInput: React.FC<IProps> = ({
  issuingBody,
  setIssuingBody,
  handleTouchField,
  touched,
  ...rest
}) => {
  const issuingBodyError = {
    icon: 'information' as keyof typeof dict,
    message: 'O informe um órgão emissor válido.',
  }
  return (
    <s.Input
      label="órgão emissor"
      placeholder="Digite aqui..."
      value={issuingBody}
      onBlur={handleTouchField}
      onChange={e =>
        setIssuingBody(e.target.value.toUpperCase().replace(/[^\D]/g, ''))
      }
      error={
        ((!issuingBody.length || issuingBody.length < 3) && touched) && issuingBodyError
      }
      {...rest}
    />
  )
}

export default IssuingBodyInput
