import React from 'react'

import { renderWithReduxAndTheme, screen, fireEvent } from 'testUtils'

import CompanionStep from '.'

describe('Companion Form tests', () => {
  const renderTableCompanionDataMock = [
    {
      name: 'Bruno Mizhari',
      status: false,
    },
    {
      name: 'Valesca',
      status: false,
    },
    {
      name: 'Anitta',
      status: false,
    },
    {
      name: 'Pablo Vittar',
      status: false,
    },
  ]
  it('should exists', () => {
    expect(CompanionStep).toBeDefined()
  })
  it('should render correctly', () => {
    renderWithReduxAndTheme(
      <CompanionStep companions={renderTableCompanionDataMock} />
    )
    const names = renderTableCompanionDataMock.map(item => {
      return item.name
    })
    const textsToBeDefined = [
      'Acompanhantes',
      'Aqui você vai inserir os dados das pessoas que irão viajar junto com você.',
      'Declaração de Acompanhante',
      ...names,
    ]
    const suiteTests = textsToBeDefined.map(word => ({
      execution: screen.getByText(word),
    }))
    suiteTests.forEach(({ execution }) => expect(execution).toBeInTheDocument())
  })
})
