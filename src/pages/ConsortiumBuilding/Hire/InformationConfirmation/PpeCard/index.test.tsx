import React from 'react'
import { renderWithReduxAndTheme, screen } from 'testUtils'
import PpeCard from '.'

const label = {
  title: 'Você é ou possui parentesco com uma pessoa politicamente exposta?',
  content:
    'Pessoa Exposta Politicamente é aquela que desempenha ou desempenhou nos últimos cinco anos anteriores, cargos, empregos ou funções públicas relevantes como chefes de estado e de governo, políticos de alto nível, altos servidores dos poderes públicos, magistrados ou militares de alto nível, dirigentes de empresas públicas ou dirigentes de partidos políticos.',
  label: 'quem é a pessoa politicamente exposta?',
}

const data = {
  isPpe: false,
  whoPoliticallyExport: '',
}

describe('PpeCard', () => {
  it('Should exist', () => {
    expect(PpeCard).toBeDefined()
  })

  it('should have the buttons', () => {
    renderWithReduxAndTheme(
      <PpeCard label={label} ppeData={[data, jest.fn()]} />
    )

    const radioButtonYes = screen.getByText('Sim')
    const radioButtonNo = screen.getByText('Não')
    expect(radioButtonYes).toBeInTheDocument()
    expect(radioButtonNo).toBeInTheDocument()
  })
})
