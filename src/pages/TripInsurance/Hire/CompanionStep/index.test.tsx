import React from 'react'

import { renderWithReduxAndTheme, screen, fireEvent } from 'testUtils'

import CompanionStep from '.'

const createRootContainer = () => {
  let portalRoot = document.getElementById('root')
  if (!portalRoot) {
    portalRoot = document.createElement('div')
    portalRoot.setAttribute('id', 'root')
    document.body.appendChild(portalRoot)
  }
  return portalRoot
}

describe('Companion Form tests', () => {
  const renderTableCompanionDataMock = [
    {
      name: 'Bruno Mizhari',
      status: false,
    },
    {
      name: 'Acompanhante 2',
      status: false,
    },
    {
      name: 'Acompanhante 3',
      status: false,
    },
    {
      name: 'Acompanhante 4',
      status: false,
    },
  ]
  it('should exists', () => {
    expect(CompanionStep).toBeDefined()
  })
  it('should render correctly', () => {
    renderWithReduxAndTheme(
      <CompanionStep companions={renderTableCompanionDataMock} />,
      { container: createRootContainer() }
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
