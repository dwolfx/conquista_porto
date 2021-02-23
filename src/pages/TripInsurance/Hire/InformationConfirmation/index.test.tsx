import React from 'react'
import { storeFactory } from 'setupTests'

import { renderWithReduxAndTheme, screen } from 'testUtils'

import InformationConfirmation from '.'

const createRootContainer = () => {
  let container = document.getElementById('root')
  if (!container) {
    container = document.createElement('div')
    container.setAttribute('id', 'root')
    container.setAttribute('role', 'main')
    document.body.appendChild(container)
  }
  return container
}

describe('InformationConfirmation component tests', () => {
  const successStore = storeFactory({
    fluxManagement: {
      stack: [
        {
          key: null,
          ref: null,
          props: {},
          _owner: null,
          _store: {},
        },
        {
          key: null,
          ref: null,
          props: {},
          _owner: null,
          _store: {},
        },
        {
          key: null,
          ref: null,
          props: {},
          _owner: null,
          _store: {},
        },
        {
          key: null,
          ref: null,
          props: {},
          _owner: null,
          _store: {},
        },
        {
          key: null,
          ref: null,
          props: {},
          _owner: null,
          _store: {},
        },
        {
          key: null,
          ref: null,
          props: {},
          _owner: null,
          _store: {},
        },
        {
          key: null,
          ref: null,
          props: {},
          _owner: null,
          _store: {},
        },
      ],
      form: {
        passageiroPrincipal: {
          nome: 'Rubao',
          email: 'ricardo.eufrasio@portoseguro.com.br',
          dataNascimento: '11/11/1981',
          sexo: 'M',
          celularDDD: '11',
          celularNumero: '996229303',
          numeroCpf: '362753128',
          digitoCpf: '07',
          contato: {
            nome: 'Rubao',
            celularDDD: '11',
            celularNumero: '996229303',
          },
          isResidePais: true,
          pessoaExposta: {
            grauRelacionamento: 2,
          },
        },
        codigoPaisDestino: 28,
        paisesAdicionais: [],
        motivoViagem: 1,
        codigoCanal: 1,
        nationalDestination: true,
        codigoUfOrigem: 'SP',
        hasLatinAmericaDestination: false,
        dataIda: '15/01/2021',
        dataVolta: '22/01/2021',
        qtdPassagMenorSetentaAnos: 1,
        qtdPassagMaiorSetentaAnos: 0,
        isPraticaAventura: true,
        isMotocicleta: true,
        pacoteEscolhido: '1',
      },
    },
  })
  it('should exists', () => {
    expect(InformationConfirmation).toBeDefined()
  })
  it('should render correctly the step bar', () => {
    renderWithReduxAndTheme(<InformationConfirmation />)

    expect(
      screen.getByRole('heading', { name: 'Contratação' })
    ).toBeInTheDocument()
    expect(screen.getByText(/Seguro Viagem/i)).toBeInTheDocument()
    expect(screen.getByText(/ETAPA 1 de 3/i)).toBeInTheDocument()
  })
  it('should render correctly the information card on the left side', () => {
    renderWithReduxAndTheme(<InformationConfirmation />)
    const textsToBeDefined = [
      'Confirme seus dados',
      'Precisamos confirmar algumas informações para continuar.',
    ]

    const suiteTests = textsToBeDefined.map(word => ({
      execution: screen.getByText(word),
    }))

    suiteTests.forEach(({ execution }) => expect(execution).toBeInTheDocument())
  })
  it('should render correctly "Dados cadastrais" card', () => {
    renderWithReduxAndTheme(<InformationConfirmation />, {
      container: createRootContainer(),
      store: successStore,
    })

    const updateProfileLink = screen.getAllByText('alterar no perfil')
    const brazilianResidentOption = screen.getByTestId(
      'radio-brazilian-resident'
    )
    const radioOptions = screen.getAllByRole('radio')

    expect(updateProfileLink).toHaveLength(2)
    expect(radioOptions).toHaveLength(4)
    expect([brazilianResidentOption]).toBeDefined()
  })
  it('should render correctly "Pessoa Politicamente Exposta (PPE)" card', () => {
    renderWithReduxAndTheme(<InformationConfirmation />)
    const textsToBeDefined = [
      'pessoa politicamente exposta (PPE)',
      'Você é ou possui parentesco com uma pessoa politicamente exposta?',
      'Pessoa Exposta Politicamente é aquela que desempenha ou desempenhou nos últimos cinco anos, cargos, empregos ou funções públicas relevantes como chefes de estado e de governo, políticos, altos servidores dos poderes públicos, magistrados ou militares de alto nível, dirigentes de empresas públicas ou dirigentes de partidos políticos.',
    ]

    const suiteTests = textsToBeDefined.map(word => ({
      execution: screen.getByText(word),
    }))

    suiteTests.forEach(({ execution }) => expect(execution).toBeInTheDocument())

    const PPEOption = screen.getByTestId('radio-ppe')
    const radioOptions = screen.getAllByRole('radio')

    expect(radioOptions).toHaveLength(4)
    expect([PPEOption]).toBeDefined()
  })
  it('should render correctly "Endereço" card', () => {
    renderWithReduxAndTheme(<InformationConfirmation />)
    const textsToBeDefined = [
      'Por favor, inclua somente CEPs de endereços no Brasil.',
      'Endereços no exterior não são válidos.',
    ]

    const suiteTests = textsToBeDefined.map(word => ({
      execution: screen.getByText(word),
    }))

    suiteTests.forEach(({ execution }) => expect(execution).toBeInTheDocument())
  })
  it('should render correctly "Contato em caso de acidentes" card', () => {
    renderWithReduxAndTheme(<InformationConfirmation />)
    const cardTitle = screen.getByText('contato em caso de acidentes')

    expect([cardTitle]).toBeDefined()
  })
  it('should render correctly "Termos de contratação" card', () => {
    renderWithReduxAndTheme(<InformationConfirmation />)
    const textsToBeDefined = [
      'termos de contratação',
      'É fundamental que você saiba o que está coberto por este seguro e o que não está antes de contratar.',
      'Para isso, por favor, leia as Condições Gerais para continuar.',
      'condições gerais',
      'política de privacidade',
      'Declaro que li e aceito as Condições Gerais deste seguro.',
      'Estou ciente de que não há cobertura para eventos decorrentes de viagens de motocicleta na América Latina.',
      'Aceito receber informações e novidades da Porto Seguro em meu e-mail.',
    ]

    const suiteTests = textsToBeDefined.map(word => ({
      execution: screen.getByText(word),
    }))

    suiteTests.forEach(({ execution }) => expect(execution).toBeInTheDocument())

    const checkboxes = screen.getAllByRole('checkbox')

    expect(checkboxes).toHaveLength(3)
  })
  it('should render correctly "Termos de contratação" card', () => {
    renderWithReduxAndTheme(<InformationConfirmation />)
    const textsToBeDefined = [
      'termos de contratação',
      'É fundamental que você saiba o que está coberto por este seguro e o que não está antes de contratar.',
      'Para isso, por favor, leia as Condições Gerais para continuar.',
      'condições gerais',
      'política de privacidade',
      'Declaro que li e aceito as Condições Gerais deste seguro.',
      'Estou ciente de que não há cobertura para eventos decorrentes de viagens de motocicleta na América Latina.',
      'Aceito receber informações e novidades da Porto Seguro em meu e-mail.',
    ]

    const suiteTests = textsToBeDefined.map(word => ({
      execution: screen.getByText(word),
    }))

    suiteTests.forEach(({ execution }) => expect(execution).toBeInTheDocument())

    const checkboxes = screen.getAllByRole('checkbox')

    expect(checkboxes).toHaveLength(3)
  })
  it('should render correctly the next button', () => {
    renderWithReduxAndTheme(<InformationConfirmation />)

    const nextButton = screen.getByRole('button')

    expect(nextButton).toBeDefined()
  })
})
