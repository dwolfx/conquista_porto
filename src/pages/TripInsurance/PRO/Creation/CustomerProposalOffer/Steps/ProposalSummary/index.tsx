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

// mock temporário
import tripInsuranceQuotationMock from 'mocks/tripInsuranceQuotation.json'

import { IForm } from 'pages/TripInsurance/PRO/types'

import * as s from './styles'

// mock temporário
const tripInsuranceQuotations = tripInsuranceQuotationMock.ViagemPacote.pacotes

const ChoosePlan: StepComponent = () => {
  const isMobile = useMedia('xs')
  const isVerticalTablet = useMedia('sm')
  const { instantiate } = useStackFluxManagement<{}>()
  const { form, updateForm } = useFormFluxManagement<IForm>()

  const [isModalOpen, setIsModalOpen] = React.useState(false)

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
        grauParentesco: 1,
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
    <s.ContentWrapper>
      <s.ComparativeModal
        isOpen={isModalOpen}
        handleClose={setIsModalOpen}
        travelPlans={tripInsuranceQuotations}
        isLoading={false}
        // isLoading={isLoading}
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
                    : `Internacional / ${form.paisesAdicionais?.map(
                        (country, index) =>
                          index + 1 !== form.paisesAdicionais?.length
                            ? `${country.descricao},`
                            : country.descricao
                      )}`
                }
              />
              <Divisor />
              <s.DataDisplayer
                label="Período"
                value={`${form.dataIda} até ${form.dataVolta}`}
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
                planInformation={tripInsuranceQuotations[0]}
              />
            ) : (
              <HorizontalCard
                comparativeModalSetState={setIsModalOpen}
                planInformation={tripInsuranceQuotations[0]}
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
              <s.NextButton color="primary" outline>
                REJEITAR PROPOSTA
              </s.NextButton>
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
