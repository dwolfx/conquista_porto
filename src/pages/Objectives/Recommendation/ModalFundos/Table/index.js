import useMedia from 'hooks/useMedia'
import PropTypes from 'prop-types'
import React from 'react'
import {
  Table,
  TableWrapper,
  TitleTD,
  TBody,
  Td,
  Th,
  THead,
  Tr,
} from './styles'

export const TextTD = ({ children, empty, legend }) => {
  const isMobile = useMedia('sm')
  return (
    <Td colSpan={empty ? '6' : '1'} empty>
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
          {!profitability[0] ? (
            <TBody>
              <Tr>
                <TextTD empty>Nenhum resultado encontrado</TextTD>
              </Tr>
            </TBody>
          ) : (
            <TBody>
              <Tr>
                <TitleTD>{profitability[0].name} (%)</TitleTD>
                <TextTD legend="mês anterior">
                  {profitability[0].value[1] ? profitability[0].value[1] : '-'}
                </TextTD>
                <TextTD legend="ano">
                  {profitability[0].value[2] ? profitability[0].value[2] : '-'}
                </TextTD>
                <TextTD legend="últ. 12m">
                  {profitability[0].value[3] ? profitability[0].value[3] : '-'}
                </TextTD>
                <TextTD legend="últ. 24m">
                  {profitability[0].value[4] ? profitability[0].value[4] : '-'}
                </TextTD>
                <TextTD legend="últ. 36m">
                  {profitability[0].value[5] ? profitability[0].value[5] : '-'}
                </TextTD>
              </Tr>
              <Tr>
                <TitleTD>{profitability[1].name} (%)</TitleTD>
                <TextTD legend="mês anterior">
                  {profitability[1].value[1] ? profitability[1].value[1] : '-'}
                </TextTD>
                <TextTD legend="ano">
                  {profitability[1].value[2] ? profitability[1].value[2] : '-'}
                </TextTD>
                <TextTD legend="últ. 12m">
                  {profitability[1].value[3] ? profitability[1].value[3] : '-'}
                </TextTD>
                <TextTD legend="últ. 24m">
                  {profitability[1].value[4] ? profitability[1].value[4] : '-'}
                </TextTD>
                <TextTD legend="últ. 36m">
                  {profitability[1].value[5] ? profitability[1].value[5] : '-'}
                </TextTD>
              </Tr>
              <Tr>
                <TitleTD>Variação</TitleTD>
                <TextTD legend="mês anterior">
                  {profitability[2].value[1] ? profitability[2].value[1] : '-'}
                </TextTD>
                <TextTD legend="ano">
                  {profitability[2].value[2] ? profitability[2].value[2] : '-'}
                </TextTD>
                <TextTD legend="últ. 12m">
                  {profitability[2].value[3] ? profitability[2].value[3] : '-'}
                </TextTD>
                <TextTD legend="últ. 24m">
                  {profitability[2].value[4] ? profitability[2].value[4] : '-'}
                </TextTD>
                <TextTD legend="últ. 36m">
                  {profitability[2].value[5] ? profitability[2].value[5] : '-'}
                </TextTD>
              </Tr>
            </TBody>
          )}
        </Table>
      </TableWrapper>
    </>
  )
}

TextTD.propTypes = {
  empty: PropTypes.bool,
  children: PropTypes.node.isRequired,
  legend: PropTypes.string,
}

TextTD.defaultProps = {
  empty: false,
  legend: '',
}

TableProfitability.propTypes = {
  profitability: PropTypes.node.isRequired,
}

export default TableProfitability
