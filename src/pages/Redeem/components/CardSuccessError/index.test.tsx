import React from 'react'
import { renderWithReduxAndTheme } from 'testUtils'

import CardSuccessError from '.'

describe('Redeem CardSuccessError', () => {
  it('Should render error screen', () => {
    const { getByText } = renderWithReduxAndTheme(
      <CardSuccessError
        days="XX"
        textMessage="ERROR"
        successOrError="ERROR"
        onHandleHomePage={() => {}}
        onHandleManagerPage={() => {}}
      />
    )
    expect(
      getByText('Não foi possível confirmar sua solicitação.')
    ).toBeDefined()
    expect(getByText('Tente novamente mais tarde por favor.')).toBeDefined()
    expect(getByText('close-rounded.svg')).toBeDefined()
  })

  it('Should render fund closed success screen', () => {
    const { getByText } = renderWithReduxAndTheme(
      <CardSuccessError
        days="XX"
        textMessage="SUCCESS_FUND_CLOSED"
        successOrError="SUCCESS"
        onHandleHomePage={() => {}}
        onHandleManagerPage={() => {}}
      />
    )
    expect(
      getByText('Solicitação de resgate recebida com sucesso.')
    ).toBeDefined()
    expect(
      getByText(
        'Como já passamos do horário de movimentação do fundo, o prazo para o dinheiro ficar na sua conta é de XX dias.'
      )
    ).toBeDefined()
    expect(getByText('check.svg')).toBeDefined()
  })

  it('Should render mobile success screen', () => {
    window.resizeTo(400, 600)
    const { getByText } = renderWithReduxAndTheme(
      <CardSuccessError
        days="XX"
        textMessage="SUCCESS"
        successOrError="SUCCESS"
        onHandleHomePage={() => {}}
        onHandleManagerPage={() => {}}
      />
    )
    expect(
      getByText('Solicitação de resgate recebida com sucesso.')
    ).toBeDefined()
    expect(
      getByText(
        'Em XX dias, o dinheiro estará disponível na sua conta de investimento.'
      )
    ).toBeDefined()
    expect(getByText('check.svg')).toBeDefined()
  })

  it('Should render button "pagina inicial"', () => {
    const { getByText, getAllByRole } = renderWithReduxAndTheme(
      <CardSuccessError
        days="XX"
        textMessage="SUCCESS"
        successOrError="SUCCESS"
        onHandleHomePage={() => {}}
        onHandleManagerPage={() => {}}
      />
    )
    expect(getAllByRole('button')).toBeDefined()
    expect(getByText('página inicial')).toBeDefined()
  })

  it('Should render button "gerenciar investimentos"', () => {
    const { getByText, getAllByRole } = renderWithReduxAndTheme(
      <CardSuccessError
        days="XX"
        textMessage="SUCCESS"
        successOrError="SUCCESS"
        onHandleHomePage={() => {}}
        onHandleManagerPage={() => {}}
      />
    )
    expect(getAllByRole('button')).toBeDefined()
    expect(getByText('gerenciar investimentos')).toBeDefined()
  })
})
