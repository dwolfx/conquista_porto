import React from 'react'
import { MemoryRouter, Route, RouteProps } from 'react-router-dom'
import { Provider } from 'react-redux'
import { render, fireEvent, act } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { storeFactory } from 'setupTests'
import theme from 'styles/theme'

import InvestorAccount from '.'

let store = storeFactory({
  bankData: {
    isLoading: false,
    hasError: false,
    data: {
      DadosContaPortoSeguro: {
        saldo_liquidar: '0',
        saldo_disponivel: '99.89',
      },
    },
  },
})

const setup = (children: React.ReactElement, error = false) => {
  if (error) {
    store = storeFactory({
      bankData: {
        data: {},
        isLoading: false,
        hasError: true,
      },
    })
  }
  return render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>)
    </Provider>
  )
}

describe('Investor Account', () => {
  describe('Success scenario', () => {
    test('It shows total ballance', () => {
      const { getByTestId } = setup(
        <MemoryRouter>
          <InvestorAccount onChangeModalSuitabilityInfo={() => {}} />
        </MemoryRouter>
      )
      expect(getByTestId('info-total-ballance')).toBeDefined()
    })
    test('It shows settle ballance', () => {
      const { getByTestId } = setup(
        <MemoryRouter>
          <InvestorAccount onChangeModalSuitabilityInfo={() => {}} />
        </MemoryRouter>
      )
      expect(getByTestId('info-settle-ballance')).toBeDefined()
    })
    test('It does not display the "Retirar" button when there is no available amount', () => {
      const store = storeFactory({
        bankData: {
          isLoading: false,
          hasError: false,
          data: {
            DadosContaPortoSeguro: {
              saldo_liquidar: '0',
              saldo_disponivel: '0',
            },
          },
        },
      })
      const { queryByText } = render(
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <MemoryRouter>
              <InvestorAccount onChangeModalSuitabilityInfo={() => {}} />
            </MemoryRouter>
          </ThemeProvider>
        </Provider>
      )

      expect(queryByText(/retirar/gi)).not.toBeInTheDocument()
    })
  })
  describe('Error scenario', () => {
    test('It shows total ballance message error', () => {
      const { getByTestId } = setup(
        <MemoryRouter>
          <InvestorAccount onChangeModalSuitabilityInfo={() => {}} />
        </MemoryRouter>,
        true
      )
      expect(getByTestId('info-total-ballance-error-message')).toBeDefined()
    })
    test('It shows settle ballance message error', () => {
      const { getByTestId } = setup(
        <MemoryRouter>
          <InvestorAccount onChangeModalSuitabilityInfo={() => {}} />
        </MemoryRouter>,
        true
      )
      expect(getByTestId('info-settle-ballance-error-message')).toBeDefined()
    })
    test('It shows ballance retry button', () => {
      const { getByTestId } = setup(
        <MemoryRouter>
          <InvestorAccount onChangeModalSuitabilityInfo={() => {}} />
        </MemoryRouter>,
        true
      )
      expect(getByTestId('button-ballance-retry')).toBeDefined()
    })
  })
  describe('User actions', () => {
    test('It goes to ballance extract page after clicking at "view extract"', () => {
      let locationLocal: RouteProps['location']

      const { getByTestId } = setup(
        <MemoryRouter initialEntries={['/investimentos/visualizar']}>
          <InvestorAccount onChangeModalSuitabilityInfo={() => {}} />
          <Route
            path="*"
            render={({ location }) => {
              locationLocal = location
              return null
            }}
          />
        </MemoryRouter>
      )

      act(() => {
        fireEvent.click(getByTestId('link-investor-extract-saldo'))
      })
      expect(locationLocal!.pathname).toBe('/investimentos/extrato')
    })
    test('It goes to settle extract page after clicking at "view extract"', () => {
      let locationLocal: RouteProps['location']
      const { getByTestId } = setup(
        <MemoryRouter initialEntries={['/investimentos/visualizar']}>
          <InvestorAccount onChangeModalSuitabilityInfo={() => {}} />
          <Route
            path="*"
            render={({ location }) => {
              locationLocal = location
              return null
            }}
          />
        </MemoryRouter>
      )

      act(() => {
        fireEvent.click(getByTestId('link-investor-extract-retirar'))
      })
      expect(locationLocal!.pathname).toBe('/investimentos/extrato')
    })
    test('It reloads data when click at retry button', () => {
      const storeError = storeFactory({
        bankData: {
          data: {},
          isLoading: false,
          hasError: true,
        },
      })
      const storeSucess = storeFactory({
        bankData: {
          isLoading: false,
          hasError: false,
          data: {
            DadosContaPortoSeguro: {
              saldo_liquidar: '0',
              saldo_disponivel: '99.89',
            },
          },
        },
      })
      const { rerender, getByTestId, queryByTestId } = render(
        <Provider store={storeError}>
          <ThemeProvider theme={theme}>
            <MemoryRouter>
              <InvestorAccount onChangeModalSuitabilityInfo={() => {}} />
            </MemoryRouter>
          </ThemeProvider>
        </Provider>
      )
      act(() => {
        fireEvent.click(getByTestId('button-ballance-retry'))
      })
      rerender(
        <Provider store={storeSucess}>
          <ThemeProvider theme={theme}>
            <MemoryRouter>
              <InvestorAccount onChangeModalSuitabilityInfo={() => {}} />
            </MemoryRouter>
          </ThemeProvider>
        </Provider>
      )
      expect(queryByTestId('button-ballance-retry')).toBeFalsy()
    })
    // test('draw button', () => {
    //   let locationLocal: RouteProps['location'];

    //   const mockOnChangeModalSuitabilityInfo = jest.fn(() => ({ isValid: true }))

    //   const { getByTestId } = setup(
    //     <MemoryRouter initialEntries={["/investimentos/visualizar"]}>
    //       <InvestorAccount onChangeModalSuitabilityInfo={mockOnChangeModalSuitabilityInfo} />
    //       <Route
    //         path="*"
    //         render={({ location }) => {
    //           locationLocal = location;
    //           return null;
    //         }}
    //       />
    //     </MemoryRouter>
    //   )

    //   act(() => {
    //     fireEvent.click(getByTestId('button-draw'))
    //   })
    //   expect(locationLocal!.pathname).toBe('portaldecliente/conquista/retirada?r=true')
    // })
  })
  describe('Loading scenario', () => {
    test('It shows loading component', () => {
      const storeLoading = storeFactory({
        bankData: {
          data: null,
          hasError: false,
          isLoading: true,
        },
      })
      const { getByTestId } = render(
        <Provider store={storeLoading}>
          <ThemeProvider theme={theme}>
            <MemoryRouter>
              <InvestorAccount onChangeModalSuitabilityInfo={() => {}} />
            </MemoryRouter>
          </ThemeProvider>
        </Provider>
      )
      expect(getByTestId('loading-account-info')).toBeInTheDocument()
    })
  })
})
