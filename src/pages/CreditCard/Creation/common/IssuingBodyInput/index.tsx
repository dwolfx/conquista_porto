import React from 'react'

import { dict } from 'components/IconExporter'

import * as s from '../styles'

interface IProps {
  issuingBody: string
  setIssuingBody: (date: string) => void
}

const IssuingBodyInput: React.FC<IProps> = ({
  issuingBody,
  setIssuingBody,
  ...rest
}) => {
  const issuingBodyError = {
    icon: 'information' as keyof typeof dict,
    message: 'O informe um órgão emissor válido.',
  }
  return (
    <s.Input
      label="órgão emissor"
      error={
        (!issuingBody.length || issuingBody.length < 3) && issuingBodyError
      }
      value={issuingBody}
      onChange={e =>
        setIssuingBody(e.target.value.toUpperCase().replace(/[^\D]/g, ''))
      }
      {...rest}
    />
  )
}

export default IssuingBodyInput
