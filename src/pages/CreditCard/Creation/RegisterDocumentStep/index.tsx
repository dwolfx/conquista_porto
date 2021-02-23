import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Col, Row } from 'styled-bootstrap-grid'
import { useSelector } from 'react-redux'
import moment from 'moment'
import 'styled-components/macro'

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

  const [touchedInputs, setTouchedInputs] = useState({
    documentNumber: false,
    expeditionDate: false,
    issuingBody: false
  })

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

  useLayoutEffect(() => {
    const layerChildrenElement = document.querySelector('#layer-children')
    if (layerChildrenElement) {
      layerChildrenElement.scrollTo({ 
        top: 0
      })
    }
  }, [])

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

  const touchInput = (formKey: string) => {
    setTouchedInputs({
      ...touchedInputs,
      [formKey]: true,
    })
  }

  return (
    <WhiteContent>
      <GridContainer>
        <Row justifyContent="center">
          <Col md={4} xs={12}>
            <S.Title type="heading4" textAlign="center" color="gray6">
              Escolha um documento e preencha os dados necessários:
            </S.Title>
            <S.FormWrapper>
              <S.FieldForm>
                <SelectDocument
                  selectedOption={selectedDocument}
                  setSelectedOption={setSelectedDocument}
                />
              </S.FieldForm>
              <S.FieldForm
                error={(!documentNumber.length || documentNumber.length < 6) && touchedInputs.documentNumber}
              >
                <Input
                  label="Número do documento"
                  placeholder="Digite aqui..."
                  maxLength={11}
                  value={documentNumber}
                  onBlur={() => touchInput('documentNumber')}
                  onChange={e => setDocumentNumber(e.target.value)}
                  data-testid="document-number"
                  error={
                    ((!documentNumber.length || documentNumber.length < 6) && touchedInputs.documentNumber) && documentNumberError
                  }
                />
              </S.FieldForm>
              <S.FieldForm error={!isExpeditionDateValid(expeditionDate) && touchedInputs.expeditionDate}>
                <ExpeditionDateInput
                  touched={touchedInputs.expeditionDate}
                  handleTouchField={() => touchInput('expeditionDate')}
                  expeditionDate={expeditionDate}
                  setExpeditionDate={setExpeditionDate}
                />
              </S.FieldForm>
              <S.FieldForm error={(!issuingBody.length || issuingBody.length < 3) && touchedInputs.issuingBody}>
                <IssuingBodyInput
                  handleTouchField={() => touchInput('issuingBody')}
                  issuingBody={issuingBody}
                  setIssuingBody={setIssuingBody}
                  touched={touchedInputs.issuingBody}
                />
              </S.FieldForm>
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
              <S.CustomDivisor />
              <S.FooterText type="body" color="gray5" textAlign="center">
                Não se preocupe, a solicitação só será enviada após
                <br />
                informarmos o cartão disponível para você.
              </S.FooterText>
            </S.FormWrapper>
          </Col>
        </Row>
      </GridContainer>
    </WhiteContent>
  )
}
