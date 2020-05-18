import React, { useMemo } from 'react'
import { useTable, useSortBy } from 'react-table'
import 'styled-components/macro'
import PropTypes from 'prop-types'

import FormatColumns from './formatters'
import TableBody from './TableBody'
// import { IHeaderWithColumns, ISimpleHeader, ITheadWrapper } from './types'
import * as s from './styles'

/**
 * @author: Rodrigo Condurú <rodrigo.conduru@sciensa.com>
 * @author: Hugo Cicarelli <hugo.cicarelli@sciensa.com>
 */

const SimpleHeader = ({ header }) => {
  const headerContent = header.render('Header')
  return (
    <s.TheadTh
      width={header.widthHeader || header.width}
      canSort={header.canSort}
      {...header.getHeaderProps(header.getSortByToggleProps())}
    >
      <s.TheadContent
        justifyHeader={header.justifyHeader}
        data-gtm-type="click"
        data-gtm-clicktype="menu"
        data-gtm-subname="menu de ordenação dos fundos"
        data-gtm-name={headerContent}
      >
        {headerContent && (
          <s.TheadText
            isSorted={header.isSorted}
            isSortedDesc={header.isSortedDesc}
          >
            {headerContent}
          </s.TheadText>
        )}
      </s.TheadContent>
    </s.TheadTh>
  )
}

const HeaderWithColumns = ({ header }) => (
  <s.TheadThWithColumns width={header.width}>
    {header.Header}
    <s.TheadContent>
      {header.columns.map(headerColumn => (
        <s.TheadColumn
          data-gtm-type="click"
          data-gtm-clicktype="menu"
          data-gtm-subname="menu de ordenação dos fundos"
          data-gtm-name={headerColumn.render('Header')}
          width={headerColumn.width}
          key={`inner-header-${headerColumn.Header}`}
          {...headerColumn.getHeaderProps(headerColumn.getSortByToggleProps())}
        >
          <s.TheadText
            isSorted={headerColumn.isSorted}
            isSortedDesc={headerColumn.isSortedDesc}
            top="28px"
            right="5px"
          >
            {headerColumn.render('Header')}
          </s.TheadText>
        </s.TheadColumn>
      ))}
    </s.TheadContent>
  </s.TheadThWithColumns>
)

const TheadWrapper = ({ header }) =>
  'columns' in header ? (
    <HeaderWithColumns header={header} />
  ) : (
    <SimpleHeader header={header} />
  )

const TableFunds = ({
  data,
  isLoading,
  isError,
  isFiltering = false,
  onShowDetails,
  columns: columnsProps,
  ...rest
}) => {
  const {
    getTableProps,
    columns,
    getTableBodyProps,
    prepareRow,
    rows,
  } = useTable(
    {
      // to edit how each column should render see FormatColumns function
      columns: useMemo(() => FormatColumns(columnsProps, onShowDetails), [
        columnsProps,
        onShowDetails,
      ]),
      data,
    },
    useSortBy
  )
  return (
    <>
      <s.TableWrapper {...rest}>
        <s.Table {...getTableProps()}>
          <s.Thead>
            <s.TheadTr>
              {columns.map(header => (
                <TheadWrapper
                  key={`header-with-column-${header.Header}`}
                  header={header}
                />
              ))}
            </s.TheadTr>
          </s.Thead>
          <s.Tbody {...getTableBodyProps()}>
            <TableBody
              rows={rows}
              isLoading={isLoading}
              prepareRow={prepareRow}
              isError={isError}
              isFiltering={isFiltering}
            />
          </s.Tbody>
        </s.Table>
      </s.TableWrapper>
    </>
  )
}

TableFunds.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
  isFiltering: PropTypes.bool,
  onShowDetails: PropTypes.func.isRequired,
  setIsOpenForInvestments: PropTypes.func,
  fundsType: PropTypes.array.isRequired,
}

TableFunds.defaultProps = {
  isLoading: false,
  isError: false,
  isFiltering: false,
  setIsOpenForInvestments: () => null,
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

export default TableFunds
