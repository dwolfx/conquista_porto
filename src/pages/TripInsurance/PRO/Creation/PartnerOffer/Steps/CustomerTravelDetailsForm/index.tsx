import React from 'react'
import { Row, Col } from 'styled-bootstrap-grid'
import { useParams } from 'react-router-dom'

import StepBar from 'pages/TripInsurance/commons/StepBar'
import Text from 'components/Text'
import UserCard from 'components/Card/UserCard'

import useFormFluxManagement from 'hooks/FluxManagement/useFormFluxManagement'
import useMedia from 'hooks/useMedia'

import { base64decode, truncateString } from 'helpers'

import { IForm } from 'pages/TripInsurance/PRO/types'

import SectionOne from './SectionOne'
import SectionTwo from './SectionTwo'
import SectionThree from './SectionThree'
import SectionFour from './SectionFour'
import SectionFive from './SectionFive'
import SectionSix from './SectionSix'
import useHandleScroll from './useHandleScroll'

import {
  NavWrapper,
  NavTitleWrapper,
  Tag,
  TagText,
  Divisor,
  BadgeNotification,
} from '../../styles'
import * as s from './styles'
import * as t from './types'

const CustomerTravelDetailsForm: t.StepComponent = () => {
  // const dispatch = useDispatch()
  const { updateForm } = useFormFluxManagement<IForm>()
  const isMobile = useMedia('xs')
  const isTabletVertical = useMedia('md')
  const isTabletHorizontal = useMedia('lg')
  const { hash } = useParams<t.IHash>()
  const [
    customer,
    setCustomer,
  ] = React.useState<t.IBase64DecodedResponse | null>(null)

  const handleScroll = useHandleScroll()

  //section-1
  const [isSectionOneValid, setIsSectionOneValid] = React.useState(false)
  const [isBrazilianResident, setIsBrazilianResident] = React.useState<string>(
    ''
  )

  //section-2
  const [isSectionTwoValid, setIsSectionTwoValid] = React.useState(false)
  const [email, setEmail] = React.useState<string>('')
  const [phone, setPhone] = React.useState<string>('')
  const [selectedPhoneType, setSelectedPhoneType] = React.useState<t.TSelected>(
    {
      id: 0,
      name: '',
    }
  )

  //section-3
  const [isSectionThreeValid, setIsSectionThreeValid] = React.useState(false)
  const [
    hasPoliticallyExposedPerson,
    setHasPoliticallyExposedPerson,
  ] = React.useState<boolean>(false)
  const [
    selectedPoliticalyExposedKinship,
    setSelectedPoliticalyExposedKinship,
  ] = React.useState<t.TSelected>({ id: 0, name: '' })
  const [
    politicalyExposedPersonName,
    setPoliticalyExposedPersonName,
  ] = React.useState<string>('')
  const [
    politicalyExposedPersonCPF,
    setPoliticalyExposedPersonCPF,
  ] = React.useState<string>('')

  //section-4
  const [isSectionFourValid, setIsSectionFourValid] = React.useState(false)

  //section-5
  const [isSectionFiveValid, setIsSectionFiveValid] = React.useState(false)

  //section-6
  const [isSectionSixValid, setIsSectionSixValid] = React.useState(false)

  // Form status
  // const [isFormPristine, setIsFormPristine] = React.useState(true)

  // Set customer
  React.useEffect(() => {
    if (hash) {
      const dataDecoded: t.IBase64DecodedResponse = base64decode(hash)
      if (dataDecoded) {
        setCustomer({ ...dataDecoded, cpfCliente: `${dataDecoded.cpfCliente}` })
      }
    }
  }, [hash])

  // mock temporário
  React.useEffect(() => {
    updateForm({
      acompanhantes: [
        {
          nome: '',
          email: 'email@acompanhante1.com',
          dataNascimento: '06/06/1944',
          sexo: 'F',
          numeroCpf: '454717840',
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
          nome: 'Nome Acompanhante 2 <= 70',
          email: 'email@acompanhante2.com',
          dataNascimento: '31/05/2000',
          sexo: 'M',
          numeroCpf: '375975140',
          digitoCpf: '77',
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
          id: 2,
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
          nome: 'Nome Acompanhante 3 > 70',
          email: 'email@acompanhante1.com',
          dataNascimento: '24/10/1929',
          sexo: 'F',
          numeroCpf: '049832460',
          digitoCpf: '53',
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
          id: 3,
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
          descricao: 'Japão',
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
        isCartaoPorto: false,
      },
      passageiroPrincipal: {
        nome: customer?.nomeCliente ?? '',
        email: 'email@principal.com',
        dataNascimento: '20/12/1980',
        sexo: 'M',
        numeroCpf: customer?.cpfCliente
          ? `${customer?.cpfCliente}`.slice(0, 9)
          : '',
        digitoCpf: customer?.cpfCliente
          ? `${customer?.cpfCliente}`.slice(9)
          : '',
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
      qtdPassagMaiorSetentaAnos: 2,
      qtdPassagMenorSetentaAnos: 2,
      susep: '',
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
  }, [updateForm, customer])

  const handleTruncateLength = (): number => {
    switch (true) {
      case isMobile:
        return 18
      case isTabletVertical:
        return 50
      case isTabletHorizontal:
        return 10
      default:
        return 18
    }
  }

  const fixedFooter = () => (
    <s.FooterWrapper>
      <s.FooterContainer>
        <Row>
          <Col lg={3} md={3} />
          <s.FooterCol lg={8} md={8}>
            <s.Button
              color="secondary"
              data-gtm-name="enviar proposta"
              data-gtm-type="click"
              data-gtm-clicktype="button"
              onClick={() => {}}
            >
              ENVIAR PROPOSTA
            </s.Button>
          </s.FooterCol>
        </Row>
      </s.FooterContainer>
    </s.FooterWrapper>
  )

  return (
    <>
      <StepBar title="Proposta" actualStep={3} totalNumberOfSteps={3} />
      <s.Container>
        <Row>
          <Col lg={3} md={3}>
            <NavWrapper>
              <NavTitleWrapper>
                <Text type="subheading" bold color="gray6">
                  DADOS DA CONTRATAÇÃO
                </Text>
              </NavTitleWrapper>
              <div>
                <Tag
                  active={handleScroll.activeMenuItem === 'section-1'}
                  onClick={() => {
                    handleScroll.scrollToSection(handleScroll.sectionOne)
                  }}
                >
                  <TagText>Dados do Cliente</TagText>
                  {!isSectionOneValid && <BadgeNotification />}
                </Tag>
                <Tag
                  active={handleScroll.activeMenuItem === 'section-2'}
                  onClick={() => {
                    handleScroll.scrollToSection(handleScroll.sectionTwo)
                  }}
                >
                  <TagText>Dados para Contato</TagText>
                  {!isSectionTwoValid && <BadgeNotification />}
                </Tag>
                <Tag
                  active={handleScroll.activeMenuItem === 'section-3'}
                  onClick={() => {
                    handleScroll.scrollToSection(handleScroll.sectionThree)
                  }}
                >
                  <TagText>Pessoa Politicamente Exposta (PPE)</TagText>
                  {!isSectionThreeValid && <BadgeNotification />}
                </Tag>
                <Tag
                  active={handleScroll.activeMenuItem === 'section-4'}
                  onClick={() => {
                    handleScroll.scrollToSection(handleScroll.sectionFour)
                  }}
                >
                  <TagText>Endereço</TagText>
                  {!isSectionFourValid && <BadgeNotification />}
                </Tag>
                <Tag
                  active={handleScroll.activeMenuItem === 'section-5'}
                  onClick={() => {
                    handleScroll.scrollToSection(handleScroll.sectionFive)
                  }}
                >
                  <TagText>Contato em casos de acidente</TagText>
                  {!isSectionFiveValid && <BadgeNotification />}
                </Tag>
                <Tag
                  active={handleScroll.activeMenuItem === 'section-6'}
                  onClick={() => {
                    handleScroll.scrollToSection(handleScroll.sectionSix)
                  }}
                >
                  <TagText>Declaração de Acompanhantes</TagText>
                  {!isSectionSixValid && <BadgeNotification />}
                </Tag>
              </div>
              <Divisor />
              <NavTitleWrapper>
                <Text type="subheading" color="gray5" bold>
                  ENVIAR PROPOSTA PARA:
                </Text>
              </NavTitleWrapper>
              <UserCard
                name={
                  (customer?.nomeCliente &&
                    truncateString(
                      customer?.nomeCliente,
                      handleTruncateLength()
                    )) ||
                  'Cliente'
                }
                type="cliente"
              />
            </NavWrapper>
          </Col>
          <Col lg={8} md={8}>
            <SectionOne
              sectionOneRef={handleScroll.sectionOne}
              setIsSectionValid={setIsSectionOneValid}
              brazilianResidentState={[
                isBrazilianResident,
                setIsBrazilianResident,
              ]}
            />
            <SectionTwo
              sectionTwoRef={handleScroll.sectionTwo}
              setIsSectionValid={setIsSectionTwoValid}
              emailState={[email, setEmail]}
              phoneNumberState={[phone, setPhone]}
              selectedPhoneTypeState={[selectedPhoneType, setSelectedPhoneType]}
            />
            <SectionThree
              sectionThreeRef={handleScroll.sectionThree}
              setIsSectionValid={setIsSectionThreeValid}
              customer={customer}
              hasPoliticallyExposedPersonState={[
                hasPoliticallyExposedPerson,
                setHasPoliticallyExposedPerson,
              ]}
              selectedPoliticalyExposedKinshipState={[
                selectedPoliticalyExposedKinship,
                setSelectedPoliticalyExposedKinship,
              ]}
              politicalyExposedPersonNameState={[
                politicalyExposedPersonName,
                setPoliticalyExposedPersonName,
              ]}
              politicalyExposedPersonCPFState={[
                politicalyExposedPersonCPF,
                setPoliticalyExposedPersonCPF,
              ]}
            />

            <SectionFour
              sectionFourRef={handleScroll.sectionFour}
              setIsSectionValid={setIsSectionFourValid}
            />

            <SectionFive
              sectionFiveRef={handleScroll.sectionFive}
              setIsSectionValid={setIsSectionFiveValid}
            />

            <SectionSix
              sectionSixRef={handleScroll.sectionSix}
              setIsSectionValid={setIsSectionSixValid}
            />
          </Col>
        </Row>
      </s.Container>
      {fixedFooter()}
    </>
  )
}

export default CustomerTravelDetailsForm
