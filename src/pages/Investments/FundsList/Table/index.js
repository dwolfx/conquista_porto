import React, { useMemo } from 'react'
import { useTable, useSortBy } from 'react-table'
import PropTypes from 'prop-types'
import 'styled-components/macro'

import FormatColumns from './formatters'
import TableBody from './TableBody'

import {
  Table,
  Thead,
  TheadTr,
  TheadTh,
  TheadThWithColumns,
  TheadColumn,
  Tbody,
  TheadContent,
  TableWrapper,
  TheadText,
} from './styles'

const SimpleHeader = ({ header }) => {
  const headerContent = header.render('Header')
  return (
    <TheadTh
      width={header.widthHeader || header.width}
      canSort={header.canSort}
      {...header.getHeaderProps(header.getSortByToggleProps())}
    >
      <TheadContent
        justifyHeader={header.justifyHeader}
        data-gtm-type="click"
        data-gtm-clicktype="menu"
        data-gtm-subname="menu de ordenação dos fundos"
        data-gtm-name={headerContent}
        lineHeight="16px"
      >
        {headerContent && (
          <TheadText
            showSortArrows={header.canSort}
            isSorted={header.isSorted}
            isSortedDesc={header.isSortedDesc}
            top="28px"
            right="5px"
          >
            {headerContent}
          </TheadText>
        )}
      </TheadContent>
    </TheadTh>
  )
}

const HeaderWithColumns = ({ header }) => (
  <TheadThWithColumns width={header.width}>
    {header.Header}
    <TheadContent>
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
    </TheadContent>
  </TheadThWithColumns>
)

const TheadWrapper = ({ header }) =>
  'columns' in header ? (
    <HeaderWithColumns header={header} />
  ) : (
    <SimpleHeader header={header} canSort={false} />
  )

export default function TableFunds({
  data,
  isLoading,
  isError,
  isFiltering,
  onChangeIsFundDetailOpen,
  isTablet,
  handleLayerOpen,
  setIsOpenForInvestments,
  columns: columnsProps,
  clickedFundInvestButton,
}) {
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
        () =>
          FormatColumns(columnsProps, handleLayerOpen, clickedFundInvestButton),
        [columnsProps, handleLayerOpen, clickedFundInvestButton]
      ),
      data,
      disableSortBy: isTablet,
    },
    useSortBy
  )
  return (
    <>
      <TableWrapper>
        <Table {...getTableProps()}>
          <Thead>
            <TheadTr>
              {columns.map(header => (
                <TheadWrapper
                  key={`header-with-column-${header.Header}`}
                  header={header}
                />
              ))}
            </TheadTr>
          </Thead>
          <Tbody {...getTableBodyProps()}>
            <TableBody
              onChangeIsFundDetailOpen={onChangeIsFundDetailOpen}
              setIsOpenForInvestments={setIsOpenForInvestments}
              rows={rows}
              isLoading={isLoading}
              prepareRow={prepareRow}
              isError={isError}
              isFiltering={isFiltering}
            />
          </Tbody>
        </Table>
      </TableWrapper>
    </>
  )
}

TableFunds.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  isFiltering: PropTypes.bool,
  isTablet: PropTypes.bool.isRequired,
  handleLayerOpen: PropTypes.func.isRequired,
  onChangeIsFundDetailOpen: PropTypes.func.isRequired,
  setIsOpenForInvestments: PropTypes.func.isRequired,
  fundsType: PropTypes.array.isRequired,
  clickedFundInvestButton: PropTypes.string,
}

TableFunds.defaultProps = {
  isFiltering: false,
  clickedFundInvestButton: '',
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
    widthHeader: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
