import React, { useEffect, useState } from 'react'
import { Col, Row } from 'styled-bootstrap-grid'
import { useSelector } from 'react-redux'
import moment from 'moment'

import { dict } from 'components/IconExporter'
import Input from 'components/NewInput'

import ExpeditionDateInput, {
  isExpeditionDateValid,
} from '../common/ExpeditionDateInput'
import IssuingBodyInput from '../common/IssuingBodyInput'
import SelectDocument from '../common/SelectDocument'

import { IState, IStepComponent } from '../types'
import { GridContainer, WhiteContent } from '../styles'
import * as S from './styles'

export default function RegisterDocumentStep({
  formData,
  onNextStep,
}: IStepComponent) {
  const documentNumberError = {
    icon: 'information' as keyof typeof dict,
    message: 'O número informado não é válido.',
  }

  const creditCardClient = useSelector(
    (state: IState) => state.creditCard.clientData
  )

  const [selectedDocument, setSelectedDocument] = useState(
    formData.tipoDocumento || creditCardClient?.tipoDocumento || ''
  )
  const [documentNumber, setDocumentNumber] = useState(
    formData.numeroDocumentoIdentificacao ||
      creditCardClient?.numeroDocumento?.toString() ||
      ''
  )
  const [expeditionDate, setExpeditionDate] = useState(
    formData.dataEmissaoDocumento ||
      (creditCardClient?.dataExpedicao
        ? moment(creditCardClient.dataExpedicao).format('DD/MM/YYYY')
        : '')
  )
  const [issuingBody, setIssuingBody] = useState(
    formData.orgaoExpedidor || creditCardClient?.orgaoEmissor || ''
  )

  const [isDisabledNextStepButton, setDisabledNextStepButton] = useState(true)

  useEffect(() => {
    setDisabledNextStepButton(
      selectedDocument === '' ||
        !documentNumber.length ||
        documentNumber.length < 6 ||
        !isExpeditionDateValid(expeditionDate) ||
        !issuingBody.length ||
        issuingBody.length < 3
    )
  }, [selectedDocument, documentNumber, expeditionDate, issuingBody])

  useEffect(() => {
    if (selectedDocument === 'RG') {
      setIssuingBody('SSP')
    }
    if (selectedDocument === 'RNE') {
      setIssuingBody('CGPI/DIREX/DPF')
    }
  }, [selectedDocument, setIssuingBody])

  return (
    <WhiteContent>
      <GridContainer>
        <Row justifyContent="center">
          <Col md={4}>
            <S.Title type="heading4" color="gray6">
              Para iniciarmos a solicitação, por favor, escolha um documento:
            </S.Title>
          </Col>
        </Row>

        <Row justifyContent="center">
          <Col md={4}>
            <S.FieldForm>
              <SelectDocument
                selectedOption={selectedDocument}
                setSelectedOption={setSelectedDocument}
              />
            </S.FieldForm>
          </Col>
        </Row>

        <Row justifyContent="center">
          <Col md={4}>
            <S.FieldForm
              error={!documentNumber.length || documentNumber.length < 6}
            >
              <Input
                label="Número do documento"
                placeholder="Digite aqui..."
                error={
                  (!documentNumber.length || documentNumber.length < 6) &&
                  documentNumberError
                }
                maxLength={11}
                value={documentNumber}
                onChange={e => setDocumentNumber(e.target.value)}
                data-testid="document-number"
              />
            </S.FieldForm>
          </Col>
        </Row>

        <Row justifyContent="center">
          <Col md={4}>
            <S.FieldForm error={!isExpeditionDateValid(expeditionDate)}>
              <ExpeditionDateInput
                expeditionDate={expeditionDate}
                setExpeditionDate={setExpeditionDate}
              />
            </S.FieldForm>
          </Col>
        </Row>

        <Row justifyContent="center">
          <Col md={4}>
            <S.FieldForm error={!issuingBody.length || issuingBody.length < 3}>
              <IssuingBodyInput
                issuingBody={issuingBody}
                setIssuingBody={setIssuingBody}
              />
            </S.FieldForm>
          </Col>
        </Row>

        <Row justifyContent="center">
          <Col md={4}>
            <S.NextStepButton
              disabled={isDisabledNextStepButton}
              onClick={() => {
                onNextStep({
                  tipoDocumento: selectedDocument,
                  numeroDocumentoIdentificacao: documentNumber,
                  orgaoExpedidor: issuingBody,
                  dataEmissaoDocumento: expeditionDate,
                })
              }}
            >
              Próximo
            </S.NextStepButton>
          </Col>
        </Row>

        <Row justifyContent="center">
          <Col md={4}>
            <S.CustomDivisor />
            <S.FooterText type="body" color="gray5" textAlign="center">
              Não se preocupe, a solicitação só será enviada após
              <br />
              informarmos o cartão disponível para você.
            </S.FooterText>
          </Col>
        </Row>
      </GridContainer>
    </WhiteContent>
  )
}
