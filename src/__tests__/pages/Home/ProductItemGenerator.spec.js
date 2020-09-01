import React from 'react'
import renderer from 'react-test-renderer'

import { ThemeProvider } from 'styled-components'
import theme from 'styles/theme'

import ProductItemGenerator from '../../../pages/Home/ProductItemGenerator'

const productList = {
  data: [
    {
      QuantidadeParcelasPagas: 1,
      QuantidadeParcelasContratadas: 1,
      Fatura: {
        Status: 'ok',
      },
      Bandeira: 'ok',
    },
  ],
  hasError: false,
  isLoading: false,
}

// REF: https://thoughtbot.com/blog/mocking-react-components-with-jest
jest.mock('react-router-dom', () => ({
  __esModule: true,
  useHistory: () => [],
}))

describe('ProductItemGenerator', () => {
  it('undefined Renders correctly', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          {ProductItemGenerator(productList, undefined, undefined, undefined)}
        </ThemeProvider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('financiamentoVeiculo and not products list Renders correctly', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          {ProductItemGenerator(
            undefined,
            'financiamentoVeiculo',
            undefined,
            undefined
          )}
        </ThemeProvider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('cartaoCredito Renders correctly', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          {ProductItemGenerator(
            productList,
            'cartaoCredito',
            undefined,
            undefined
          )}
        </ThemeProvider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('financiamentoVeiculo Renders correctly', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          {ProductItemGenerator(
            productList,
            'financiamentoVeiculo',
            undefined,
            undefined
          )}
        </ThemeProvider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('consorcioVeiculo Renders correctly', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          {ProductItemGenerator(
            productList,
            'consorcioVeiculo',
            undefined,
            undefined
          )}
        </ThemeProvider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('consorcioImovel Renders correctly', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          {ProductItemGenerator(
            productList,
            'consorcioImovel',
            undefined,
            undefined
          )}
        </ThemeProvider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('seguroVida Renders correctly', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          {ProductItemGenerator(
            productList,
            'seguroVida',
            undefined,
            undefined
          )}
        </ThemeProvider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('seguroViagem Renders correctly', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          {ProductItemGenerator(
            productList,
            'seguroViagem',
            undefined,
            undefined
          )}
        </ThemeProvider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
