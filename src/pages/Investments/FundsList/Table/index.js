import React, { useState, useMemo } from 'react'
import { useTable, useSortBy } from 'react-table'
import PropTypes from 'prop-types'
import 'styled-components/macro'

import FormatColumns from './formatters'

import {
  Table,
  Thead2,
  TheadTr2,
  TheadTh2,
  TheadThWithColumns,
  TheadColumn,
  Tbody,
  TbodyTr,
  TbodyTd,
  WrapperContent2,
  TableWrapper,
  TheadText,
} from './styles'

const SimpleHeader = ({ header }) => {
  const headerContent = header.render('Header')
  return (
    <TheadTh2
      width={header.widthHeader || header.width}
      canSort={header.canSort}
      {...header.getHeaderProps(header.getSortByToggleProps())}
    >
      <WrapperContent2
        justifyHeader={header.justifyHeader}
        data-gtm-type="click"
        data-gtm-clicktype="menu"
        data-gtm-subname="menu de ordenação dos fundos"
        data-gtm-name={headerContent}
        lineHeight="16px"
      >
        {headerContent && (
          <TheadText
            isSorted={header.isSorted}
            isSortedDesc={header.isSortedDesc}
            top="28px"
            right="5px"
          >
            {headerContent}
          </TheadText>
        )}
      </WrapperContent2>
    </TheadTh2>
  )
}

const HeaderWithColumns = ({ header }) => (
  <TheadThWithColumns width={header.width}>
    {header.Header}
    <WrapperContent2>
      {header.columns.map(headerColumn => (
        <TheadColumn
          data-gtm-type="click"
          data-gtm-clicktype="menu"
          data-gtm-subname="menu de ordenação dos fundos"
          data-gtm-name={headerColumn.render('Header')}
          width={headerColumn.width}
          key={`inner-header-${headerColumn.Header}`}
          {...headerColumn.getHeaderProps(headerColumn.getSortByToggleProps())}
        >
          <TheadText
            isSorted={headerColumn.isSorted}
            isSortedDesc={headerColumn.isSortedDesc}
            top="28px"
            right="5px"
          >
            {headerColumn.render('Header')}
          </TheadText>
        </TheadColumn>
      ))}
    </WrapperContent2>
  </TheadThWithColumns>
)

const TheadWrapper = ({ header }) =>
  'columns' in header ? (
    <HeaderWithColumns header={header} />
  ) : (
    <SimpleHeader header={header} />
  )

export default function TableFunds({ data, columns: columnsProps, idGoal }) {
  const [isModalOpen, toggleModal] = useState(false)

  const {
    getTableProps,
    columns,
    getTableBodyProps,
    prepareRow,
    rows,
  } = useTable(
    {
      // to edit how each column should render see FormatColumns function
      columns: useMemo(
        () => FormatColumns(columnsProps, toggleModal, isModalOpen, idGoal),
        [isModalOpen, columnsProps, idGoal]
      ),
      data,
    },
    useSortBy
  )
  return (
    <>
      <TableWrapper>
        <Table {...getTableProps()}>
          <Thead2>
            <TheadTr2>
              {columns.map(header => (
                <TheadWrapper
                  key={`header-with-column-${header.Header}`}
                  header={header}
                />
              ))}
            </TheadTr2>
          </Thead2>
          <Tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row)

              return (
                <TbodyTr {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <TbodyTd
                      borderRisk={cell.row.original.perfil_risco_ordem}
                      width={cell.column.width}
                      align={cell.column.align}
                      {...cell.getCellProps()}
                    >
                      {cell.render('Cell')}
                    </TbodyTd>
                  ))}
                </TbodyTr>
              )
            })}
          </Tbody>
        </Table>
      </TableWrapper>
    </>
  )
}

TableFunds.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  fundsType: PropTypes.array.isRequired,
  idGoal: PropTypes.number,
}

TableFunds.defaultProps = {
  idGoal: null,
}

TheadWrapper.propTypes = {
  header: PropTypes.object.isRequired,
}

HeaderWithColumns.propTypes = {
  header: PropTypes.shape({
    columns: PropTypes.array.isRequired,
    Header: PropTypes.string.isRequired,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
}

SimpleHeader.propTypes = {
  header: PropTypes.shape({
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    widthHeader: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    render: PropTypes.func.isRequired,
    isSorted: PropTypes.bool.isRequired,
    isSortedDesc: PropTypes.bool,
    getSortByToggleProps: PropTypes.func.isRequired,
    getHeaderProps: PropTypes.func.isRequired,
    canSort: PropTypes.bool.isRequired,
    justifyHeader: PropTypes.string,
    align: PropTypes.string,
  }).isRequired,
}
