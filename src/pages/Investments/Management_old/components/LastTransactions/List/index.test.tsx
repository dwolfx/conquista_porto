import React from 'react'
import moment from 'moment'
import 'pages/Investments/Management/Tablet/node_modules/@testing-library/jest-dom'

import { renderWithReduxAndTheme, within } from 'testUtils'

import List from '.'
import { formatMoney } from 'helpers'

describe('LastTransactions/List Last Transactions', () => {
  it('should render all data that has been passed', () => {
    const data = [
      {
        data_operacao: '2020-02-18T00:00:00-03:00',
        data_liquidacao: '2020-02-18T00:00:00-03:00',
        tipo_operacao: 'Aplicação',
        valor_bruto: '20000.00',
        tipo_movimentacao_operacao: '1',
        id_carteira: '51380060',
        id_operacao: '10590430',
      },
      {
        data_operacao: '2020-02-17T00:00:00-03:00',
        data_liquidacao: '2020-02-18T00:00:00-03:00',
        tipo_operacao: 'Retirada',
        valor_bruto: '200.00',
        tipo_movimentacao_operacao: '1',
        id_carteira: '51380060',
        id_operacao: '10590431',
      },
    ]
    const { getByTestId } = renderWithReduxAndTheme(<List data={data} />)
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
