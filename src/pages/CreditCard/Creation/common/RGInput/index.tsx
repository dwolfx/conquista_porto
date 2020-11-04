import React from 'react'

import { dict } from 'components/IconExporter'

import * as s from '../styles'

interface IProps {
  documentNumber: string
  setDocumentNumber: (date: string) => void
}

const RGInput: React.FC<IProps> = ({
  documentNumber,
  setDocumentNumber,
  ...rest
}) => {
  const documentNumberError = {
    icon: 'information' as keyof typeof dict,
    message: 'O número informado não é válido.',
  }
  return (
    <s.Input
      label="número do documento"
      error={
        (!documentNumber.length || documentNumber.length < 6) &&
        documentNumberError
      }
      value={documentNumber}
      maxLength={13}
      onChange={e => setDocumentNumber(e.target.value)}
      {...rest}
    />
  )
}

export default RGInput
