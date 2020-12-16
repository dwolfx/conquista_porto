import React from 'react'

import { renderWithReduxAndTheme, screen } from 'testUtils'

import ChoosePlan from '.'

const setup = () => renderWithReduxAndTheme(<ChoosePlan />)

describe('ChoosePlan component tests', () => {
  it('should exists', () => {
    expect(ChoosePlan).toBeDefined()
  })
  it('should render the component correctly', () => {
    setup()
    const textsToBeDefined = [
      'Pré-selecionado pelo seu parceiro',
      'Brasil Terra',
      '3x sem juros de R$ 209,97',
      'R$ 659,82 à vista',
      'R$ 150.000,00',
      'R$ 250.000,00',
      'R$ 350.000,00',
      'Brasil Prata',
      '4x sem juros de R$ 209,97',
      'R$ 759,82 à vista',
      'R$ 160.000,00',
      'R$ 260.000,00',
      'R$ 360.000,00',
      'Brasil Ouro',
      '5x sem juros de R$ 209,97',
      'R$ 859,82 à vista',
      'R$ 170.000,00',
      'R$ 270.000,00',
      'R$ 370.000,00',
      'Proposta de Seguro Viagem especial para você!',
      'Se precisar tirar dúvidas fale com seu parceiro.',
      'DETALHES DA VIAGEM',
      'Período',
      '10/10/2020 até 10/11/2020',
      'Passageiros',
      'Até 71 anos: 02',
      'Coberturas: Esportes',
      'Coberturas: Motocicleta',
    ]

    const suiteTests = textsToBeDefined.map(word => ({
      execution: screen.getByText(word),
    }))
    const radioOption = screen.getAllByRole('radio')
    const coverText = screen.getAllByText('Não irei praticar')
    const buttons = screen.getAllByRole('button')

    suiteTests.forEach(({ execution }) => expect(execution).toBeInTheDocument())
    expect(radioOption).toHaveLength(3)
    expect(coverText).toHaveLength(2)
    expect(buttons).toHaveLength(2)
  })
})
