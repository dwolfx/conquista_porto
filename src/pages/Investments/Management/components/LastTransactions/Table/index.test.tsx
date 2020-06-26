import React from 'react'
import moment from 'moment'

import { renderWithReduxAndTheme, within } from 'testUtils'

import Table from '.'
import { formatMoney } from 'helpers'

describe('LastTransactions/Table Last Transactions', () => {
  it('should render all data that has been passed', () => {
    const data = [
      {
        data_operacao: '2020-02-18T00:00:00-03:00',
        data_liquidacao: '2020-02-18T00:00:00-03:00',
        tipo_operacao: 'Aplicação',
        valor_bruto: '20000.00',
        tipo_movimentacao_operacao: '1',
        id_fundo: '51380060',
        id_operacao: '10590430',
      },
      {
        data_operacao: '2020-02-17T00:00:00-03:00',
        data_liquidacao: '2020-02-18T00:00:00-03:00',
        tipo_operacao: 'Retirada',
        valor_bruto: '200.00',
        tipo_movimentacao_operacao: '1',
        id_fundo: '51380060',
        id_operacao: '10590431',
      },
    ]
    const { getByTestId } = renderWithReduxAndTheme(<Table data={data} />)
    data.forEach(item => {
      const row = getByTestId(item.id_operacao)
      const utils = within(row)
      expect(
        utils.getByText(moment(item.data_operacao).format('DD/MM/YYYY'))
      ).toBeInTheDocument()

      expect(utils.getByText(item.tipo_operacao)).toBeInTheDocument()
      expect(
        utils.getByText((_, node) => {
          const hasText = (node: Node) =>
            node.textContent === formatMoney(item.valor_bruto)
          const nodeHasText = hasText(node)
          const childrenDontHaveText = Array.from(node.children).every(
            child => !hasText(child)
          )

          return nodeHasText && childrenDontHaveText
        })
      ).toBeInTheDocument()
    })
  })
})
