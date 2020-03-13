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

  const profitabilityFundo = profitability[0]
  const profitabilityBenchmark = profitability[1]
  const profitabilityVariation = profitability[2]

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
          {!profitabilityFundo ? (
            <TBody>
              <Tr>
                <TextTD empty>Nenhum resultado encontrado</TextTD>
              </Tr>
            </TBody>
          ) : (
            <TBody>
              <Tr>
                <TitleTD>{profitabilityFundo.name} (%)</TitleTD>
                <TextTD legend="mês anterior">
                  {profitabilityFundo && profitabilityFundo.value[1]
                    ? profitabilityFundo.value[1]
                    : '-'}
                </TextTD>
                <TextTD legend="ano">
                  {profitabilityFundo && profitabilityFundo.value[2]
                    ? profitabilityFundo.value[2]
                    : '-'}
                </TextTD>
                <TextTD legend="últ. 12m">
                  {profitabilityFundo && profitabilityFundo.value[3]
                    ? profitabilityFundo.value[3]
                    : '-'}
                </TextTD>
                <TextTD legend="últ. 24m">
                  {profitabilityFundo && profitabilityFundo.value[4]
                    ? profitabilityFundo.value[4]
                    : '-'}
                </TextTD>
                <TextTD legend="últ. 36m">
                  {profitabilityFundo && profitabilityFundo.value[5]
                    ? profitabilityFundo.value[5]
                    : '-'}
                </TextTD>
              </Tr>
              <Tr>
                <TitleTD>{profitabilityBenchmark.name} (%)</TitleTD>
                <TextTD legend="mês anterior">
                  {profitabilityBenchmark && profitabilityBenchmark.value[1]
                    ? profitabilityBenchmark.value[1]
                    : '-'}
                </TextTD>
                <TextTD legend="ano">
                  {profitabilityBenchmark && profitabilityBenchmark.value[2]
                    ? profitabilityBenchmark.value[2]
                    : '-'}
                </TextTD>
                <TextTD legend="últ. 12m">
                  {profitabilityBenchmark && profitabilityBenchmark.value[3]
                    ? profitabilityBenchmark.value[3]
                    : '-'}
                </TextTD>
                <TextTD legend="últ. 24m">
                  {profitabilityBenchmark && profitabilityBenchmark.value[4]
                    ? profitabilityBenchmark.value[4]
                    : '-'}
                </TextTD>
                <TextTD legend="últ. 36m">
                  {profitabilityBenchmark && profitabilityBenchmark.value[5]
                    ? profitabilityBenchmark.value[5]
                    : '-'}
                </TextTD>
              </Tr>
              <Tr>
                <TitleTD>Variação</TitleTD>
                <TextTD legend="mês anterior">
                  {profitabilityVariation && profitabilityVariation.value[1]
                    ? profitabilityVariation.value[1]
                    : '-'}
                </TextTD>
                <TextTD legend="ano">
                  {profitabilityVariation && profitabilityVariation.value[2]
                    ? profitabilityVariation.value[2]
                    : '-'}
                </TextTD>
                <TextTD legend="últ. 12m">
                  {profitabilityVariation && profitabilityVariation.value[3]
                    ? profitabilityVariation.value[3]
                    : '-'}
                </TextTD>
                <TextTD legend="últ. 24m">
                  {profitabilityVariation && profitabilityVariation.value[4]
                    ? profitabilityVariation.value[4]
                    : '-'}
                </TextTD>
                <TextTD legend="últ. 36m">
                  {profitabilityVariation && profitabilityVariation.value[5]
                    ? profitabilityVariation.value[5]
                    : '-'}
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
  profitability: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object])
    .isRequired,
}

export default TableProfitability
