import React from 'react'
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
// import useStackFluxManagement from 'hooks/FluxManagement/useStackFluxManagement'

import * as S from './styles'
import useFormFluxManagement from 'hooks/FluxManagement/useFormFluxManagement'
import { IForm } from 'pages/TripInsurance/PRO/types'

const InsuranceSummary = () => {
  const isMobile = useMedia('xs')
  // const { instantiate } = useStackFluxManagement<{}>()
  const { updateForm } = useFormFluxManagement<IForm>()

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
      codigoCanal: 1,
      codigoOperacao: '',
      codigoPaisDestino: '',
      codigoUfOrigem: 'AC',
      dataIda: '20/12/2025',
      dataVolta: '30/12/2025',
      // hasLatinAmericaCountryAndOtherCountry: '',
      // hasOnlyLatinAmericaDestination: ,
      idParceiro: 123,
      idSimulacao: '123',
      // isAceiteTermos: '',
      isCienteMoto: true,
      isMotocicleta: true,
      isPraticaAventura: false,
      motivoViagem: 1,
      nationalDestination: false,
      nomeDoPlano: 'Brasil Terra',
      pacoteEscolhido: '',
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
      susep: '',
      valorComDesconto: 1001.02,
      valorSeguro: 1100.5,
      valorSemDesconto: 1100.5,
    })
  }, [updateForm])

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
            <ClientDataCard />
            <ClientContactDetailsCard />
            <PoliticallyExposedPersonCard />
            <AddressCard />
            <ContactInfoAccidentsCaseCard />
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
                <S.Button color="secondary" disabled>
                  concluir contratação
                </S.Button>
              </S.Popover>
            </S.FooterCol>
          </Row>
        </Container>
      </S.FooterContainer>
    </>
  )
}

export default InsuranceSummary
