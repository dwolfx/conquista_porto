import React, { useEffect } from 'react'

import SelectDocument from 'pages/CreditCard/Creation/common/SelectDocument'
import ExpeditionDateInput from 'pages/CreditCard/Creation/common/ExpeditionDateInput'
import ExpiredDateInput from 'pages/CreditCard/Creation/common/ExpiredDateInput'
import IssuingBodyInput from 'pages/CreditCard/Creation/common/IssuingBodyInput'
import SelectBrazilianStates from 'pages/CreditCard/Creation/common/SelectBrazilianStates'

import { dict } from 'components/IconExporter'

import * as s from '../styles'

interface IDocumentHandler {
  selectedDocument: string
  setSelectedDocument: (documentName: string) => void
  documentNumber: string
  setDocumentNumber: (documentNumber: string) => void
  expeditionDate: string
  setExpeditionDate: (expeditionDate: string) => void
  expiredDate: string
  setExpiredDate: (expiredDate: string) => void
  selectedBrazilianState: string
  setSelectedBrazilianState: (brazilianState: string) => void
  issuingBody: string
  setIssuingBody: (brazilianState: string) => void
}

const DocumentHandler: React.FC<IDocumentHandler> = ({
  selectedDocument,
  setSelectedDocument,
  documentNumber,
  setDocumentNumber,
  expeditionDate,
  setExpeditionDate,
  expiredDate,
  setExpiredDate,
  selectedBrazilianState,
  setSelectedBrazilianState,
  issuingBody,
  setIssuingBody,
}) => {
  const documentNumberError = {
    icon: 'information' as keyof typeof dict,
    message: 'O número informado não é válido.',
  }

  useEffect(() => {
    if (selectedDocument === 'RNE') {
      setIssuingBody('CGPI/DIREX/DPF')
    }
    if (selectedDocument === 'CNH') {
      setIssuingBody('DETRAN')
    }
  }, [selectedDocument, setIssuingBody])

  const DocumentNumberInput = () => {
    return (
      <s.Input
        label="número do documento"
        error={
          (!documentNumber.length || documentNumber.length < 6) &&
          documentNumberError
        }
        maxLength={13}
        value={documentNumber}
        onChange={e => setDocumentNumber(e.target.value)}
      />
    )
  }

  const getInputs = (documentType: string) => {
    if (documentType === 'RG') {
      return (
        <>
          {DocumentNumberInput()}
          <ExpeditionDateInput
            expeditionDate={expeditionDate}
            setExpeditionDate={setExpeditionDate}
          />
          <IssuingBodyInput
            issuingBody={issuingBody}
            setIssuingBody={setIssuingBody}
          />
        </>
      )
    }
    if (documentType === 'RNE') {
      return (
        <>
          {DocumentNumberInput()}
          <ExpeditionDateInput
            expeditionDate={expeditionDate}
            setExpeditionDate={setExpeditionDate}
          />
          <ExpiredDateInput
            expiredDate={expiredDate}
            setExpiredDate={setExpiredDate}
          />
          <s.Input label="órgão emissor" value={'CGPI/DIREX/DPF'} readOnly />
        </>
      )
    }
    if (documentType === 'CNH') {
      return (
        <>
          {DocumentNumberInput()}
          <ExpeditionDateInput
            expeditionDate={expeditionDate}
            setExpeditionDate={setExpeditionDate}
          />
          <ExpiredDateInput
            expiredDate={expiredDate}
            setExpiredDate={setExpiredDate}
          />
        </>
      )
    }

    return null
  }

  const handleDocumentChange = (value: string) => {
    setDocumentNumber('')
    setExpeditionDate('')
    setExpiredDate('')
    setIssuingBody('')
    setSelectedBrazilianState('')
    setSelectedDocument(value)
  }

  return (
    <>
      <SelectDocument
        selectedOption={selectedDocument}
        setSelectedOption={handleDocumentChange}
      />
      {getInputs(selectedDocument)}
      <SelectBrazilianStates
        selectedOption={selectedBrazilianState}
        setSelectedOption={setSelectedBrazilianState}
      />
    </>
  )
}

export default DocumentHandler
