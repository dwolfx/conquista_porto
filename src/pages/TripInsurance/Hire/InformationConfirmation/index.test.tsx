import React from 'react'

import { renderWithReduxAndTheme, screen } from 'testUtils'

import InformationConfirmation from '.'

describe('InformationConfirmation component tests', () => {
  it('should exists', () => {
    expect(InformationConfirmation).toBeDefined()
  })
  it('should render correctly the step bar', () => {
    renderWithReduxAndTheme(<InformationConfirmation />)
    const textsToBeDefined = ['Simulação', 'Seguro Viagem', 'ETAPA 1 de 4']

    const suiteTests = textsToBeDefined.map(word => ({
      execution: screen.getByText(word),
    }))

    suiteTests.forEach(({ execution }) => expect(execution).toBeInTheDocument())
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
    renderWithReduxAndTheme(<InformationConfirmation />)
    const textsToBeDefined = [
      'dados cadastrais',
      'Bruno Mizrahi',
      '421.980.660-20',
      '14/02/1987',
      'Você reside no Brasil?',
      'Este seguro só poderá ser contratado pelo segurado residente no Brasil.',
    ]

    const suiteTests = textsToBeDefined.map(word => ({
      execution: screen.getByText(word),
    }))

    suiteTests.forEach(({ execution }) => expect(execution).toBeInTheDocument())

    const updateProfileLink = screen.getAllByText('alterar no perfil')
    const selectGender = screen.getByTestId('select-sexo')
    const brazilianResidentOption = screen.getByTestId(
      'radio-brazilian-resident'
    )
    const radioOptions = screen.getAllByRole('radio')

    expect(updateProfileLink).toHaveLength(2)
    expect(radioOptions).toHaveLength(4)
    expect([brazilianResidentOption, selectGender]).toBeDefined()
  })
  it('should render correctly "Dados para contato" card', () => {
    renderWithReduxAndTheme(<InformationConfirmation />)
    const textsToBeDefined = [
      'dados para contato',
      'bruno.mizrahi@sciensa.com',
      '(11) 9 9725-7249',
    ]

    const suiteTests = textsToBeDefined.map(word => ({
      execution: screen.getByText(word),
    }))

    suiteTests.forEach(({ execution }) => expect(execution).toBeInTheDocument())
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
    const whoIsThePPE = screen.getByTestId(
      'select-quem é a pessoa políticamente exposta?'
    )
    const fullName = screen.getByDisplayValue('Maria Eduarda')
    const cpf = screen.getByDisplayValue('000.000.000-00')

    expect(radioOptions).toHaveLength(4)
    expect([PPEOption, whoIsThePPE, fullName, cpf]).toBeDefined()
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
    const addressNumber = screen.getByDisplayValue('Maria')
    const addressComplement = screen.getByDisplayValue('(11) 9 6458-5965')

    expect([cardTitle, addressNumber, addressComplement]).toBeDefined()
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
