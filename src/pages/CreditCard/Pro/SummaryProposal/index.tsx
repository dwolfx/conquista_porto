import React, { useState } from 'react'
import { Row, Col } from 'styled-bootstrap-grid'
import 'styled-components/macro'

import Text from 'components/Text'
import Checkbox from 'components/Inputs/Checkbox'
import Button from 'components/Button'
import HorizontalList from 'components/HorizontalList'

import PersonalData from '../../Creation/SummaryStep/PersonalData'
import CardData from '../../Creation/SummaryStep/CardData'
import DeliveryData from '../../Creation/SummaryStep/DeliveryData'

import { ICreditCardCreationPayload } from 'pages/CreditCard/Creation/types'

import { StyledCard } from '../../Creation/SummaryStep/CardData/styles'

import * as S from './styles'

import LogoConquistaBeta from 'assets/images/logoConquistaBeta.png'

// DADOS MOCKADOS -- TIRAR ASSIM QUE A INTEGRAÇÃO ESTIVER FEITA
const mockedProposalData = {
  personalData: {
    email: 'email@email.com',
    taxId: '12345678901',
    dateOfBirth: '1987-11-25T00:00:00-03:00',
    mobileNumber: '925425896',
    state: 'São Paulo',
    document: {
      type: 'RG',
      number: '1234567-X',
      issueDate: '25/11/2019',
      issuingBody: 'SSPSP',
    },
    civilStatusCode: '1',
    gender: 'M',
    professionCode: '3',
    motherName: 'Etelvina',
  },
  creditCardData: {
    flagCode: '1',
    dueDate: '20',
  },
  deliveryData: {
    zipCode: '02356230',
    address: 'Rua lá de cima, 789',
    addressComplement: '12-A',
    neighborhood: 'Vila do Chaves',
    city: 'São Paulo',
    state: 'Acapulco',
  },
}

// DADOS MOCKADOS -- TIRAR ASSIM QUE A INTEGRAÇÃO ESTIVER FEITA
const mockedFormData = {
  bairro: mockedProposalData.deliveryData.neighborhood,
  cep: mockedProposalData.deliveryData.zipCode,
  cidade: mockedProposalData.deliveryData.city,
  codigoBandeira: mockedProposalData.creditCardData.flagCode,
  codigoCanal: '1',
  codigoEstadoCivil: mockedProposalData.personalData.civilStatusCode,
  codigoProfissao: mockedProposalData.personalData.professionCode,
  complemento: mockedProposalData.deliveryData.addressComplement,
  dataEmissaoDocumento: mockedProposalData.personalData.document.issueDate,
  dataNascimento: mockedProposalData.personalData.dateOfBirth,
  dddTelefone: '11',
  diaVencimento: mockedProposalData.creditCardData.dueDate,
  email: mockedProposalData.personalData.email,
  idSimulacao: '1',
  logradouro: mockedProposalData.deliveryData.address,
  nacionalidade: 'Brazolias',
  nome: 'Huhu',
  nomeMae: mockedProposalData.personalData.motherName,
  numeroDocumentoIdentificacao: mockedProposalData.personalData.document.number,
  numeroLogradouro: '123',
  numeroTelefone: mockedProposalData.personalData.mobileNumber,
  orgaoExpedidor: mockedProposalData.personalData.document.issuingBody,
  sexo: mockedProposalData.personalData.gender,
  tipoDocumento: mockedProposalData.personalData.document.type,
  uf: mockedProposalData.deliveryData.state,
  valorRenda: '10000',
  cpf: '12345678912',
  estado: 'São Paulo',
}

const writting = {
  logo: {
    alt: 'Logo Conquista Beta',
  },
  subHeader: {
    text1: 'Proposta',
    text2: 'Cartão de Crédito',
  },
  proposal: {
    title: 'Proposta de cartão especial para você!',
    body:
      'Se precisar tirar dúvidas fale com o seu parceiro ou através de nossos canais de atendimento.',
    termsAndConditions:
      'Concordo com a solicitação do Cartão de Crédito Porto Seguro e com as condições do contrato, que será enviado com o cartão.',
    rejectButton: 'Rejeitar proposta',
    acceptButton: {
      text: 'Concluir contratação',
      tooltip:
        'Há campos vazios ou com erros. Por favor, verifique e tente novamente.',
    },
  },
}

const SummaryProposal = () => {
  const [isChecked, setChecked] = useState(false)
  const [proposalData, setProposalData] = useState<ICreditCardCreationPayload>(
    mockedFormData
  )
  const isFormValid = (proposalData: ICreditCardCreationPayload) => {
    return (
      !!proposalData.email &&
      !!proposalData.cpf &&
      !!proposalData.dataNascimento &&
      !!proposalData.numeroTelefone &&
      !!proposalData.uf &&
      !!proposalData.tipoDocumento &&
      !!proposalData.numeroDocumentoIdentificacao &&
      !!proposalData.dataEmissaoDocumento &&
      !!proposalData.orgaoExpedidor &&
      !!proposalData.codigoEstadoCivil &&
      !!proposalData.sexo &&
      !!proposalData.codigoProfissao &&
      !!proposalData.nomeMae &&
      !!proposalData.codigoBandeira &&
      !!proposalData.diaVencimento &&
      !!proposalData.cep &&
      !!proposalData.logradouro &&
      !!proposalData.complemento &&
      !!proposalData.bairro &&
      !!proposalData.cidade &&
      !!proposalData.estado &&
      isChecked
    )
  }

  return (
    <>
      <S.Header>
        <S.HeaderGridContainer>
          <S.HaderGridRow>
            <S.HaderGridCol lg={12}>
              <S.HeaderContent>
                <S.LogoWrapper>
                  <img src={LogoConquistaBeta} alt={writting.logo.alt} />
                </S.LogoWrapper>
              </S.HeaderContent>
            </S.HaderGridCol>
          </S.HaderGridRow>
        </S.HeaderGridContainer>
      </S.Header>

      <S.SubHeader>
        <S.GridContainer>
          <S.GridRow>
            <S.GridCol lg={12}>
              <HorizontalList
                size="small"
                startItems={[
                  <Text color="gray4" type="headline">
                    {writting.subHeader.text1}
                  </Text>,
                  <Text color="white" type="headline">
                    {writting.subHeader.text2}
                  </Text>,
                ]}
              />
            </S.GridCol>
          </S.GridRow>
        </S.GridContainer>
      </S.SubHeader>

      <S.Wrapper>
        <S.GridContainer>
          <Row>
            <Col lg={3} md={3} sm={12}>
              <S.StickyContent>
                <S.StyledVerticalList
                  elements={[
                    <S.ProposalTitle bold type="heading4" color="gray6">
                      {writting.proposal.title}
                    </S.ProposalTitle>,
                    <Text bold type="body" color="gray5">
                      {writting.proposal.body}
                    </Text>,
                  ]}
                />
              </S.StickyContent>
            </Col>
            <S.StyledCol lg={8} md={9} sm={12}>
              <PersonalData
                formData={proposalData}
                setFormData={setProposalData}
              />
              <CardData formData={proposalData} setFormData={setProposalData} />
              <DeliveryData
                formData={proposalData}
                setFormData={setProposalData}
              />
              <StyledCard>
                <S.CheckboxWrapper>
                  <Checkbox
                    data-testid="credit-card-check"
                    id="credit-card-check"
                    checked={isChecked}
                    onChange={() => setChecked(!isChecked)}
                    label={
                      <S.StyledText bold type="body" color="gray6">
                        {writting.proposal.termsAndConditions}
                      </S.StyledText>
                    }
                  />
                </S.CheckboxWrapper>
              </StyledCard>
            </S.StyledCol>
          </Row>
        </S.GridContainer>
      </S.Wrapper>

      <S.Footer>
        <Button color="primary" outline={true}>
          {writting.proposal.rejectButton}
        </Button>
        <S.Tooltip
          content={() => (
            <S.TooltipText type="body" color="gray5">
              {writting.proposal.acceptButton.tooltip}
            </S.TooltipText>
          )}
          turnOff={isFormValid(proposalData)}
          placement="top"
        >
          <S.AcceptButton
            color="secondary"
            disabled={!isFormValid(proposalData)}
            data-testid="proposal-summary-accept-button"
            data-gtm-subname="botao aceitar proposta"
            data-gtm-name="botao aceitar"
            data-gtm-type="click"
            data-gtm-clicktype="button"
          >
            {writting.proposal.acceptButton.text}
          </S.AcceptButton>
        </S.Tooltip>
      </S.Footer>
    </>
  )
}

export default SummaryProposal
