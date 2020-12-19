import React from 'react'
import { renderWithReduxAndTheme, screen } from 'testUtils'

import DataRow from '.'

describe('DataRow tests', () => {
  it('should exists', () => {
    expect(DataRow).toBeDefined()
  })
  it('should display HorizontalList, label and value', () => {
    renderWithReduxAndTheme(<DataRow label="Teste" value="valor" />)
    expect(screen.getByText('Teste')).toBeInTheDocument()
    expect(screen.getByText('valor')).toBeInTheDocument()
  })
  it('should should display HorizontalList, error state', () => {
    renderWithReduxAndTheme(<DataRow label="Teste" value="valor" error />)
    expect(screen.getByText('Teste')).toBeInTheDocument()
    expect(screen.getByText('Não preenchido')).toBeInTheDocument()
  })
  it('should should display VerticalList, label and value', () => {
    window.resizeTo(480, 800)
    renderWithReduxAndTheme(<DataRow label="Teste" value="valor" />)
    expect(screen.getByText('Teste')).toBeInTheDocument()
    expect(screen.getByText('valor')).toBeInTheDocument()
  })
  it('should should display VerticalList, error state', () => {
    window.resizeTo(480, 800)
    renderWithReduxAndTheme(<DataRow label="Teste" value="valor" error />)
    expect(screen.getByText('Teste')).toBeInTheDocument()
    expect(screen.getByText('Não preenchido')).toBeInTheDocument()
  })
})

