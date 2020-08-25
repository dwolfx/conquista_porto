import React from 'react'
import moment from 'moment'
import '@testing-library/jest-dom'

import { renderWithReduxAndTheme, within } from 'testUtils'
import ITransacation from 'store/modules/Investment/LastTransaction/iTransaction'

import List from '.'
import { formatMoney } from 'helpers'

describe('LastTransactions/List Last Transactions', () => {
  it('should render all data that has been passed', () => {
    const data: ITransacation[] = [
      {
        id_fundo: 51380129,
        id_operacao: 10608373,
        data_operacao: 1591758000000,
        tipo_operacao: 'Aplicação',
        data_liquidacao: 1591758000000,
        valor_bruto: 111.11,
      },
      {
        id_fundo: 51380129,
        id_operacao: 10590482,
        data_operacao: 1582686000000,
        tipo_operacao: 'Aplicação',
        data_liquidacao: 1582686000000,
        valor_bruto: 45000.0,
      },
    ]
    const { getByTestId } = renderWithReduxAndTheme(<List data={data} />)
    data.forEach(item => {
      const row = getByTestId(item.id_operacao.toString())
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
