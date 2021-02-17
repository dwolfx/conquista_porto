import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Col, Container, Row } from 'styled-bootstrap-grid'

import StepBar from 'pages/TripInsurance/commons/StepBar'
import Text from 'components/Text'

import AddressCard from './AddressCard'
import ClientDataCard from './ClientDataCard'
import ClientContactDetailsCard from './ClientContactDetailsCard'
import CompanionInfoCard from './CompanionInfoCard'
import ContactInfoAccidentsCaseCard from './ContactInfoAccidentsCaseCard'
import PaymentInfoCard from './PaymentInfoCard'
import PoliticallyExposedPersonCard from './PoliticallyExposedPersonCard'

import useMedia from 'hooks/useMedia'
import { useToast } from 'hooks/toast'
import useStackFluxManagement from 'hooks/FluxManagement/useStackFluxManagement'
import useFormFluxManagement from 'hooks/FluxManagement/useFormFluxManagement'

import { PostTripInsuranceProposalRequest } from 'store/modules/TripInsurance/Proposal/action'

import { ITripInsuranceProposal } from 'store/modules/TripInsurance/Proposal/types'
import { IForm, CustomerSteps } from 'pages/TripInsurance/PRO/types'

import * as S from './styles'

const InsuranceSummary = () => {
  const isMobile = useMedia('xs')
  const dispatch = useDispatch()
  const { addToast } = useToast()
  const { instantiate } = useStackFluxManagement<{}>()
  const { form, updateForm } = useFormFluxManagement<IForm>()

  const [retries, setRetries] = React.useState<number>(3)
  const [isButtonDisabled, setIsButtonDisabled] = React.useState<boolean>(false)
  const [hasClientDataEmptyData, setHasClientDataEmptyData] = React.useState<
    boolean
  >(false)
  const [
    hasClientContactDetailsEmptyData,
    setHasClientContactDetailsEmptyData,
  ] = React.useState<boolean>(false)
  const [hasPEPEmptyData, setHasPEPEmptyData] = React.useState<boolean>(false)
  const [hasAddressEmptyData, setHasAddressEmptyData] = React.useState<boolean>(
    false
  )
  const [
    hasContactInfoAccidentsCaseData,
    setHasContactInfoAccidentsCaseData,
  ] = React.useState<boolean>(false)

  const { proposalIsLoading, proposalHasError } = useSelector(
    (state: { tripInsuranceProposal: ITripInsuranceProposal }) => ({
      proposalIsLoading: state.tripInsuranceProposal.isLoading,
      proposalHasError: state.tripInsuranceProposal.hasError,
    })
  )

  // mock temporário
  React.useEffect(() => {
    updateForm({
      acompanhantes: [
        {
          nome: 'Nome Acompanhante 1',
          email: 'email@acompanhante1.com',
          dataNascimento: '31/05/1990',
          sexo: 'F',
          numeroCpf: '111111111',
          digitoCpf: '22',
          isResidePais: true,
          celularDDD: '11',
          celularNumero: '987985465',
          contato: {
            nome: 'Contato Do Passageiro Principal',
            celularDDD: '11',
            celularNumero: '932216554',
          },
          endereco: {
            tipo: 'Rua',
            logradouro: 'Rua Augusta',
            bairro: 'Penha',
            cidade: 'São Paulo',
            uf: 'SP',
            complemento: '',
            numero: '123A',
            numeroCep: '01419',
            complementoCep: '001',
          },
          id: 1,
          status: true,
          numeroCpfResponsavel: '111111111',
          digitoCpfResponsavel: '22',
          codigoPaisResidente: '28',
          pessoaExposta: {
            nome: 'Nome Pessoa Exposta',
            numeroCpf: '000000001',
            digitoCpf: '91',
            grauRelacionamento: 1,
            grauParentesco: 1,
          },
        },
        {
          nome: 'Nome Acompanhante 2',
          email: 'email@acompanhante2.com',
          dataNascimento: '31/05/2000',
          sexo: 'M',
          numeroCpf: '111111111',
          digitoCpf: '22',
          isResidePais: true,
          celularDDD: '11',
          celularNumero: '987985465',
          contato: {
            nome: 'Contato Do Passageiro Principal',
            celularDDD: '11',
            celularNumero: '932216554',
          },
          endereco: {
            tipo: 'Rua',
            logradouro: 'Rua Augusta',
            bairro: 'Penha',
            cidade: 'São Paulo',
            uf: 'SP',
            complemento: '',
            numero: '123A',
            numeroCep: '01419',
            complementoCep: '001',
          },
          id: 1,
          status: true,
          numeroCpfResponsavel: '111111111',
          digitoCpfResponsavel: '22',
          codigoPaisResidente: '28',
          pessoaExposta: {
            nome: 'Nome Pessoa Exposta',
            numeroCpf: '000000001',
            digitoCpf: '91',
            grauRelacionamento: 1,
            grauParentesco: 1,
          },
        },
      ],
      codigoPaisDestino: '28',
      codigoUfOrigem: 'AC',
      dataIda: '20/12/2025',
      dataVolta: '30/12/2025',
      idSimulacao: '1234',
      isAceiteTermos: true,
      isCienteMoto: true,
      isMotocicleta: true,
      isPraticaAventura: false,
      motivoViagem: 1,
      nationalDestination: false,
      nomeDoPlano: 'Brasil Terra',
      pacoteEscolhido: '2',
      paisesAdicionais: [
        {
          codigo: '10',
          descricao: 'Africa',
        },
      ],
      pagamento: {
        codigoBandeira: 7,
        primeiroNumero: '5555',
        segundoNumero: '6666',
        terceiroNumero: '7777',
        quartoNumero: '8884',
        codigoSeguranca: 123,
        mesValidade: '12',
        anoValidade: '25',
        nomeTitular: 'Nome No Cartão',
        quantidadeParcelas: 2,
        isCartaoPorto: true,
      },
      passageiroPrincipal: {
        nome: 'Nome Passageiro Principal',
        email: 'email@principal.com',
        dataNascimento: '20/12/1980',
        sexo: 'M',
        numeroCpf: '000000001',
        digitoCpf: '91',
        isResidePais: true,
        celularDDD: '11',
        celularNumero: '965543221',
        contato: {
          nome: 'Contato Do Passageiro Principal',
          celularDDD: '11',
          celularNumero: '932216554',
        },
        endereco: {
          tipo: 'Rua',
          logradouro: 'Rua Augusta',
          bairro: 'Penha',
          cidade: 'São Paulo',
          uf: 'SP',
          complemento: '',
          numero: '123A',
          numeroCep: '01419',
          complementoCep: '001',
        },
      },
      pessoaExposta: {
        nome: 'Nome Pessoa Exposta',
        numeroCpf: '000000001',
        digitoCpf: '91',
        grauRelacionamento: 1,
        grauParentesco: 4,
      },
      qtdPassagMaiorSetentaAnos: 0,
      qtdPassagMenorSetentaAnos: 1,
      valorComDesconto: 1001.02,
      valorSemDesconto: 1100.5,
      formasPagamento: {
        listaParcelamentoCartao: [
          {
            valor: '33.63',
            id: '1',
            descricao: 'À vista',
          },
          {
            valor: '16.82',
            id: '2',
            descricao: '2x',
          },
          {
            valor: '11.21',
            id: '3',
            descricao: '3x',
          },
          {
            valor: '8.41',
            id: '4',
            descricao: '4x',
          },
          {
            valor: '6.73',
            id: '5',
            descricao: '5x',
          },
          {
            valor: '5.61',
            id: '6',
            descricao: '6x',
          },
          {
            valor: '4.8',
            id: '7',
            descricao: '7x',
          },
          {
            valor: '4.2',
            id: '8',
            descricao: '8x',
          },
          {
            valor: '3.74',
            id: '9',
            descricao: '9x',
          },
          {
            valor: '3.36',
            id: '10',
            descricao: '10x',
          },
          {
            valor: '3.06',
            id: '11',
            descricao: '11x',
          },
          {
            valor: '2.8',
            id: '12',
            descricao: '12x',
          },
        ],
        listaParcelamentoCartaoPorto: [
          {
            valor: '31.94',
            id: '1',
            descricao: 'À vista',
          },
          {
            valor: '15.97',
            id: '2',
            descricao: '2x',
          },
          {
            valor: '10.65',
            id: '3',
            descricao: '3x',
          },
          {
            valor: '7.99',
            id: '4',
            descricao: '4x',
          },
          {
            valor: '6.39',
            id: '5',
            descricao: '5x',
          },
          {
            valor: '5.32',
            id: '6',
            descricao: '6x',
          },
          {
            valor: '4.56',
            id: '7',
            descricao: '7x',
          },
          {
            valor: '3.99',
            id: '8',
            descricao: '8x',
          },
          {
            valor: '3.55',
            id: '9',
            descricao: '9x',
          },
          {
            valor: '3.19',
            id: '10',
            descricao: '10x',
          },
          {
            valor: '2.9',
            id: '11',
            descricao: '11x',
          },
          {
            valor: '2.66',
            id: '12',
            descricao: '12x',
          },
        ],
      },
      coberturas: [
        {
          valor: 'R$ 10.000,00',
          descricao: 'Despesas Médicas, Hospitalares e/ou Odontológicas - DMHO',
        },
        {
          valor: 'R$ 80.000,00',
          descricao: 'Morte acidental',
        },
        {
          valor: 'R$ 80.000,00',
          descricao: 'Invalidez Permanente Total ou Parcial por Acidente',
        },
        {
          valor: 'Não',
          descricao: 'Cancelamento de Viagem',
        },
        {
          valor: 'Não',
          descricao: 'Interrupção da viagem',
        },
        {
          valor: 'R$  1.000,00',
          descricao: 'Extravio de bagagem',
        },
        {
          valor: 'R$ 300,00',
          descricao: 'Danos de Bagagem',
        },
        {
          valor: 'R$ 20.000,00',
          descricao: 'Traslado de Corpo',
        },
        {
          valor: 'R$ 20.000,00',
          descricao: 'Traslado Médico',
        },
        {
          valor: 'R$ 20.000,00',
          descricao: 'Regresso Sanitário',
        },
        {
          valor: 'R$ 5.000,00',
          descricao: 'Assistência Funeral',
        },
        {
          valor: 'R$100,00/Dia  Limite 5 Dias',
          descricao: 'Hospedagem após Alta Hospitalar',
        },
        {
          valor: 'R$ 3.000,00',
          descricao: 'Remarcação de Passagem para Regresso',
        },
        {
          valor: 'R$ 3.000,00',
          descricao:
            'Remarcação de passagem para regresso de membros da família.',
        },
        {
          valor: 'R$ 3.000,00',
          descricao: 'Acompanhante em caso de Hospitalização Prolongada',
        },
        {
          valor: 'R$ 100,00 / dia - Limite 5 dias',
          descricao:
            'Hospedagem para Acompanhante em caso de Hospitalização Prolongada',
        },
        {
          valor: 'R$ 3.000,00',
          descricao: 'Acompanhamento de menor',
        },
        {
          valor: 'Não',
          descricao: 'Fisioterapia',
        },
        {
          valor: 'Não',
          descricao: 'Despesas Farmacêuticas',
        },
        {
          valor: 'Não',
          descricao: 'Despesas Jurídicas',
        },
        {
          valor: 'Não',
          descricao: 'Pagamento de Fiança',
        },
        {
          valor: 'Sim',
          descricao: 'Extensão de Vigência por Razões Médicas',
        },
        {
          valor: 'Sim',
          descricao: 'Porto Viaje Bem',
        },
        {
          valor: 'Sim (se transporte aéreo ou marítimo)',
          descricao: 'Localização e Encaminhamento de bagagem',
        },
        {
          valor: 'Sim',
          descricao: 'Orientação e envio em caso de perda de documentos',
        },
        {
          valor: 'Sim',
          descricao: 'Transmissão de Mensagens Urgentes',
        },
      ],
    })
  }, [updateForm])

  // Handle with submit button
  React.useEffect(() => {
    setIsButtonDisabled(
      !form.codigoPaisDestino ||
        !form.codigoUfOrigem ||
        !form.dataIda ||
        !form.dataVolta ||
        !form.idSimulacao ||
        !form.motivoViagem ||
        !form.pacoteEscolhido ||
        !form.valorComDesconto ||
        !form.valorSemDesconto ||
        hasClientDataEmptyData ||
        hasClientContactDetailsEmptyData ||
        hasPEPEmptyData ||
        hasAddressEmptyData ||
        hasContactInfoAccidentsCaseData
    )
  }, [
    form.codigoPaisDestino,
    form.codigoUfOrigem,
    form.dataIda,
    form.dataVolta,
    form.idSimulacao,
    form.motivoViagem,
    form.pacoteEscolhido,
    form.valorComDesconto,
    form.valorSemDesconto,
    hasClientDataEmptyData,
    hasClientContactDetailsEmptyData,
    hasPEPEmptyData,
    hasAddressEmptyData,
    hasContactInfoAccidentsCaseData,
  ])

  // Error step
  React.useEffect(() => {
    if (proposalHasError && retries === 0) {
      instantiate(CustomerSteps.errorStep)
    }
  }, [proposalHasError, retries, instantiate])

  const handleClick = () => {
    dispatch(
      PostTripInsuranceProposalRequest({
        payload: {
          dataIda: form.dataIda,
          dataVolta: form.dataVolta,
          motivoViagem: form.motivoViagem,
          isPraticaAventura: form.isPraticaAventura,
          isMotocicleta: form.isMotocicleta,
          qtdPassagMenorSetentaAnos: form.qtdPassagMenorSetentaAnos,
          qtdPassagMaiorSetentaAnos: form.qtdPassagMaiorSetentaAnos,
          codigoUfOrigem: form.codigoUfOrigem,
          codigoPaisDestino: form.codigoPaisDestino,
          pacoteEscolhido: form.pacoteEscolhido,
          valorSeguro: form.pagamento?.isCartaoPorto
            ? Number(form.valorComDesconto)
            : Number(form.valorSemDesconto),
          passageiroPrincipal: form.passageiroPrincipal,
          acompanhantes: form.acompanhantes,
          pagamento: form.pagamento,
          isAceiteTermos: form.isAceiteTermos,
          isCienteMoto: form.isCienteMoto,
          idSimulacao: form.idSimulacao,
        },
        onErrorToast: addToast,
        onSuccess: instantiate,
        Step: CustomerSteps.successStep,
        setRetries: () => setRetries(retries - 1),
      })
    )
  }

  return (
    <>
      <StepBar title="Contratação" actualStep={2} totalNumberOfSteps={2} />
      <S.Container>
        <Row>
          <S.HeaderCol lg={3} md={3} sm={12}>
            <S.HeaderWrapper>
              <S.HeaderTitleWrapper>
                <Text type="heading4" bold color="gray6">
                  Proposta de Seguro Viagem especial para você!
                </Text>
              </S.HeaderTitleWrapper>

              <S.HeaderTitleWrapper>
                <Text type={isMobile ? 'body' : 'headline'} color="gray6">
                  Se precisar tirar dúvidas fale com seu parceiro.
                </Text>
              </S.HeaderTitleWrapper>
            </S.HeaderWrapper>
          </S.HeaderCol>

          <Col lg={8} md={9} sm={12}>
            <ClientDataCard setHasEmptyData={setHasClientDataEmptyData} />
            <ClientContactDetailsCard
              setHasEmptyData={setHasClientContactDetailsEmptyData}
            />
            <PoliticallyExposedPersonCard
              setHasEmptyData={setHasPEPEmptyData}
            />
            <AddressCard setHasEmptyData={setHasAddressEmptyData} />
            <ContactInfoAccidentsCaseCard
              setHasEmptyData={setHasContactInfoAccidentsCaseData}
            />
            <CompanionInfoCard />
            <PaymentInfoCard />
          </Col>
        </Row>
      </S.Container>

      <S.FooterContainer>
        <Container>
          <Row>
            <Col lg={3} md={3} sm={12} />
            <S.FooterCol lg={8} md={9} sm={12}>
              <S.Button color="primary" outline>
                rejeitar proposta
              </S.Button>
              <S.Popover
                placement="top"
                turnOff={!isButtonDisabled}
                content={
                  <Text bold type="body" color="gray5">
                    Há campos vazios ou com
                    <br />
                    erros. Por favor, verifique e
                    <br />
                    tente novamente.
                  </Text>
                }
              >
                <S.SubmitButton
                  tryAgain={retries < 3}
                  disabled={isButtonDisabled}
                  loading={proposalIsLoading}
                  onClick={() => handleClick()}
                >
                  {retries < 3 ? `TENTAR NOVAMENTE` : `CONTRATAR`}
                </S.SubmitButton>
              </S.Popover>
            </S.FooterCol>
          </Row>
        </Container>
      </S.FooterContainer>
    </>
  )
}

export default InsuranceSummary
