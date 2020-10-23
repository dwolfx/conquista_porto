import React, { useState } from 'react'
import { Col, Row } from 'styled-bootstrap-grid'
import { IStepComponent, DocumentType, BrazilianState } from '../types'
import Input from 'components/NewInput'
import DocumentsSelect from './selects/Documents'
import BrazilianStatesSelect from './selects/BrazilianStates'
import { GridContainer, WhiteContent } from '../styles'
import * as S from './styles'

export default function SecondCreditCardStep({
  form,
  onChangeForm,
  onNextStep,
}: IStepComponent) {
  const [document, setDocument] = useState<DocumentType | null>(null)
  const [brazilianState, setBrazilianState] = useState<BrazilianState | null>(
    null
  )

  const [isDisabledNextStepButton, setDisabledNextStepButton] = useState(true)

  // TODO validar campo ao digitar
  // TODO verificar se o grupo de formulario preenchido é o grupo do DocumentType selecionado
  // TODO liberar botao de avançar se as condições acimas forem cumpridas

  function onSubmitStep() {
    // TODO setar valor dos campos do formulario geral
    onNextStep()
  }

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
            <S.FieldForm error={false}>
              <DocumentsSelect state={[document, setDocument]} />
            </S.FieldForm>
          </Col>
        </Row>

        {null !== document && (
          <Row justifyContent="center">
            <Col md={4}>
              <S.FieldForm error={false}>
                <Input label="Número do documento" placeholder="Digite" />
              </S.FieldForm>
            </Col>
          </Row>
        )}

        {DocumentType.RG === document && (
          <Row justifyContent="center">
            <Col md={4}>
              <S.FieldForm error={false}>
                <Input label="Data de expedição" placeholder="00/00/0000" />
              </S.FieldForm>
            </Col>
          </Row>
        )}

        {DocumentType.RG !== document && null !== document && (
          <Row justifyContent="center">
            <Col md={2}>
              <S.FieldForm error={false}>
                <Input
                  label="Data de emissão"
                  placeholder="00/00/0000"
                  // error={{ icon: 'alertrounded', message: 'aaa' }}
                />
              </S.FieldForm>
            </Col>
            <Col md={2}>
              <S.FieldForm error={false}>
                <Input label="Data de vencimento" placeholder="00/00/0000" />
              </S.FieldForm>
            </Col>
          </Row>
        )}

        {(DocumentType.RG === document || DocumentType.RNE === document) && (
          <Row justifyContent="center">
            <Col md={2}>
              <S.FieldForm error={false}>
                <Input label="Orgão emissor" placeholder="Digite" />
              </S.FieldForm>
            </Col>
            <Col md={2}>
              <S.FieldForm error={false}>
                <BrazilianStatesSelect
                  state={[brazilianState, setBrazilianState]}
                />
              </S.FieldForm>
            </Col>
          </Row>
        )}

        {(DocumentType.PASSPORT === document ||
          DocumentType.CNH === document) && (
          <Row justifyContent="center">
            <Col md={4}>
              <S.FieldForm error={false}>
                <BrazilianStatesSelect
                  state={[brazilianState, setBrazilianState]}
                />
              </S.FieldForm>
            </Col>
          </Row>
        )}

        <Row justifyContent="center">
          <Col md={4}>
            <S.NextStepButton
              disabled={isDisabledNextStepButton}
              onClick={onSubmitStep}
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
