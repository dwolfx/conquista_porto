import { normalizedEmailToNewSignature } from './utils'

describe('normalizedEmailToNewSignature', () => {
  test('if normalizedEmailToNewSignature returns the correct string', () => {
    const payload = {
      data: [
        {
          value: 'charles.chaplin@portoseguro.com.br',
          name: 'email_otp',
        },
      ],
    }
    expect(normalizedEmailToNewSignature(payload)).toEqual(
      'ch****@****oseguro.com.br'
    )
  })
  test('if normalizedEmailToNewSignature returns the correct string', () => {
    const payload = {
      data: [
        {
          value: '',
          name: 'email_otp',
        },
      ],
    }
    expect(normalizedEmailToNewSignature(payload)).toEqual('****@****')
  })
})
