import React from 'react'
import { Container, Row } from 'styled-bootstrap-grid'

import Divisor from 'components/Divisor'
import StepBar from 'pages/TripInsurance/commons/StepBar'
import Text from 'components/Text'

import useMedia from 'hooks/useMedia'
import useFormFluxManagement from 'hooks/FluxManagement/useFormFluxManagement'
import useStackFluxManagement from 'hooks/FluxManagement/useStackFluxManagement'

import HorizontalCard from './HorizontalCard'
import VerticalCard from './VerticalCard'

import { CustomerSteps } from 'pages/TripInsurance/PRO/types'
import { StepComponent } from 'hooks/FluxManagement/types'

import { IPlan } from 'store/modules/TripInsurance/InsuranceQuotation/types'
import { IForm } from 'pages/TripInsurance/PRO/types'
import { useDispatch } from 'react-redux'
import { useToast } from 'hooks/toast'
import { GetTripInsuranceCreditCardRequest } from 'store/modules/TripInsurance/CreditCard/action'

import * as s from './styles'

const ChoosePlan: StepComponent = () => {
  const isMobile = useMedia('xs')
  const isVerticalTablet = useMedia('sm')
  const { instantiate } = useStackFluxManagement<{}>()
  const { form, updateForm } = useFormFluxManagement<IForm>()
  const dispatch = useDispatch()
  const { addToast } = useToast()

  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [tripInsuranceQuotation, setTripInsuranceQuotation] = React.useState<
    IPlan
  >({
    ViagemCobertura: {
      coberturas: [],
    },
    codigoPlano: '',
    formasPagamento: {
      listaParcelamentoCartao: [],
      listaParcelamentoCartaoPorto: [],
    },
    nomePlano: '',
    valorCartaoPortoSeguro: '',
    valorSeguroBruto: '',
    valorTotal: '',
  })

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

    dispatch(
      GetTripInsuranceCreditCardRequest({
        onErrorToast: addToast,
      })
    )
  }, [updateForm, dispatch, addToast])

  // Set tripInsuranceQuotation with form values
  React.useEffect(() => {
    setTripInsuranceQuotation({
      ViagemCobertura: {
        coberturas: form.coberturas ?? [],
      },
      codigoPlano: form.pacoteEscolhido ?? '',
      formasPagamento: form.formasPagamento ?? {
        listaParcelamentoCartao: [],
        listaParcelamentoCartaoPorto: [],
      },
      nomePlano: form.nomeDoPlano ?? '',
      valorCartaoPortoSeguro: form.valorComDesconto
        ? `${form.valorComDesconto}`
        : '',
      valorSeguroBruto: form.valorSemDesconto ? `${form.valorSemDesconto}` : '',
      valorTotal: form.valorSemDesconto ? `${form.valorSemDesconto}` : '',
    })
  }, [
    form.coberturas,
    form.formasPagamento,
    form.nomeDoPlano,
    form.pacoteEscolhido,
    form.valorComDesconto,
    form.valorSemDesconto,
  ])

  return (
    <s.ContentWrapper>
      <s.ComparativeModal
        isOpen={isModalOpen}
        handleClose={setIsModalOpen}
        travelPlans={[tripInsuranceQuotation]}
        isLoading={false}
        // isLoading={isLoading} com a chamada do redis
      />
      <StepBar title="Contratação" actualStep={1} totalNumberOfSteps={2} />
      <s.Container>
        <Row>
          <s.Col lg={3} md={3} sm={12}>
            <s.InformationWrapper>
              <s.Text type="heading4" bold>
                Proposta de Seguro Viagem especial para você!
              </s.Text>
              <Text type="headline">
                Se precisar tirar dúvidas fale com seu parceiro.
              </Text>
            </s.InformationWrapper>
          </s.Col>
          <s.Col lg={8} md={9} sm={12}>
            <s.Card>
              <s.CardTitleWrapper>
                <Text bold type="subheading" color="gray5">
                  DETALHES DA VIAGEM
                </Text>
              </s.CardTitleWrapper>
              <s.DataDisplayer label="Origem" value="Brasil" />
              <Divisor />
              <s.DataDisplayer
                label="Destino"
                value={
                  form.nationalDestination
                    ? 'Nacional'
                    : form.paisesAdicionais
                    ? `Internacional / ${form.paisesAdicionais?.map(
                        (country, index) =>
                          index + 1 !== form.paisesAdicionais?.length
                            ? `${country.descricao},`
                            : country.descricao
                      )}`
                    : ''
                }
              />
              <Divisor />
              <s.DataDisplayer
                label="Período"
                value={
                  form.dataIda && form.dataVolta
                    ? `${form.dataIda} até ${form.dataVolta}`
                    : ''
                }
              />
              <Divisor />
              <s.DataDisplayer
                label="Passageiros"
                value={
                  <s.TextWrapper>
                    <>
                      {form.qtdPassagMenorSetentaAnos ? (
                        <Text
                          bold
                          type={isVerticalTablet ? 'headline' : 'title'}
                          color="gray6"
                        >
                          {`Até 70 anos: ${
                            form.qtdPassagMenorSetentaAnos < 10 &&
                            form.qtdPassagMenorSetentaAnos > 0
                              ? `0${form.qtdPassagMenorSetentaAnos}`
                              : form.qtdPassagMenorSetentaAnos
                          }`}
                        </Text>
                      ) : (
                        <Text
                          bold
                          type={isVerticalTablet ? 'headline' : 'title'}
                          color="gray6"
                        >
                          Até 70 anos: 0
                        </Text>
                      )}
                      {form.qtdPassagMaiorSetentaAnos ? (
                        <Text
                          bold
                          type={isVerticalTablet ? 'headline' : 'title'}
                          color="gray6"
                        >
                          {`De 71 Até 90 anos: ${
                            form.qtdPassagMaiorSetentaAnos < 10 &&
                            form.qtdPassagMaiorSetentaAnos > 0
                              ? `0${form.qtdPassagMaiorSetentaAnos}`
                              : form.qtdPassagMaiorSetentaAnos
                          }`}
                        </Text>
                      ) : (
                        <Text
                          bold
                          type={isVerticalTablet ? 'headline' : 'title'}
                          color="gray6"
                        >
                          De 71 Até 90 anos: 0
                        </Text>
                      )}
                    </>
                  </s.TextWrapper>
                }
              />
              <Divisor />
              <s.DataDisplayer
                label="Coberturas: Esportes"
                value={
                  form.isPraticaAventura ? 'Irei praticar' : 'Não irei praticar'
                }
              />
              <s.DataDisplayer
                label="Coberturas: Motocicleta"
                value={
                  form.isMotocicleta ? 'Irei praticar' : 'Não irei praticar'
                }
              />
            </s.Card>
          </s.Col>
        </Row>
        <Row>
          <s.Col lg={3} md={3} sm={12} />
          <s.Col lg={8} md={9} sm={12}>
            {isMobile ? (
              <VerticalCard
                comparativeModalSetState={setIsModalOpen}
                planInformation={tripInsuranceQuotation}
              />
            ) : (
              <HorizontalCard
                comparativeModalSetState={setIsModalOpen}
                planInformation={tripInsuranceQuotation}
              />
            )}
          </s.Col>
        </Row>
      </s.Container>
      <s.FooterContainer>
        <Container>
          <Row>
            <s.Col lg={3} md={3} sm={12} noMargin />
            <s.FooterCol lg={8} md={9} sm={12}>
              <s.NextButton
                color="secondary"
                onClick={() => instantiate(CustomerSteps.InsuranceSummary)}
              >
                AVANÇAR
              </s.NextButton>
            </s.FooterCol>
          </Row>
        </Container>
      </s.FooterContainer>
    </s.ContentWrapper>
  )
}

export default ChoosePlan
