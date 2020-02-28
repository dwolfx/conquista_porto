import React from 'react'
import PropTypes from 'prop-types'

import { TableWrapper, Table, TBody, THead, Tr, Th, Td } from './styles'

const TableProfitability = ({ profitability }) => {
  const tableHead = [
    {
      name: 'Mês Anterior',
    },
    {
      name: 'Ano',
    },
    {
      name: 'Últ 12m',
    },
    {
      name: 'Últ 24m',
    },
    {
      name: 'Últ 36m',
    },
  ]
  return (
    <TableWrapper>
      <Table>
        <THead>
          <Tr>
            <Th></Th>
            {tableHead.map(cell => (
              <Th key={cell.name}>{cell.name}</Th>
            ))}
          </Tr>
        </THead>
        <TBody>
          <Tr>
            <Td>Fundo (%)</Td>
            <Td>{profitability[1] ? profitability[1] : '-'}</Td>
            <Td>{profitability[2] ? profitability[2] : '-'}</Td>
            <Td>{profitability[12] ? profitability[12] : '-'}</Td>
            <Td>{profitability[24] ? profitability[24] : '-'}</Td>
            <Td>{profitability[36] ? profitability[36] : '-'}</Td>
          </Tr>
          <Tr>
            <Td>IMA-b 5 (%)</Td>
            <Td>-</Td>
            <Td>-</Td>
            <Td>-</Td>
            <Td>-</Td>
            <Td>-</Td>
          </Tr>
          <Tr>
            <Td>Variação (P.P.)</Td>
            <Td>-</Td>
            <Td>-</Td>
            <Td>-</Td>
            <Td>-</Td>
            <Td>-</Td>
          </Tr>
        </TBody>
      </Table>
    </TableWrapper>
  )
}

TableProfitability.propTypes = {
  profitability: PropTypes.object,
}

TableProfitability.defaultProps = {
  profitability: null,
}

export default TableProfitability
