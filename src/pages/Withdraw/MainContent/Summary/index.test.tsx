import React from 'react'

import { renderWithReduxAndTheme, fireEvent } from 'testUtils'

import BankCards from './BankCards'

describe('Bank Cards component', () => {
  it('renders', () => {
    const { container } = renderWithReduxAndTheme(
      <BankCards
        bankInfos={[]}
        bankSelected={''}
        onBankSelectedChange={() => null}
        isLoading={false}
        hasError={false}
        onError={() => null}
      />
    )

    expect(container.childElementCount).toBe(0)
  })
})
