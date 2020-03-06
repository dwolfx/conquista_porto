import useMedia from 'hooks/useMedia'
import PropTypes from 'prop-types'
import React from 'react'
import { Table, TableWrapper, TBody, Td, Th, THead, Tr } from './styles'

export const TableTD = ({ children, legend }) => {
  const isMobile = useMedia('sm')
  return (
    <Td>
      {isMobile && <span>{legend}</span>}
      {children}
    </Td>
  )
}

const TableProfitability = ({ profitability }) => {
  const isMobile = useMedia('sm')

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
    <>
      <TableWrapper>
        <Table>
          {!isMobile && (
            <THead>
              <Tr>
                <Th></Th>
                {tableHead.map(cell => (
                  <Th key={cell.name}>{cell.name}</Th>
                ))}
              </Tr>
            </THead>
          )}
          <TBody>
            <Tr>
              <Td>Fundo (%)</Td>
              <TableTD legend="mês anterior">
                {profitability.ima[1] ? profitability.ima[1] : '-'}
              </TableTD>
              <TableTD legend="ano">
                {profitability.ima[2] ? profitability.ima[2] : '-'}
              </TableTD>
              <TableTD legend="últ. 12m">
                {profitability.ima[12] ? profitability.ima[12] : '-'}
              </TableTD>
              <TableTD legend="últ. 24m">
                {profitability.ima[24] ? profitability.ima[24] : '-'}
              </TableTD>
              <TableTD legend="últ. 36m">
                {profitability.ima[36] ? profitability.ima[36] : '-'}
              </TableTD>
            </Tr>
            <Tr>
              <Td>IMA-b 5 (%)</Td>
              <TableTD legend="mês anterior">
                {profitability.variacao[1] ? profitability.variacao[1] : '-'}
              </TableTD>
              <TableTD legend="ano">
                {profitability.variacao[2] ? profitability.variacao[2] : '-'}
              </TableTD>
              <TableTD legend="últ. 12m">
                {profitability.variacao[12] ? profitability.variacao[12] : '-'}
              </TableTD>
              <TableTD legend="últ. 24m">
                {profitability.variacao[24] ? profitability.variacao[24] : '-'}
              </TableTD>
              <TableTD legend="últ. 36m">
                {profitability.variacao[36] ? profitability.variacao[36] : '-'}
              </TableTD>
            </Tr>
            <Tr>
              <Td>Variação (P.P.)</Td>
              <TableTD legend="mês anterior">
                {profitability.fundos[1] ? profitability.fundos[1] : '-'}
              </TableTD>
              <TableTD legend="ano">
                {profitability.fundos[2] ? profitability.fundos[2] : '-'}
              </TableTD>
              <TableTD legend="últ. 12m">
                {profitability.fundos[12] ? profitability.fundos[12] : '-'}
              </TableTD>
              <TableTD legend="últ. 24m">
                {profitability.fundos[24] ? profitability.fundos[24] : '-'}
              </TableTD>
              <TableTD legend="últ. 36m">
                {profitability.fundos[36] ? profitability.fundos[36] : '-'}
              </TableTD>
            </Tr>
          </TBody>
        </Table>
      </TableWrapper>
    </>
  )
}

TableTD.propTypes = {
  children: PropTypes.node.isRequired,
  legend: PropTypes.string.isRequired,
}

TableProfitability.propTypes = {
  profitability: PropTypes.object,
}

TableProfitability.defaultProps = {
  profitability: null,
}

export default TableProfitability
