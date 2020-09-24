import React from 'react'
import { HashRouter } from 'react-router-dom'
import { waitFor, fireEvent, screen } from '@testing-library/react'
import { renderWithReduxAndTheme } from 'testUtils'

import Dropdown from '.'
import { IItemsProps } from './interface'

const items: IItemsProps[] = [
  {
    icon: 'arrowup',
    text: 'parent',
    path: '#',
    children: [
      {
        icon: 'arrowup',
        text: 'child1',
        path: '#',
      },
      {
        icon: 'arrowdown',
        text: 'child2',
        path: '#',
      },
    ],
  },
]

const node: React.ReactNode[] = [
  <div key="item1">ItemTest1</div>,
  <div key="item2">ItemTest2</div>,
]

describe('Dropdow component', () => {
  it('should render on Item mode', async () => {
    let portalRoot = document.getElementById('root')
    if (!portalRoot) {
      portalRoot = document.createElement('div')
      portalRoot.setAttribute('id', 'root')
      document.body.appendChild(portalRoot)
    }

    const container = portalRoot
    renderWithReduxAndTheme(
      <HashRouter>
        <Dropdown items={items}>MenuTeste</Dropdown>
      </HashRouter>,
      { container }
    )

    const menuElement = screen.getByText('MenuTeste')

    expect(menuElement).toHaveTextContent('MenuTeste')

    fireEvent.click(menuElement)

    const parentElement = screen.getByText('parent')
    expect(parentElement).toHaveTextContent('parent')
    fireEvent.mouseOver(parentElement)

    const childElement = await waitFor(() => screen.getByText('child1'))

    expect(childElement).toHaveTextContent('child1')
  })

  it('should render on Node mode', async () => {
    let portalRoot = document.getElementById('root')
    if (!portalRoot) {
      portalRoot = document.createElement('div')
      portalRoot.setAttribute('id', 'root')
      document.body.appendChild(portalRoot)
    }

    const container = portalRoot
    renderWithReduxAndTheme(
      <HashRouter>
        <Dropdown nodes={node}>MenuTeste</Dropdown>
      </HashRouter>,
      { container }
    )

    const menuElement = screen.getByText('MenuTeste')

    expect(menuElement).toHaveTextContent('MenuTeste')

    fireEvent.click(menuElement)

    const nodeElement = await waitFor(() => screen.getByText('ItemTest1'))
    expect(nodeElement).toHaveTextContent('ItemTest1')
  })

  it('Without skeleton', async () => {
    let portalRoot = document.getElementById('root')
    if (!portalRoot) {
      portalRoot = document.createElement('div')
      portalRoot.setAttribute('id', 'root')
      document.body.appendChild(portalRoot)
    }

    const container = portalRoot
    renderWithReduxAndTheme(
      <HashRouter>
        <Dropdown>MenuTeste</Dropdown>
      </HashRouter>,
      { container }
    )

    const menuElement = screen.getByText('MenuTeste')

    expect(menuElement).toHaveTextContent('MenuTeste')

    fireEvent.click(menuElement)

    const nodeElement = await waitFor(() => screen.getByText('Skeleton needed'))
    expect(nodeElement).toHaveTextContent('Skeleton needed')
  })
})
