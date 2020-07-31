import React from 'react'
import { renderWithReduxAndTheme } from 'testUtils'
import { MemoryRouter } from 'react-router-dom'

import DrawerFilter from '.'

const createRootContainer = () => {
  let container = document.getElementById('root')
  if (!container) {
    container = document.createElement('div')
    container.setAttribute('id', 'root')
    document.body.appendChild(container)
  }
  return container
}

describe('DrawerFilter', () => {
  it('Should render DrawerFilter', () => {
    const { getByText } = renderWithReduxAndTheme(
      <MemoryRouter>
        <DrawerFilter
          filters={[]}
          viewMode={'CARDS'}
          onHandleChangeView={() => {}}
          isDrawerOpen={true}
          onChangeIsDrawerOpen={() => {}}
          onHandleChangeFilter={() => {}}
        />
      </MemoryRouter>,
      { container: createRootContainer() }
    )
    expect(getByText('Filtros')).toBeDefined()
  })
  it('Should render visualizar content', () => {
    const { getByText, queryByText } = renderWithReduxAndTheme(
      <MemoryRouter>
        <DrawerFilter
          filters={[]}
          viewMode={'CARDS'}
          onHandleChangeView={() => {}}
          isDrawerOpen={true}
          onChangeIsDrawerOpen={() => {}}
          onHandleChangeFilter={() => {}}
        />
      </MemoryRouter>,
      { container: createRootContainer() }
    )
    expect(getByText('Visualizar')).toBeDefined()
    expect(getByText('grade')).toBeDefined()
    expect(queryByText('botao fundos layout cards')).toBeDefined()
    expect(getByText('lista')).toBeDefined()
    expect(queryByText('botao fundos layout list')).toBeDefined()
  })
  it('Should render apply and clear footer controls', () => {
    const { getByText } = renderWithReduxAndTheme(
      <MemoryRouter>
        <DrawerFilter
          filters={[]}
          viewMode={'CARDS'}
          onHandleChangeView={() => {}}
          isDrawerOpen={true}
          onChangeIsDrawerOpen={() => {}}
          onHandleChangeFilter={() => {}}
        />
      </MemoryRouter>,
      { container: createRootContainer() }
    )
    expect(getByText('LIMPAR')).toBeDefined()
    expect(getByText('APLICAR')).toBeDefined()
  })
  it('Should render back and close header controls', () => {
    window.resizeTo(400, 600)
    const { queryByText } = renderWithReduxAndTheme(
      <MemoryRouter>
        <DrawerFilter
          filters={[]}
          viewMode={'CARDS'}
          onHandleChangeView={() => {}}
          isDrawerOpen={true}
          onChangeIsDrawerOpen={() => {}}
          onHandleChangeFilter={() => {}}
        />
      </MemoryRouter>,
      { container: createRootContainer() }
    )
    expect(queryByText('botao fechar drawer filtros')).toBeDefined()
    expect(queryByText('botao voltar drawer filtros')).toBeDefined()
  })
})
