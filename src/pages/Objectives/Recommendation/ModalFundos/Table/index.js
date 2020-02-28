import React from 'react'
import PropTypes from 'prop-types'
import useMedia from 'hooks/useMedia'

import Text from 'components/Text'

import { TableWrapper, Table, TBody, THead, Tr, Th, Td, Item } from './styles'

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
      {isMobile ? (
        <>
          <Text type="headline" color="gray4">
            Fundo (%)
          </Text>
          <Item>
            <Text type="captionUppercase" color="gray4">
              MÊS ANTERIOR
            </Text>
            <Text type="headline" color="gray6">
              {profitability[1] ? profitability[1] : '-'}
            </Text>
          </Item>
          <Item>
            <Text type="captionUppercase" color="gray4">
              ANO
            </Text>
            <Text type="headline" color="gray6">
              {profitability[2] ? profitability[2] : '-'}
            </Text>
          </Item>
          <Item>
            <Text type="captionUppercase" color="gray4">
              ÚTL 12M
            </Text>
            <Text type="headline" color="gray6">
              {profitability[12] ? profitability[12] : '-'}
            </Text>
          </Item>
          <Item>
            <Text type="captionUppercase" color="gray4">
              ÚLT 24M
            </Text>
            <Text type="headline" color="gray6">
              {profitability[24] ? profitability[24] : '-'}
            </Text>
          </Item>
          <Item>
            <Text type="captionUppercase" color="gray4">
              ÚLT 36M
            </Text>
            <Text type="headline" color="gray6">
              {profitability[36] ? profitability[36] : '-'}
            </Text>
          </Item>
        </>
      ) : (
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
      )}
    </>
  )
}

TableProfitability.propTypes = {
  profitability: PropTypes.object,
}

TableProfitability.defaultProps = {
  profitability: null,
}

export default TableProfitability
