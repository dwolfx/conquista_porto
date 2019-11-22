import React from 'react'
import PropTypes from 'prop-types'

import { Container, Title, Table, TBody, THead, Tr, Th, Td } from './styles'

export default function HistoricalRentabilityTable({ tableHead, tableRow }) {
  return (
    <Container>
      <Title>Rentabilidade Histórica</Title>
      <Table>
        <THead>
          <Tr>
            <Th></Th>
            {tableHead.map((cell, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Th key={`${index}-${cell.name}`}>{cell.name}</Th>
            ))}
          </Tr>
        </THead>
        <TBody>
          {tableRow.map((cell, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Tr key={`${index}-${cell.name}`}>
              <Td>{cell.name}</Td>
              <Td>{cell.cell1}</Td>
              <Td>{cell.cell2}</Td>
              <Td>{cell.cell3}</Td>
              <Td>{cell.cell4}</Td>
              <Td>{cell.cell5}</Td>
            </Tr>
          ))}
        </TBody>
      </Table>
    </Container>
  )
}

HistoricalRentabilityTable.propTypes = {
  tableHead: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  tableRow: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      cell1: PropTypes.string,
      cell2: PropTypes.string,
      cell3: PropTypes.string,
      cell4: PropTypes.string,
      cell5: PropTypes.string,
    })
  ),
}
HistoricalRentabilityTable.defaultProps = {
  tableRow: [],
}
