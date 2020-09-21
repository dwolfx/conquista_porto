import React from 'react'
import { HashRouter } from 'react-router-dom'
import { render, waitFor, fireEvent, screen, act } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import theme from 'styles/theme'

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

const setup = (children: React.ReactElement) => {
  return render(
    <HashRouter>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </HashRouter>
  )
}

describe('DropdowNew', () => {
  describe('Skeleton modes', () => {
    test('Item mode', async () => {
      setup(<Dropdown items={items}>MenuTeste</Dropdown>)

      const menuElement = screen.getByText('MenuTeste')

      expect(menuElement).toHaveTextContent('MenuTeste')

      await act(async () => {
        fireEvent.click(menuElement)

        const parentElement = screen.getByText('parent')
        expect(parentElement).toHaveTextContent('parent')
        fireEvent.mouseOver(parentElement)

        const childElement = await waitFor(() => screen.getByText('child1'))

        expect(childElement).toHaveTextContent('child1')
      })
    })

    test('Node mode', async () => {
      setup(<Dropdown nodes={node}>MenuTeste</Dropdown>)

      const menuElement = screen.getByText('MenuTeste')

      expect(menuElement).toHaveTextContent('MenuTeste')

      await act(async () => {
        fireEvent.click(menuElement)

        const nodeElement = await waitFor(() => screen.getByText('ItemTest1'))
        expect(nodeElement).toHaveTextContent('ItemTest1')
      })
    })

    test('Without skeleton', async () => {
      setup(<Dropdown>MenuTeste</Dropdown>)

      const menuElement = screen.getByText('MenuTeste')

      expect(menuElement).toHaveTextContent('MenuTeste')

      await act(async () => {
        fireEvent.click(menuElement)

        const nodeElement = await waitFor(() =>
          screen.getByText('Skeleton needed')
        )
        expect(nodeElement).toHaveTextContent('Skeleton needed')
      })
    })
  })
})
