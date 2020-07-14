import React from 'react'

import userEvent from '@testing-library/user-event'
import { renderWithReduxAndTheme, screen } from 'testUtils'
import { storeFactory } from 'setupTests'

import TokenCard from '.'

const defaultStore = {
  token2fa: {
    data: [
      {
        value:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..RHjW8kd_yPr3I4RMYdc7Xw.dyW3YqgAGXb39pUGQY1Rhw.O-J7ZjDuhVpcd-D-GBh9YQ',
        name: 'assinatura',
      },
      {
        value: '16955255825',
        name: 'sms_otp',
      },
      {
        value: 'ph@sciensa.com.br',
        name: 'email_otp',
      },
    ],
  },
}

const setup = (initialState: any = defaultStore) => {
  const store = storeFactory(initialState)

  return renderWithReduxAndTheme(
    <TokenCard onPrevious={() => {}} onNext={() => {}} />,
    { store }
  )
}

describe('TokenCard', () => {
  it('should be render without errors', () => {
    setup()
    expect(screen.getByRole('button', { name: /próximo/i })).toBeDisabled()
  })

  test('if "Próximo" button gets enabled when token has 5 chars', () => {
    setup()
    expect(screen.getByRole('button', { name: /próximo/i })).toBeDisabled()

    userEvent.type(
      screen.getByPlaceholderText(/digite o código recebido/gi),
      '123456'
    )
    expect(screen.getByRole('button', { name: /próximo/i })).toBeEnabled()
  })
})
