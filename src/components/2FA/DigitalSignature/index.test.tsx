import React from 'react'

import userEvent from '@testing-library/user-event'
import { act } from '@testing-library/react'
import { renderWithReduxAndTheme } from 'testUtils'
import { storeFactory } from 'setupTests'

import DigitalSignature from '.'

const defaultStore = {
  virtualKeyboard: {
    data: [
      { a: '6,7' },
      { b: '2,1' },
      { c: '4,9' },
      { d: '8,3' },
      { e: '0,5' },
    ],
  },
}

const createRootContainer = () => {
  let container = document.getElementById('root')
  if (!container) {
    container = document.createElement('div')
    container.setAttribute('id', 'root')
    document.body.appendChild(container)
  }
  return container
}

const setup = (initialState: any = defaultStore) => {
  const store = storeFactory(initialState)

  return renderWithReduxAndTheme(
    <DigitalSignature
      onPrevious={() => {}}
      onConfirm={() => {}}
      onError={() => null}
      isNextButtonLoading={false}
    />,
    { store, container: createRootContainer() }
  )
}

describe('DigitalSignature', () => {
  it('should render with 5 buttons', () => {
    const store = storeFactory(defaultStore)

    const { getByText } = setup()
    defaultStore.virtualKeyboard.data.forEach((item: any) => {
      const [key] = Object.keys(item)
      expect(getByText(item[key].replace(',', ' ou '))).toBeInTheDocument()
    })
  })

  test('if "confirmar" button becomes disabled when has less than 6 digits typed', () => {
    const { getByText, getByRole } = setup()
    const buttonNode = getByRole('button', { name: 'confirmar' })
    userEvent.click(getByText('6 ou 7'))
    userEvent.click(getByText('2 ou 1'))
    userEvent.click(getByText('4 ou 9'))
    userEvent.click(getByText('4 ou 9'))
    userEvent.click(getByText('8 ou 3'))
    expect(buttonNode).toBeDisabled()

    userEvent.click(getByText('4 ou 9'))
    userEvent.click(buttonNode)

    expect(buttonNode).toBeEnabled()
  })

  test('if delete button is actually working', () => {
    const { getByText, getByRole } = setup()
    const buttonNode = getByRole('button', { name: 'confirmar' })
    userEvent.click(getByText('6 ou 7'))
    userEvent.click(getByText('2 ou 1'))
    userEvent.click(getByText('4 ou 9'))
    userEvent.click(getByText('4 ou 9'))
    userEvent.click(getByText('8 ou 3'))
    userEvent.click(getByText('4 ou 9'))
    expect(buttonNode).toBeEnabled()
    userEvent.click(getByText('backspace.svg'))
    expect(buttonNode).toBeDisabled()
  })

  it(`should display modal`, () => {
    const { getByText } = setup()
    const aNode = getByText('gerar nova assinatura')
    act(() => {
      window.resizeTo(500, 500)
    })
    userEvent.click(aNode)
    expect(aNode).toBeEnabled()
    const modalText = getByText(
      'Tem certeza que deseja gerar uma nova assinatura eletrônica?'
    )
    expect(modalText).toBeInTheDocument()
  })
})
