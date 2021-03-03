import React from 'react'

import { renderWithReduxAndTheme } from 'testUtils'

import { formatLocaleStringToNumber } from 'helpers'
import BankCards from './BankCards'
import Summary from './index'

const mock = {
  conta_porto_seguro: {
    saldo_disponivel: '2976166.11',
    id_conta: '245236',
    cheque_especial: {
      limite: '0',
      data_vencimento: '0001-01-03T00:00:00-03:00',
    },
    conta: '1965',
    nome_banco: 'Banco Porto Seguro',
    encargos_acumulados: '0',
    valores_bloqueados: {
      judicial: '0',
      em_24horas: '0',
      indeterminado: '0',
      em_48horas: '0',
    },
    digito_conta: '8',
    saldo_liquidar: '0',
    agencia: '0001',
    titular: 'Rafael Soares Claus',
    codigo_banco: '306',
  },
  data_solicitacao: '2020-07-17T16:17:36.268-03:00',
  fechado_retirada: false,
  contas_liquidacao: {
    conta_liquidacao: [
      {
        principal: false,
        id_conta: '218633',
        conta: '2895',
        nome_banco: 'Itaú Unibanco S.A.',
        digito_conta: '2',
        agencia: '7954',
        codigo_banco: '341',
      },
      {
        principal: true,
        id_conta: '237293',
        conta: '1126321',
        nome_banco: 'Nu Pagamentos S.A.',
        digito_conta: '9',
        agencia: '0001',
        codigo_banco: '260',
      },
    ],
  },
}

describe('Bank Cards component', () => {
  it('not crashs with empty props', () => {
    const { container } = renderWithReduxAndTheme(
      <BankCards
        bankInfos={[]}
        bankSelected=""
        onBankSelectedChange={() => null}
        isLoading={false}
        hasError={false}
        onError={() => null}
      />
    )

    expect(container.childElementCount).toBe(0)
  })

  it('expect to render loading bar', () => {
    renderWithReduxAndTheme(
      <BankCards
        bankInfos={[]}
        bankSelected=""
        onBankSelectedChange={() => null}
        isLoading
        hasError={false}
        onError={() => null}
      />
    )
  })

  it('expect to show error message/button', () => {
    renderWithReduxAndTheme(
      <BankCards
        bankInfos={[]}
        bankSelected=""
        onBankSelectedChange={() => null}
        isLoading={false}
        hasError
        onError={() => null}
      />
    )
  })

  it('renders card as expected', () => {
    renderWithReduxAndTheme(
      <BankCards
        bankInfos={mock.contas_liquidacao.conta_liquidacao}
        bankSelected=""
        onBankSelectedChange={() => null}
        onError={() => null}
        hasError={false}
        isLoading={false}
      />
    )
  })
})

describe('Summary component', () => {
  it('should render summary card', () => {
    const inputValue = '10.000,00'
    let bankSelected = ''

    // eslint-disable-next-line no-return-assign
    const onBankSelected = (bankId: string) => (bankSelected = bankId)

    renderWithReduxAndTheme(
      <Summary
        bankSelected={bankSelected}
        onBankSelectedChange={onBankSelected}
        value={formatLocaleStringToNumber(inputValue)}
      />
    )
  })

  it('should change value of bank selected', () => {})
})
