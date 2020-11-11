import React from 'react'
import ReactDOM from 'react-dom'
import { renderWithReduxAndTheme } from 'testUtils'
import { storeFactory } from 'setupTests'
import { screen } from '@testing-library/react'

import InvestmentCard from 'pages/Home/InvestmentCard'

// onFetchInvestments mock
const onFetchInvestments = jest.fn()

// useHistory mock
const mockHistoryPush = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}))

// createPortal mock
beforeAll(() => {
  // eslint-disable-next-line no-unused-vars
  ReactDOM.createPortal = jest.fn((element, node) => element)
})

afterEach(() => {
  ReactDOM.createPortal.mockClear()
})

const defaultStore = {
  consolidatedPosition: {
    data: {
      saldototal: 1000,
      categorias: [
        {
          nome: 'Multimercado',
          valor: 800.88,
        },
        {
          nome: 'Renda Fixa',
          valor: 200,
        },
      ],
    },
    isLoading: false,
    hasError: false,
  },
  bankData: {
    data: {
      DadosContaPortoSeguro: {
        agencia: '0001',
        cheque_especial: {
          limite: '0',
          data_vencimento: '0001-01-03T00:00:00-03:00',
        },
        codigo_banco: '306',
        conta: '47',
        cpf: '33244452809',
        digito_conta: '7',
        encargos_acumulados: '0',
        id_conta: '193791',
        nome_banco: 'Banco Portopar',
        saldo_disponivel: '1000000.0',
        saldo_liquidar: '1003.40',
        titular: 'Rafael Rodrigues',
        valores_bloqueados: {
          judicial: '0',
          em_24horas: '0',
          indeterminado: '0',
          em_48horas: '0',
        },
      },
      UltimasOperacoes: {
        transacoes: {
          transacao: [
            {
              data: '2020-03-06T00:00:00-03:00',
              tipo: 'RESGATE',
              valor: '97.83',
            },
            {
              data: '2020-03-02T00:00:00-03:00',
              tipo: 'APLICAÇÃO',
              valor: '-1000',
            },
          ],
        },
      },
    },
  },
  suitabilityInfo: {
    data: {
      CotistaContaOrdemPortoPar: 'S',
      codigo_status_cotista: '122',
      id_cotista: '2000143425',
      investidor_profissional: 'N',
      investidor_qualificado: 'N',
      isValid: false,
      status_cotista: true,
      status_data_vencimento_cadastro: false,
      status_data_vigencia_suitability: true,
      status_possui_suitability: true,
    },
  },
}

const setup = (initialState: any = defaultStore) => {
  const store = storeFactory(initialState)

  return renderWithReduxAndTheme(
    <InvestmentCard
      onFetchInvestments={onFetchInvestments}
      headerEndItem={<div>content</div>}
    />,
    { store }
  )
}

describe('InvestmentCard', () => {
  it('should render InvestmentCard', () => {
    setup()
    expect(screen.getByText('Investimentos')).toBeDefined()
    expect(screen.getByText('Total bruto investido')).toBeDefined()
    expect(screen.getAllByText('R$ 1.000.000,00')).toBeDefined()
    expect(screen.getByText('Saldo em conta')).toBeDefined()
    expect(screen.getAllByText('Conta de investimento')).toBeDefined()
    expect(screen.getByText('Lista de fundos')).toBeDefined()
    expect(screen.getAllByText('Gerenciar')).toBeDefined()
  })
  it('should render loading state card', () => {
    const newStore = {
      ...defaultStore,
      consolidatedPosition: {
        data: {},
        isLoading: true,
        hasError: false,
      },
    }
    const store = storeFactory(newStore)

    renderWithReduxAndTheme(
      <InvestmentCard
        onFetchInvestments={onFetchInvestments}
        headerEndItem={<div>content</div>}
      />,
      { store }
    )

    expect(
      screen.getAllByText('Aguarde, estamos buscando suas informações...')
    ).toBeDefined()
  })
  it('should render error state card', () => {
    const newStore = {
      ...defaultStore,
      consolidatedPosition: {
        data: {},
        isLoading: false,
        hasError: true,
      },
    }
    const store = storeFactory(newStore)

    renderWithReduxAndTheme(
      <InvestmentCard
        onFetchInvestments={onFetchInvestments}
        headerEndItem={<div>content</div>}
      />,
      { store }
    )

    expect(
      screen.getAllByText(
        'Desculpe, não foi possível carregar suas informações. Aguarde alguns instantes e tente novamente.'
      )
    ).toBeDefined()
  })
  it('should render empty state card', () => {
    const newStore = {
      ...defaultStore,
      consolidatedPosition: {
        data: {},
        isLoading: false,
        hasError: false,
      },
      suitabilityInfo: {},
    }
    const store = storeFactory(newStore)

    renderWithReduxAndTheme(
      <InvestmentCard
        onFetchInvestments={onFetchInvestments}
        headerEndItem={<div>content</div>}
      />,
      { store }
    )

    expect(
      screen.getAllByText(
        'Uma carteira de investimento com diferentes ativos é a chave para bons rendimentos. Na Lista de Fundos, você pode selecionar os que mais combinam com o seu perfil.'
      )
    ).toBeDefined()
  })
})
